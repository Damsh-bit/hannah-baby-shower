'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import confetti from 'canvas-confetti'

type Attending = 'yes' | 'no' | null

const RSVP_STORAGE_KEY = 'hannah_shower_rsvp_submitted'

const nameLabel =
    'Tu nombre y el de los invitados que te acompañan (ej: María, su pareja Juan y la nena)'
const namePlaceholder =
    'Ej: María, su pareja Juan y la nena'

export default function RSVPSection() {
    const [choice, setChoice] = useState<Attending>(null)
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [alreadyDone, setAlreadyDone] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const done = localStorage.getItem(RSVP_STORAGE_KEY)
        if (done) setAlreadyDone(true)
    }, [])

    const fireConfetti = () => {
        const end = Date.now() + 3 * 1000
        const colors = ['#F4A7B9', '#F9D89C', '#FAD0DA', '#FDE8BD', '#E8829A']
        const frame = () => {
            confetti({
                particleCount: 4,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors,
            })
            confetti({
                particleCount: 4,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors,
            })
            if (Date.now() < end) requestAnimationFrame(frame)
        }
        frame()
    }

    const handleSubmit = async () => {
        if (!name.trim()) {
            setError('Por favor ingresá tu nombre y el de quienes vienen con vos 💕')
            return
        }
        setError('')
        setLoading(true)
        try {
            const { error: sbError } = await supabase.from('rsvp').insert({
                name: name.trim(),
                attending: choice === 'yes',
            })
            if (sbError) throw sbError

            localStorage.setItem(RSVP_STORAGE_KEY, 'true')
            setSubmitted(true)
            if (choice === 'yes') {
                setTimeout(fireConfetti, 300)
            }
        } catch (e) {
            console.error(e)
            setError('Hubo un error. ¡Intentá de nuevo!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <section
            className="w-full py-16 md:py-24 px-4 bg-cream flex flex-col items-center"
            aria-labelledby="rsvp-heading"
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-2xl text-center"
            >
                <h2
                    id="rsvp-heading"
                    className="font-script text-section-mobile md:text-section-desktop text-pink-dark mb-3"
                >
                    ¿Vas a poder venir?
                </h2>
                <p className="font-body text-charcoal-muted text-base md:text-lg mb-10 leading-relaxed">
                    Confirmá tu asistencia para que podamos organizarnos 🦕
                </p>

                {alreadyDone && !submitted ? (
                    <div className="rounded-3xl bg-pink-light/30 border border-pink p-8">
                        <p className="font-body text-charcoal-soft text-base md:text-lg leading-relaxed">
                            Ya confirmaste tu asistencia anteriormente. ¡Gracias! 💕
                        </p>
                    </div>
                ) : submitted ? (
                    <AnimatePresence>
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`rounded-3xl p-8 border-2 ${choice === 'yes'
                                    ? 'bg-pink-light/30 border-pink'
                                    : 'bg-cream-dark border-charcoal/20'
                                }`}
                        >
                            <p className="font-script text-4xl md:text-5xl mb-3 text-pink-dark">
                                {choice === 'yes' ? '¡Yayyy! 🦕' : '¡Gracias! 💕'}
                            </p>
                            <p className="font-body text-charcoal-soft text-base md:text-lg leading-relaxed">
                                {choice === 'yes'
                                    ? 'Te esperamos con muchas ganas. Hannah está muy emocionada de verte!'
                                    : '¡Gracias por avisarnos! Te vamos a extrañar mucho 💕'}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                            <button
                                type="button"
                                onClick={() => setChoice('yes')}
                                className={`
                  px-8 py-4 rounded-full font-body font-semibold text-base min-h-[48px] transition-all duration-300
                  ${choice === 'yes'
                                        ? 'bg-pink-dark text-white shadow-lg shadow-pink/40 scale-105'
                                        : 'bg-pink text-white hover:bg-pink-dark hover:scale-105 hover:shadow-lg hover:shadow-pink/40'}
                `}
                            >
                                ✓ Sí, voy a ir!
                            </button>
                            <button
                                type="button"
                                onClick={() => setChoice('no')}
                                className={`
                  px-8 py-4 rounded-full font-body font-semibold text-base min-h-[48px] border-2 transition-all duration-300
                  ${choice === 'no'
                                        ? 'border-charcoal bg-charcoal text-white scale-105'
                                        : 'border-charcoal/50 text-charcoal hover:border-charcoal hover:scale-105'}
                `}
                            >
                                ✗ No podré ir
                            </button>
                        </div>

                        <AnimatePresence>
                            {choice !== null && (
                                <motion.div
                                    key="input-area"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.4, ease: 'easeOut' }}
                                    className="overflow-hidden text-left"
                                >
                                    <div className="mt-4 space-y-3">
                                        <label
                                            htmlFor="rsvp-names"
                                            className="block font-body text-base font-semibold text-charcoal leading-snug"
                                        >
                                            {nameLabel}
                                        </label>
                                        <input
                                            id="rsvp-names"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder={namePlaceholder}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                            autoComplete="name"
                                            className="
                        w-full px-5 py-4 rounded-2xl border-2 border-pink/40 bg-white
                        font-body text-base text-charcoal placeholder:text-charcoal-muted
                        focus:outline-none focus:border-pink-dark focus:shadow-md focus:shadow-pink/20
                        transition-all duration-200 min-h-[52px] leading-relaxed
                      "
                                        />
                                        <p className="font-body text-base text-charcoal-muted leading-relaxed">
                                            Incluí a todos con quienes vas a asistir: pareja, hijos, etc.
                                        </p>
                                        {error && (
                                            <p className="text-pink-dark font-body text-base leading-relaxed" role="alert">
                                                {error}
                                            </p>
                                        )}
                                        <button
                                            type="button"
                                            onClick={handleSubmit}
                                            disabled={loading}
                                            className="
                        w-full px-6 py-4 rounded-full font-body font-bold text-base min-h-[52px]
                        bg-gradient-to-r from-pink to-pink-dark text-white
                        hover:scale-[1.02] hover:shadow-lg hover:shadow-pink/40
                        active:scale-[0.98] transition-all duration-300
                        disabled:opacity-60 disabled:cursor-not-allowed
                      "
                                        >
                                            {loading
                                                ? 'Guardando...'
                                                : choice === 'yes'
                                                    ? '¡Confirmar asistencia! 🎉'
                                                    : 'Confirmar que no podré ir'}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </>
                )}
            </motion.div>
        </section>
    )
}
