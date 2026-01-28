// FILE: src/app/cafe/cafes/page.tsx
"use client";

import { useMemo, useState } from "react";
import { ItemCafeConMedia } from "../_components/ItemCafeConMedia";

const filtros = ["Todos", "Calientes", "Fríos", "Métodos"] as const;
type Filtro = (typeof filtros)[number];

type ItemCafe = {
  nombre: string;
  descripcion?: string;
  precio?: number;
  precioDesde?: number;
  precioHasta?: number;
  notas?: string;
  mediaSrc?: string;
  mediaType?: "video" | "image";
  categorias: Array<"Calientes" | "Fríos" | "Métodos">;
};

const items: ItemCafe[] = [
  // Calientes
  {
    nombre: "Espresso",
    descripcion: "Intenso, directo y limpio.",
    precio: 7500,
    categorias: ["Calientes"],
    // mediaSrc: '/cafe/espresso.mp4',
    // mediaType: 'video',
  },
  {
    nombre: "Americano",
    descripcion: "Más largo, misma esencia.",
    precio: 7500,
    categorias: ["Calientes"],
  },
  {
    nombre: "Latte",
    descripcion: "Cremoso, balanceado.",
    precio: 9500,
    categorias: ["Calientes"],
  },
  {
    nombre: "Capuchino",
    descripcion: "Espuma firme, perfil clásico.",
    precio: 9500,
    categorias: ["Calientes"],
  },
  {
    nombre: "Infusión de frutas",
    descripcion: "Sin café: frutas e infusión caliente.",
    precioDesde: 9500,
    categorias: ["Calientes"],
  },
  {
    nombre: "Copa de vino caliente",
    descripcion: "Servicio caliente, ideal para clima frío.",
    precioDesde: 0, // pon el precio real
    categorias: ["Calientes"],
  },

  // Fríos
  {
    nombre: "Affogato",
    descripcion: "Espresso + helado: postre y café.",
    precioDesde: 0, // pon el precio real
    categorias: ["Fríos"],
  },
  {
    nombre: "Monumento Tonic",
    descripcion: "Café + tónica: seco, cítrico y brillante.",
    precioDesde: 0, // pon el precio real
    categorias: ["Fríos"],
  },

  // Métodos
  {
    nombre: "V60",
    descripcion: "Claridad y dulzor; taza limpia.",
    precioDesde: 0,
    categorias: ["Métodos"],
  },
  {
    nombre: "Chemex",
    descripcion: "Taza suave y elegante; menos cuerpo.",
    precioDesde: 0,
    categorias: ["Métodos"],
  },
  {
    nombre: "Prensa francesa",
    descripcion: "Más cuerpo y textura; perfil redondo.",
    precioDesde: 0,
    categorias: ["Métodos"],
  },
  {
    nombre: "Sifón belga",
    descripcion: "Aromas altos y experiencia visual.",
    precioDesde: 0,
    categorias: ["Métodos"],
  },
  {
    nombre: "Cold drip",
    descripcion: "Extracción lenta en frío; dulce y sedosa.",
    precioDesde: 0,
    categorias: ["Métodos"],
  },
];

export default function CafesPage() {
  const [filtro, setFiltro] = useState<Filtro>("Todos");

  const filtrados = useMemo(() => {
    if (filtro === "Todos") return items;
    return items.filter((i) => i.categorias.includes(filtro));
  }, [filtro]);

  return (
    <div>
      <div style={{ marginBottom: 18 }}>
        <h2 style={{ marginBottom: 8 }}>Café</h2>
        <p style={{ maxWidth: 980, opacity: 0.9, margin: 0 }}>
          Un lugar para quedarse. Mientras tu bici se trabaja, tú descansas:
          café de especialidad y un espacio cómodo para conversar, trabajar o
          simplemente observar
        </p>
      </div>

      {/* Filtro */}
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginBottom: 18,
          flexWrap: "wrap",
        }}
      >
        <label style={{ opacity: 0.85, fontWeight: 600 }}>Filtrar:</label>
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value as Filtro)}
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #2a2a2a",
            background: "rgba(255,255,255,0.03)",
            color: "inherit",
          }}
        >
          {filtros.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>

        <span style={{ opacity: 0.7 }}>
          {filtrados.length} {filtrados.length === 1 ? "ítem" : "ítems"}
        </span>
      </div>

      {/* Grid tipo cervezas */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 24,
        }}
      >
        {filtrados.map((i) => (
          <ItemCafeConMedia
            key={`${i.nombre}-${i.categorias.join("-")}`}
            {...i}
            mediaHeight={110}
          />
        ))}
      </div>

      {/* Nota / upsell */}
      <div style={{ marginTop: 18, opacity: 0.85 }}>
        <strong>Adición de licor:</strong> Baileys o Amaretto — $7.500 el shot.
      </div>
    </div>
  );
}
