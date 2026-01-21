import { ListaMenu } from '../_components/ListaMenu'


const calientes = [
{ nombre: 'Espresso', descripcion: '18 g · extracción estilo europeo', precio: 7500 },
{ nombre: 'Americano', descripcion: 'Espresso + agua caliente', precio: 7500 },
{ nombre: 'Capuchino', descripcion: 'Espresso + leche vaporizada + espuma', precio: 9500 },
{ nombre: 'Latte', descripcion: 'Espresso + leche cremosa', precio: 9500 },
{ nombre: 'Infusión de frutas', descripcion: 'Caliente, aromática y reconfortante', precio: 9500 },
{ nombre: 'Copa de vino caliente', descripcion: 'Especiado, ideal para tarde/noche', precio: 18000 },
]


const frios = [
{ nombre: 'Affogato', descripcion: 'Espresso sobre helado', precio: 13000 },
{ nombre: 'Monumento Tonic', descripcion: 'Espresso + tónica + hielo (fresco y cítrico)', precio: 12000 },
]


const metodos = [
{ nombre: 'Sifón belga', descripcion: 'Taza limpia y aromática; extracción precisa y balanceada.', precio: 18000 },
{ nombre: 'Cold Drip', descripcion: 'Suave, dulce y sedoso; ideal para notas frutales sin amargor.', precio: 16000 },
{ nombre: 'Chemex', descripcion: 'Cuerpo ligero y alta claridad; destaca florales y cítricos.', precio: 16000 },
{ nombre: 'V60', descripcion: 'Precisión y claridad; resalta complejidad y dulzor natural.', precio: 14000 },
{ nombre: 'Prensa francesa', descripcion: 'Más cuerpo y textura; taza redonda y con aceites naturales.', precio: 14000 },
]


export default function CafesPage() {
return (
<div>
<h2 style={{ marginBottom: 8 }}>Cafés</h2>
<p style={{ maxWidth: 900, opacity: 0.9, marginBottom: 18 }}>
Café de especialidad preparado para acompañar el ritmo del taller: bebidas calientes y frías, más métodos de extracción.
</p>


<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, alignItems: 'start' }}>
<div>
<h3 style={{ marginBottom: 12 }}>Calientes</h3>
<ListaMenu items={calientes} />
</div>
<div>
<h3 style={{ marginBottom: 12 }}>Fríos</h3>
<ListaMenu items={frios} />
</div>
</div>


<div style={{ marginTop: 26 }}>
<h3 style={{ marginBottom: 12 }}>Métodos</h3>
<ListaMenu items={metodos} />
</div>


<div style={{ marginTop: 18, padding: 14, borderRadius: 10, border: '1px dashed #3a3a3a', opacity: 0.95 }}>
<strong>Adición:</strong> shot de licor (Baileys o Amaretto) +$7.500
</div>
</div>
)
}