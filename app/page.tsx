import Hero from '@/components/Hero'
import MapSection from '@/components/MapSection'
import RSVPSection from '@/components/RSVPSection'
import WishlistSection from '@/components/WishlistSection'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <MapSection />
      <RSVPSection />
      <WishlistSection />

      {/* Footer */}
      <footer className="w-full py-10 bg-cream text-center border-t border-pink/20">
        <p className="font-script text-3xl text-pink-dark">Baby Shower de Hannah 🦕</p>
        <p className="font-body text-charcoal/35 text-xs mt-2">Domingo 12 de Abril · Mundo Eventos, Claypole</p>
        <p className="font-body text-charcoal/25 text-xs mt-1">con amor, Familia Coronel-Herrera 💕</p>
      </footer>
    </main>
  )
}
