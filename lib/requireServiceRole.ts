import { NextResponse } from 'next/server'

/** Respuesta si falta la clave usada por las API de admin (Supabase service role). */
import { getSupabaseServiceRoleKey } from '@/lib/supabaseEnv'

export function serviceRoleMisconfiguredResponse() {
    const key = getSupabaseServiceRoleKey()
    if (!key || key === 'placeholder-service-role-key') {
        return NextResponse.json(
            {
                error:
                    'Falta SUPABASE_SERVICE_ROLE_KEY en el servidor. Agregala en .env.local y reiniciá `npm run dev` (o configurá la variable en el hosting).',
            },
            { status: 503 }
        )
    }
    return null
}
