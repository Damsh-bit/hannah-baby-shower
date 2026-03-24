import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { serviceRoleMisconfiguredResponse } from '@/lib/requireServiceRole'

export async function GET() {
    const cfg = serviceRoleMisconfiguredResponse()
    if (cfg) return cfg

    const { data, error } = await supabaseAdmin
        .from('rsvp')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('RSVP GET Error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ rsvps: data })
}
