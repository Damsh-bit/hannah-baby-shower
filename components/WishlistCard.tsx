'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { supabase, WishlistItem } from '@/lib/supabase'

interface WishlistCardProps {
    item: WishlistItem
    onReserved: (id: string, name: string) => void
}

export default function WishlistCard({ item, onReserved }: WishlistCardProps) {
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

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`
          relative rounded-3xl bg-white border-2 overflow-hidden
          flex flex-col shadow-[0_4px_24px_rgba(244,167,185,0.15)]
          transition-all duration-300
          ${item.reserved
                        ? 'border-charcoal/10 saturate-[0.5] opacity-75'
                        : 'border-pink/20 hover:border-pink/50 hover:shadow-[0_8px_32px_rgba(244,167,185,0.25)] hover:-translate-y-1'}
        `}
            >
                {/* Product image */}
                <div className="relative w-full aspect-square bg-cream overflow-hidden">
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
                            <span className="text-6xl opacity-30">🎁</span>
                        </div>
                    )}
                </div>

                {/* Card body */}
                <div className="p-4 flex flex-col gap-3 flex-1">
                    <h3 className="font-body font-semibold text-charcoal text-sm md:text-base leading-snug line-clamp-2">
                        {item.title}
                    </h3>

                    {/* Status badge */}
                    <div>
                        {item.reserved ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-semibold bg-charcoal/10 text-charcoal/50">
                                💝 Reservado
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-semibold bg-green-100 text-green-700">
                                ✓ Disponible
                            </span>
                        )}
                    </div>

                    <div className="mt-auto flex flex-col gap-2">
                        {/* ML link */}
                        {item.mercadolibre_url && (
                            <a
                                href={item.mercadolibre_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                  text-center px-4 py-2.5 rounded-xl border-2 border-yellow-400 text-charcoal
                  font-body font-semibold text-xs transition-all duration-300
                  hover:bg-yellow-400 hover:scale-[1.02]
                "
                            >
                                Ver en Mercado Libre →
                            </a>
                        )}

                        {/* Reserve button */}
                        {!item.reserved && (
                            <button
                                onClick={() => setModalOpen(true)}
                                className="
                  px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink to-pink-dark text-white
                  font-body font-semibold text-xs
                  animate-pulse-soft hover:animate-none hover:scale-[1.03]
                  transition-all duration-300
                "
                            >
                                Reservar regalo 🎁
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Reserve modal */}
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
                            className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border-2 border-pink/20"
                        >
                            <h3 className="font-script text-3xl text-pink-dark mb-1">Reservar regalo</h3>
                            <p className="font-body text-charcoal/60 text-sm mb-6">
                                {item.title}
                            </p>
                            <label className="block font-body text-xs text-charcoal/50 uppercase tracking-wider mb-2">
                                ¿Cómo te llamás?
                            </label>
                            <p className="font-body text-charcoal/40 text-xs mb-3">
                                Tu nombre no será visible para nadie más (solo para que no se pisen los regalos)
                            </p>
                            <input
                                type="text"
                                value={reserverName}
                                onChange={(e) => setReserverName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleReserve()}
                                placeholder="Tu nombre..."
                                className="
                  w-full px-4 py-3 rounded-xl border-2 border-pink/30 bg-cream
                  font-body text-charcoal placeholder:text-charcoal/30
                  focus:outline-none focus:border-pink-dark transition-all duration-200 mb-3
                "
                                autoFocus
                            />
                            {error && <p className="text-pink-dark font-body text-xs mb-3">{error}</p>}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="flex-1 px-4 py-3 rounded-xl border-2 border-charcoal/20 font-body font-semibold text-sm text-charcoal/60 hover:border-charcoal/40 transition-all"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleReserve}
                                    disabled={loading}
                                    className="
                    flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-pink to-pink-dark
                    text-white font-body font-bold text-sm
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
