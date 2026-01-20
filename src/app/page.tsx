export default function HomePage() {
  return (
    <section
      style={{
        height: "calc(100dvh - 64px)",
        backgroundImage: "url('/hero-monumento.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(0,0,0,.78), rgba(0,0,0,.28))",
        }}
      />

      <div
        style={{
          position: "relative",
          height: "100%", // (1) asegura que el contenedor respete la altura calculada del hero
          maxWidth: 980,
          margin: "0 auto",
          padding: "clamp(16px, 3vw, 44px) 20px", // (3) reduce padding máx para evitar micro-scroll
          color: "white",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          boxSizing: "border-box", // ayuda a que padding no “empuje” altura
        }}
      >
        <div
          style={{
            fontSize: 12,
            letterSpacing: 3,
            textTransform: "uppercase",
            opacity: 0.9,
          }}
        >
          Medellín · Ciclismo + Café
        </div>

        <h1 style={{ fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1, margin: 0 }}>
          Monumento
          <br />
          Taller Café
        </h1>

        <p style={{ fontSize: 18, margin: 0, maxWidth: 680, opacity: 0.95 }}>
          <strong>Todo lo que tú y tu bici necesitan para rodar mejor.</strong>
        </p>

        <p style={{ fontSize: 16, margin: 0, maxWidth: 680, opacity: 0.9 }}>
          Taller, café y tienda para ciclistas que cuidan los detalles.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 10 }}>
          <a
            href="https://calendly.com/monumentocycling"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#c89b52",
              color: "black",
              padding: "12px 16px",
              borderRadius: 12,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Agendar servicio
          </a>

          <a
            href="/cafe"
            style={{
              border: "1px solid rgba(255,255,255,.6)",
              color: "white",
              padding: "12px 16px",
              borderRadius: 12,
              fontWeight: 700,
              textDecoration: "none",
              backdropFilter: "blur(6px)",
            }}
          >
            Ver menú
          </a>
        </div>

        {/* QUIÉNES SOMOS dentro del hero (sin scroll) */}
        <div style={{ marginTop: "auto" /* (2) empuja el bloque al fondo sin generar scroll */ }}>
          <div
            style={{
              maxWidth: 860,
              borderRadius: 16,
              padding: "clamp(12px, 2vw, 16px)", // (3) un poco más compacto
              border: "1px solid rgba(255,255,255,.16)",
              background: "rgba(0,0,0,.40)",
              backdropFilter: "blur(10px)",
            }}
          >
            <h2 style={{ margin: 0, fontSize: 22 }}>Quiénes somos</h2>
            <p style={{ margin: "10px 0 0", opacity: 0.95 }}>
              En Monumento unimos taller técnico, tienda especializada y café para la comunidad ciclista. Creamos un
              espacio donde la mecánica es oficio, el café es ritual y cada detalle importa.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
