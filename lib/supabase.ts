import { createClient } from '@supabase/supabase-js'
import { getSupabaseAnonKey, getSupabaseUrl, warnIfSupabaseEnvInconsistent } from '@/lib/supabaseEnv'

warnIfSupabaseEnvInconsistent()

const supabaseUrl = getSupabaseUrl() || 'https://placeholder-url.supabase.co'
const supabaseAnonKey = getSupabaseAnonKey() || 'placeholder-anon-key'

if (supabaseUrl.includes('placeholder')) {
  console.warn('⚠️ Supabase URL no encontrada. Usando placeholder (el sitio no funcionará correctamente).')
}

/** Mensaje más claro cuando el navegador/SSR no puede abrir conexión a Supabase */
const supabaseFetch: typeof fetch = async (input, init) => {
  try {
    return await fetch(input, init)
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    if (msg === 'fetch failed' || msg.includes('Failed to fetch')) {
      console.error(
        '[Supabase] No se pudo conectar. Revisá: internet, firewall/antivirus, bloqueadores, y que NEXT_PUBLIC_SUPABASE_URL en .env.local sea exacta (sin espacios).'
      )
    }
    throw e
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: { fetch: supabaseFetch },
})

export type WishlistItem = {
  id: string
  title: string
  image_url: string | null
  mercadolibre_url: string | null
  reserved: boolean
  reserved_by: string | null
  created_at: string
}

export type RSVPEntry = {
  id: string
  name: string
  attending: boolean
  created_at: string
}
