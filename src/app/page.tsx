export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section
        style={{
          minHeight: "80vh",
          backgroundImage: "url('/hero-monumento.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(0,0,0,.75), rgba(0,0,0,.30))",
          }}
        />

        <div
          style={{
            position: "relative",
            height: "80vh",
            maxWidth: 980,
            margin: "0 auto",
            padding: "72px 20px",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 16,
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

          <h1 style={{ fontSize: 64, lineHeight: 1, margin: 0 }}>
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

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
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
        </div>
      </section>

      {/* QUIÉNES SOMOS */}
      <section style={{ marginTop: 24 }}>
        <div className="container">
          <div
            className="card"
            style={{
              maxWidth: 860,
              margin: "0 auto",
              textAlign: "center",
              padding: "22px 18px",
            }}
          >
            <h2 style={{ margin: 0, fontSize: 22 }}>Quiénes somos</h2>
            <p style={{ margin: "10px 0 0", opacity: 0.95 }}>
              En Monumento unimos taller técnico, tienda especializada y café para la comunidad ciclista.
              Creamos un espacio donde la mecánica es oficio, el café es ritual y cada detalle importa.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

