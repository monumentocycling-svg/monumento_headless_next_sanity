'use client'

import * as React from 'react'

function IconWhatsAppStroke({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      shapeRendering="geometricPrecision"
    >
      <path
        d="M12 21a9 9 0 0 1-4.43-1.17L3 21l1.28-4.43A9 9 0 1 1 12 21Z"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 8.9c.1-.6.7-1.1 1.3-1.1h.7c.4 0 .7.3.8.7l.4 1.6c.1.4 0 .8-.3 1.1l-.6.6c.6 1.1 1.5 2 2.6 2.6l.6-.6c.3-.3.7-.4 1.1-.3l1.6.4c.4.1.7.4.7.8v.7c0 .6-.5 1.2-1.1 1.3-1.2.2-3.7-.4-5.8-2.5S9 10.1 9.2 8.9Z"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type Props = {
  href: string
  label?: string
}

export function WhatsAppButton({ href, label = 'WhatsApp' }: Props) {
  const [pressed, setPressed] = React.useState(false)

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,

        background: '#25D366',        // WhatsApp green
        color: '#ffffff',
        padding: '10px 14px',         // mismo alto que tus otros botones
        borderRadius: 14,

        fontWeight: 800,
        fontSize: 14,
        lineHeight: '14px',
        letterSpacing: 0.2,
        textDecoration: 'none',

        border: '1px solid rgba(255,255,255,.28)', // borde blanco sutil
        boxShadow: pressed
          ? '0 3px 8px rgba(0,0,0,.18)'
          : '0 8px 18px rgba(0,0,0,.22)',
        transform: pressed ? 'translateY(1px)' : 'translateY(0)',
        transition: 'transform .08s ease, box-shadow .12s ease',

        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'geometricPrecision',
      }}
    >
      <IconWhatsAppStroke size={20} />
      <span>{label}</span>
    </a>
  )
}
