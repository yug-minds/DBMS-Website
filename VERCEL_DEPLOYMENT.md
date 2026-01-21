# Vercel Deployment Guide

This guide explains how to deploy the website to Vercel.

## Overview

The website runs on Vercel:
- **Frontend**: React + Vite application (served as static files)
- **Forms**: Admission and career forms submit directly to Supabase (no email). View responses in Admin → Inquiries.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. GitHub/GitLab/Bitbucket account (for Git integration)
3. Supabase project with `admission_inquiries` and `career_applications` tables (see `SUPABASE_SETUP.md`)

## Deployment Steps

### 1. Prepare Your Repository

Make sure your code is committed to a Git repository (GitHub, GitLab, or Bitbucket).

### 2. Install Dependencies

Run this command locally to ensure all dependencies are installed:

```bash
npm install
```

This will install all dependencies.

### 3. Deploy to Vercel

#### Deploy via Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Import your Git repository
4. Vercel will auto-detect: **Framework Preset** Vite, **Build Command** `npm run build`, **Output Directory** `dist/public`
5. Click **"Deploy"**

#### Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Follow the prompts to complete deployment.

### 4. Configure Environment Variables

After initial deployment:

1. Go to your project in Vercel Dashboard → **Settings** → **Environment Variables**
2. Add:
   - `VITE_SUPABASE_URL`: your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Supabase anon public key (Project Settings → API)

Set for **Production** (and optionally Preview/Development).

### 5. Redeploy

After setting environment variables, redeploy your application:

1. Go to **Deployments** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**

Or trigger a new deployment by pushing to your repository.

## How It Works

### Frontend
- Built with Vite and served as static files from `dist/public`
- Client-side routing handled by Vercel rewrites (configured in `vercel.json`)

### Forms
- **Admission and career forms**: Submit directly to Supabase. View responses in **Admin → Inquiries**.

## Local Development

```bash
npm run dev
```

Ensure `.env` at project root has `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

## Testing Deployment

1. **Admission form** (`/admissions`): Submit and confirm the row appears in Supabase `admission_inquiries` or in Admin → Inquiries.
2. **Career form** (`/contact`): Submit and confirm in Supabase `career_applications` or Admin → Inquiries.

## Troubleshooting

### Build Errors

1. **Missing Dependencies**: Run `npm install`
2. **TypeScript Errors**: Run `npm run check`
3. **Build Logs**: Check Vercel build logs for detailed error messages

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SUPABASE_URL` | Yes | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Yes | Supabase anon public key (Project Settings → API) |

## Cost Considerations

Vercel offers:
- **Free Tier**: 100GB bandwidth, 100 serverless function executions/day
- **Hobby Plan**: $20/month - Unlimited bandwidth and function executions
- **Pro Plan**: $20/user/month - Additional features for teams

For most school websites, the free tier should be sufficient.

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [SUPABASE_SETUP.md](SUPABASE_SETUP.md) for database and RLS
