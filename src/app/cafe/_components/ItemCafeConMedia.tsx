// FILE: src/app/cafe/_components/ItemCafeConMedia.tsx
import Image from "next/image";

type Props = {
  nombre: string;
  descripcion?: string;
  precio?: number;
  precioDesde?: number;
  precioHasta?: number;
  notas?: string;

  mediaSrc?: string;
  mediaType?: "video" | "image";
  mediaHeight?: number;
};

const FALLBACK_POSTER = "/video-poster.webp";
const FALLBACK_TEXT = "Imagen en preparación";

export function ItemCafeConMedia({
  nombre,
  descripcion,
  precio,
  precioDesde,
  precioHasta,
  notas,
  mediaSrc,
  mediaType = "image",
  mediaHeight = 110,
}: Props) {
  const fmt = new Intl.NumberFormat("es-CO");

  // ✅ Narrowing real para TS (nunca será undefined aquí)
  const media = mediaSrc ?? null;

  const renderPrecio = () => {
    if (typeof precio === "number") return `$${fmt.format(precio)}`;
    if (typeof precioDesde === "number" && typeof precioHasta === "number")
      return `$${fmt.format(precioDesde)} – $${fmt.format(precioHasta)}`;
    if (typeof precioDesde === "number")
      return `Desde $${fmt.format(precioDesde)}`;
    return "";
  };

  return (
    <div
      style={{
        border: "1px solid #2a2a2a",
        padding: 16,
        borderRadius: 12,
        background: "rgba(255,255,255,0.02)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: mediaHeight,
          borderRadius: 10,
          overflow: "hidden",
          marginBottom: 12,
          background: "rgba(255,255,255,0.04)",
          position: "relative",
        }}
      >
        {media ? (
          mediaType === "video" ? (
            <video
              src={media}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={undefined}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          ) : (
            <Image
              src={media}
              alt={nombre}
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              style={{ objectFit: "cover" }}
            />
          )
        ) : (
          <>
            <Image
              src={FALLBACK_POSTER}
              alt={FALLBACK_TEXT}
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              style={{ objectFit: "cover" }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "grid",
                placeItems: "center",
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(2px)",
              }}
            >
              <div
                style={{
                  fontWeight: 900,
                  letterSpacing: 0.2,
                  color: "rgba(0,0,0,0.35)",
                  background: "rgba(255,255,255,0.20)",
                  border: "1px solid rgba(0,0,0,0.06)",
                  padding: "10px 14px",
                  borderRadius: 999,
                }}
              >
                {FALLBACK_TEXT}
              </div>
            </div>
          </>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 12,
        }}
      >
        <h3 style={{ margin: 0, fontSize: 18 }}>{nombre}</h3>
        {renderPrecio() ? (
          <span style={{ fontWeight: 700, fontSize: 16 }}>
            {renderPrecio()}
          </span>
        ) : null}
      </div>

      {descripcion ? (
        <p style={{ marginTop: 8, opacity: 0.9 }}>{descripcion}</p>
      ) : null}

      {notas ? (
        <p style={{ marginTop: 8, opacity: 0.75, fontSize: 13 }}>{notas}</p>
      ) : null}
    </div>
  );
}
