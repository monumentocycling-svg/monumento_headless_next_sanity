export function Nav() {
  return (
    <header style={{ borderBottom: '1px solid #eee' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Replace the text header with the logo image. The link ensures clicking the logo
            returns to the home page. The logo file is placed in the public folder so it
            can be referenced at the root of the site. Adjust the height to fit the navbar. */}
        <a href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/logo.png"
            alt="Monumento logo"
            style={{ height: 40 }}
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