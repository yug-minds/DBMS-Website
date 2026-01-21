# Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

Create a `.env` file in the **project root** (same folder as `vite.config.ts`):

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Get these from **Supabase Dashboard → Project Settings → API**.  
See [SUPABASE_SETUP.md](SUPABASE_SETUP.md) for:

- Creating `gallery`, `news`, `admission_inquiries`, and `career_applications` tables with RLS
- `gallery-images` storage bucket
- First admin user

### 3. Run the App

```bash
npm run dev
```

Open http://localhost:5173 (or the URL Vite prints).

## Forms and Admin

- **Admission form** (`/admissions`): Submissions go to Supabase `admission_inquiries`.
- **Career form** (`/contact`): Submissions go to Supabase `career_applications`.
- **Admin** (`/admin`): Log in with a Supabase user. Use **Inquiries** to view admission and career responses; **Manage Gallery** and **Manage Latest News** for CMS.

## Troubleshooting

- **Forms not saving**: Run the `admission_inquiries` and `career_applications` SQL in `SUPABASE_SETUP.md` (sections 2.3 and 2.4).
- **Login fails**: Check `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`; restart `npm run dev` after changing `.env`.
- **Build**: `npm run build` and `npm run check` (TypeScript).
