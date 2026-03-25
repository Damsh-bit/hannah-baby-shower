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
      <footer className="w-full py-12 md:py-14 bg-cream text-center border-t border-pink/20 px-4">
        <p className="font-script text-3xl md:text-4xl text-pink-dark">Baby Shower de Hannah 🦕</p>
        <p className="font-body text-charcoal-muted text-base md:text-lg mt-3 leading-relaxed">
          Domingo 12 de Abril · Mundo Eventos, Claypole
        </p>
        <p className="font-body text-charcoal-muted text-base md:text-lg mt-2 leading-relaxed">
          con amor, Familia Coronel-Herrera 💕
        </p>
      </footer>
    </main>
  )
}
