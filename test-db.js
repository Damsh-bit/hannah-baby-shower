const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://euxfycvgkuudutzzifrv.supabase.co'
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1eGZ5Y3Zna3V1ZHV0enppZnJ2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTg3MDA0MSwiZXhwIjoyMDg3NDQ2MDQxfQ.kiFlSH23JBCZWOD-3yUAXDO9TDp4Yp633kK4OkgHtlQ'

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function test() {
    console.log('Testing connection to:', supabaseUrl)

    // Test rsvp table
    const { data: rsvp, error: rsvpError } = await supabase.from('rsvp').select('*').limit(1)
    if (rsvpError) {
        console.error('Error fetching from rsvp table:', rsvpError.message)
    } else {
        console.log('✓ Connection to rsvp table successful')
    }

    // Test wishlist table
    const { data: wishlist, error: wishlistError } = await supabase.from('wishlist').select('*').limit(1)
    if (wishlistError) {
        console.error('Error fetching from wishlist table:', wishlistError.message)
    } else {
        console.log('✓ Connection to wishlist table successful')
    }
}

test()
