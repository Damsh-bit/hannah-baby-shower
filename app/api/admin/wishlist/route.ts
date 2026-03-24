import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { serviceRoleMisconfiguredResponse } from '@/lib/requireServiceRole'

export async function GET() {
    const cfg = serviceRoleMisconfiguredResponse()
    if (cfg) return cfg

    const { data, error } = await supabaseAdmin
        .from('wishlist')
        .select('*')
        .order('created_at', { ascending: true })

    if (error) {
        console.error('Wishlist GET Error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ items: data })
}

export async function POST(req: NextRequest) {
    const cfg = serviceRoleMisconfiguredResponse()
    if (cfg) return cfg

    let body: Record<string, unknown>
    try {
        body = await req.json()
    } catch {
        return NextResponse.json({ error: 'Cuerpo JSON inválido' }, { status: 400 })
    }

    const title = typeof body.title === 'string' ? body.title.trim() : ''
    const image_url = typeof body.image_url === 'string' ? body.image_url.trim() : ''
    const mercadolibre_url = typeof body.mercadolibre_url === 'string' ? body.mercadolibre_url.trim() : ''

    if (!title) {
        return NextResponse.json({ error: 'title is required' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
        .from('wishlist')
        .insert({
            title,
            image_url: image_url || null,
            mercadolibre_url: mercadolibre_url || null,
        })
        .select()
        .single()

    if (error) {
        console.error('Wishlist POST Error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ item: data }, { status: 201 })
}

export async function PUT(req: NextRequest) {
    const cfg = serviceRoleMisconfiguredResponse()
    if (cfg) return cfg

    let body: Record<string, unknown>
    try {
        body = await req.json()
    } catch {
        return NextResponse.json({ error: 'Cuerpo JSON inválido' }, { status: 400 })
    }
    const id = typeof body.id === 'string' ? body.id : ''
    if (!id) {
        return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    const update: Record<string, unknown> = {}
    if (typeof body.title === 'string') update.title = body.title.trim()
    if (typeof body.image_url === 'string') update.image_url = body.image_url.trim() || null
    if (typeof body.mercadolibre_url === 'string')
        update.mercadolibre_url = body.mercadolibre_url.trim() || null
    if (typeof body.reserved === 'boolean') {
        update.reserved = body.reserved
        if (!body.reserved) update.reserved_by = null
    }

    const { data, error } = await supabaseAdmin
        .from('wishlist')
        .update(update)
        .eq('id', id)
        .select()
        .single()

    if (error) {
        console.error('Wishlist PUT Error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ item: data })
}

export async function DELETE(req: NextRequest) {
    const cfg = serviceRoleMisconfiguredResponse()
    if (cfg) return cfg

    let body: Record<string, unknown>
    try {
        body = await req.json()
    } catch {
        return NextResponse.json({ error: 'Cuerpo JSON inválido' }, { status: 400 })
    }
    const id = typeof body.id === 'string' ? body.id : ''
    if (!id) {
        return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    const { error } = await supabaseAdmin.from('wishlist').delete().eq('id', id)

    if (error) {
        console.error('Wishlist DELETE Error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
}
