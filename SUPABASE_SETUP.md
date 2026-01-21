# Supabase Setup: Gallery & Latest News

Complete these steps in your Supabase project to enable the Gallery and News CMS.

---

## 1. Environment Variables

### Local (`.env` in project root)

Create a `.env` file in the **project root** (the folder that contains `vite.config.ts` — i.e. the repository root, **not** inside `client/`):

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

- Get `VITE_SUPABASE_ANON_KEY` from **Supabase Dashboard → Project Settings → API → anon public**. It is a long JWT starting with `eyJ...` (do **not** use the `sb_publishable_...`-style key).
- **Restart `npm run dev`** after creating or changing `.env`; Vite only reads env on startup.

### Vercel / Netlify

Add the same variables in the project’s **Environment Variables** so they are available at build time.

---

## 2. Database: Tables and RLS

Run the following in **Supabase Dashboard → SQL Editor**.

### 2.1 Create `gallery` table

```sql
CREATE TABLE public.gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now() NOT NULL,
  created_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- SELECT: everyone (public read)
CREATE POLICY "gallery_select_public"
  ON public.gallery FOR SELECT
  USING (true);

-- INSERT: authenticated users only
CREATE POLICY "gallery_insert_authenticated"
  ON public.gallery FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- UPDATE: authenticated users only
CREATE POLICY "gallery_update_authenticated"
  ON public.gallery FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- DELETE: authenticated users only
CREATE POLICY "gallery_delete_authenticated"
  ON public.gallery FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);
```

### 2.2 Create `news` table

```sql
CREATE TABLE public.news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  image_url text,
  sort_order integer NOT NULL DEFAULT 0,
  published_at timestamptz DEFAULT now() NOT NULL,
  created_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- SELECT: everyone (public read)
CREATE POLICY "news_select_public"
  ON public.news FOR SELECT
  USING (true);

-- INSERT: authenticated users only
CREATE POLICY "news_insert_authenticated"
  ON public.news FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- UPDATE: authenticated users only
CREATE POLICY "news_update_authenticated"
  ON public.news FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- DELETE: authenticated users only
CREATE POLICY "news_delete_authenticated"
  ON public.news FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);
```

### 2.3 Create `admission_inquiries` table

Form submissions from the Admissions page. The frontend submits via anon; only authenticated admins can read.

```sql
CREATE TABLE public.admission_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  class_interest text NOT NULL,
  message text,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.admission_inquiries ENABLE ROW LEVEL SECURITY;

-- INSERT: anon and authenticated (form can be submitted while logged in, e.g. admin testing)
CREATE POLICY "admission_inquiries_insert_anon"
  ON public.admission_inquiries FOR INSERT
  TO public
  WITH CHECK (true);

-- SELECT: authenticated (admin only)
CREATE POLICY "admission_inquiries_select_authenticated"
  ON public.admission_inquiries FOR SELECT
  TO authenticated
  USING (true);

-- UPDATE: authenticated (mark as read/unread)
CREATE POLICY "admission_inquiries_update_authenticated"
  ON public.admission_inquiries FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- DELETE: authenticated
CREATE POLICY "admission_inquiries_delete_authenticated"
  ON public.admission_inquiries FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);
```

If you see **"new row violates row-level security policy"** when submitting the form, your INSERT policy may use `TO anon` only. In **SQL Editor**, run:

```sql
DROP POLICY IF EXISTS "admission_inquiries_insert_anon" ON public.admission_inquiries;
CREATE POLICY "admission_inquiries_insert_anon" ON public.admission_inquiries FOR INSERT TO public WITH CHECK (true);

DROP POLICY IF EXISTS "career_applications_insert_anon" ON public.career_applications;
CREATE POLICY "career_applications_insert_anon" ON public.career_applications FOR INSERT TO public WITH CHECK (true);
```

### 2.4 Create `career_applications` table

Form submissions from the Contact page (careers). Same pattern: anon INSERT, authenticated SELECT.

```sql
CREATE TABLE public.career_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  position text NOT NULL,
  experience text,
  resume_link text,
  message text,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.career_applications ENABLE ROW LEVEL SECURITY;

-- INSERT: anon and authenticated (form can be submitted while logged in, e.g. admin testing)
CREATE POLICY "career_applications_insert_anon"
  ON public.career_applications FOR INSERT
  TO public
  WITH CHECK (true);

-- SELECT: authenticated (admin only)
CREATE POLICY "career_applications_select_authenticated"
  ON public.career_applications FOR SELECT
  TO authenticated
  USING (true);

-- UPDATE: authenticated (mark as read/unread)
CREATE POLICY "career_applications_update_authenticated"
  ON public.career_applications FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- DELETE: authenticated
CREATE POLICY "career_applications_delete_authenticated"
  ON public.career_applications FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);
```

### 2.5 Create `achievements` table

Achievement cards for the Home page "Our Achievements" section. Managed via the admin; public read.

```sql
CREATE TABLE public.achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  achievement_type text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now() NOT NULL,
  created_by uuid REFERENCES auth.users(id)
);

ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

-- SELECT: everyone (public read)
CREATE POLICY "achievements_select_public"
  ON public.achievements FOR SELECT
  USING (true);

-- INSERT: authenticated users only
CREATE POLICY "achievements_insert_authenticated"
  ON public.achievements FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- UPDATE: authenticated users only
CREATE POLICY "achievements_update_authenticated"
  ON public.achievements FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- DELETE: authenticated users only
CREATE POLICY "achievements_delete_authenticated"
  ON public.achievements FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);
```

### 2.6 Migration: add `sort_order` to gallery, news, achievements

If these tables already exist without `sort_order`, run the following in **SQL Editor**. Skip any `ADD COLUMN` for a table that already has `sort_order`.

**Gallery:**

```sql
ALTER TABLE public.gallery ADD COLUMN IF NOT EXISTS sort_order integer;
UPDATE public.gallery SET sort_order = t.rn FROM (SELECT id, (row_number() OVER (ORDER BY created_at DESC))::integer - 1 AS rn FROM public.gallery) t WHERE public.gallery.id = t.id;
ALTER TABLE public.gallery ALTER COLUMN sort_order SET DEFAULT 0;
ALTER TABLE public.gallery ALTER COLUMN sort_order SET NOT NULL;
```

**News:**

```sql
ALTER TABLE public.news ADD COLUMN IF NOT EXISTS sort_order integer;
UPDATE public.news SET sort_order = t.rn FROM (SELECT id, (row_number() OVER (ORDER BY published_at DESC))::integer - 1 AS rn FROM public.news) t WHERE public.news.id = t.id;
ALTER TABLE public.news ALTER COLUMN sort_order SET DEFAULT 0;
ALTER TABLE public.news ALTER COLUMN sort_order SET NOT NULL;
```

**Achievements:**

```sql
ALTER TABLE public.achievements ADD COLUMN IF NOT EXISTS sort_order integer;
UPDATE public.achievements SET sort_order = t.rn FROM (SELECT id, (row_number() OVER (ORDER BY created_at DESC))::integer - 1 AS rn FROM public.achievements) t WHERE public.achievements.id = t.id;
ALTER TABLE public.achievements ALTER COLUMN sort_order SET DEFAULT 0;
ALTER TABLE public.achievements ALTER COLUMN sort_order SET NOT NULL;
```

### 2.7 Migration: add `is_read` and UPDATE/DELETE to admission_inquiries and career_applications

If these tables already exist without `is_read` or without UPDATE/DELETE policies, run in **SQL Editor**.

**admission_inquiries:**

```sql
ALTER TABLE public.admission_inquiries ADD COLUMN IF NOT EXISTS is_read boolean NOT NULL DEFAULT false;

CREATE POLICY "admission_inquiries_update_authenticated"
  ON public.admission_inquiries FOR UPDATE TO authenticated
  USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "admission_inquiries_delete_authenticated"
  ON public.admission_inquiries FOR DELETE TO authenticated
  USING (auth.uid() IS NOT NULL);
```

If you see "policy already exists", drop it first: `DROP POLICY IF EXISTS "admission_inquiries_update_authenticated" ON public.admission_inquiries;` (and same for `_delete_`), then run the `CREATE POLICY` again.

**career_applications:**

```sql
ALTER TABLE public.career_applications ADD COLUMN IF NOT EXISTS is_read boolean NOT NULL DEFAULT false;

CREATE POLICY "career_applications_update_authenticated"
  ON public.career_applications FOR UPDATE TO authenticated
  USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "career_applications_delete_authenticated"
  ON public.career_applications FOR DELETE TO authenticated
  USING (auth.uid() IS NOT NULL);
```

---

## 3. Storage: `gallery-images` bucket

### 3.1 Create bucket (Dashboard)

1. Go to **Storage → New bucket**.
2. Name: `gallery-images`.
3. Enable **Public bucket** (so image URLs work in `<img src>`).
4. Create the bucket.

### 3.2 Storage RLS (SQL Editor)

Run:

```sql
-- SELECT: public read (anyone can view)
CREATE POLICY "gallery_images_select_public"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'gallery-images');

-- INSERT: authenticated users only (upload)
CREATE POLICY "gallery_images_insert_authenticated"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'gallery-images'
    AND auth.uid() IS NOT NULL
  );

-- UPDATE: authenticated users (e.g. replace file)
CREATE POLICY "gallery_images_update_authenticated"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'gallery-images' AND auth.uid() IS NOT NULL)
  WITH CHECK (bucket_id = 'gallery-images');

-- DELETE: authenticated users
CREATE POLICY "gallery_images_delete_authenticated"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'gallery-images' AND auth.uid() IS NOT NULL);
```

### 3.3 Storage: `achievement-images` bucket

1. Go to **Storage → New bucket**.
2. Name: `achievement-images`.
3. Enable **Public bucket**.
4. Create the bucket.

Run in SQL Editor:

```sql
CREATE POLICY "achievement_images_select_public"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'achievement-images');

CREATE POLICY "achievement_images_insert_authenticated"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'achievement-images'
    AND auth.uid() IS NOT NULL
  );

CREATE POLICY "achievement_images_update_authenticated"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'achievement-images' AND auth.uid() IS NOT NULL)
  WITH CHECK (bucket_id = 'achievement-images');

CREATE POLICY "achievement_images_delete_authenticated"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'achievement-images' AND auth.uid() IS NOT NULL);
```

### 3.4 Storage: `news-images` bucket

For optional image uploads on news posts.

1. Go to **Storage → New bucket**.
2. Name: `news-images`.
3. Enable **Public bucket**.
4. Create the bucket.

Run in SQL Editor:

```sql
CREATE POLICY "news_images_select_public"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'news-images');

CREATE POLICY "news_images_insert_authenticated"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'news-images'
    AND auth.uid() IS NOT NULL
  );

CREATE POLICY "news_images_update_authenticated"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'news-images' AND auth.uid() IS NOT NULL)
  WITH CHECK (bucket_id = 'news-images');

CREATE POLICY "news_images_delete_authenticated"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'news-images' AND auth.uid() IS NOT NULL);
```

---

## 4. First admin user

Any **authenticated** user is treated as an admin (create/edit/delete gallery and news).

**Option A – Sign up in the app**

1. Open `/login` (or the app’s login page if you add signup there).
2. If you only have a Login form: create a user in the Dashboard (Option B), then use those credentials to log in.

**Option B – Create in Supabase Dashboard**

1. Go to **Authentication → Users → Add user**.
2. Enter email and password.
3. Use that email/password to log in at `/login`.

**Restrict who can become admin (optional)**

- **Authentication → Providers → Email**: turn off **Enable email signup** for invite-only.
- Or keep signup on and use **Confirm email** so only verified addresses can sign in.

---

## 5. Checklist

- [ ] `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` set in `.env` at project root (and/or in Vercel/Netlify).
- [ ] `gallery` and `news` tables created with RLS policies.
- [ ] `achievements` table created with RLS (public SELECT, authenticated INSERT/UPDATE/DELETE).
- [ ] `admission_inquiries` and `career_applications` tables created with RLS (public INSERT, authenticated SELECT). If you see "new row violates row-level security policy", see **Troubleshooting** below.
- [ ] `gallery-images` bucket created (public) with Storage RLS.
- [ ] `achievement-images` bucket created (public) with Storage RLS.
- [ ] `news-images` bucket created (public) with Storage RLS.
- [ ] At least one user created (Dashboard or app) to use as admin.

---

## 6. Troubleshooting

### "new row violates row-level security policy" on form submit

The forms must allow INSERT from both anonymous and logged-in users. In **SQL Editor** run:

```sql
DROP POLICY IF EXISTS "admission_inquiries_insert_anon" ON public.admission_inquiries;
CREATE POLICY "admission_inquiries_insert_anon" ON public.admission_inquiries FOR INSERT TO public WITH CHECK (true);

DROP POLICY IF EXISTS "career_applications_insert_anon" ON public.career_applications;
CREATE POLICY "career_applications_insert_anon" ON public.career_applications FOR INSERT TO public WITH CHECK (true);
```

### “Failed to fetch” on login

- **Env not loaded:** Ensure `.env` is in the **project root** (same folder as `vite.config.ts`), with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (exact names, `VITE_` prefix).
- **Wrong key:** Use the **anon public** JWT from **Project Settings → API** (`eyJ...`), not the service role or a `sb_publishable_...` key.
- **Restart dev server:** After any `.env` change, stop and run `npm run dev` again.

### “Invalid login credentials” or “Invalid email or password”

- **Email+password not set:** If the user was created via **Add user** without a password, or via OAuth (e.g. Google), they may have no password. In **Authentication → Users**, open the user, use **Send password recovery** so they can set one, or **Delete** and create a new user with **Add user** and a password.
- **Email provider:** In **Authentication → Providers → Email**, ensure **Enable Email provider** is ON so email+password sign-in works.
