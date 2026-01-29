// import/import-menu-items.mjs
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import dotenv from "dotenv";
import { createClient } from "@sanity/client";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const STRICT = args.includes("--strict");
const chunkArg = args.find((a) => a.startsWith("--chunk="));
const CHUNK_SIZE = chunkArg ? Number(chunkArg.split("=")[1]) : 50;

function required(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env ${name}`);
  return v;
}

const projectId = required("NEXT_PUBLIC_SANITY_PROJECT_ID");
const dataset = required("NEXT_PUBLIC_SANITY_DATASET");
const token = required("SANITY_API_TOKEN");

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-06-01",
  token,
  useCdn: false,
  perspective: "published",
});

// ========= Catálogos permitidos (B1) =========
const SECTIONS = new Set(["cafes", "cervezas", "reposteria", "otros"]);

const COFFEE_CATEGORIES = new Set(["Calientes", "Fríos", "Métodos"]);
const BEER_CATEGORIES = new Set([
  "Refrescantes",
  "Saison",
  "Lupuladas",
  "Oscuras",
  "Belgian Strong",
  "Sour",
]);
const FOOD_CATEGORIES = new Set(["Sal", "Dulce"]);
const OTHER_CATEGORIES = new Set(["Bebidas", "Comidas"]);

function slugify(input) {
  return String(input)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 96);
}

function makeId(section, title) {
  return `menuItem.${section}.${slugify(title)}`;
}

function cleanUndefined(obj) {
  for (const k of Object.keys(obj)) {
    if (obj[k] === undefined) delete obj[k];
  }
  return obj;
}

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

function asString(v) {
  if (v == null) return "";
  return String(v).trim();
}

function asNumber(v) {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const n = Number(v.replaceAll(".", "").replaceAll(",", "."));
    return Number.isFinite(n) ? n : undefined;
  }
  return undefined;
}

function warnOrThrow(msg, ctx = {}) {
  const line = `[WARN] ${msg}${Object.keys(ctx).length ? ` | ${JSON.stringify(ctx)}` : ""}`;
  if (STRICT) throw new Error(line);
  console.warn(line);
}

function assertOrThrow(cond, msg, ctx = {}) {
  if (!cond) {
    const line = `[ERROR] ${msg}${Object.keys(ctx).length ? ` | ${JSON.stringify(ctx)}` : ""}`;
    throw new Error(line);
  }
}

// ===== Normalizadores (B1) =====
function normalizeCoffeeCategory(raw, title) {
  const v = asString(raw);
  if (!v) return undefined;
  if (!COFFEE_CATEGORIES.has(v)) {
    warnOrThrow("coffeeCategory inválida (se omite)", { title, value: v });
    return undefined;
  }
  return v;
}

function normalizeBeerCategories(raw, title) {
  const arr = Array.isArray(raw) ? raw : [];
  const values = arr.map(asString).filter(Boolean);

  const cleaned = Array.from(
    new Set(
      values.filter((x) => {
        if (!BEER_CATEGORIES.has(x)) {
          warnOrThrow("beerCategories contiene valor no permitido (se omite)", {
            title,
            value: x,
          });
          return false;
        }
        return true;
      }),
    ),
  );

  return cleaned.length ? cleaned : undefined;
}

function normalizeGenericCategoryForSection(section, raw, title) {
  const v = asString(raw);
  if (!v) return undefined;

  if (section === "reposteria") {
    if (!FOOD_CATEGORIES.has(v)) {
      warnOrThrow("foodCategory no estándar (se omite)", { title, value: v });
      return undefined;
    }
    return v;
  }

  if (section === "otros") {
    if (!OTHER_CATEGORIES.has(v)) {
      warnOrThrow("otherCategory no estándar (se omite)", { title, value: v });
      return undefined;
    }
    return v;
  }

  return undefined;
}

function normalizeTags(raw) {
  const arr = Array.isArray(raw) ? raw : [];
  return Array.from(new Set(arr.map(asString).filter(Boolean)));
}

function normalizeMedia(item, title) {
  const mediaSrc = isNonEmptyString(item.mediaSrc)
    ? item.mediaSrc.trim()
    : undefined;
  const mediaVideoUrl = isNonEmptyString(item.mediaVideoUrl)
    ? item.mediaVideoUrl.trim()
    : undefined;

  if (mediaSrc && !mediaSrc.startsWith("/")) {
    warnOrThrow("mediaSrc debería iniciar con '/' (ruta en /public).", {
      title,
      mediaSrc,
    });
  }

  // Si mediaSrc parece video, no uses mediaVideoUrl simultáneamente
  if (mediaSrc && /\.(mp4|webm|mov)$/i.test(mediaSrc) && mediaVideoUrl) {
    warnOrThrow("mediaVideoUrl se ignora porque mediaSrc ya es video local", {
      title,
      mediaSrc,
      mediaVideoUrl,
    });
    return { mediaSrc, mediaVideoUrl: undefined };
  }

  return { mediaSrc, mediaVideoUrl };
}

function validateBase(section, item) {
  const title = asString(item.title);
  assertOrThrow(title.length > 0, "Item sin title", { section });

  assertOrThrow(SECTIONS.has(section), "Sección inválida", { title, section });

  const priceCop = asNumber(item.priceCop ?? item.priceCOP);
  const priceText = asString(item.priceText);

  assertOrThrow(
    priceCop != null || priceText.length > 0,
    "Debe tener priceCop o priceText",
    { title, section },
  );

  return {
    title,
    priceCop,
    priceText: priceText.length ? priceText : undefined,
  };
}

function toDoc(section, item, fallbackOrder) {
  const { title, priceCop, priceText } = validateBase(section, item);

  const order =
    typeof item.order === "number" && Number.isFinite(item.order)
      ? item.order
      : fallbackOrder;

  const description = isNonEmptyString(item.description)
    ? item.description.trim()
    : undefined;

  // Common
  const tags = normalizeTags(item.tags);
  const isActive = item.isActive !== false;

  // B1 categories
  const coffeeCategory =
    section === "cafes"
      ? normalizeCoffeeCategory(item.category, title)
      : undefined;

  const beerCategories =
    section === "cervezas"
      ? normalizeBeerCategories(item.tags, title)
      : undefined;

  const foodCategory =
    section === "reposteria"
      ? normalizeGenericCategoryForSection(section, item.category, title)
      : undefined;

  const otherCategory =
    section === "otros"
      ? normalizeGenericCategoryForSection(section, item.category, title)
      : undefined;

  // Beer fields
  const beerStyle = section === "cervezas" ? asString(item.beerStyle) : "";
  const abv = section === "cervezas" ? asString(item.abv) : "";
  const ibus = section === "cervezas" ? asNumber(item.ibus) : undefined;

  if (section === "cervezas") {
    if (!beerStyle) warnOrThrow("Cerveza sin beerStyle", { title });
    if (!abv) warnOrThrow("Cerveza sin abv", { title });
  }

  const { mediaSrc, mediaVideoUrl } = normalizeMedia(item, title);

  const doc = cleanUndefined({
    _id: makeId(section, title),
    _type: "menuItem",

    title,
    slug: { _type: "slug", current: slugify(title) },
    section,
    isActive,
    order,

    description,
    tags,

    priceCop,
    priceText,

    coffeeCategory,
    beerCategories,
    foodCategory,
    otherCategory,

    beerStyle: section === "cervezas" && beerStyle ? beerStyle : undefined,
    abv: section === "cervezas" && abv ? abv : undefined,
    ibus,

    mediaSrc,
    mediaVideoUrl,
  });

  const allowedKeys = new Set([
    "_id",
    "_type",
    "title",
    "slug",
    "section",
    "isActive",
    "order",
    "description",
    "tags",
    "priceCop",
    "priceText",
    "coffeeCategory",
    "beerCategories",
    "foodCategory",
    "otherCategory",
    "beerStyle",
    "abv",
    "ibus",
    "mediaSrc",
    "mediaVideoUrl",
  ]);

  for (const k of Object.keys(doc)) {
    if (!allowedKeys.has(k)) {
      warnOrThrow("Campo no permitido en doc (se elimina)", {
        title,
        field: k,
      });
      delete doc[k];
    }
  }

  return doc;
}

async function main() {
  const file = path.join(process.cwd(), "import", "menuItems.json");
  assertOrThrow(fs.existsSync(file), "No existe import/menuItems.json", {
    file,
  });

  const raw = fs.readFileSync(file, "utf8");
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    throw new Error(`menuItems.json no es JSON válido: ${e?.message || e}`);
  }

  for (const k of ["cafes", "cervezas", "reposteria", "otros"]) {
    if (data[k] != null && !Array.isArray(data[k])) {
      throw new Error(`menuItems.json: "${k}" debe ser un array`);
    }
  }

  const docs = [];
  const ids = new Set();
  let sort = 10;

  const push = (section, arr) => {
    (arr || []).forEach((it) => {
      const doc = toDoc(section, { ...it, section }, sort);

      if (ids.has(doc._id)) {
        throw new Error(`ID duplicado: ${doc._id}`);
      }
      ids.add(doc._id);

      docs.push(doc);
      sort += 10;
    });
  };

  push("cafes", data.cafes);
  push("cervezas", data.cervezas);
  push("reposteria", data.reposteria);
  push("otros", data.otros);

  console.log(
    `Preparados ${docs.length} documentos (chunk=${CHUNK_SIZE}, dryRun=${DRY_RUN}, strict=${STRICT})`,
  );
  console.log("Muestra (primeros 2 docs):");
  console.log(JSON.stringify(docs.slice(0, 2), null, 2));

  if (DRY_RUN) {
    console.log("DRY RUN: no se enviaron cambios a Sanity.");
    return;
  }

  let done = 0;
  for (let i = 0; i < docs.length; i += CHUNK_SIZE) {
    const chunk = docs.slice(i, i + CHUNK_SIZE);
    let tx = client.transaction();
    for (const doc of chunk) tx = tx.createOrReplace(doc);
    await tx.commit();
    done += chunk.length;
    console.log(`Upsert OK: ${done}/${docs.length}`);
  }

  console.log("Import terminado.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
