'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface LoginFormProps {
    onLogin: () => void
}

export default function LoginForm({ onLogin }: LoginFormProps) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        setTimeout(() => {
            if (username === 'azulcita' && password === 'hannah') {
                localStorage.setItem('hannah_admin_token', 'authenticated')
                onLogin()
            } else {
                setError('Credenciales incorrectas. Intentá de nuevo 🦕')
            }
            setLoading(false)
        }, 600)
    }

    return (
        <div className="min-h-screen bg-cream flex items-center justify-center px-4">
            {/* Decorative circles */}
            <div className="absolute top-20 left-20 w-48 h-48 rounded-full bg-pink/10 blur-3xl" />
            <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-gold/15 blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-sm"
            >
                <div className="bg-white rounded-3xl p-8 shadow-[0_8px_40px_rgba(244,167,185,0.2)] border-2 border-pink/15">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <span className="text-4xl">🦕</span>
                        <h1 className="font-script text-4xl text-pink-dark mt-2">Panel de Administración</h1>
                        <p className="font-body text-charcoal/40 text-sm mt-2">Baby Shower de Hannah</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block font-body text-xs uppercase tracking-wider text-charcoal/50 mb-1.5">
                                Usuario
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Usuario..."
                                autoComplete="username"
                                className="
                  w-full px-4 py-3 rounded-xl border-2 border-pink/30 bg-cream
                  font-body text-charcoal placeholder:text-charcoal/30
                  focus:outline-none focus:border-pink-dark transition-all duration-200
                "
                            />
                        </div>
                        <div>
                            <label className="block font-body text-xs uppercase tracking-wider text-charcoal/50 mb-1.5">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Contraseña..."
                                autoComplete="current-password"
                                className="
                  w-full px-4 py-3 rounded-xl border-2 border-pink/30 bg-cream
                  font-body text-charcoal placeholder:text-charcoal/30
                  focus:outline-none focus:border-pink-dark transition-all duration-200
                "
                            />
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="font-body text-pink-dark text-sm bg-pink-light/30 px-4 py-2 rounded-xl"
                            >
                                {error}
                            </motion.p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink to-pink-dark
                text-white font-body font-bold text-base mt-2
                hover:scale-[1.02] hover:shadow-lg hover:shadow-pink/30
                active:scale-[0.98] transition-all duration-300
                disabled:opacity-60 disabled:cursor-not-allowed
              "
                        >
                            {loading ? 'Verificando...' : 'Ingresar'}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}
