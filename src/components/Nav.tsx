export function Nav() {
  return (
    <header style={{ borderBottom: '1px solid #eee' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/logo.png"
            alt="Monumento logo"
            style={{ height: 120 }}  // antes: 40, ahora triplicado
          />
        </a>
        <nav style={{ display: 'flex', gap: 12 }}>
          <a href="/">Inicio</a>
          <a href="/tienda">Tienda</a>
          <a href="/cafe">Café</a>
          <a href="/taller">Taller</a>
        </nav>
      </div>
    </header>
  )
}
