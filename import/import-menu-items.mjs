// import/import-menu-items.mjs
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import dotenv from "dotenv";
import { createClient } from "@sanity/client";

// Node NO carga .env.local automáticamente → lo cargamos explícito
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

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
});

function slugify(input) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 96);
}

function makeId(kind, title) {
  return `menuItem.${kind}.${slugify(title)}`;
}

function cleanUndefined(obj) {
  for (const k of Object.keys(obj)) {
    if (obj[k] === undefined) delete obj[k];
  }
  return obj;
}

function toDoc(kind, item, sortOrder) {
  const title = item.title?.trim();
  if (!title) throw new Error(`Item sin title en kind=${kind}`);

  const doc = {
    _id: makeId(kind, title),
    _type: "menuItem",
    title,
    slug: { _type: "slug", current: slugify(title) },

    // tu schema actual usa "section"
    section: item.section || kind,

    // categoría principal unificada (si la usas)
    category: item.category,

    // tags (multi)
    tags: item.tags || [],

    description: item.description || "",

    // precios
    priceCop: typeof item.priceCop === "number" ? item.priceCop : item.priceCOP,
    priceText: item.priceText,

    // cerveza opcional
    beerStyle: item.beerStyle,
    abv: item.abv,
    ibus: typeof item.ibus === "number" ? item.ibus : undefined,

    // orden / visible
    order: typeof item.order === "number" ? item.order : sortOrder,
    isActive: item.isActive !== false,

    // media (si tu schema actual es mediaType + mediaImage/mediaVideoUrl)
    mediaType: item.mediaType,
    mediaVideoUrl: item.mediaVideoUrl,
    // Nota: mediaImage no se puede setear aquí sin subir asset a Sanity.
    // Para primera carga masiva: guarda la ruta en un campo string si lo necesitas.
    mediaSrc: item.mediaSrc, // si agregaste un string auxiliar
  };

  return cleanUndefined(doc);
}

async function main() {
  const file = path.join(process.cwd(), "import", "menuItems.json");
  const raw = fs.readFileSync(file, "utf8");
  const data = JSON.parse(raw);

  const docs = [];
  let sort = 10;

  const push = (section, arr) => {
    (arr || []).forEach((it) => {
      docs.push(
        toDoc(
          section,
          { ...it, section },
          typeof it.order === "number" ? it.order : sort,
        ),
      );
      sort += 10;
    });
  };

  // Ajusta keys según tu menuItems.json
  push("cafes", data.cafes);
  push("cervezas", data.cervezas);
  push("reposteria", data.reposteria);
  push("otros", data.otros);

  console.log(`Preparados ${docs.length} documentos para upsert…`);

  const chunkSize = 50;
  let done = 0;

  for (let i = 0; i < docs.length; i += chunkSize) {
    const chunk = docs.slice(i, i + chunkSize);
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
