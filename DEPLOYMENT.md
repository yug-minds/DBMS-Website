# Production Deployment Guide

## Pre-Deployment Checklist

✅ **Build Status**: Production build is working correctly
✅ **Code Splitting**: Optimized with manual chunks for better performance
✅ **SEO Meta Tags**: Added to index.html
✅ **TypeScript**: No type errors
✅ **Linting**: No linting errors

## Environment Variables

### Frontend (Client)

Create a `.env` file in the `client` directory (or set in your deployment platform):

```env
# Production API URL - Update this with your deployed server URL
VITE_API_URL=https://your-api-server.com
```

**Important**: 
- For Netlify: Set environment variables in Site settings → Environment variables
- For Vercel: Set environment variables in Project settings → Environment Variables
- The default fallback is `http://localhost:3001` (for development only)

### Backend (Server)

See `server/README.md` for server environment variable setup.

## Deployment Platforms

### Netlify

1. **Build Settings** (already configured in `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist/public`

2. **Environment Variables**:
   - Add `VITE_API_URL` in Netlify dashboard → Site settings → Environment variables

3. **Deploy**:
   - Connect your Git repository
   - Netlify will automatically build and deploy

### Vercel (Recommended - Full Stack Deployment)

**Option 1: Vercel Serverless Functions (Recommended)**

The backend has been converted to Vercel Serverless Functions located in `/api` directory. This allows the entire application (frontend + backend) to run on Vercel.

1. **Build Settings** (already configured in `vercel.json`):
   - Build command: `npm run build`
   - Output directory: `dist/public`
   - API functions are automatically detected from `/api` directory

2. **Environment Variables** (Set in Vercel Dashboard → Settings → Environment Variables):
   - `EMAIL_USER`: Your Gmail address
   - `EMAIL_PASS`: Gmail App Password (16 characters)
   - `RECEIVER_EMAIL`: Email to receive inquiries (defaults to `dawnbudsmodelschool@gmail.com`)
   - `NODE_ENV`: `production` (usually set automatically)
   - `VITE_API_URL`: Leave empty (uses relative URLs for same-domain API)

3. **Deploy**:
   - Connect your Git repository
   - Vercel will automatically build and deploy both frontend and API functions

**See `VERCEL_DEPLOYMENT.md` for detailed instructions.**

**Option 2: Vercel Frontend + Separate Backend**

If you prefer to keep the Express server separate:

1. **Build Settings** (already configured in `vercel.json`):
   - Build command: `npm run build`
   - Output directory: `dist/public`

2. **Environment Variables**:
   - Add `VITE_API_URL` in Vercel dashboard → Project settings → Environment Variables
   - Point to your separately deployed backend server

3. **Deploy**:
   - Connect your Git repository
   - Vercel will automatically build and deploy

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
   - Test form submissions (Admissions and Contact pages)
   - Verify images load properly
   - Test on mobile devices

2. **API Configuration**:
   - Ensure your backend server is deployed and accessible
   - Update `VITE_API_URL` to point to your production API
   - Test form submissions end-to-end

3. **Performance**:
   - Check Lighthouse scores
   - Verify images are optimized
   - Test page load times

## Troubleshooting

### Forms Not Submitting
- Check that `VITE_API_URL` is set correctly
- Verify backend server is running and accessible
- Check browser console for errors

### Images Not Loading
- Verify public folder structure is correct
- Check image paths in Gallery.tsx match actual files
- Ensure images are included in the build

### Routing Issues
- Verify `_redirects` file (Netlify) or `vercel.json` rewrites are configured
- All routes should redirect to `/index.html` for client-side routing
