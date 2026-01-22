// FILE: src/app/cafe/cervezas/page.tsx
// Nota: este archivo debe ser CLIENT COMPONENT porque usamos estado para filtrar.
'use client'

import { useMemo, useState } from 'react'
import { ItemConMedia } from '../_components/ItemConMedia'

type Cerveza = {
  nombre: string
  estilo: string
  abv: string
  ibus: number
  precio: number
  descripcion: string
  mediaSrc: string
  mediaType: 'video' | 'image'
  categorias: Array<
  | 'Refrescantes'
  | 'Saison'
  | 'Lupuladas'
  | 'Rojas/Ámbar'
  | 'Oscuras'
  | 'Belgian Strong'
  | 'Sour'
>

}

const cervezas: Cerveza[] = [
  // Refrescantes
  {
    nombre: 'La Germana Olvidada',
    estilo: 'Gose',
    abv: '5%',
    ibus: 5,
    precio: 17000,
    descripcion:
      'Rubia alemana de tradición milenaria, refrescante y ligera. Notas cítricas con coriandro y un sutil toque salino.',
    mediaSrc: '/germanaOlvidada.mp4',
    mediaType: 'video',
    categorias: ['Refrescantes'],
  },
  {
    nombre: 'La Valiente',
    estilo: 'Witbier',
    abv: '5%',
    ibus: 13,
    precio: 17000,
    descripcion:
      'Trigo con naranja, coriandro, pimienta y un toque de vainilla. Muy aromática y fácil.',
    mediaSrc: '/laValiente.webp',
    mediaType: 'image',
    categorias: ['Refrescantes'],
  },
  {
    nombre: 'El Gregario',
    estilo: 'Belgian Single',
    abv: '5.5%',
    ibus: 27,
    precio: 17000,
    descripcion:
      'Clara, chispeante y fácil de tomar; especiada, frutal y seca. Ideal para seguir el recorrido.',
    mediaSrc: '/gregario.mp4',
    mediaType: 'video',
    categorias: ['Refrescantes'],
  },

  // Saison
  {
    nombre: 'La Justa',
    estilo: 'Hoppy Saison',
    abv: '6%',
    ibus: 25,
    precio: 17000,
    descripcion:
      'Saison rubia y tomable con lúpulo americano: fresca, moderna y balanceada.',
    mediaSrc: '/justa.mp4',
    mediaType: 'video',
    categorias: ['Saison'],
  },
  {
    nombre: 'La Provinciana',
    estilo: 'French Saison',
    abv: '6.5%',
    ibus: 27,
    precio: 17000,
    descripcion:
      'Cerveza rústica de granja, seca y especiada. Sabores frutales y cítricos con un amargo medio.',
    mediaSrc: '/provinciana.mp4',
    mediaType: 'video',
    categorias: ['Saison'],
  },
  {
    nombre: 'El Prejuicio',
    estilo: 'Black Saison',
    abv: '6%',
    ibus: 20,
    precio: 17000,
    descripcion:
      'Ligera y chispeante, herbales sutiles. Oscura en color, brillante en frescura.',
    mediaSrc: '/prejuicio.webp',
    mediaType: 'image',
    categorias: ['Oscuras','Saison'],
  },

  // Lupuladas
  {
    nombre: 'El Niño Sin Padre',
    estilo: 'IPA',
    abv: '5.5%',
    ibus: 61,
    precio: 17000,
    descripcion:
      'Amarga, aromática y refrescante; notas frutales y cítricas. (No esperes siempre la misma).',
    mediaSrc: '/ninoSinPadre.mp4',
    mediaType: 'video',
    categorias: ['Lupuladas'],
  },

  // Oscuras
  {
    nombre: 'Medianoche en Brujas',
    estilo: 'Belgian Stout',
    abv: '7%',
    ibus: 39,
    precio: 17000,
    descripcion:
      'Oscura por maltas chocolate y tostadas; final redondeado con panelita.',
    mediaSrc: '/mediaNocheEnBrujas.mp4',
    mediaType: 'video',
    categorias: ['Oscuras'],
  },

  // Belgian Strong
  {
    nombre: 'La Bruja',
    estilo: 'Belgian Dubbel',
    abv: '7%',
    ibus: 19,
    precio: 17000,
    descripcion:
      'Cobriza y compleja; malta y sirope belga con notas a caramelo seco, ciruelas y frutas secas.',
    mediaSrc: '/laBruaja.mp4',
    mediaType: 'video',
    categorias: ['Belgian Strong', 'Rojas/Ámbar'],

  },
  {
    nombre: 'El Rey de Palmas',
    estilo: 'Belgian Golden Strong',
    abv: '8%',
    ibus: 23,
    precio: 17000,
    descripcion:
      'Rubia fuerte: pera y durazno, con jengibre fresco y pimienta africana.',
    mediaSrc: '/reyDePalmas.mp4',
    mediaType: 'video',
    categorias: ['Belgian Strong'],

  },
  {
    nombre: 'La Dama Alegre',
    estilo: 'Belgian Tripel',
    abv: '9%',
    ibus: 21,
    precio: 17000,
    descripcion:
      'Rubia fuerte y especiada: cilantro, anís y cáscara de naranja. Tradición trapense con actitud.',
    mediaSrc: '/damaAlegre.mp4',
    mediaType: 'video',
    categorias: ['Belgian Strong'],
  },
  {
    nombre: 'El Pedalista',
    estilo: 'Belgian Quadrupel',
    abv: '10%',
    ibus: 25,
    precio: 18000,
    descripcion:
      'Cobre oscura, casi negra; sirope belga (sin ser dulce) y notas a ciruelas e higos.',
    mediaSrc: '/pedalista.mp4',
    mediaType: 'video',
    categorias: ['Belgian Strong','Oscuras'],

  },

  // Sour
  {
    nombre: 'La Diva',
    estilo: 'Fruited Sour Ale',
    abv: '4.5%',
    ibus: 15,
    precio: 17000,
    descripcion: 'Ácida y frutal; fruta fresca que cambia por temporada.',
    mediaSrc: '/diva.mp4',
    mediaType: 'video',
    categorias: ['Sour'],
  },
]

const categorias = [
  'Todas',
  'Refrescantes',
  'Saison',
  'Lupuladas',
  'Rojas/Ámbar',
  'Oscuras',
  'Belgian Strong',
  'Sour',
] as const


export default function CervezasPage() {
  const [cat, setCat] = useState<Cerveza['categorias']>('Todas')

const filtradas = useMemo(() => {
  if (cat === 'Todas') return cervezas
  return cervezas.filter((c) => c.categorias.includes(cat))
}, [cat])


  return (
    <div>
      {/* Header con logo grande */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          marginBottom: 28,
        }}
      >
        <img
          src="/torrealta-logo.webp"
          alt="Torrealta Cervecería"
          style={{ height: 160, width: 'auto' }}
        />
        <h2 style={{ margin: 0, textAlign: 'center' }}>Cervezas Torrealta</h2>
      </div>

      <p style={{ maxWidth: 980, opacity: 0.9, marginBottom: 16 }}>
        Selección artesanal para acompañar el taller: perfiles belgas, saisons, IPA y sour.
      </p>

      {/* Filtro */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 18, flexWrap: 'wrap' }}>
        <label style={{ opacity: 0.85, fontWeight: 600 }}>Filtrar por estilo:</label>
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value as Cerveza['categoria'])}
          style={{
            padding: '10px 12px',
            borderRadius: 10,
            border: '1px solid #2a2a2a',
            background: 'rgba(255,255,255,0.03)',
            color: 'inherit',
          }}
        >
          {categorias.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <span style={{ opacity: 0.7 }}>
          {filtradas.length} {filtradas.length === 1 ? 'cerveza' : 'cervezas'}
        </span>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 24,
        }}
      >
        {filtradas.map((c) => (
          <ItemConMedia key={c.nombre} {...c} mediaHeight={110} />
        ))}
      </div>
    </div>
  )
}
