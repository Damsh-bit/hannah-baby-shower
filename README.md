# 🦕 Baby Shower de Hannah

Web app completa para el Baby Shower de Hannah — RSVP y lista de deseos interactiva.

**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Supabase · Framer Motion

---

## 🗄️ Base de Datos — Supabase

Ejecutá estas queries en el **SQL Editor** de tu proyecto Supabase:

```sql
-- Tabla de RSVPs
CREATE TABLE rsvp (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  attending BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de lista de deseos
CREATE TABLE wishlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT,
  mercadolibre_url TEXT,
  reserved BOOLEAN DEFAULT FALSE,
  reserved_by TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE rsvp ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;

-- rsvp: cualquiera puede insertar
CREATE POLICY "anyone can insert rsvp" ON rsvp
  FOR INSERT TO anon WITH CHECK (true);

-- wishlist: cualquiera puede leer
CREATE POLICY "anyone can read wishlist" ON wishlist
  FOR SELECT TO anon USING (true);

-- wishlist: cualquiera puede marcar como reservado
CREATE POLICY "anyone can reserve" ON wishlist
  FOR UPDATE TO anon
  USING (true)
  WITH CHECK (true);
```

---

## ⚙️ Variables de Entorno

Copiá `.env.local.example` a `.env.local` y completá con tus credenciales de Supabase:

```
# Settings → API en tu proyecto de Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
```

> ⚠️ **Nunca commitees** `.env.local`. Ya está en `.gitignore`.

---

## 🚀 Desarrollo Local

```bash
npm install
npm run dev
# → http://localhost:3000
```

**Página pública:** `http://localhost:3000`  
**Panel admin:** `http://localhost:3000/admin`  
**Credenciales admin:** `azulcita` / `hannah`

---

## 🌐 Deploy en Vercel

1. Subí el repo a GitHub
2. Importalo en [vercel.com](https://vercel.com)
3. Agregá las variables de entorno en **Settings → Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy automático ✅

---

## 📁 Estructura del Proyecto

```
app/
  page.tsx              # Página pública
  layout.tsx            # Layout raíz (fuentes, metadata)
  globals.css           # Estilos globales
  admin/
    page.tsx            # Panel de administración
  api/admin/
    rsvp/route.ts       # GET RSVPs (service role)
    wishlist/route.ts   # CRUD wishlist (service role)

components/
  Hero.tsx              # Sección hero (100vh)
  MapSection.tsx        # Mapa de Google embebido
  RSVPSection.tsx       # Formulario de asistencia + confetti
  WishlistSection.tsx   # Grilla de regalos
  WishlistCard.tsx      # Tarjeta individual + modal reserva
  decorative/
    DinoSvgs.tsx        # Dinosaurios kawaii SVG
    BalloonSvgs.tsx     # Globos SVG animados
  admin/
    LoginForm.tsx       # Login del admin
    RSVPDashboard.tsx   # Vista de asistencias
    WishlistManager.tsx # CRUD de lista de deseos

lib/
  supabase.ts           # Cliente público (anon key)
  supabaseAdmin.ts      # Cliente servidor (service role)
```

---

## 🔒 Seguridad

- **Clave anon:** usada en el browser para leer wishlist e insertar RSVPs
- **Service role key:** usada solo en API routes server-side (`/api/admin/*`)
- **Admin auth:** simple check client-side con localStorage — suficiente para una invitación personal
- **RLS:** políticas de Supabase limitan lo que el usuario anónimo puede hacer
