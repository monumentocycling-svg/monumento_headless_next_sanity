export function ListaMenu({
items,
}: {
items: { nombre: string; descripcion: string; precio: number }[]
}) {
return (
<div style={{ display: 'grid', gap: 12 }}>
{items.map((i) => (
<div
key={i.nombre}
style={{
border: '1px solid #2a2a2a',
padding: 14,
borderRadius: 10,
background: 'rgba(255,255,255,0.02)',
}}
>
<div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
<div style={{ fontWeight: 800 }}>{i.nombre}</div>
<span style={{ fontWeight: 700 }}>${i.precio.toLocaleString('es-CO')}</span>
</div>
<div style={{ opacity: 0.9, marginTop: 6 }}>{i.descripcion}</div>
</div>
))}
</div>
)
}

