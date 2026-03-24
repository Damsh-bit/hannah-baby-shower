-- Esquema para el baby shower: RSVP público y lista de deseos.
-- Ejecutá este archivo en Supabase: SQL Editor → New query → pegar → Run.
-- Si ya tenés tablas con otro esquema, revisá antes de aplicar.

-- Tabla RSVP (formulario público inserta filas; el admin lee con service role)
CREATE TABLE IF NOT EXISTS public.rsvp (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    attending boolean NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- Lista de deseos (lectura y reserva desde el cliente anónimo; CRUD admin vía API con service role)
CREATE TABLE IF NOT EXISTS public.wishlist (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    image_url text,
    mercadolibre_url text,
    reserved boolean NOT NULL DEFAULT false,
    reserved_by text,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- Índices útiles para el orden que usa la app
CREATE INDEX IF NOT EXISTS idx_rsvp_created_at ON public.rsvp (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_wishlist_created_at ON public.wishlist (created_at ASC);

ALTER TABLE public.rsvp ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;

-- Políticas (re-ejecutables)
DROP POLICY IF EXISTS "Allow public RSVP insert" ON public.rsvp;
CREATE POLICY "Allow public RSVP insert"
    ON public.rsvp
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public wishlist read" ON public.wishlist;
CREATE POLICY "Allow public wishlist read"
    ON public.wishlist
    FOR SELECT
    TO anon, authenticated
    USING (true);

DROP POLICY IF EXISTS "Allow public wishlist reservation update" ON public.wishlist;
CREATE POLICY "Allow public wishlist reservation update"
    ON public.wishlist
    FOR UPDATE
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- Permisos para la clave anónima (anon) y usuarios autenticados
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.wishlist TO anon, authenticated;
GRANT INSERT ON public.rsvp TO anon, authenticated;
GRANT UPDATE ON public.wishlist TO anon, authenticated;

-- Panel admin (Next API + SUPABASE_SERVICE_ROLE_KEY): PostgREST usa el rol service_role
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON TABLE public.wishlist TO service_role;
GRANT ALL ON TABLE public.rsvp TO service_role;
