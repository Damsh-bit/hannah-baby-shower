'use client'

import { motion } from 'framer-motion'

export default function MapSection() {
    return (
        <section className="w-full py-20 px-4 bg-cream-dark/30 flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-3xl"
            >
                {/* Section heading */}
                <div className="flex items-center gap-3 mb-8 justify-center">
                    <div className="h-px w-12 bg-pink" />
                    <p className="font-body text-xs uppercase tracking-[0.3em] text-charcoal/50">Cómo llegar</p>
                    <div className="h-px w-12 bg-pink" />
                </div>

                {/* Map iframe */}
                <div className="w-full relative shadow-[0_8px_40px_rgba(244,167,185,0.25)] border-4 border-white h-[450px]">
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

                {/* Address details */}
                <div className="mt-6 text-center">
                    <p className="font-body font-semibold text-charcoal text-lg">📍 Mundo Eventos</p>
                    <p className="font-body text-charcoal/60 text-sm mt-1">Alsina 3051, Claypole, Buenos Aires, Argentina</p>
                    <a
                        href="https://maps.google.com/?q=Alsina+3051,+Claypole,+Buenos+Aires,+Argentina"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
              inline-block mt-4 px-6 py-2 rounded-full border-2 border-pink text-pink-dark
              font-body font-semibold text-sm
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
