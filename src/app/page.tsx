import React from "react";
import { client } from "@/sanity/client";
import { contactInfoQuery } from "@/sanity/queries";
import WhatsappButton from "@/components/WhatsappButton";

/* ================= ICONOS ================= */

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
  );
}

function IconMail({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function IconWaze({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16A1.5 1.5 0 1 1 6.5 13a1.5 1.5 0 0 1 0 3zm11 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM6.24 11l1.1-3h9.32l1.1 3H6.24z" />
    </svg>
  );
}

function IconGoogleMaps({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
    </svg>
  );
}

/* ================= PAGE ================= */

export default async function HomePage() {
  const contact = await client.fetch(
    contactInfoQuery,
    {},
    { next: { revalidate: 300 } },
  );

  const bookingUrl =
    contact?.bookingUrl || "https://calendly.com/monumentocycling";
  const googleMapsUrl = contact?.maps?.googleMapsUrl;
  const wazeUrl = contact?.maps?.wazeUrl;

  const phoneNumber: string | undefined = contact?.phone || undefined;
  const rawWhatsApp = contact?.whatsapp || phoneNumber;
  const waDigits = rawWhatsApp ? String(rawWhatsApp).replace(/\D/g, "") : "";

  const emailAddress = "monumentocycling@gmail.com";

  // Base estilo unificado (sin hover/focus: eso va por CSS)
  const baseBtn = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    border: "1px solid rgba(255,255,255,.22)",
    color: "white",
    padding: "10px 12px",
    borderRadius: 12,
    fontSize: 14,
    lineHeight: "14px",
    fontWeight: 700,
    textDecoration: "none",
    opacity: 0.9,
  } as const;

  return (
    <>
      {/* HERO */}
      <section
        style={{
          minHeight: "80dvh",
          backgroundImage: "url('/hero-monumento.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(0,0,0,.78), rgba(0,0,0,.28))",
          }}
        />

        <div
          style={{
            position: "relative",
            height: "100%",
            maxWidth: 980,
            margin: "0 auto",
            padding: "clamp(16px, 3vw, 44px) 20px",
            color: "white",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              fontSize: 12,
              letterSpacing: 3,
              textTransform: "uppercase",
              opacity: 0.9,
            }}
          >
            Medellín · Ciclismo + Café
          </div>

          <h1
            style={{
              fontSize: "clamp(40px, 5vw, 64px)",
              lineHeight: 1,
              margin: 0,
            }}
          >
            Monumento
            <br />
            Taller Café
          </h1>

          <p style={{ fontSize: 18, margin: 0, maxWidth: 680, opacity: 0.95 }}>
            <strong>
              Todo lo que tú y tu bici necesitan para rodar mejor.
            </strong>
          </p>

          <p style={{ fontSize: 16, margin: 0, maxWidth: 680, opacity: 0.9 }}>
            Taller, café y tienda para ciclistas que cuidan los detalles.
          </p>

          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginTop: 10,
            }}
          >
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#c89b52",
                color: "black",
                padding: "12px 16px",
                borderRadius: 12,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Agendar servicio
            </a>

            <a
              href="/cafe"
              style={{
                border: "1px solid rgba(255,255,255,.6)",
                color: "white",
                padding: "12px 16px",
                borderRadius: 12,
                fontWeight: 700,
                textDecoration: "none",
                backdropFilter: "blur(6px)",
              }}
            >
              Ver menú
            </a>
          </div>

          <div style={{ marginTop: "auto" }}>
            <div
              style={{
                maxWidth: 860,
                borderRadius: 16,
                padding: "clamp(12px, 2vw, 16px)",
                border: "1px solid rgba(255,255,255,.16)",
                background: "rgba(0,0,0,.40)",
                backdropFilter: "blur(10px)",
              }}
            >
              <h2 style={{ margin: 0, fontSize: 22 }}>Quiénes somos</h2>
              <p style={{ margin: "10px 0 0", opacity: 0.95 }}>
                En Monumento unimos taller técnico, tienda especializada y café
                para la comunidad ciclista. Creamos un espacio donde la mecánica
                es oficio, el café es ritual y cada detalle importa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FRANJA INFERIOR DE CONTACTO */}
      <section
        style={{
          background: "#0b0b0b",
          color: "white",
          borderTop: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <div
          style={{
            maxWidth: 980,
            margin: "0 auto",
            padding: "18px 20px",
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {/* WhatsApp – PRIMERO (hover/focus/anim se manejan en su CSS module) */}
          {waDigits && <WhatsappButton phoneNumber={waDigits} />}

          {/* Teléfono (sin número visible; sí en title y acción tel:) */}
          {phoneNumber && (
            <a
              href={`tel:${phoneNumber}`}
              title={phoneNumber}
              className="mmt-contact-btn"
              style={baseBtn}
            >
              <IconPhone size={18} />
              Teléfono
            </a>
          )}

          {/* Email */}
          <a
            href={`mailto:${emailAddress}`}
            title={emailAddress}
            className="mmt-contact-btn"
            style={{ ...baseBtn, opacity: 0.75, fontWeight: 600 }}
          >
            <IconMail size={18} />
            Email
          </a>

          {/* Waze */}
          {wazeUrl && (
            <a
              href={wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mmt-contact-btn"
              style={baseBtn}
            >
              <IconWaze size={18} />
              Llegar con Waze
            </a>
          )}

          {/* Google Maps */}
          {googleMapsUrl && (
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mmt-contact-btn"
              style={baseBtn}
            >
              <IconGoogleMaps size={18} />
              Ver ubicación en Google Maps
            </a>
          )}
        </div>
      </section>
    </>
  );
}
