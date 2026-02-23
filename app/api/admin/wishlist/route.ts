import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function GET() {
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
    const body = await req.json()
    const { title, image_url, mercadolibre_url } = body

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
    const body = await req.json()
    const { id, title, image_url, mercadolibre_url, reserved } = body

    if (!id) {
        return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    const update: Record<string, unknown> = {}
    if (title !== undefined) update.title = title
    if (image_url !== undefined) update.image_url = image_url || null
    if (mercadolibre_url !== undefined) update.mercadolibre_url = mercadolibre_url || null
    if (reserved !== undefined) {
        update.reserved = reserved
        if (!reserved) update.reserved_by = null
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
    const body = await req.json()
    const { id } = body

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
