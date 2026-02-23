'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase, WishlistItem } from '@/lib/supabase'
import WishlistCard from '@/components/WishlistCard'
import { PinkDino } from '@/components/decorative/DinoSvgs'

function SkeletonCard() {
    return (
        <div className="rounded-3xl bg-white border-2 border-pink/10 overflow-hidden">
            <div className="aspect-square skeleton" />
            <div className="p-4 space-y-3">
                <div className="h-4 skeleton rounded-full" />
                <div className="h-4 skeleton rounded-full w-3/4" />
                <div className="h-8 skeleton rounded-xl" />
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
        <section className="w-full py-20 px-4 bg-cream-dark/20 flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-5xl"
            >
                {/* Section title */}
                <div className="text-center mb-4">
                    <h2 className="font-script text-5xl md:text-7xl text-pink-dark">Lista de Deseos</h2>
                    <span className="text-4xl">🦕</span>
                </div>

                {/* Disclaimer */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="
            text-center font-body italic text-charcoal/55 text-sm max-w-[600px] mx-auto mb-12
            leading-relaxed px-4
          "
                >
                    Los regalos no son obligatorios en absoluto 💕 Esta lista existe solo para orientarte en caso de
                    que quieras regalar algo y no sepas qué, y para evitar que dos personas regalen lo mismo.
                    ¡No te sientas presionada por ella!
                </motion.p>

                {/* Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                ) : items.length === 0 ? (
                    <div className="text-center py-20 flex flex-col items-center gap-4">
                        <PinkDino size={120} className="opacity-40" />
                        <p className="font-body text-charcoal/40 text-base">
                            La lista de deseos todavía no tiene productos. ¡Volvé pronto!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {items.map((item) => (
                            <WishlistCard key={item.id} item={item} onReserved={handleReserved} />
                        ))}
                    </div>
                )}
            </motion.div>
        </section>
    )
}
