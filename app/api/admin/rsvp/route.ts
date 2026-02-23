import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function GET() {
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
