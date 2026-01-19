export default function HomePage() {
  return (
    <section
      style={{
        minHeight: '80vh',
        backgroundImage: "url('/hero-monumento.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,.75), rgba(0,0,0,.2))'
        }}
      />

      <div
        style={{
          position: 'relative',
          maxWidth: 1100,
          margin: '0 auto',
          padding: '6rem 1.5rem',
          color: 'white'
        }}
      >
        <p style={{ letterSpacing: 3, opacity: 0.8 }}>MEDELLÍN · CICLISMO + CAFÉ</p>

        <h1 style={{ fontSize: 64, lineHeight: 1, margin: '1rem 0' }}>
          Monumento <br /> Taller Café
        </h1>

        <p style={{ fontSize: 20, maxWidth: 480, opacity: 0.85 }}>
          Pasión → Maestría → Esencia.
        </p>

        <p style={{ marginTop: 12, maxWidth: 520, opacity: 0.7 }}>
          Lo que tu bici y tú, necesitan para mantener el ritmo.
        </p>

        <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
          <a href="/taller" style={btnPrimary}>Agendar servicio</a>
          <a href="/menu" style={btnSecondary}>Ver menú</a>
        </div>
      </div>
    </section>
  )
}

const btnPrimary = {
  background: '#B88746',
  color: 'black',
  padding: '12px 20px',
  borderRadius: 12,
  fontWeight: 600,
  textDecoration: 'none'
}

const btnSecondary = {
  border: '1px solid rgba(255,255,255,.3)',
  color: 'white',
  padding: '12px 20px',
  borderRadius: 12,
  textDecoration: 'none',
  background: 'rgba(255,255,255,.05)'
}
