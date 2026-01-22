import { client } from '@/sanity/client'
import { contactInfoQuery } from '@/sanity/queries'
import { WhatsAppButton } from '@/components/WhatsAppButton'


function IconPhone({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.02l-2.2 2.2z" />
    </svg>
  )
}

function IconMapPin({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 22s7-4.44 7-11a7 7 0 1 0-14 0c0 6.56 7 11 7 11zm0-9.2a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6z" />
    </svg>
  )
}


export default async function HomePage() {
  const contact = await client.fetch(contactInfoQuery, {}, { next: { revalidate: 300 } })

  const bookingUrl = contact?.bookingUrl || 'https://calendly.com/monumentocycling'
  const googleMapsUrl = contact?.maps?.googleMapsUrl
  const wazeUrl = contact?.maps?.wazeUrl
  const phoneNumber = contact?.phone || ''
  const rawWhatsApp = contact?.whatsapp || phoneNumber
  const waDigits = String(rawWhatsApp).replace(/\D/g, '')
  const whatsappUrl = waDigits.length >= 10 ? `https://wa.me/${waDigits}` : undefined

  // Si en Sanity guardaste un iframe completo en howToGetThere, lo convertimos a src
   //const howToGetThere: string | undefined = contact?.maps?.howToGetThere
   //const iframeSrcMatch = howToGetThere?.match(/src\s*=\s*"(.*?)"/i)
   //const iframeSrc = iframeSrcMatch?.[1]

  return (
    <>
      {/* HERO (igual que antes) */}
      <section
        style={{
          height: 'calc(100dvh - 64px)',
          backgroundImage: "url('/hero-monumento.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(0,0,0,.78), rgba(0,0,0,.28))',
          }}
        />

        <div
          style={{
            position: 'relative',
            height: '100%',
            maxWidth: 980,
            margin: '0 auto',
            padding: 'clamp(16px, 3vw, 44px) 20px',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              fontSize: 12,
              letterSpacing: 3,
              textTransform: 'uppercase',
              opacity: 0.9,
            }}
          >
            Medellín · Ciclismo + Café
          </div>

          <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 1, margin: 0 }}>
            Monumento
            <br />
            Taller Café
          </h1>

          <p style={{ fontSize: 18, margin: 0, maxWidth: 680, opacity: 0.95 }}>
            <strong>Todo lo que tú y tu bici necesitan para rodar mejor.</strong>
          </p>

          <p style={{ fontSize: 16, margin: 0, maxWidth: 680, opacity: 0.9 }}>
            Taller, café y tienda para ciclistas que cuidan los detalles.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 10 }}>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#c89b52',
                color: 'black',
                padding: '12px 16px',
                borderRadius: 12,
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Agendar servicio
            </a>

            <a
              href="/cafe"
              style={{
                border: '1px solid rgba(255,255,255,.6)',
                color: 'white',
                padding: '12px 16px',
                borderRadius: 12,
                fontWeight: 700,
                textDecoration: 'none',
                backdropFilter: 'blur(6px)',
              }}
            >
              Ver menú
            </a>
          </div>

          {/* QUIÉNES SOMOS dentro del hero */}
          <div style={{ marginTop: 'auto' }}>
            <div
              style={{
                maxWidth: 860,
                borderRadius: 16,
                padding: 'clamp(12px, 2vw, 16px)',
                border: '1px solid rgba(255,255,255,.16)',
                background: 'rgba(0,0,0,.40)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <h2 style={{ margin: 0, fontSize: 22 }}>Quiénes somos</h2>
              <p style={{ margin: '10px 0 0', opacity: 0.95 }}>
                En Monumento unimos taller técnico, tienda especializada y café para la comunidad ciclista. Creamos un
                espacio donde la mecánica es oficio, el café es ritual y cada detalle importa.
              </p>
              {(contact?.phone || contact?.whatsapp || contact?.email) && (
                <p style={{ margin: '10px 0 0', opacity: 0.9, fontSize: 14 }}>
                  {contact?.phone ? `Tel: ${contact.phone}` : ''}
                  {contact?.whatsapp ? `${contact?.phone ? ' · ' : ''}WhatsApp: ${contact.whatsapp}` : ''}
                  {contact?.email ? `${contact?.phone || contact?.whatsapp ? ' · ' : ''}${contact.email}` : ''}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FRANJA INFERIOR DE CONTACTO (debajo del hero) */}
      <section
        style={{
          background: '#0b0b0b',
          color: 'white',
          borderTop: '1px solid rgba(255,255,255,.08)',
        }}
      >
        <div
          style={{
            maxWidth: 980,
            margin: '0 auto',
            padding: '18px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
            <h2 style={{ margin: 0, fontSize: 18 }}>Contacto</h2>
            {(contact?.address || contact?.city) && (
  <div style={{ opacity: 0.9, fontSize: 14, display: 'inline-flex', gap: 8, alignItems: 'center' }}>
    <IconMapPin size={16} />
    <span>
      {contact?.address}
      {contact?.city ? `, ${contact.city}` : ''}
    </span>
  </div>
)}

          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
  {wazeUrl && (
    <a
      href={wazeUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        border: '1px solid rgba(255,255,255,.22)',
        color: 'white',
        padding: '10px 12px',
        borderRadius: 12,
        fontWeight: 700,
        textDecoration: 'none',
      }}
    >
      Llegar con Waze
    </a>
  )}

  {googleMapsUrl && (
    <a
      href={googleMapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        border: '1px solid rgba(255,255,255,.22)',
        color: 'white',
        padding: '10px 12px',
        borderRadius: 12,
        fontWeight: 700,
        textDecoration: 'none',
      }}
    >
      Ver en Google Maps
    </a>
  )}

  {whatsappUrl && <WhatsAppButton href={whatsappUrl} />}
    

  <a
    href={bookingUrl}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      background: '#c89b52',
      color: 'black',
      padding: '10px 14px',
      borderRadius: 12,
      fontWeight: 800,
      textDecoration: 'none',
    }}
  >
    Agendar servicio
  </a>

  {phoneNumber && (
  <a
    href={`tel:${phoneNumber}`}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      border: '1px solid rgba(255,255,255,.22)',
      color: 'white',
      padding: '10px 12px',
      borderRadius: 12,
      fontWeight: 800,
      textDecoration: 'none',
      opacity: 0.95,
    }}
  >
    <IconPhone size={18} />
    {phoneNumber}
  </a>
)}
</div>


         
        </div>
      </section>
    </>
  )
}
