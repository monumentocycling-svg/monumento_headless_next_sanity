export function Nav() {
  return (
    <header style={{ borderBottom: '1px solid #eee' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <strong>Monumento</strong>
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