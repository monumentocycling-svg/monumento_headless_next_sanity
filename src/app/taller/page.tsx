export default function TallerPage() {
  return (
    <div className="card" style={{ display: "grid", gap: 14 }}>
      <h1 style={{ margin: 0 }}>Taller</h1>

      <p className="small" style={{ margin: 0 }}>
        Servicio técnico con criterio y precisión: diagnóstico real, procesos limpios y herramientas de alto nivel.
        Tu bici se trabaja como si fuera propia.
      </p>

      <ul className="small" style={{ margin: 0, paddingLeft: 18, opacity: 0.9 }}>
        <li>Diagnóstico real, no genérico</li>
        <li>Procesos limpios y medibles</li>
        <li>Componentes premium y herramientas de alto nivel</li>
      </ul>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <a
  	href="https://calendly.com/monumentocycling"
	style={{
            background: "#c89b52",
            color: "black",
            padding: "12px 16px",
            borderRadius: 12,
            fontWeight: 800,
            textDecoration: "none",
	  }}
  	
	>
  Agendar servicio
</a>

        <a
          href="/tienda"
          style={{
            border: "1px solid #e6e6e6",
            padding: "12px 16px",
            borderRadius: 12,
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Explorar tienda
        </a>
      </div>
    </div>
  )
}
