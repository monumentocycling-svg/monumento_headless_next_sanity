export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #eee', marginTop: 40 }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <span className="small">© {new Date().getFullYear()} Monumento Taller Café</span>
        <span className="small">Hecho con Next.js + Sanity</span>
      </div>
    </footer>
  )
}
