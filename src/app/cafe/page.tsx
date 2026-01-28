// src/app/cafe/page.tsx
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
type CervezaCategory = Exclude<CervezaFilter, "Todas">;

// ===== Filtros Cafés =====
const coffeeFilters = ["Todos", "Calientes", "Fríos", "Métodos"] as const;
type CoffeeFilter = (typeof coffeeFilters)[number];
type CoffeeTag = Exclude<CoffeeFilter, "Todos">;

// ===== Tipos cervezas (para ItemConMedia) =====
type CategoriaCerveza =
  | "Refrescantes"
  | "Saison"
  | "Lupuladas"
  | "Oscuras"
  | "Belgian Strong"
  | "Sour";

type Cerveza = {
  nombre: string;
  estilo: string;
  abv: string;
  ibus: number;
  precio: number;
  descripcion: string;
  mediaSrc: string;
  mediaType: "video" | "image";
  categorias: CategoriaCerveza[];
};

// ===== LISTADO COMPLETO Torrealta =====
const cervezas: Cerveza[] = [
  // Refrescantes
  {
    nombre: "La Germana Olvidada",
    estilo: "Gose",
    abv: "5%",
    ibus: 5,
    precio: 17000,
    descripcion:
      "Rubia alemana de tradición milenaria. Refrescante, cítrica, con coriandro y un toque salino.",
    mediaSrc: "/germanaOlvidada.mp4",
    mediaType: "video",
    categorias: ["Refrescantes"],
  },
  {
    nombre: "La Valiente",
    estilo: "Witbier",
    abv: "5%",
    ibus: 13,
    precio: 17000,
    descripcion:
      "Trigo con naranja, coriandro, pimienta y un toque de vainilla. Bomba aromática y muy fácil.",
    mediaSrc: "/laValiente.webp",
    mediaType: "image",
    categorias: ["Refrescantes"],
  },
  {
    nombre: "El Gregario",
    estilo: "Belgian Single",
    abv: "5.5%",
    ibus: 27,
    precio: 17000,
    descripcion:
      "Clara, chispeante y fácil de tomar. Especiada, frutal y seca: compañera de ruta.",
    mediaSrc: "/gregario.mp4",
    mediaType: "video",
    categorias: ["Refrescantes", "Belgian Strong"],
  },

  // Saison
  {
    nombre: "La Justa",
    estilo: "Hoppy Saison",
    abv: "6%",
    ibus: 25,
    precio: 17000,
    descripcion:
      "Saison rubia y tomable con lúpulo americano. Fenoles belgas + toque moderno.",
    mediaSrc: "/justa.mp4",
    mediaType: "video",
    categorias: ["Saison"],
  },
  {
    nombre: "La Provinciana",
    estilo: "French Saison",
    abv: "6.5%",
    ibus: 27,
    precio: 17000,
    descripcion:
      "Cerveza de granja: seca, rústica y especiada. Frutal, cítrica y con amargo medio.",
    mediaSrc: "/provinciana.mp4",
    mediaType: "video",
    categorias: ["Saison"],
  },
  {
    nombre: "El Prejuicio",
    estilo: "Black Saison",
    abv: "6%",
    ibus: 20,
    precio: 17000,
    descripcion:
      "Ligera y chispeante, notas herbales sutiles. Oscura en color, refrescante en boca.",
    mediaSrc: "/prejuicio.webp",
    mediaType: "image",
    categorias: ["Saison"],
  },

  // Lupuladas
  {
    nombre: "El Niño Sin Padre",
    estilo: "IPA",
    abv: "5.5%",
    ibus: 61,
    precio: 17000,
    descripcion:
      "Amarga y muy aromática. Notas frutales (maracuyá, durazno, mango) y cítricos. (No esperes siempre la misma).",
    mediaSrc: "/ninoSinPadre.mp4",
    mediaType: "video",
    categorias: ["Lupuladas"],
  },

  // Oscuras
  {
    nombre: "Medianoche en Brujas",
    estilo: "Belgian Stout",
    abv: "7%",
    ibus: 39,
    precio: 17000,
    descripcion:
      "Oscura por maltas chocolate y tostadas; final redondeado con panelita.",
    mediaSrc: "/mediaNocheEnBrujas.mp4",
    mediaType: "video",
    categorias: ["Oscuras"],
  },

  // Belgian Strong
  {
    nombre: "La Bruja",
    estilo: "Belgian Dubbel",
    abv: "7%",
    ibus: 19,
    precio: 17000,
    descripcion:
      "Cobriza profunda y compleja. Balance a malta y sirope belga: caramelo seco, ciruelas y frutas secas.",
    mediaSrc: "/laBruja.mp4",
    mediaType: "video",
    categorias: ["Belgian Strong"],
  },
  {
    nombre: "El Rey de Palmas",
    estilo: "Belgian Golden Strong",
    abv: "8%",
    ibus: 23,
    precio: 17000,
    descripcion:
      "Rubia fuerte: pera y durazno, especiada con jengibre fresco y pimienta africana.",
    mediaSrc: "/reyDePalmas.mp4",
    mediaType: "video",
    categorias: ["Belgian Strong"],
  },
  {
    nombre: "La Dama Alegre",
    estilo: "Belgian Tripel",
    abv: "9%",
    ibus: 21,
    precio: 17000,
    descripcion:
      "Rubia fuerte y especiada: cilantro, anís y cáscara de naranja. Tradición trapense con actitud.",
    mediaSrc: "/damaAlegre.mp4",
    mediaType: "video",
    categorias: ["Belgian Strong"],
  },

  // Pedalista
  {
    nombre: "El Pedalista",
    estilo: "Belgian Quadrupel",
    abv: "10%",
    ibus: 25,
    precio: 18000,
    descripcion:
      "Cobre oscura, casi negra. Sirope belga (sin ser dulce), ciruelas, higos y frutas oscuras deshidratadas.",
    mediaSrc: "/pedalista.mp4",
    mediaType: "video",
    categorias: ["Oscuras", "Belgian Strong"],
  },

  // Sour
  {
    nombre: "La Diva",
    estilo: "Fruited Sour Ale",
    abv: "4.5%",
    ibus: 15,
    precio: 17000,
    descripcion:
      "Ácida y frutal. Enriquecida con fruta fresca (cambia por temporada).",
    mediaSrc: "/diva.mp4",
    mediaType: "video",
    categorias: ["Sour"],
  },
];

function formatCOP(n: number) {
  const s = Math.round(n).toString();
  const withDots = s.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `$${withDots}`;
}

// =======================
// Tipos genéricos para cards con media
// =======================
type MediaType = "video" | "image";

type MenuCardItem = {
  nombre: string;
  descripcion?: string;
  precio?: string; // "$7.500" | "Desde $9.500" | "Consultar"
  mediaSrc?: string;
  mediaType?: MediaType;
};

function MenuCardGrid({
  items,
  mediaHeight = 110,
}: {
  items: MenuCardItem[];
  mediaHeight?: number;
}) {
  return (
    <div className="cardGrid">
      {items.map((it) => (
        <div key={it.nombre} className="card">
          <div className="media" style={{ height: mediaHeight }}>
            {it.mediaSrc ? (
              it.mediaType === "video" ? (
                <video
                  className="mediaEl"
                  src={it.mediaSrc}
                  playsInline
                  muted
                  loop
                  autoPlay
                  preload="metadata"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="mediaEl" src={it.mediaSrc} alt={it.nombre} />
              )
            ) : (
              <div className="mediaPh" aria-hidden="true" />
            )}
          </div>

          <div className="body">
            <div className="top">
              <div className="title">{it.nombre}</div>
              {it.precio ? <div className="price">{it.precio}</div> : null}
            </div>
            {it.descripcion ? (
              <div className="desc">{it.descripcion}</div>
            ) : null}
          </div>
        </div>
      ))}

      <style jsx>{`
        .cardGrid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }

        .card {
          border-radius: 18px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background: #fafafa;
          overflow: hidden;
        }

        .media {
          width: 100%;
          background: #eee;
          position: relative;
        }

        .mediaEl {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .mediaPh {
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.06),
            rgba(0, 0, 0, 0.02)
          );
        }

        .body {
          padding: 12px 12px 14px;
        }

        .top {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 12px;
        }

        .title {
          font-weight: 900;
          color: rgba(0, 0, 0, 0.92);
        }

        .price {
          font-weight: 900;
          color: rgba(0, 0, 0, 0.72);
          white-space: nowrap;
        }

        .desc {
          margin-top: 6px;
          font-size: 13px;
          line-height: 1.5;
          color: rgba(0, 0, 0, 0.76);
        }
      `}</style>
    </div>
  );
}

export default function CafePage() {
  const [active, setActive] = React.useState(CATS[0].id);

  // filtros (se muestran en el contenido, NO en el subnav)
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

  React.useEffect(() => {
    return () => stopRaf();
  }, []);

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

        {/* Subnav: SOLO navegación (sin filtros) */}
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
        <MenuSectionCafes
          id="cafes"
          title="Cafés"
          filter={coffeeFilter}
          onFilterChange={setCoffeeFilter}
        />
        <MenuSectionCervezas
          id="cervezas"
          title="Cervezas"
          beers={cervezas}
          filter={cervezaFilter}
          onFilterChange={setCervezaFilter}
        />
        <MenuSectionReposteria id="reposteria" title="Panadería & Repostería" />
        <MenuSectionOtros id="otros" title="Otros" />
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
          isolation: isolate;
          background: #ffffff;
          border-top: 1px solid rgba(0, 0, 0, 0.06);
          transform: translateZ(0);
          will-change: transform;
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
      `}</style>
    </section>
  );
}

/* =========================
   Secciones
========================= */

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

function MenuSectionCafes({
  id,
  title,
  filter,
  onFilterChange,
}: {
  id: string;
  title: string;
  filter: CoffeeFilter;
  onFilterChange: (v: CoffeeFilter) => void;
}) {
  const items: Array<
    MenuCardItem & {
      tags: CoffeeTag[];
    }
  > = [
    // Calientes
    {
      nombre: "Espresso",
      descripcion: "Intenso, directo y limpio.",
      precio: formatCOP(7500),
      tags: ["Calientes"],
    },
    {
      nombre: "Americano",
      descripcion: "Más largo, misma esencia.",
      precio: formatCOP(7500),
      tags: ["Calientes"],
    },
    {
      nombre: "Latte",
      descripcion: "Cremoso, balanceado.",
      precio: formatCOP(9500),
      tags: ["Calientes"],
    },
    {
      nombre: "Capuchino",
      descripcion: "Espuma firme, perfil clásico.",
      precio: formatCOP(9500),
      tags: ["Calientes"],
    },
    {
      nombre: "Infusión de frutas",
      descripcion: "Sin café: frutas e infusión caliente.",
      precio: `Desde ${formatCOP(9500)}`,
      tags: ["Calientes"],
    },
    {
      nombre: "Copa de vino caliente",
      descripcion: "Servicio caliente, ideal para clima frío.",
      precio: "Consultar",
      tags: ["Calientes"],
    },

    // Fríos
    {
      nombre: "Affogato",
      descripcion: "Espresso + helado: postre y café.",
      precio: "Consultar",
      tags: ["Fríos"],
    },
    {
      nombre: "Monumento Tonic",
      descripcion: "Café + tónica: seco, cítrico y brillante.",
      precio: "Consultar",
      tags: ["Fríos"],
    },

    // Métodos
    {
      nombre: "V60",
      descripcion: "Claridad y dulzor; taza limpia.",
      precio: "Consultar",
      tags: ["Métodos"],
    },
    {
      nombre: "Chemex",
      descripcion: "Taza suave y elegante; menos cuerpo.",
      precio: "Consultar",
      tags: ["Métodos"],
    },
    {
      nombre: "Prensa francesa",
      descripcion: "Más cuerpo y textura; perfil redondo.",
      precio: "Consultar",
      tags: ["Métodos"],
    },
    {
      nombre: "Sifón belga",
      descripcion: "Aromas altos y experiencia visual.",
      precio: "Consultar",
      tags: ["Métodos"],
    },
    {
      nombre: "Cold drip",
      descripcion: "Extracción lenta en frío; dulce y sedosa.",
      precio: "Consultar",
      tags: ["Métodos"],
    },
  ];

  const filtered =
    filter === "Todos"
      ? items
      : items.filter((i) => i.tags.includes(filter as CoffeeTag));

  return (
    <SectionShell id={id}>
      <div className="sectionHeadRow">
        <h2>{title}</h2>

        <select
          className="sectionFilter"
          value={filter}
          onChange={(e) => onFilterChange(e.target.value as CoffeeFilter)}
          aria-label="Filtrar cafés"
        >
          {coffeeFilters.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>

        <span className="count">
          {filtered.length} {filtered.length === 1 ? "ítem" : "ítems"}
        </span>
      </div>

      <div className="sectionBody">
        <MenuCardGrid items={filtered} mediaHeight={110} />

        <div className="note">
          <strong>Adición de licor:</strong> Baileys o Amaretto —{" "}
          {formatCOP(7500)} el shot.
        </div>
      </div>

      <style jsx>{`
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
      `}</style>
    </SectionShell>
  );
}

function MenuSectionCervezas({
  id,
  title,
  filter,
  onFilterChange,
  beers,
}: {
  id: string;
  title: string;
  filter: CervezaFilter;
  onFilterChange: (v: CervezaFilter) => void;
  beers: Cerveza[];
}) {
  const filtradas =
    filter === "Todas"
      ? beers
      : beers.filter((b) => b.categorias.includes(filter as CervezaCategory));

  return (
    <SectionShell id={id}>
      <div className="sectionHeadRow">
        <h2>{title}</h2>

        <select
          className="sectionFilter"
          value={filter}
          onChange={(e) => onFilterChange(e.target.value as CervezaFilter)}
          aria-label="Filtrar cervezas"
        >
          {cervezaFilters.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>

        <span className="count">
          {filtradas.length} {filtradas.length === 1 ? "ítem" : "ítems"}
        </span>
      </div>

      <div className="sectionBody">
        <div className="beerGrid">
          {filtradas.map((c) => (
            <ItemConMedia key={c.nombre} {...c} mediaHeight={110} />
          ))}
        </div>
      </div>

      <style jsx>{`
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

        .beerGrid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }
      `}</style>
    </SectionShell>
  );
}

function MenuSectionReposteria({ id, title }: { id: string; title: string }) {
  const items: MenuCardItem[] = [
    {
      nombre: "Pandeyucas",
      descripcion: "Recién hechos.",
      precio: "Consultar",
      // mediaSrc: "/menu/pandeyucas.webp",
      // mediaType: "image",
    },
    {
      nombre: "Palitos de queso",
      descripcion: "Calientes.",
      precio: "Consultar",
      // mediaSrc: "/menu/palitos-queso.webp",
      // mediaType: "image",
    },
    {
      nombre: "Papas chips",
      descripcion: "Crujientes.",
      precio: "Consultar",
      // mediaSrc: "/menu/papas-chips.webp",
      // mediaType: "image",
    },
  ];

  return (
    <SectionShell id={id}>
      <div className="sectionHeadRow">
        <h2>{title}</h2>

        <span className="count">
          {items.length} {items.length === 1 ? "ítem" : "ítems"}
        </span>
      </div>

      <div className="sectionBody">
        <MenuCardGrid items={items} mediaHeight={110} />
      </div>

      <style jsx>{`
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

        .count {
          opacity: 0.7;
          font-weight: 700;
          font-size: 13px;
        }

        .sectionBody {
          padding: 14px 0 8px;
        }
      `}</style>
    </SectionShell>
  );
}

function MenuSectionOtros({ id, title }: { id: string; title: string }) {
  const items: MenuCardItem[] = [
    {
      nombre: "Flights",
      descripcion: "Café / cerveza según disponibilidad.",
      precio: "Consultar",
      // mediaSrc: "/menu/flights.webp",
      // mediaType: "image",
    },
    {
      nombre: "Bebida de temporada",
      descripcion: "Pregunta por la rotación.",
      precio: "Consultar",
      // mediaSrc: "/menu/temporada.webp",
      // mediaType: "image",
    },
  ];

  return (
    <SectionShell id={id}>
      <div className="sectionHeadRow">
        <h2>{title}</h2>

        <span className="count">
          {items.length} {items.length === 1 ? "ítem" : "ítems"}
        </span>
      </div>

      <div className="sectionBody">
        <MenuCardGrid items={items} mediaHeight={110} />
      </div>

      <style jsx>{`
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

        .count {
          opacity: 0.7;
          font-weight: 700;
          font-size: 13px;
        }

        .sectionBody {
          padding: 14px 0 8px;
        }
      `}</style>
    </SectionShell>
  );
}
