import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co'
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-role-key'

if (supabaseUrl.includes('placeholder')) {
    console.warn('⚠️ Supabase Admin URL no encontrada. Usando placeholder (las funciones de admin fallarán).')
}

// This client should only ever be used in server-side code (API routes, Server Components)
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
})
