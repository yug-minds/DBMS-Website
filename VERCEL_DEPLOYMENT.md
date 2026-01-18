# Vercel Deployment Guide

This guide explains how to deploy the entire website (frontend + backend) to Vercel using serverless functions.

## Overview

The website is now configured to run entirely on Vercel:
- **Frontend**: React + Vite application (served as static files)
- **Backend**: Express routes converted to Vercel Serverless Functions (in `/api` directory)

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. GitHub/GitLab/Bitbucket account (for Git integration)
3. Gmail account with App Password (for email functionality)

## Deployment Steps

### 1. Prepare Your Repository

Make sure your code is committed to a Git repository (GitHub, GitLab, or Bitbucket).

### 2. Install Dependencies

Run this command locally to ensure all dependencies are installed:

```bash
npm install
```

This will install all frontend and backend dependencies (including `nodemailer` for email functionality).

### 3. Get Gmail App Password

If you haven't already:

1. Go to https://myaccount.google.com/
2. Enable **2-Step Verification** (required for App Passwords)
3. Go to **App passwords**: https://myaccount.google.com/apppasswords
4. Generate a new app password for "Mail"
5. Copy the 16-character password (you'll need this for step 5)

### 4. Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Import your Git repository
4. Vercel will auto-detect the configuration:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`
5. Click **"Deploy"**

#### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Follow the prompts to complete deployment.

### 5. Configure Environment Variables

After initial deployment, configure environment variables:

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `EMAIL_USER` | `your-email@gmail.com` | Your Gmail address |
| `EMAIL_PASS` | `xxxx xxxx xxxx xxxx` | Gmail App Password (16 characters, no spaces) |
| `RECEIVER_EMAIL` | `dawnbudsmodelschool@gmail.com` | Email to receive inquiries |
| `NODE_ENV` | `production` | (Usually set automatically by Vercel) |

**Important Notes:**
- `EMAIL_PASS` should be your Gmail App Password (NOT your regular Gmail password)
- Remove any spaces from the App Password
- For production, set the environment to **Production**
- Optionally set for Preview and Development environments if needed

### 6. Redeploy

After setting environment variables, redeploy your application:

1. Go to **Deployments** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**

Or trigger a new deployment by pushing to your repository.

## How It Works

### Frontend
- Built with Vite and served as static files from `dist/public`
- Client-side routing handled by Vercel rewrites (configured in `vercel.json`)

### Backend (Serverless Functions)
- API endpoints are in the `/api` directory:
  - `/api/admission-inquiry` - Handles admission form submissions
  - `/api/career-application` - Handles career application submissions
  - `/api/health` - Health check endpoint
- Each function is automatically deployed as a Vercel Serverless Function
- Functions run on-demand (serverless) and scale automatically

### API Endpoints

Once deployed, your API endpoints will be available at:
- `https://your-domain.vercel.app/api/admission-inquiry`
- `https://your-domain.vercel.app/api/career-application`
- `https://your-domain.vercel.app/api/health`

The frontend automatically uses relative URLs (no `VITE_API_URL` needed in production).

## Local Development

For local development with Vercel serverless functions:

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Run Vercel dev server (runs both frontend and API functions)
vercel dev
```

Or continue using the old Express server for local development:

```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend (old Express server)
npm run dev:server

# Set VITE_API_URL for local development (optional)
# Create .env file in root or client directory:
# VITE_API_URL=http://localhost:3001
```

## Testing Deployment

After deployment, test the following:

1. **Health Check**: Visit `https://your-domain.vercel.app/api/health`
   - Should return: `{"status":"ok","message":"Server is running"}`

2. **Admission Form**: 
   - Go to `/admissions` page
   - Fill out and submit the form
   - Check your email (`RECEIVER_EMAIL`) for the inquiry
   - Check the submitted email for confirmation

3. **Career Application**:
   - Go to `/contact` page
   - Fill out and submit the career application form
   - Check your email for the application

## Troubleshooting

### Email Not Sending

1. **Check App Password**: Make sure you're using a Gmail App Password (16 characters), not your regular password
2. **Verify 2-Step Verification**: Must be enabled to generate App Passwords
3. **Check Environment Variables**: Ensure all variables are set correctly in Vercel Dashboard
4. **Check Function Logs**: Go to **Deployments** → Click deployment → **Functions** tab → Check logs

### API Endpoints Not Working

1. **Check Function Logs**: Vercel Dashboard → Deployments → Functions
2. **Verify File Structure**: Ensure `/api` directory is in the root of your project
3. **Check CORS**: Functions already include CORS headers, but verify if testing from different domains

### Build Errors

1. **Missing Dependencies**: Run `npm install` and ensure `nodemailer` is in `package.json`
2. **TypeScript Errors**: Run `npm run check` to check for type errors
3. **Build Logs**: Check Vercel build logs for detailed error messages

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `EMAIL_USER` | Yes | Gmail address to send emails from | `your-email@gmail.com` |
| `EMAIL_PASS` | Yes | Gmail App Password (16 characters) | `abcd efgh ijkl mnop` |
| `RECEIVER_EMAIL` | No* | Email to receive inquiries (defaults to `dawnbudsmodelschool@gmail.com`) | `dawnbudsmodelschool@gmail.com` |
| `NODE_ENV` | No | Environment (automatically set by Vercel) | `production` |
| `VITE_API_URL` | No | API URL for frontend (leave empty for Vercel - uses relative URLs) | _(empty for Vercel)_ |

*Optional but recommended to explicitly set

## Cost Considerations

Vercel offers:
- **Free Tier**: 100GB bandwidth, 100 serverless function executions/day
- **Hobby Plan**: $20/month - Unlimited bandwidth and function executions
- **Pro Plan**: $20/user/month - Additional features for teams

For most school websites, the free tier should be sufficient.

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions/runtimes/node-js)
- [Gmail App Passwords Setup Guide](https://support.google.com/accounts/answer/185833)
