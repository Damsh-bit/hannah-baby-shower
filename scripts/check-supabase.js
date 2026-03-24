/**
 * Diagnóstico de conexión a Supabase (lee .env.local).
 * Uso: node scripts/check-supabase.js
 */
const dns = require('node:dns')
dns.setDefaultResultOrder('ipv4first')

const fs = require('fs')
const path = require('path')

function loadEnvLocal() {
    const p = path.join(__dirname, '..', '.env.local')
    if (!fs.existsSync(p)) {
        console.error('No existe .env.local en la raíz del proyecto.')
        process.exit(1)
    }
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

function decodeJwtRef(jwt) {
    if (!jwt || typeof jwt !== 'string' || jwt.split('.').length < 2) return null
    try {
        const payload = jwt.split('.')[1]
        const b64 = payload.replace(/-/g, '+').replace(/_/g, '/')
        const json = Buffer.from(b64, 'base64').toString('utf8')
        const o = JSON.parse(json)
        return o.ref || null
    } catch {
        return null
    }
}

loadEnvLocal()

const urlRaw = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\r/g, '').trim().replace(/\/+$/, '')
const anon = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').replace(/\r/g, '').trim()
const service = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').replace(/\r/g, '').trim()

console.log('--- Diagnóstico Supabase ---\n')
console.log('URL (.env):', urlRaw || '(vacía)')

const refFromJwt = decodeJwtRef(anon) || decodeJwtRef(service)
if (refFromJwt) {
    console.log('Ref dentro del JWT (anon/service):', refFromJwt)
    const expectedHost = `${refFromJwt}.supabase.co`
    try {
        const host = new URL(urlRaw).hostname
        if (host !== expectedHost && host !== `${refFromJwt}.supabase.in`) {
            console.warn(
                '\n⚠️  La URL no coincide con el JWT: el host debería ser',
                expectedHost,
                'pero tenés',
                host
            )
        }
    } catch {
        console.warn('\n⚠️  NEXT_PUBLIC_SUPABASE_URL no es una URL válida.')
    }
}

if (!urlRaw || !anon) {
    console.error('\nFaltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY.')
    process.exit(1)
}

async function main() {
    let host
    try {
        host = new URL(urlRaw).hostname
    } catch {
        console.error('\nURL inválida.')
        process.exit(1)
    }

    console.log('\nResolviendo DNS:', host)
    try {
        const { address } = await dns.promises.lookup(host)
        console.log('✓ DNS OK →', address)
    } catch (e) {
        console.error('✗ DNS falló:', e.message)
        console.error(
            '\nEse dominio no existe o no se puede resolver. Abrí Supabase → tu proyecto → Settings → API\n' +
                'y copiá el "Project URL" COMPLETO (no armes la URL a mano desde el JWT).'
        )
        process.exit(1)
    }

    const health = `${urlRaw}/auth/v1/health`
    console.log('\nProbando HTTPS:', health)
    try {
        const res = await fetch(health, { method: 'GET' })
        console.log('HTTP', res.status, res.ok ? '✓' : '(revisá claves si no es 200)')
    } catch (e) {
        console.error('✗ fetch falló:', e.message)
        console.error('Revisá firewall, VPN o probá otra red.')
        process.exit(1)
    }

    const { createClient } = require('@supabase/supabase-js')
    const client = createClient(urlRaw, service || anon)
    const { error } = await client.from('wishlist').select('id').limit(1)
    if (error) {
        console.log('\nREST wishlist:', error.message, '(si es "relation" o "schema", ejecutá las migraciones SQL)')
    } else {
        console.log('\n✓ Tabla wishlist responde.')
    }
}

main()
