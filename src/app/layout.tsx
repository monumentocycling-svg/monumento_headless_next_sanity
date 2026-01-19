import './globals.css'
import {SanityLive} from "@/sanity/lib/live"

import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Monumento Cycling — Headless + Sanity',
  description: 'Sitio base con Next.js + Sanity (headless)'
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
