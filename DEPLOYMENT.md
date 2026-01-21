# Production Deployment Guide

## Pre-Deployment Checklist

✅ **Build Status**: Production build is working correctly
✅ **Code Splitting**: Optimized with manual chunks for better performance
✅ **SEO Meta Tags**: Added to index.html
✅ **TypeScript**: No type errors
✅ **Linting**: No linting errors

## Environment Variables

### Frontend

Set in your deployment platform (or `.env` at project root for local):

- `VITE_SUPABASE_URL` – Supabase project URL
- `VITE_SUPABASE_ANON_KEY` – Supabase anon public key

See `SUPABASE_SETUP.md` for details. Admission and career forms submit directly to Supabase; no separate backend is required.

## Deployment Platforms

### Netlify

1. **Build Settings** (already configured in `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist/public`

2. **Environment Variables**:
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Netlify dashboard → Site settings → Environment variables

3. **Deploy**:
   - Connect your Git repository
   - Netlify will automatically build and deploy

### Vercel (Recommended)

1. **Build Settings** (already configured in `vercel.json`):
   - Build command: `npm run build`
   - Output directory: `dist/public`

2. **Environment Variables** (Set in Vercel Dashboard → Settings → Environment Variables):
   - `VITE_SUPABASE_URL`: Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Supabase anon public key

3. **Deploy**:
   - Connect your Git repository
   - Vercel will automatically build and deploy

**See `VERCEL_DEPLOYMENT.md` for details.**

## Build Output

The production build creates optimized chunks:
- `react-vendor`: React and React DOM
- `router-vendor`: Wouter routing
- `ui-vendor`: Radix UI components
- `form-vendor`: Form handling libraries
- `index`: Main application code

All chunks are under 500KB for optimal loading performance.

## Post-Deployment

1. **Verify**:
   - Check that all pages load correctly
   - Test form submissions (Admissions and Contact pages); data is stored in Supabase and viewable in Admin → Inquiries
   - Verify images load properly
   - Test on mobile devices

2. **Performance**:
   - Check Lighthouse scores
   - Verify images are optimized
   - Test page load times

## Troubleshooting

### Forms Not Submitting
- Ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- Run the `admission_inquiries` and `career_applications` table creation SQL in Supabase (see `SUPABASE_SETUP.md`)
- Check browser console for errors

### Images Not Loading
- Verify public folder structure is correct
- Check image paths in Gallery.tsx match actual files
- Ensure images are included in the build

### Routing Issues
- Verify `netlify.toml` redirects or `vercel.json` rewrites are configured
- All routes should redirect to `/index.html` for client-side routing
