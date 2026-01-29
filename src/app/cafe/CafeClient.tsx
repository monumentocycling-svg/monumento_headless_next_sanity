// src/app/cafe/CafeClient.tsx
"use client";

import React from "react";
import { ItemConMedia } from "./_components/ItemConMedia";

type Cat = { id: string; label: string };

const CATS: Cat[] = [
  { id: "cafes", label: "Cafés" },
  { id: "cervezas", label: "Cervezas" },
  { id: "reposteria", label: "Panadería & Repostería" },
  { id: "otros", label: "Otros" },
];

// ===== Offsets para sticky + scroll =====
const NAV_OFFSET = 64;
const PAGE_HEADER_OFFSET = 132;
const TOPBAR_OFFSET = 56;
const SCROLL_OFFSET = NAV_OFFSET + PAGE_HEADER_OFFSET + TOPBAR_OFFSET;
const ARRIVAL_TOLERANCE = 14;

// ===== Filtros Cervezas =====
const cervezaFilters = [
  "Todas",
  "Refrescantes",
  "Saison",
  "Lupuladas",
  "Oscuras",
  "Belgian Strong",
  "Sour",
] as const;

type CervezaFilter = (typeof cervezaFilters)[number];
type BeerCategory = Exclude<CervezaFilter, "Todas">;

// ===== Filtros Cafés =====
const coffeeFilters = ["Todos", "Calientes", "Fríos", "Métodos"] as const;
type CoffeeFilter = (typeof coffeeFilters)[number];
type CoffeeTag = Exclude<CoffeeFilter, "Todos">;

const BEER_CATEGORIES: readonly BeerCategory[] = [
  "Refrescantes",
  "Saison",
  "Lupuladas",
  "Oscuras",
  "Belgian Strong",
  "Sour",
] as const;

function isBeerCategory(v: unknown): v is BeerCategory {
  return (
    typeof v === "string" && (BEER_CATEGORIES as readonly string[]).includes(v)
  );
}

type MenuItem = {
  _id: string;
  title: string;
  section: "cafes" | "cervezas" | "reposteria" | "otros";
  order?: number;
  description?: string;
  priceCop?: number;
  priceText?: string;

  // cerveza
  beerStyle?: string;
  abv?: string;
  ibus?: number;

  // B1
  coffeeCategory?: "Calientes" | "Fríos" | "Métodos";
  beerCategories?: BeerCategory[];
  foodCategory?: "Sal" | "Dulce";
  otherCategory?: "Bebidas" | "Comidas";

  // media
  mediaSrc?: string;
  mediaVideoUrl?: string;
  mediaImageUrl?: string;
  posterUrl?: string;
};

function formatCOP(n: number) {
  const s = Math.round(n).toString();
  const withDots = s.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `$${withDots}`;
}

function inferMediaType(i: MenuItem): "video" | "image" {
  if (i.mediaVideoUrl) return "video";
  const src = i.mediaSrc || "";
  if (/\.(mp4|webm|mov)$/i.test(src)) return "video";
  return "image";
}

function pickMediaSrc(i: MenuItem): string {
  if (i.mediaVideoUrl) return i.mediaVideoUrl;
  if (i.mediaSrc) return i.mediaSrc;
  if (i.mediaImageUrl) return i.mediaImageUrl;
  if (i.posterUrl) return i.posterUrl;
  return "/video-poster.webp";
}

export default function CafeClient({
  cafes,
  cervezas,
  reposteria,
  otros,
}: {
  cafes: MenuItem[];
  cervezas: MenuItem[];
  reposteria: MenuItem[];
  otros: MenuItem[];
}) {
  const [active, setActive] = React.useState(CATS[0].id);

  // filtros
  const [cervezaFilter, setCervezaFilter] =
    React.useState<CervezaFilter>("Todas");
  const [coffeeFilter, setCoffeeFilter] = React.useState<CoffeeFilter>("Todos");

  // lock click vs observer
  const lockRef = React.useRef(false);
  const targetIdRef = React.useRef<string | null>(null);
  const rafRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const targets = CATS.map((c) => document.getElementById(c.id)).filter(
      Boolean,
    ) as HTMLElement[];

    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (lockRef.current) return;

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          )[0];

        if (visible?.target?.id) setActive(visible.target.id);
      },
      {
        root: null,
        rootMargin: `-${SCROLL_OFFSET}px 0px -55% 0px`,
        threshold: [0.12, 0.22, 0.35],
      },
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  function stopRaf() {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }

  function unlockWhenArrived() {
    stopRaf();

    const id = targetIdRef.current;
    if (!id) {
      lockRef.current = false;
      return;
    }

    const el = document.getElementById(id);
    if (!el) {
      lockRef.current = false;
      return;
    }

    const check = () => {
      const rect = el.getBoundingClientRect();
      const desiredTop = SCROLL_OFFSET;
      const delta = rect.top - desiredTop;

      if (Math.abs(delta) <= ARRIVAL_TOLERANCE) {
        lockRef.current = false;
        targetIdRef.current = null;
        rafRef.current = null;
        return;
      }

      rafRef.current = requestAnimationFrame(check);
    };

    rafRef.current = requestAnimationFrame(check);
  }

  function goTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    setActive(id);

    lockRef.current = true;
    targetIdRef.current = id;

    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);

    unlockWhenArrived();
  }

  React.useEffect(() => () => stopRaf(), []);

  // ===== Construcción de data para UI =====

  const cafeItems = cafes
    .slice()
    .sort((a, b) => (a.order ?? 100) - (b.order ?? 100))
    .map((i) => ({
      name: i.title,
      desc: i.description || "",
      price: i.priceCop != null ? formatCOP(i.priceCop) : i.priceText || "",
      tags: [(i.coffeeCategory || "Calientes") as CoffeeTag],
    }))
    .filter((i) => i.name);

  const cafeFiltered =
    coffeeFilter === "Todos"
      ? cafeItems
      : cafeItems.filter((i) => i.tags.includes(coffeeFilter as CoffeeTag));

  const beerCards = cervezas
    .slice()
    .sort((a, b) => (a.order ?? 100) - (b.order ?? 100))
    .map((i) => {
      const catsRaw = Array.isArray(i.beerCategories) ? i.beerCategories : [];
      const categorias: BeerCategory[] = catsRaw.filter(isBeerCategory);

      return {
        nombre: i.title,
        estilo: i.beerStyle || "",
        abv: i.abv || "",
        ibus: typeof i.ibus === "number" ? i.ibus : 0,
        precio: i.priceCop ?? 0,
        descripcion: i.description || "",
        mediaSrc: pickMediaSrc(i),
        mediaType: inferMediaType(i),
        categorias,
      };
    });

  const beersFiltered =
    cervezaFilter === "Todas"
      ? beerCards
      : beerCards.filter((b) =>
          b.categorias.includes(cervezaFilter as BeerCategory),
        );

  return (
    <section className="menuPage">
      <div className="stickyStack">
        <div className="menuWrap">
          <header className="menuHeader">
            <h1>Café Monumento</h1>
            <p>
              Un lugar para quedarse. Mientras tu bici se trabaja, tú descansas:
              café de especialidad y un espacio cómodo para conversar, trabajar
              o simplemente observar.
            </p>
          </header>
        </div>

        {/* Subnav */}
        <div className="menuTopbar">
          <div className="menuTopbarInner">
            <nav className="menuCats" aria-label="Categorías del menú">
              {CATS.map((c) => {
                const isActive = active === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    className={`menuCat ${isActive ? "isActive" : ""}`}
                    onClick={() => goTo(c.id)}
                  >
                    {c.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="menuWrap">
        <SectionShell id="cafes">
          <div className="sectionHeadRow">
            <h2>Cafés</h2>

            <select
              className="sectionFilter"
              value={coffeeFilter}
              onChange={(e) => setCoffeeFilter(e.target.value as CoffeeFilter)}
              aria-label="Filtrar cafés"
            >
              {coffeeFilters.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>

            <span className="count" aria-label="Cantidad de ítems">
              {cafeFiltered.length}{" "}
              {cafeFiltered.length === 1 ? "ítem" : "ítems"}
            </span>
          </div>

          <div className="sectionBody">
            <ListEditorial items={cafeFiltered} />
            <div className="note">
              <strong>Adición de licor:</strong> Baileys o Amaretto —{" "}
              {formatCOP(7500)} el shot.
            </div>
          </div>
        </SectionShell>

        <SectionShell id="cervezas">
          <div className="sectionHeadRow">
            <h2>Cervezas</h2>

            <select
              className="sectionFilter"
              value={cervezaFilter}
              onChange={(e) =>
                setCervezaFilter(e.target.value as CervezaFilter)
              }
              aria-label="Filtrar cervezas"
            >
              {cervezaFilters.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>

            <span className="count" aria-label="Cantidad de ítems">
              {beersFiltered.length}{" "}
              {beersFiltered.length === 1 ? "ítem" : "ítems"}
            </span>
          </div>

          <div className="sectionBody">
            <div className="beerGrid">
              {beersFiltered.map((c) => (
                <ItemConMedia key={c.nombre} {...c} mediaHeight={110} />
              ))}
            </div>
          </div>
        </SectionShell>

        <SectionShell id="reposteria">
          <div className="sectionHeadRow">
            <h2>Panadería & Repostería</h2>
          </div>
          <div className="sectionBody">
            <ListEditorial
              items={reposteria
                .slice()
                .sort((a, b) => (a.order ?? 100) - (b.order ?? 100))
                .map((i) => ({
                  name: i.title,
                  desc: i.description || "",
                  price:
                    i.priceCop != null
                      ? formatCOP(i.priceCop)
                      : i.priceText || "Consultar",
                }))}
            />
          </div>
        </SectionShell>

        <SectionShell id="otros">
          <div className="sectionHeadRow">
            <h2>Otros</h2>
          </div>
          <div className="sectionBody">
            <ListEditorial
              items={otros
                .slice()
                .sort((a, b) => (a.order ?? 100) - (b.order ?? 100))
                .map((i) => ({
                  name: i.title,
                  desc: i.description || "",
                  price:
                    i.priceCop != null
                      ? formatCOP(i.priceCop)
                      : i.priceText || "Consultar",
                }))}
            />
          </div>
        </SectionShell>
      </div>

      <style jsx>{`
        .menuPage {
          padding: 10px 0 80px;
        }

        .menuWrap {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .stickyStack {
          position: sticky;
          top: ${NAV_OFFSET}px;
          z-index: 40;
          background: #fff;
          isolation: isolate;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }

        .menuHeader {
          padding: 16px 0 10px;
        }
        .menuHeader h1 {
          margin: 0;
          font-size: clamp(28px, 3.2vw, 44px);
          letter-spacing: -0.4px;
        }
        .menuHeader p {
          margin: 10px 0 0;
          max-width: 780px;
          line-height: 1.55;
          color: rgba(0, 0, 0, 0.78);
        }

        .menuTopbar {
          position: relative;
          z-index: 30;
          background: #ffffff;
          border-top: 1px solid rgba(0, 0, 0, 0.06);
        }

        .menuTopbarInner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 12px 20px;
          background: #fff;
        }

        .menuCats {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .menuCat {
          appearance: none;
          background: transparent;
          border: 0;
          padding: 6px 2px;
          cursor: pointer;
          font-weight: 800;
          font-size: 14px;
          letter-spacing: 0.2px;
          color: rgba(0, 0, 0, 0.82);
          position: relative;
          transition: color 160ms ease;
        }

        .menuCat::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -6px;
          height: 2px;
          width: 100%;
          background: var(--mmt-gold, rgba(200, 155, 82, 0.95));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 180ms ease;
        }

        .menuCat:hover {
          color: rgba(0, 0, 0, 0.95);
        }

        .menuCat.isActive {
          color: rgba(0, 0, 0, 0.95);
        }

        .menuCat.isActive::after {
          transform: scaleX(1);
        }

        .sectionHeadRow {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0 0 12px;
          flex-wrap: wrap;
        }

        .sectionHeadRow h2 {
          margin: 0;
          font-size: 26px;
          letter-spacing: -0.2px;
        }

        .sectionFilter {
          font: inherit;
          font-size: 13px;
          font-weight: 700;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(0, 0, 0, 0.18);
          background: #fff;
          cursor: pointer;
        }

        .sectionFilter:focus {
          outline: 2px solid rgba(200, 155, 82, 0.55);
          outline-offset: 2px;
        }

        .count {
          opacity: 0.7;
          font-weight: 700;
          font-size: 13px;
        }

        .sectionBody {
          padding: 14px 0 8px;
        }

        .note {
          margin-top: 12px;
          opacity: 0.85;
          font-size: 13px;
        }

        .beerGrid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }
      `}</style>
    </section>
  );
}

function SectionShell({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="menuSection">
      {children}

      <style jsx>{`
        .menuSection {
          scroll-margin-top: ${SCROLL_OFFSET}px;
          padding: 18px 0 8px;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
        }
      `}</style>
    </section>
  );
}

function ListEditorial<
  T extends { name: string; desc?: string; price?: string },
>({ items }: { items: T[] }) {
  return (
    <div className="list">
      {items.map((it) => (
        <div key={it.name} className="row">
          <div className="left">
            <div className="name">{it.name}</div>
            {it.desc ? <div className="desc">{it.desc}</div> : null}
          </div>
          {it.price ? <div className="price">{it.price}</div> : null}
        </div>
      ))}

      <style jsx>{`
        .list {
          display: grid;
          gap: 10px;
        }

        .row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 12px;
          padding: 12px 12px;
          border-radius: 16px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background: #fafafa;
        }

        .name {
          font-weight: 900;
          color: rgba(0, 0, 0, 0.92);
        }

        .desc {
          margin-top: 4px;
          font-size: 13px;
          line-height: 1.5;
          color: rgba(0, 0, 0, 0.76);
        }

        .price {
          align-self: center;
          font-weight: 900;
          color: rgba(0, 0, 0, 0.72);
        }
      `}</style>
    </div>
  );
}
