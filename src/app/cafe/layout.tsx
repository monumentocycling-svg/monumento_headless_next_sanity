import Link from 'next/link'


export default function CafeLayout({ children }: { children: React.ReactNode }) {
return (
<section style={{ padding: 24 }}>
<nav style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
<Link href="/cafe/cafes">Cafés</Link>
<Link href="/cafe/cervezas">Cervezas</Link>
<Link href="/cafe/panaderia">Panadería & Repostería</Link>
<Link href="/cafe/otros">Otros</Link>
</nav>
{children}
</section>
)
}
