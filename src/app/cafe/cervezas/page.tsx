// FILE: src/app/cafe/cervezas/page.tsx
import { ItemConMedia } from '../_components/ItemConMedia'

const cervezas = [
  {
    nombre: 'El Gregario',
    estilo: 'Belgian Single',
    abv: '5.5%',
    ibus: 27,
    precio: 17000,
    descripcion: 'Clara, chispeante y fácil de tomar; especiada, frutal y seca. Ideal para seguir el recorrido.',
    mediaSrc: '/gregario.mp4',
    mediaType: 'video' as const,
  },
  {
    nombre: 'Medianoche en Brujas',
    estilo: 'Belgian Stout',
    abv: '7%',
    ibus: 39,
    precio: 17000,
    descripcion: 'Oscura por maltas chocolate y tostadas; final redondeado con panelita.',
    mediaSrc: '/mediaNocheEnBrujas.mp4',
    mediaType: 'video' as const,
  },
  {
    nombre: 'La Justa',
    estilo: 'Hoppy Saison',
    abv: '6%',
    ibus: 25,
    precio: 17000,
    descripcion: 'Saison rubia y tomable con lúpulo americano: fresca, moderna y balanceada.',
    mediaSrc: '/justa.mp4',
    mediaType: 'video' as const,
  },
  {
    nombre: 'La Bruja',
    estilo: 'Belgian Dubbel',
    abv: '7%',
    ibus: 19,
    precio: 17000,
    descripcion: 'Cobriza y compleja; malta y sirope belga con notas a caramelo seco, ciruelas y frutas secas.',
    mediaSrc: '/laBruaja.mp4',
    mediaType: 'video' as const,
  },
  {
    nombre: 'El Rey de Palmas',
    estilo: 'Belgian Golden Strong',
    abv: '8%',
    ibus: 23,
    precio: 17000,
    descripcion: 'Rubia fuerte: pera y durazno, con jengibre fresco y pimienta africana.',
    mediaSrc: '/reyDePalmas.mp4',
    mediaType: 'video' as const,
  },
  {
    nombre: 'El Prejuicio',
    estilo: 'Black Saison',
    abv: '6%',
    ibus: 20,
    precio: 17000,
    descripcion: 'Ligera y chispeante, herbales sutiles. Oscura en color, brillante en frescura.',
    mediaSrc: '/prejuicio.webp',
    mediaType: 'image' as const,
  },
  {
    nombre: 'La Dama Alegre',
    estilo: 'Belgian Tripel',
    abv: '9%',
    ibus: 21,
    precio: 17000,
    descripcion: 'Rubia fuerte y especiada: cilantro, anís y cáscara de naranja. Tradición trapense con actitud.',
    mediaSrc: '/damaAlegre.mp4',
    mediaType: 'video' as const,
  },
  {
    nombre: 'El Niño Sin Padre',
    estilo: 'IPA',
    abv: '5.5%',
    ibus: 61,
    precio: 17000,
    descripcion: 'Amarga, aromática y refrescante; notas frutales y cítricas. (No esperes siempre la misma).',
    mediaSrc: '/ninoSinPadre.mp4',
    mediaType: 'video' as const,
  },
  {
    nombre: 'La Valiente',
    estilo: 'Witbier',
    abv: '5%',
    ibus: 13,
    precio: 17000,
    descripcion: 'Trigo con naranja, coriandro, pimienta y un toque de vainilla. Muy aromática y fácil.',
    mediaSrc: '/laValiente.webp',
    mediaType: 'image' as const,
  },
  {
    nombre: 'El Pedalista',
    estilo: 'Belgian Quadrupel',
    abv: '10%',
    ibus: 25,
    precio: 18000,
    descripcion: 'Cobre oscura, casi negra; sirope belga (sin ser dulce) y notas a ciruelas e higos.',
    mediaSrc: '/pedalista.mp4',
    mediaType: 'video' as const,
  },
  {
    nombre: 'La Diva',
    estilo: 'Fruited Sour Ale',
    abv: '4.5%',
    ibus: 15,
    precio: 17000,
    descripcion: 'Ácida y frutal; fruta fresca que cambia por temporada.',
    mediaSrc: '/diva.mp4',
    mediaType: 'video' as const,
  },
]

export default function CervezasPage() {
  return (
    <div>
      <h2 style={{ marginBottom: 8 }}>Cervezas Torrealta</h2>
      <p style={{ maxWidth: 980, opacity: 0.9, marginBottom: 18 }}>
        Selección artesanal para acompañar el taller: perfiles belgas, saisons, IPA y sour.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 18 }}>
        {cervezas.map((c) => (
          <ItemConMedia key={c.nombre} {...c} mediaHeight={140} />
        ))}
      </div>

      <div style={{ marginTop: 18, opacity: 0.85 }}>
        <strong>Pendientes por media:</strong> La Provinciana (French Saison) y La Germana Olvidada (Gose).
      </div>
    </div>
  )
}
