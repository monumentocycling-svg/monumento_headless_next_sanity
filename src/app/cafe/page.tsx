export default function CafePage() {
  return (
    <div className="card" style={{ display: "grid", gap: 14 }}>
      <h1 style={{ margin: 0 }}>Café</h1>

      <p className="small" style={{ margin: 0 }}>
        Un lugar para quedarse. Mientras tu bici se trabaja, tú descansas: café de especialidad y un espacio cómodo
        para conversar, trabajar o simplemente observar.
      </p>

      <ul className="small" style={{ margin: 0, paddingLeft: 18, opacity: 0.9 }}>
        <li>Café de especialidad</li>
        <li>Bebidas frías y calientes</li>
        <li>Espacio cómodo para la comunidad ciclista</li>
      </ul>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <a
          href="/menu" // si no tienes /menu, lo cambiamos o lo creamos
          style={{
            background: "#c89b52",
            color: "black",
            padding: "12px 16px",
            borderRadius: 12,
            fontWeight: 800,
            textDecoration: "none",
          }}
        >
          Ver menú
        </a>

        <a
          href="/taller"
          style={{
            border: "1px solid #e6e6e6",
            padding: "12px 16px",
            borderRadius: 12,
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Agendar servicio
        </a>
      </div>
    </div>
  )
}
