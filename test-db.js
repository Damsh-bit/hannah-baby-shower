/**
 * Prueba rápida de tablas Supabase. Usá variables de entorno o un archivo .env.local en la raíz del proyecto.
 * PowerShell: $env:NEXT_PUBLIC_SUPABASE_URL="..."; $env:SUPABASE_SERVICE_ROLE_KEY="..."; node test-db.js
 */
const dns = require('node:dns')
dns.setDefaultResultOrder('ipv4first')

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

function loadEnvLocal() {
    const p = path.join(__dirname, '.env.local')
    if (!fs.existsSync(p)) return
    const content = fs.readFileSync(p, 'utf8')
    for (const line of content.split('\n')) {
        const trimmed = line.replace(/\r/g, '').trim()
        if (!trimmed || trimmed.startsWith('#')) continue
        const eq = trimmed.indexOf('=')
        if (eq === -1) continue
        const key = trimmed.slice(0, eq).trim()
        let val = trimmed.slice(eq + 1).trim()
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1)
        }
        val = val.replace(/\r/g, '').trim()
        if (!process.env[key]) process.env[key] = val
    }
}

loadEnvLocal()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
    console.error(
        'Falta NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY. Copiá .env.local.example a .env.local y completá los valores.'
    )
    process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function test() {
    console.log('Probando conexión con:', supabaseUrl)

    const { error: rsvpError } = await supabase.from('rsvp').select('*').limit(1)
    if (rsvpError) {
        console.error('Error en tabla rsvp:', rsvpError.message)
    } else {
        console.log('✓ Tabla rsvp accesible')
    }

    const { error: wishlistError } = await supabase.from('wishlist').select('*').limit(1)
    if (wishlistError) {
        console.error('Error en tabla wishlist:', wishlistError.message)
    } else {
        console.log('✓ Tabla wishlist accesible')
    }
}

test()
