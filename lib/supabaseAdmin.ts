import { setDefaultResultOrder } from 'node:dns'
import { createClient } from '@supabase/supabase-js'
import { getSupabaseServiceRoleKey, getSupabaseUrl, warnIfSupabaseEnvInconsistent } from '@/lib/supabaseEnv'

// Evita "fetch failed" en Windows/Node al preferir IPv4 para *.supabase.co
setDefaultResultOrder('ipv4first')

warnIfSupabaseEnvInconsistent()

const supabaseUrl = getSupabaseUrl() || 'https://placeholder-url.supabase.co'
const serviceRoleKey = getSupabaseServiceRoleKey() || 'placeholder-service-role-key'

if (supabaseUrl.includes('placeholder')) {
    console.warn('⚠️ Supabase Admin URL no encontrada. Usando placeholder (las funciones de admin fallarán).')
}

const adminFetch: typeof fetch = async (input, init) => {
    try {
        return await fetch(input, init)
    } catch (e) {
        const msg = e instanceof Error ? e.message : String(e)
        if (msg === 'fetch failed' || msg.includes('Failed to fetch')) {
            console.error(
                '[Supabase admin] fetch falló. Revisá red, VPN, firewall y variables NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY (sin comillas de más en .env.local).'
            )
        }
        throw e
    }
}

// Solo en rutas API Node (no usar en Edge): importa node:dns arriba.
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
    global: { fetch: adminFetch },
})
