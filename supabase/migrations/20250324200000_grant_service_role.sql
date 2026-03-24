-- Corrige error 500 al guardar/editar/eliminar desde el panel admin (API con service role).
-- Ejecutá en Supabase → SQL Editor → Run (es seguro repetirlo).

GRANT USAGE ON SCHEMA public TO service_role;

GRANT ALL ON TABLE public.wishlist TO service_role;
GRANT ALL ON TABLE public.rsvp TO service_role;
