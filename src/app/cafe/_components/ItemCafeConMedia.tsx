// FILE: src/app/cafe/_components/ItemCafeConMedia.tsx
type Props = {
  nombre: string
  descripcion?: string
  precio?: number
  precioDesde?: number
  precioHasta?: number
  notas?: string
  mediaSrc?: string
  mediaType?: 'video' | 'image'
  mediaHeight?: number
}

export function ItemCafeConMedia({
  nombre,
  descripcion,
  precio,
  precioDesde,
  precioHasta,
  notas,
  mediaSrc,
  mediaType,
  mediaHeight = 110,
}: Props) {
  const fmt = new Intl.NumberFormat('es-CO')

  const renderPrecio = () => {
    if (typeof precio === 'number') return `$${fmt.format(precio)}`
    if (typeof precioDesde === 'number' && typeof precioHasta === 'number')
      return `$${fmt.format(precioDesde)} – $${fmt.format(precioHasta)}`
    if (typeof precioDesde === 'number') return `Desde $${fmt.format(precioDesde)}`
    return ''
  }

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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
        <h3 style={{ margin: 0, fontSize: 18 }}>{nombre}</h3>
        {renderPrecio() ? <span style={{ fontWeight: 700, fontSize: 16 }}>{renderPrecio()}</span> : null}
      </div>

      {descripcion ? <p style={{ marginTop: 8, opacity: 0.9 }}>{descripcion}</p> : null}
      {notas ? <p style={{ marginTop: 8, opacity: 0.75, fontSize: 13 }}>{notas}</p> : null}
    </div>
  )
}
