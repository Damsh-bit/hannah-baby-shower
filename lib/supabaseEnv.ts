/** Decodifica el claim `ref` de un JWT de Supabase (sin verificar firma). Sin Buffer, sirve en cliente y servidor. */
export function decodeSupabaseJwtRef(jwt: string): string | null {
    if (!jwt || typeof jwt !== 'string') return null
    const parts = jwt.split('.')
    if (parts.length < 2) return null
    try {
        let b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
        b64 += '='.repeat((4 - (b64.length % 4)) % 4)
        const binary = atob(b64)
        const bytes = new Uint8Array(binary.length)
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
        const json = new TextDecoder().decode(bytes)
        const o = JSON.parse(json) as { ref?: string }
        return typeof o.ref === 'string' ? o.ref : null
    } catch {
        return null
    }
}

/** En desarrollo, avisa si URL y claves no son del mismo proyecto (causa típica de “BD rota”). */
export function warnIfSupabaseEnvInconsistent(): void {
    if (process.env.NODE_ENV !== 'development') return

    const url = getSupabaseUrl()
    const anon = getSupabaseAnonKey()
    const service = getSupabaseServiceRoleKey()
    if (!url || url.includes('placeholder')) return

    const refAnon = decodeSupabaseJwtRef(anon)
    const refSvc = decodeSupabaseJwtRef(service)

    if (refAnon && refSvc && refAnon !== refSvc) {
        console.error(
            `[Supabase] Las claves anon y service_role son de proyectos distintos (ref "${refAnon}" vs "${refSvc}"). ` +
                'Copiá las tres variables del mismo proyecto: Supabase → Settings → API.'
        )
    }

    if (refAnon) {
        try {
            const host = new URL(url).hostname.replace('.supabase.co', '').replace('.supabase.in', '')
            if (host !== refAnon) {
                console.error(
                    `[Supabase] La URL del proyecto (${host}) no coincide con el ref del JWT anon (${refAnon}). ` +
                        'Revisá NEXT_PUBLIC_SUPABASE_URL (sin letras de más al final del subdominio).'
                )
            }
        } catch {
            /* ignore */
        }
    }
}

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
