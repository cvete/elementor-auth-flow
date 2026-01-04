# Deployment Guide

## Prerequisites

Before deploying to Netlify, you need:

1. **A Production PostgreSQL Database**
2. **Environment Variables configured in Netlify**

## Step 1: Set Up Production Database

You need a hosted PostgreSQL database. Here are free options:

### Option A: Neon (Recommended - Easiest)

1. Go to [https://neon.tech](https://neon.tech)
2. Sign up for free
3. Create a new project
4. Copy the connection string (looks like: `postgresql://username:password@host/database`)

### Option B: Supabase

1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project
3. Go to Project Settings → Database
4. Copy the connection string (choose "Connection string" → "Nodejs")

### Option C: Railway

1. Go to [https://railway.app](https://railway.app)
2. Create a new project
3. Add PostgreSQL service
4. Copy the connection string from the "Connect" tab

## Step 2: Run Prisma Migration on Production Database

After getting your production database URL:

```bash
# Set the production database URL temporarily
export DATABASE_URL="your-production-database-url-here"

# Run migrations
npx prisma migrate deploy

# Or if on Windows:
set DATABASE_URL=your-production-database-url-here
npx prisma migrate deploy
```

## Step 3: Configure Netlify Environment Variables

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add the following variables:

### Required Variables:

| Variable Name | Value | Description |
|--------------|-------|-------------|
| `DATABASE_URL` | `postgresql://user:pass@host/db` | Your production PostgreSQL connection string |
| `NEXTAUTH_URL` | `https://your-site.netlify.app` | Your Netlify site URL |
| `NEXTAUTH_SECRET` | Generate with `openssl rand -base64 32` | Random secret for NextAuth |

### Optional Variables (for Google OAuth):

| Variable Name | Value | Description |
|--------------|-------|-------------|
| `GOOGLE_CLIENT_ID` | Your Google OAuth Client ID | Get from Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | Your Google OAuth Client Secret | Get from Google Cloud Console |

## Step 4: Deploy

Once environment variables are configured:

1. Push your code to GitHub (already done)
2. Netlify will automatically redeploy
3. Or manually trigger a redeploy in Netlify dashboard

## Troubleshooting

### Error: "Cannot find module '@prisma/client'"

- Make sure `postinstall` script is in package.json
- Redeploy the site

### Error: "Can't reach database server"

- Check that DATABASE_URL is set correctly in Netlify
- Verify your database is accessible from external connections
- Check if your database provider requires IP whitelisting

### 500 Error on /api/auth endpoints

- Verify NEXTAUTH_SECRET is set
- Verify NEXTAUTH_URL matches your Netlify domain
- Check Netlify function logs for detailed errors

## Google OAuth Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Add authorized redirect URIs:
   - `https://your-site.netlify.app/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/google` (for local dev)
6. Copy Client ID and Client Secret
7. Add to Netlify environment variables

## Local Development

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your local database and credentials.
