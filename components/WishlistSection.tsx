'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase, WishlistItem } from '@/lib/supabase'
import WishlistCard from '@/components/WishlistCard'
import { PinkDino } from '@/components/decorative/DinoSvgs'

const ESSENTIAL_GIFTS: { icon: string; label: string }[] = [
    { icon: '🧷', label: 'Pañales (cualquier talle es bienvenido)' },
    { icon: '🧻', label: 'Toallitas húmedas' },
    { icon: '🫧', label: 'Óleo calcáreo' },
    { icon: '🌿', label: 'Algodón precortado' },
    { icon: '🧴', label: 'Crema para paspaduras' },
    { icon: '🛁', label: 'Shampoo + jabón para bebé' },
    { icon: '👕', label: 'Ropita (bodys, conjuntos, abrigos, pantaloncitos — cualquier talle/mes)' },
    { icon: '🛏️', label: 'Mantas' },
    { icon: '💧', label: 'Babitas / Baberos' },
    { icon: '🎵', label: 'Sonajero o juguete simple' },
    { icon: '🦷', label: 'Mordillos' },
]

function EssentialCard({ icon, label }: { icon: string; label: string }) {
    return (
        <div
            className="
                rounded-3xl border-2 border-pink/25 bg-gradient-to-br from-white to-pink-light/20
                p-4 md:p-5 shadow-[0_4px_20px_rgba(244,167,185,0.12)]
                flex gap-3 items-start min-h-[5.5rem]
            "
        >
            <span className="text-3xl md:text-4xl shrink-0 leading-none" aria-hidden>
                {icon}
            </span>
            <p className="font-body text-base md:text-[1.05rem] text-charcoal-soft leading-relaxed font-medium pt-0.5">
                {label}
            </p>
        </div>
    )
}

function SkeletonCardCompact() {
    return (
        <div className="rounded-2xl bg-white border-2 border-pink/10 overflow-hidden flex gap-3 p-3">
            <div className="w-24 h-24 shrink-0 rounded-xl skeleton" />
            <div className="flex-1 space-y-2 py-1">
                <div className="h-4 skeleton rounded-full w-full" />
                <div className="h-4 skeleton rounded-full w-2/3" />
                <div className="h-8 skeleton rounded-xl w-full mt-2" />
            </div>
        </div>
    )
}

export default function WishlistSection() {
    const [items, setItems] = useState<WishlistItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchItems = async () => {
            const { data } = await supabase
                .from('wishlist')
                .select('id, title, image_url, mercadolibre_url, reserved, reserved_by, created_at')
                .order('created_at', { ascending: true })
            setItems(data ?? [])
            setLoading(false)
        }
        fetchItems()
    }, [])

    const handleReserved = (id: string, reservedBy: string) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, reserved: true, reserved_by: reservedBy } : item
            )
        )
    }

    return (
        <section
            className="relative w-full bg-cream-dark/25 py-16 md:py-24 overflow-x-hidden"
            aria-label="Regalos esenciales y lista de deseos"
        >
            <div className="w-full max-w-[100vw] px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-16">
                <div className="flex flex-col lg:flex-row lg:items-stretch gap-12 lg:gap-14 xl:gap-20">
                    {/* Columna izquierda — Regalos esenciales (primero en mobile) */}
                    <div className="w-full lg:flex-1 lg:min-w-0 flex flex-col">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="font-script text-section-mobile md:text-section-desktop text-pink-dark mb-4">
                                Regalos Esenciales 💛
                            </h2>
                            <p className="font-body text-base md:text-lg text-charcoal-soft leading-relaxed mb-8 max-w-xl">
                                Estos son los regalos que más usamos en el día a día y con los que siempre nos vendría
                                genial contar. Cualquier ayuda con estos productos es inmensamente agradecida 💕
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                                {ESSENTIAL_GIFTS.map((item) => (
                                    <EssentialCard key={item.label} icon={item.icon} label={item.label} />
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Columna derecha — Lista de deseos con scroll interno */}
                    <div className="w-full lg:flex-1 lg:min-w-0 flex flex-col min-h-0">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="flex flex-col flex-1 min-h-0"
                        >
                            <h2 className="font-script text-section-mobile md:text-section-desktop text-pink-dark mb-2 shrink-0">
                                Lista de Deseos ✨
                            </h2>
                            <p className="font-body text-base text-charcoal-muted leading-relaxed mb-4 shrink-0">
                                Elegí un regalo de la lista y reservalo para que no se repita.
                            </p>

                            <div
                                className="
                                    wishlist-inner-scroll max-h-[min(600px,70vh)] overflow-y-auto overflow-x-hidden pr-1 md:pr-2
                                    space-y-4 pb-2
                                "
                                style={{ WebkitOverflowScrolling: 'touch' }}
                            >
                                {loading ? (
                                    <>
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <SkeletonCardCompact key={i} />
                                        ))}
                                    </>
                                ) : items.length === 0 ? (
                                    <div className="text-center py-12 flex flex-col items-center gap-4 rounded-3xl border-2 border-dashed border-pink/25 bg-white/50">
                                        <PinkDino size={100} className="opacity-40" />
                                        <p className="font-body text-charcoal-muted text-base leading-relaxed px-4">
                                            La lista de deseos todavía no tiene productos. ¡Volvé pronto!
                                        </p>
                                    </div>
                                ) : (
                                    items.map((item) => (
                                        <WishlistCard
                                            key={item.id}
                                            item={item}
                                            onReserved={handleReserved}
                                            variant="compact"
                                        />
                                    ))
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Texto al pie — full width */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="
                        mt-14 md:mt-16 max-w-3xl mx-auto text-center
                        font-body text-base md:text-lg text-charcoal-soft italic leading-relaxed px-2
                    "
                >
                    Los regalos no son para nada obligatorios, aunque siempre son más que bienvenidos 💕 La lista es
                    solo una guía para quienes quieran orientarse — si preferís regalar otra cosa que no esté incluida,
                    ¡también es hermoso! Y si tenés dudas o querés consultarnos sobre algún regalo en particular, no
                    dudes en escribirnos.
                </motion.p>
            </div>
        </section>
    )
}
