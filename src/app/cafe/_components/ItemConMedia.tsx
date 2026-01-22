// FILE: src/app/cafe/_components/ItemConMedia.tsx
type Props = {
  nombre: string
  estilo?: string
  abv?: string
  ibus?: number
  descripcion?: string
  precio: number
  mediaSrc?: string
  mediaType?: 'video' | 'image'
  // Control de tamaño del media (más pequeño)
  mediaHeight?: number // px
}

export function ItemConMedia({
  nombre,
  estilo,
  abv,
  ibus,
  descripcion,
  precio,
  mediaSrc,
  mediaType,
  mediaHeight = 110, // default pequeño
}: Props) {
  const fmt = new Intl.NumberFormat('es-CO')

  return (
    <div
      style={{
        border: '1px solid #2a2a2a',
        padding: 16,
        borderRadius: 12,
        background: 'rgba(255,255,255,0.02)',
      }}
    >
      {mediaSrc ? (
        <div
          style={{
            width: '100%',
            height: mediaHeight,
            borderRadius: 10,
            overflow: 'hidden',
            marginBottom: 12,
            background: 'rgba(255,255,255,0.04)',
          }}
        >
          {mediaType === 'video' ? (
            <video
              src={mediaSrc}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
	      poster="/video-poster.webp"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <img
              src={mediaSrc}
              alt={nombre}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          )}
        </div>
      ) : null}

      <div
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: 12,
  }}
>
  <h3 style={{ margin: 0, fontSize: 18 }}>{nombre}</h3>
  <span style={{ fontWeight: 700, fontSize: 16 }}>
    ${fmt.format(precio)}
  </span>
</div>

      {(estilo || abv || typeof ibus === 'number') && (
       <div style={{ opacity: 0.75, marginTop: 6, fontSize: 13 }}>
          {estilo ? estilo : ''}
          {abv ? ` · ${abv}` : ''}
          {typeof ibus === 'number' ? ` · ${ibus} IBUs` : ''}
        </div>
      )}

      {descripcion && <p style={{ marginTop: 10, opacity: 0.95 }}>{descripcion}</p>}
    </div>
  )
}
