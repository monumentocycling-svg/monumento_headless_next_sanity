import './globals.css'
import { SanityLive } from "@/sanity/lib/live"

import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: "Monumento Cycling | Taller de bicicletas, café y experiencias",
  description:
    "Monumento Cycling y Monumento Taller Café: taller de bicicletas, café de especialidad y espacio para vivir el ciclismo con detalle, pasión y maestría."
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Nav />
        <main className="container">{children}</main>
        <Footer />
        <SanityLive />
      </body>
    </html>
  )
}
