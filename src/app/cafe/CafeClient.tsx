"use client";

import React from "react";
import { ItemConMedia } from "./_components/ItemConMedia";
import { ItemCafeConMedia } from "./_components/ItemCafeConMedia";

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

// ===== Tipos =====
type CafeItem = {
  nombre: string;
  descripcion?: string;
  precio?: number;
  categoriaCafe?: CoffeeTag;
  mediaSrc?: string;
  mediaType?: "video" | "image";
};

type CervezaItem = {
  nombre: string;
  estilo: string;
  abv: string;
  ibus: number;
  descripcion: string;
  precio: number;
  categorias: Array<
    | "Refrescantes"
    | "Saison"
    | "Lupuladas"
    | "Oscuras"
    | "Belgian Strong"
    | "Sour"
  >;
  mediaSrc?: string;
  mediaType: "video" | "image";
};

type SimpleItem = {
  nombre: string;
  descripcion?: string;
  precio?: number;
  mediaSrc?: string;
  mediaType?: "video" | "image";
};

export default function CafeClient({
  cafes,
  cervezas,
  reposteria,
  otros,
}: {
  cafes: CafeItem[];
  cervezas: CervezaItem[];
  reposteria: SimpleItem[];
  otros: SimpleItem[];
}) {
  const [active, setActive] = React.useState(CATS[0].id);
  const [cervezaFilter, setCervezaFilter] =
    React.useState<CervezaFilter>("Todas");
  const [coffeeFilter, setCoffeeFilter] = React.useState<CoffeeFilter>("Todos");

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
        rootMargin: `-${SCROLL_OFFSET}px 0px -55% 0px`,
        threshold: [0.12, 0.22, 0.35],
      },
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  function goTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    setActive(id);
    lockRef.current = true;
    targetIdRef.current = id;

    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);

    const check = () => {
      const rect = el.getBoundingClientRect();
      if (Math.abs(rect.top - SCROLL_OFFSET) <= ARRIVAL_TOLERANCE) {
        lockRef.current = false;
        targetIdRef.current = null;
        return;
      }
      rafRef.current = requestAnimationFrame(check);
    };

    rafRef.current = requestAnimationFrame(check);
  }

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

        <div className="menuTopbar">
          <div className="menuTopbarInner">
            <nav className="menuCats">
              {CATS.map((c) => (
                <button
                  key={c.id}
                  className={`menuCat ${active === c.id ? "isActive" : ""}`}
                  onClick={() => goTo(c.id)}
                >
                  {c.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="menuWrap">
        {/* CAFÉS */}
        <SectionShell id="cafes">
          <div className="sectionHeadRow">
            <h2>Cafés</h2>
            <select
              className="sectionFilter"
              value={coffeeFilter}
              onChange={(e) => setCoffeeFilter(e.target.value as CoffeeFilter)}
            >
              {coffeeFilters.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </div>

          <div className="grid">
            {(coffeeFilter === "Todos"
              ? cafes
              : cafes.filter((c) => c.categoriaCafe === coffeeFilter)
            ).map((i) => (
              <ItemCafeConMedia
                key={i.nombre}
                nombre={i.nombre}
                descripcion={i.descripcion}
                precio={i.precio}
                mediaSrc={i.mediaSrc}
                mediaType={i.mediaType}
                mediaHeight={110}
              />
            ))}
          </div>
        </SectionShell>

        {/* CERVEZAS */}
        <SectionShell id="cervezas">
          <div className="sectionHeadRow">
            <h2>Cervezas</h2>
            <select
              className="sectionFilter"
              value={cervezaFilter}
              onChange={(e) =>
                setCervezaFilter(e.target.value as CervezaFilter)
              }
            >
              {cervezaFilters.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </div>

          <div className="grid">
            {(cervezaFilter === "Todas"
              ? cervezas
              : cervezas.filter((b) =>
                  b.categorias.includes(cervezaFilter as CervezaCategory),
                )
            ).map((c) => (
              <ItemConMedia key={c.nombre} {...c} mediaHeight={110} />
            ))}
          </div>
        </SectionShell>

        {/* REPOSTERÍA */}
        <SectionShell id="reposteria">
          <h2>Panadería & Repostería</h2>
          <div className="grid">
            {reposteria.map((i) => (
              <ItemCafeConMedia
                key={i.nombre}
                nombre={i.nombre}
                descripcion={i.descripcion}
                precio={i.precio}
                mediaSrc={i.mediaSrc}
                mediaType={i.mediaType}
                mediaHeight={110}
              />
            ))}
          </div>
        </SectionShell>

        {/* OTROS */}
        <SectionShell id="otros">
          <h2>Otros</h2>
          <div className="grid">
            {otros.map((i) => (
              <ItemCafeConMedia
                key={i.nombre}
                nombre={i.nombre}
                descripcion={i.descripcion}
                precio={i.precio}
                mediaSrc={i.mediaSrc}
                mediaType={i.mediaType}
                mediaHeight={110}
              />
            ))}
          </div>
        </SectionShell>
      </div>
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
    <section id={id} style={{ scrollMarginTop: SCROLL_OFFSET }}>
      {children}
    </section>
  );
}
