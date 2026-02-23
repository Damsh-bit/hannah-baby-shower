import type { Metadata } from 'next'
import { Montserrat, DynaPuff } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const daydream = DynaPuff({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-daydream',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Baby Shower de Hannah 🦕',
  description:
    'Estás invitados al Baby Shower de Hannah. Domingo 12 de Abril, 17:00 a 20:00 — Mundo Eventos, Alsina 3051, Claypole. ¡Confirmá tu asistencia y revisá la lista de deseos!',
  openGraph: {
    title: 'Baby Shower de Hannah 🦕',
    description: '¡El Baby Shower de Hannah! Domingo 12 de Abril — Mundo Eventos, Claypole',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${daydream.variable}`}>
      <body className="font-body bg-cream min-h-screen">{children}</body>
    </html>
  )
}
