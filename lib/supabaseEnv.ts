/** Quita espacios, BOM y CR típicos de .env en Windows. */
export function supabaseEnvString(v: string | undefined): string {
    if (v == null || v === '') return ''
    return v
        .replace(/^\uFEFF/, '')
        .replace(/\r/g, '')
        .trim()
}

/** URL base de Supabase sin barra final. */
export function getSupabaseUrl(): string {
    let url = supabaseEnvString(process.env.NEXT_PUBLIC_SUPABASE_URL)
    while (url.endsWith('/')) url = url.slice(0, -1)
    return url
}

export function getSupabaseAnonKey(): string {
    return supabaseEnvString(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

export function getSupabaseServiceRoleKey(): string {
    return supabaseEnvString(process.env.SUPABASE_SERVICE_ROLE_KEY)
}
