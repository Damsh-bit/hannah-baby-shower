'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { RSVPEntry } from '@/lib/supabase'

export default function RSVPDashboard() {
    const [rsvps, setRsvps] = useState<RSVPEntry[]>([])
    const [loading, setLoading] = useState(true)

    const fetchRSVPs = useCallback(async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/admin/rsvp')
            const data = await res.json()
            setRsvps(data.rsvps ?? [])
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchRSVPs()
    }, [fetchRSVPs])

    const confirmed = rsvps.filter((r) => r.attending)
    const declined = rsvps.filter((r) => !r.attending)

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr)
        return d.toLocaleDateString('es-AR', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    return (
        <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="font-body font-black text-2xl text-charcoal">Confirmaciones de Asistencia</h2>
                <button
                    onClick={fetchRSVPs}
                    className="px-4 py-2 rounded-xl border-2 border-pink/40 text-pink-dark font-body font-semibold text-sm hover:bg-pink-light/30 transition-all"
                >
                    ↻ Actualizar
                </button>
            </div>

            {loading ? (
                <div className="grid md:grid-cols-2 gap-6">
                    {[0, 1].map((i) => (
                        <div key={i} className="rounded-2xl border-2 border-charcoal/10 p-6 space-y-3">
                            {Array.from({ length: 4 }).map((_, j) => (
                                <div key={j} className="h-10 skeleton rounded-xl" />
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Confirmed */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="rounded-2xl border-2 border-green-200 bg-green-50 overflow-hidden"
                    >
                        <div className="flex items-center justify-between px-6 py-4 bg-green-100/60 border-b border-green-200">
                            <h3 className="font-body font-bold text-green-700">✓ Confirmados</h3>
                            <span className="px-3 py-1 rounded-full bg-green-500 text-white font-body font-bold text-sm">
                                {confirmed.length}
                            </span>
                        </div>
                        <div className="p-4 space-y-2 max-h-80 overflow-y-auto">
                            {confirmed.length === 0 ? (
                                <p className="font-body text-charcoal/40 text-sm text-center py-4">Sin confirmaciones aún</p>
                            ) : (
                                confirmed.map((r) => (
                                    <div key={r.id} className="flex items-center justify-between bg-white rounded-xl px-4 py-2.5">
                                        <span className="font-body font-semibold text-charcoal text-sm">{r.name}</span>
                                        <span className="font-body text-charcoal/40 text-xs">{formatDate(r.created_at)}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>

                    {/* Declined */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="rounded-2xl border-2 border-pink/30 bg-pink-light/20 overflow-hidden"
                    >
                        <div className="flex items-center justify-between px-6 py-4 bg-pink-light/40 border-b border-pink/30">
                            <h3 className="font-body font-bold text-pink-dark">✗ No vienen</h3>
                            <span className="px-3 py-1 rounded-full bg-pink-dark text-white font-body font-bold text-sm">
                                {declined.length}
                            </span>
                        </div>
                        <div className="p-4 space-y-2 max-h-80 overflow-y-auto">
                            {declined.length === 0 ? (
                                <p className="font-body text-charcoal/40 text-sm text-center py-4">Ninguna declinación aún</p>
                            ) : (
                                declined.map((r) => (
                                    <div key={r.id} className="flex items-center justify-between bg-white rounded-xl px-4 py-2.5">
                                        <span className="font-body font-semibold text-charcoal text-sm">{r.name}</span>
                                        <span className="font-body text-charcoal/40 text-xs">{formatDate(r.created_at)}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    )
}
