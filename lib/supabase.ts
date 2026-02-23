import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type WishlistItem = {
  id: string
  title: string
  image_url: string | null
  mercadolibre_url: string | null
  reserved: boolean
  reserved_by: string | null
  created_at: string
}

export type RSVPEntry = {
  id: string
  name: string
  attending: boolean
  created_at: string
}
