'use client'

import { motion } from 'framer-motion'

export default function MapSection() {
    return (
        <section
            className="w-full py-16 md:py-24 px-4 bg-cream-dark/30 flex flex-col items-center"
            aria-labelledby="map-heading"
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-3xl"
            >
                <div className="flex items-center gap-3 mb-4 justify-center">
                    <div className="h-px w-12 bg-pink" />
                    <p className="font-body text-base uppercase tracking-[0.25em] text-charcoal-muted font-semibold">
                        Cómo llegar
                    </p>
                    <div className="h-px w-12 bg-pink" />
                </div>

                <h2
                    id="map-heading"
                    className="font-script text-section-mobile md:text-section-desktop text-pink-dark text-center mb-8"
                >
                    Ubicación 🦕
                </h2>

                <div className="w-full relative shadow-[0_8px_40px_rgba(244,167,185,0.25)] border-4 border-white h-[min(450px,60vh)] min-h-[280px]">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3276.8!2d-58.3836!3d-34.8065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQWxzaW5hIDMwNTEsIENsYXlwb2xl!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar&q=Alsina+3051,+Claypole,+Buenos+Aires,+Argentina"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Ubicación del Baby Shower — Mundo Eventos, Alsina 3051, Claypole"
                    />
                </div>

                <div className="mt-8 text-center">
                    <p className="font-body font-semibold text-charcoal text-lg md:text-xl leading-relaxed">
                        📍 Mundo Eventos
                    </p>
                    <p className="font-body text-charcoal-muted text-base md:text-lg mt-2 leading-relaxed">
                        Alsina 3051, Claypole, Buenos Aires, Argentina
                    </p>
                    <a
                        href="https://maps.google.com/?q=Alsina+3051,+Claypole,+Buenos+Aires,+Argentina"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
              inline-flex mt-5 px-8 py-3 rounded-full border-2 border-pink-dark text-pink-dark
              font-body font-semibold text-base min-h-[48px] items-center justify-center
              hover:bg-pink hover:text-white transition-all duration-300
            "
                    >
                        Abrir en Google Maps →
                    </a>
                </div>
            </motion.div>
        </section>
    )
}
