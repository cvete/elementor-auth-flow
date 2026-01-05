# Deployment Guide - tvstanici.net

## Prerequisites

1. A PostgreSQL database (you can use Vercel Postgres, Supabase, or any PostgreSQL provider)
2. A Resend account for email functionality
3. (Optional) Google OAuth credentials

## Step 1: Prepare Your Database

1. Create a PostgreSQL database
2. Note your database connection string (it should look like):
   ```
   postgresql://username:password@host:5432/database?schema=public
   ```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to [Vercel](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository: `cvete/elementor-auth-flow`
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Build Command**: `prisma generate && next build` (already configured)
   - **Output Directory**: `.next`

### Option B: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

## Step 3: Configure Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

### Required Variables:

```bash
# Database
DATABASE_URL=postgresql://username:password@host:5432/database?schema=public

# NextAuth
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-random-secret-string-min-32-chars

# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxx
FROM_EMAIL=noreply@your-verified-domain.com
```

### Optional Variables (for Google OAuth):

```bash
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Step 4: Generate NEXTAUTH_SECRET

Generate a secure secret:

```bash
openssl rand -base64 32
```

Or use: https://generate-secret.vercel.app/32

## Step 5: Setup Prisma Database

After deployment, run these commands to setup your database:

### Option A: Using Vercel CLI
```bash
vercel env pull .env.local
npx prisma generate
npx prisma db push
```

### Option B: Using SQL Console
Run the following SQL directly in your database:

```sql
-- Create User table
CREATE TABLE "User" (
  "id" TEXT NOT NULL,
  "name" TEXT,
  "email" TEXT NOT NULL,
  "emailVerified" TIMESTAMP(3),
  "password" TEXT,
  "image" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "passwordResetToken" TEXT,
  "passwordResetTokenExpires" TIMESTAMP(3),
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- Create VerificationToken table
CREATE TABLE "VerificationToken" (
  "token" TEXT NOT NULL,
  "identifier" TEXT NOT NULL,
  "expires" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("token")
);

-- Create indexes
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_passwordResetToken_key" ON "User"("passwordResetToken");
CREATE UNIQUE INDEX "VerificationToken_identifier_key" ON "VerificationToken"("identifier");
```

## Step 6: Configure Resend for Emails

1. Go to [Resend](https://resend.com)
2. Verify your domain (e.g., `email.tvstanici.net`)
3. Create an API key
4. Update `FROM_EMAIL` to use your verified domain

## Step 7: (Optional) Setup Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `https://your-domain.vercel.app/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/google` (for local dev)

## Step 8: Verify Deployment

1. Visit your Vercel URL
2. Test user registration
3. Check email verification
4. Test password reset
5. Test channel streaming
6. Test language switching

## Troubleshooting

### Database Connection Issues
- Ensure your `DATABASE_URL` is correct
- Check if Vercel can access your database (firewall rules)
- Verify SSL mode is correct

### Email Not Sending
- Verify your domain in Resend
- Check `FROM_EMAIL` matches verified domain
- Ensure `RESEND_API_KEY` is correct

### Build Failures
- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Verify `prisma generate` runs successfully

## Production Checklist

- [ ] Database is setup and accessible
- [ ] All environment variables are configured
- [ ] Prisma schema is applied to database
- [ ] Email domain is verified in Resend
- [ ] Google OAuth is configured (if used)
- [ ] Test user registration and email verification
- [ ] Test password reset functionality
- [ ] Test all three languages (EN, MK, DE)
- [ ] Verify TV channels load correctly
- [ ] Check mobile responsiveness

## Custom Domain Setup

1. In Vercel Dashboard → Settings → Domains
2. Add your custom domain (e.g., `tvstanici.net`)
3. Configure DNS records as instructed
4. Update `NEXTAUTH_URL` environment variable

## Support

Repository: https://github.com/cvete/elementor-auth-flow
Issues: https://github.com/cvete/elementor-auth-flow/issues
