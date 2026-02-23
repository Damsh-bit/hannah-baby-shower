'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import LoginForm from '@/components/admin/LoginForm'
import RSVPDashboard from '@/components/admin/RSVPDashboard'

const WishlistManager = dynamic(() => import('@/components/admin/WishlistManager'), { ssr: false })

const ADMIN_TOKEN_KEY = 'hannah_admin_token'

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [checking, setChecking] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem(ADMIN_TOKEN_KEY)
        if (token === 'authenticated') {
            setIsAuthenticated(true)
        }
        setChecking(false)
    }, [])

    const handleLogin = () => {
        setIsAuthenticated(true)
    }

    const handleLogout = () => {
        localStorage.removeItem(ADMIN_TOKEN_KEY)
        setIsAuthenticated(false)
    }

    if (checking) {
        return (
            <div className="min-h-screen bg-cream flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-pink border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (!isAuthenticated) {
        return <LoginForm onLogin={handleLogin} />
    }

    return (
        <div className="min-h-screen bg-cream">
            {/* Top bar */}
            <div className="bg-white border-b-2 border-pink/15 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">🦕</span>
                    <div>
                        <p className="font-body font-black text-charcoal text-base leading-none">Panel de Admin</p>
                        <p className="font-body text-charcoal/40 text-xs">Baby Shower de Hannah</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-xl border-2 border-charcoal/20 font-body font-semibold text-sm text-charcoal/50 hover:border-charcoal/40 hover:text-charcoal transition-all"
                >
                    Cerrar sesión
                </button>
            </div>

            {/* Dashboard content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-5xl mx-auto px-4 md:px-6 py-10"
            >
                <RSVPDashboard />

                <div className="border-t-2 border-pink/15 pt-10">
                    <WishlistManager />
                </div>
            </motion.div>
        </div>
    )
}
