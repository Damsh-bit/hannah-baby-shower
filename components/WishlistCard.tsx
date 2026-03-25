'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { supabase, WishlistItem } from '@/lib/supabase'

interface WishlistCardProps {
    item: WishlistItem
    onReserved: (id: string, name: string) => void
    /** Layout horizontal compacto para la columna con scroll */
    variant?: 'default' | 'compact'
}

export default function WishlistCard({ item, onReserved, variant = 'default' }: WishlistCardProps) {
    const [modalOpen, setModalOpen] = useState(false)
    const [reserverName, setReserverName] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleReserve = async () => {
        if (!reserverName.trim()) {
            setError('Por favor ingresá tu nombre 💕')
            return
        }
        setError('')
        setLoading(true)
        try {
            const { error: sbError } = await supabase
                .from('wishlist')
                .update({ reserved: true, reserved_by: reserverName.trim() })
                .eq('id', item.id)
            if (sbError) throw sbError
            onReserved(item.id, reserverName.trim())
            setModalOpen(false)
        } catch (e) {
            console.error(e)
            setError('Hubo un error. ¡Intentá de nuevo!')
        } finally {
            setLoading(false)
        }
    }

    const isCompact = variant === 'compact'

    const imageBlock = (
        <div
            className={
                isCompact
                    ? 'relative w-[7.5rem] h-[7.5rem] sm:w-28 sm:h-28 shrink-0 rounded-2xl overflow-hidden bg-cream'
                    : 'relative w-full aspect-square bg-cream overflow-hidden'
            }
        >
            {item.image_url ? (
                <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="object-cover"
                    unoptimized
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <span className={isCompact ? 'text-4xl opacity-30' : 'text-6xl opacity-30'} aria-hidden>
                        🎁
                    </span>
                </div>
            )}
        </div>
    )

    const bodyContent = (
        <div className={`flex flex-col gap-2 flex-1 min-w-0 ${isCompact ? 'py-0.5' : 'p-4 gap-3'}`}>
            <h3
                className={`font-body font-semibold text-charcoal leading-snug ${
                    isCompact ? 'text-base sm:text-[1.05rem] line-clamp-3' : 'text-base md:text-lg line-clamp-2'
                }`}
            >
                {item.title}
            </h3>
            <div>
                {item.reserved ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-body font-semibold bg-charcoal/10 text-charcoal-muted">
                        💝 Reservado
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-body font-semibold bg-green-100 text-green-800">
                        ✓ Disponible
                    </span>
                )}
            </div>
            <div className={`mt-auto flex flex-col gap-2 ${isCompact ? 'sm:flex-row sm:flex-wrap' : ''}`}>
                {item.mercadolibre_url && (
                    <a
                        href={item.mercadolibre_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            text-center px-4 py-2.5 rounded-xl border-2 border-yellow-500 text-charcoal
                            font-body font-semibold text-base transition-all duration-300
                            hover:bg-yellow-400 hover:scale-[1.02]
                        "
                    >
                        Ver en Mercado Libre →
                    </a>
                )}
                {!item.reserved && (
                    <button
                        type="button"
                        onClick={() => setModalOpen(true)}
                        className="
                            px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink to-pink-dark text-white
                            font-body font-semibold text-base min-h-[44px]
                            animate-pulse-soft hover:animate-none hover:scale-[1.02]
                            transition-all duration-300
                        "
                    >
                        Reservar regalo 🎁
                    </button>
                )}
            </div>
        </div>
    )

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`
          relative rounded-3xl bg-white border-2 overflow-hidden
          flex shadow-[0_4px_24px_rgba(244,167,185,0.15)]
          transition-all duration-300
          ${isCompact ? 'flex-row gap-3 p-3 items-stretch' : 'flex-col'}
          ${item.reserved
                        ? 'border-charcoal/10 saturate-[0.5] opacity-75'
                        : 'border-pink/20 hover:border-pink/50 hover:shadow-[0_8px_32px_rgba(244,167,185,0.25)] hover:-translate-y-0.5'}
        `}
            >
                {isCompact ? (
                    <>
                        {imageBlock}
                        {bodyContent}
                    </>
                ) : (
                    <>
                        {imageBlock}
                        {bodyContent}
                    </>
                )}
            </motion.div>

            <AnimatePresence>
                {modalOpen && (
                    <motion.div
                        key="modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center px-4"
                        onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border-2 border-pink/20"
                            role="dialog"
                            aria-labelledby="reserve-modal-title"
                        >
                            <h3 id="reserve-modal-title" className="font-script text-3xl md:text-4xl text-pink-dark mb-1">
                                Reservar regalo
                            </h3>
                            <p className="font-body text-charcoal-soft text-base mb-5 leading-relaxed">{item.title}</p>
                            <label className="block font-body text-base font-semibold text-charcoal mb-2">
                                ¿Cómo te llamás?
                            </label>
                            <p className="font-body text-charcoal-muted text-base mb-3 leading-relaxed">
                                Tu nombre no será visible para nadie más (solo para que no se pisen los regalos)
                            </p>
                            <input
                                type="text"
                                value={reserverName}
                                onChange={(e) => setReserverName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleReserve()}
                                placeholder="Tu nombre..."
                                className="
                  w-full px-4 py-3.5 rounded-xl border-2 border-pink/30 bg-cream
                  font-body text-base text-charcoal placeholder:text-charcoal-muted
                  focus:outline-none focus:border-pink-dark transition-all duration-200 mb-3 min-h-[48px]
                "
                                autoFocus
                            />
                            {error && (
                                <p className="text-pink-dark font-body text-base mb-3 leading-relaxed">{error}</p>
                            )}
                            <div className="flex flex-col-reverse sm:flex-row gap-3">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="flex-1 px-4 py-3.5 rounded-xl border-2 border-charcoal/25 font-body font-semibold text-base text-charcoal min-h-[48px] hover:border-charcoal/40 transition-all"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    onClick={handleReserve}
                                    disabled={loading}
                                    className="
                    flex-1 px-4 py-3.5 rounded-xl bg-gradient-to-r from-pink to-pink-dark
                    text-white font-body font-bold text-base min-h-[48px]
                    hover:scale-[1.02] transition-all disabled:opacity-60
                  "
                                >
                                    {loading ? 'Guardando...' : '¡Confirmar! 🎁'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
