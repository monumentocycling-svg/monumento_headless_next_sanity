import { sanityClient } from '@/sanity/client'
import { categoriesQuery, productsQuery } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'

type Category = { _id: string; title: string; slug: string }

type Product = {
  _id: string
  title: string
  slug: string
  price?: number
  category?: { title: string; slug: string }
  mainImage?: any
}

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    sanityClient.fetch<Category[]>(categoriesQuery),
    sanityClient.fetch<Product[]>(productsQuery)
  ])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <section className="card">
        <h1 style={{ marginTop: 0 }}>Monumento — base headless</h1>
        <p className="small" style={{ marginBottom: 0 }}>
          Este proyecto trae: Next 14 (App Router) + cliente Sanity para consumir Categorías y Productos.
          El Studio vive en <code>/studio</code> como app separada.
        </p>
      </section>

      <section className="card">
        <h2 style={{ marginTop: 0 }}>Categorías</h2>
        {categories?.length ? (
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {categories.map((c) => (
              <span key={c._id} className="small" style={{ border: '1px solid #e6e6e6', padding: '6px 10px', borderRadius: 999 }}>
                {c.title} <span style={{ opacity: 0.6 }}>/ {c.slug}</span>
              </span>
            ))}
          </div>
        ) : (
          <p className="small">Aún no hay categorías. Créelas en el Studio.</p>
        )}
      </section>

      <section className="card">
        <h2 style={{ marginTop: 0 }}>Últimos productos</h2>
        {products?.length ? (
          <div className="grid">
            {products.map((p) => (
              <article key={p._id} className="card">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {p.mainImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      alt={p.title}
                      src={urlFor(p.mainImage).width(800).height(520).fit('crop').url()}
                      style={{ width: '100%', height: 170, objectFit: 'cover', borderRadius: 12, border: '1px solid #eee' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: 170, borderRadius: 12, border: '1px dashed #ddd', display: 'grid', placeItems: 'center' }}>
                      <span className="small">Sin imagen</span>
                    </div>
                  )}

                  <strong>{p.title}</strong>
                  <div className="small">
                    {p.category ? `${p.category.title}` : 'Sin categoría'}
                    {typeof p.price === 'number' ? ` · $${p.price.toLocaleString('es-CO')}` : ''}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="small">Aún no hay productos. Crea algunos en el Studio.</p>
        )}
      </section>
    </div>
  )
}
