'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import confetti from 'canvas-confetti'

type Attending = 'yes' | 'no' | null

const RSVP_STORAGE_KEY = 'hannah_shower_rsvp_submitted'

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
            setError('Por favor ingresá tu nombre 💕')
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
        <section className="w-full py-20 px-4 bg-cream flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-xl text-center"
            >
                {/* Section heading */}
                <h2 className="font-script text-5xl md:text-6xl text-pink-dark mb-2">¿Vas a poder venir?</h2>
                <p className="font-body text-charcoal/50 text-sm mb-10">Confirmá tu asistencia para que podamos organizarnos 🦕</p>

                {alreadyDone && !submitted ? (
                    <div className="rounded-3xl bg-pink-light/30 border border-pink p-8">
                        <p className="font-body text-charcoal/70 text-base">Ya confirmaste tu asistencia anteriormente. ¡Gracias! 💕</p>
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
                            <p className="font-script text-4xl mb-3 text-pink-dark">
                                {choice === 'yes' ? '¡Yayyy! 🦕' : '¡Gracias! 💕'}
                            </p>
                            <p className="font-body text-charcoal/70 text-base">
                                {choice === 'yes'
                                    ? 'Te esperamos con muchas ganas. Hannah está muy emocionada de verte!'
                                    : '¡Gracias por avisarnos! Te vamos a extrañar mucho 💕'}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <>
                        {/* Choice buttons */}
                        <div className="flex gap-4 justify-center mb-6">
                            <button
                                onClick={() => setChoice('yes')}
                                className={`
                  px-8 py-4 rounded-full font-body font-semibold text-base transition-all duration-300
                  ${choice === 'yes'
                                        ? 'bg-pink-dark text-white shadow-lg shadow-pink/40 scale-105'
                                        : 'bg-pink text-white hover:bg-pink-dark hover:scale-105 hover:shadow-lg hover:shadow-pink/40'}
                `}
                            >
                                ✓ Sí, voy a ir!
                            </button>
                            <button
                                onClick={() => setChoice('no')}
                                className={`
                  px-8 py-4 rounded-full font-body font-semibold text-base border-2 transition-all duration-300
                  ${choice === 'no'
                                        ? 'border-charcoal bg-charcoal text-white scale-105'
                                        : 'border-charcoal/40 text-charcoal hover:border-charcoal hover:scale-105'}
                `}
                            >
                                ✗ No podré ir
                            </button>
                        </div>

                        {/* Name input (reveals on choice) */}
                        <AnimatePresence>
                            {choice !== null && (
                                <motion.div
                                    key="input-area"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.4, ease: 'easeOut' }}
                                    className="overflow-hidden"
                                >
                                    <div className="mt-2 space-y-4">
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="¿Cómo te llamás?"
                                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                            className="
                        w-full px-5 py-4 rounded-2xl border-2 border-pink/40 bg-white
                        font-body text-charcoal placeholder:text-charcoal/30
                        focus:outline-none focus:border-pink-dark focus:shadow-md focus:shadow-pink/20
                        transition-all duration-200
                      "
                                        />
                                        {error && (
                                            <p className="text-pink-dark font-body text-sm">{error}</p>
                                        )}
                                        <button
                                            onClick={handleSubmit}
                                            disabled={loading}
                                            className="
                        w-full px-6 py-4 rounded-full font-body font-bold text-base
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
