'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { WishlistItem } from '@/lib/supabase'

type FormData = {
    title: string
    image_url: string
    mercadolibre_url: string
}

const emptyForm: FormData = { title: '', image_url: '', mercadolibre_url: '' }

export default function WishlistManager() {
    const [items, setItems] = useState<WishlistItem[]>([])
    const [loading, setLoading] = useState(true)
    const [modalMode, setModalMode] = useState<'add' | 'edit' | null>(null)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [form, setForm] = useState<FormData>(emptyForm)
    const [saving, setSaving] = useState(false)
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
    const [error, setError] = useState('')

    const fetchItems = useCallback(async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/admin/wishlist')
            const data = await res.json()
            setItems(data.items ?? [])
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchItems()
    }, [fetchItems])

    const openAdd = () => {
        setForm(emptyForm)
        setEditingId(null)
        setModalMode('add')
        setError('')
    }

    const openEdit = (item: WishlistItem) => {
        setForm({
            title: item.title,
            image_url: item.image_url ?? '',
            mercadolibre_url: item.mercadolibre_url ?? '',
        })
        setEditingId(item.id)
        setModalMode('edit')
        setError('')
    }

    const handleSave = async () => {
        if (!form.title.trim()) {
            setError('El título es obligatorio')
            return
        }
        setSaving(true)
        setError('')
        try {
            if (modalMode === 'add') {
                const res = await fetch('/api/admin/wishlist', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form),
                })
                if (!res.ok) throw new Error()
            } else {
                const res = await fetch('/api/admin/wishlist', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: editingId, ...form }),
                })
                if (!res.ok) throw new Error()
            }
            await fetchItems()
            setModalMode(null)
        } catch {
            setError('Error al guardar. Intentá de nuevo.')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await fetch('/api/admin/wishlist', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            })
            setItems((prev) => prev.filter((i) => i.id !== id))
            setDeleteConfirmId(null)
        } catch (e) {
            console.error(e)
        }
    }

    const handleToggleReserved = async (item: WishlistItem) => {
        const newReserved = !item.reserved
        try {
            await fetch('/api/admin/wishlist', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: item.id,
                    title: item.title,
                    image_url: item.image_url,
                    mercadolibre_url: item.mercadolibre_url,
                    reserved: newReserved,
                }),
            })
            setItems((prev) =>
                prev.map((i) => (i.id === item.id ? { ...i, reserved: newReserved } : i))
            )
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="font-body font-black text-2xl text-charcoal">Lista de Deseos</h2>
                <button
                    onClick={openAdd}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink to-pink-dark text-white font-body font-semibold text-sm hover:scale-[1.02] transition-all shadow-md shadow-pink/25"
                >
                    + Agregar producto
                </button>
            </div>

            {loading ? (
                <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-20 skeleton rounded-2xl" />
                    ))}
                </div>
            ) : items.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-pink/20 rounded-3xl">
                    <p className="font-body text-charcoal/40">No hay productos en la lista todavía.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-4 bg-white rounded-2xl p-4 border-2 border-pink/10 shadow-sm"
                        >
                            {/* Thumbnail */}
                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-cream flex-shrink-0">
                                {item.image_url ? (
                                    <Image
                                        src={item.image_url}
                                        alt={item.title}
                                        width={56}
                                        height={56}
                                        className="object-cover w-full h-full"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-2xl opacity-30">🎁</div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className="font-body font-semibold text-charcoal text-sm truncate">{item.title}</p>
                                <div className="flex items-center gap-2 mt-1 flex-wrap">
                                    {item.reserved ? (
                                        <span className="text-xs font-body text-pink-dark bg-pink-light/40 px-2 py-0.5 rounded-full">
                                            💝 Reservado por: <strong>{item.reserved_by || '—'}</strong>
                                        </span>
                                    ) : (
                                        <span className="text-xs font-body text-green-600 bg-green-50 px-2 py-0.5 rounded-full">✓ Disponible</span>
                                    )}
                                    {item.mercadolibre_url && (
                                        <a
                                            href={item.mercadolibre_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs font-body text-yellow-600 hover:underline"
                                        >
                                            ML ↗
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <button
                                    onClick={() => handleToggleReserved(item)}
                                    title={item.reserved ? 'Marcar como disponible' : 'Marcar como reservado'}
                                    className="px-3 py-1.5 rounded-lg text-xs font-body font-semibold border-2 border-charcoal/15 text-charcoal/50 hover:border-charcoal/30 transition-all"
                                >
                                    {item.reserved ? '↺ Liberar' : '✓ Reservar'}
                                </button>
                                <button
                                    onClick={() => openEdit(item)}
                                    className="px-3 py-1.5 rounded-lg text-xs font-body font-semibold border-2 border-pink/30 text-pink-dark hover:bg-pink-light/30 transition-all"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => setDeleteConfirmId(item.id)}
                                    className="px-3 py-1.5 rounded-lg text-xs font-body font-semibold border-2 border-red-200 text-red-500 hover:bg-red-50 transition-all"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {modalMode && (
                    <motion.div
                        key="edit-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center px-4"
                        onClick={(e) => e.target === e.currentTarget && setModalMode(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border-2 border-pink/20"
                        >
                            <h3 className="font-script text-3xl text-pink-dark mb-6">
                                {modalMode === 'add' ? 'Agregar producto' : 'Editar producto'}
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block font-body text-xs uppercase tracking-wider text-charcoal/50 mb-1.5">
                                        Título del regalo *
                                    </label>
                                    <input
                                        type="text"
                                        value={form.title}
                                        onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                                        placeholder="Ej: Coche paraguas"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-pink/30 bg-cream font-body text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-pink-dark transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block font-body text-xs uppercase tracking-wider text-charcoal/50 mb-1.5">
                                        URL de imagen
                                    </label>
                                    <input
                                        type="text"
                                        value={form.image_url}
                                        onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
                                        placeholder="https://i.imgur.com/..."
                                        className="w-full px-4 py-3 rounded-xl border-2 border-pink/30 bg-cream font-body text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-pink-dark transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block font-body text-xs uppercase tracking-wider text-charcoal/50 mb-1.5">
                                        URL de Mercado Libre (opcional)
                                    </label>
                                    <input
                                        type="text"
                                        value={form.mercadolibre_url}
                                        onChange={(e) => setForm((f) => ({ ...f, mercadolibre_url: e.target.value }))}
                                        placeholder="https://www.mercadolibre.com.ar/..."
                                        className="w-full px-4 py-3 rounded-xl border-2 border-pink/30 bg-cream font-body text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:border-pink-dark transition-all"
                                    />
                                </div>
                                {error && <p className="text-pink-dark font-body text-sm">{error}</p>}
                                <div className="flex gap-3 pt-2">
                                    <button
                                        onClick={() => setModalMode(null)}
                                        className="flex-1 px-4 py-3 rounded-xl border-2 border-charcoal/20 font-body font-semibold text-sm text-charcoal/60 hover:border-charcoal/40 transition-all"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-pink to-pink-dark text-white font-body font-bold text-sm hover:scale-[1.02] transition-all disabled:opacity-60"
                                    >
                                        {saving ? 'Guardando...' : modalMode === 'add' ? 'Agregar' : 'Guardar cambios'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Delete confirm dialog */}
            <AnimatePresence>
                {deleteConfirmId && (
                    <motion.div
                        key="delete-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center px-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border-2 border-red-100"
                        >
                            <p className="font-body font-bold text-charcoal text-lg mb-2">¿Eliminar este producto?</p>
                            <p className="font-body text-charcoal/50 text-sm mb-6">Esta acción no se puede deshacer.</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeleteConfirmId(null)}
                                    className="flex-1 px-4 py-3 rounded-xl border-2 border-charcoal/20 font-body font-semibold text-sm text-charcoal/60 hover:border-charcoal/40 transition-all"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => handleDelete(deleteConfirmId)}
                                    className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white font-body font-bold text-sm hover:bg-red-600 transition-all"
                                >
                                    Sí, eliminar
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
