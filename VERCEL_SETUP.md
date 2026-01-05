# Vercel Deployment Checklist

Your app is deployed at: https://elementor-auth-flow.vercel.app

## ⚠️ CRITICAL: Environment Variables

You MUST set these environment variables in Vercel Dashboard → Settings → Environment Variables:

### 1. Database (REQUIRED)
```
DATABASE_URL=postgresql://username:password@host:5432/database?schema=public
```
**Current Issue**: If login is not working, this is likely not set or incorrect.

To get a PostgreSQL database:
- Option 1: Use Vercel Postgres (recommended)
  - Go to Vercel Dashboard → Storage → Create Database → Postgres
  - Copy the DATABASE_URL it provides
  
- Option 2: Use Supabase
  - Go to supabase.com → New Project
  - Go to Settings → Database → Connection String → Direct Connection
  
- Option 3: Use your existing database
  - Format: `postgresql://user:password@host:5432/dbname?schema=public`

### 2. NextAuth (REQUIRED)
```
NEXTAUTH_URL=https://elementor-auth-flow.vercel.app
NEXTAUTH_SECRET=generate-a-random-32-character-string
```

Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```
Or visit: https://generate-secret.vercel.app/32

### 3. Email (REQUIRED for password reset)
```
RESEND_API_KEY=re_xxxxxxxxxxxxx
FROM_EMAIL=hi@email.tvstanici.net
```

### 4. Google OAuth (OPTIONAL)
```
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Setting Environment Variables in Vercel

1. Go to: https://vercel.com/cvet/elementor-auth-flow/settings/environment-variables
2. Add each variable:
   - Click "Add New"
   - Enter Key (e.g., DATABASE_URL)
   - Enter Value
   - Select Environment: Production, Preview, Development (select all)
   - Click "Save"
3. After adding ALL variables, redeploy:
   - Go to Deployments tab
   - Click "..." on latest deployment
   - Click "Redeploy"

## Database Setup

After setting DATABASE_URL, you need to create the database tables:

### Option 1: Using Prisma Studio (Easiest)
```bash
# Clone your repo locally
git clone https://github.com/cvete/elementor-auth-flow
cd elementor-auth-flow

# Install dependencies
npm install

# Set your DATABASE_URL in .env file
echo "DATABASE_URL=your-database-url-here" > .env

# Push schema to database
npx prisma db push

# (Optional) Open Prisma Studio to verify
npx prisma studio
```

### Option 2: Using SQL Directly
Run this SQL in your database console:

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

## Testing the Fix

1. After setting environment variables and deploying
2. Try to register a new user at: https://elementor-auth-flow.vercel.app/register
3. Check the Vercel logs for any errors:
   - Go to Vercel Dashboard → Deployments → View Function Logs
4. Try to login

## Common Issues

### "Login button doesn't work"
- Database not connected (DATABASE_URL not set)
- Check Vercel Function Logs for errors

### "No error message shown"
- This usually means the request didn't complete
- Check browser console (F12) for JavaScript errors
- Check Vercel Function Logs

### "Database error"
- Prisma schema not applied to database
- Run `npx prisma db push` locally with your DATABASE_URL

### "Invalid credentials" even with correct password
- User doesn't exist in database
- Register first, then login

## Quick Start (New Database)

If you're starting fresh:

1. Set ALL environment variables in Vercel
2. Clone repo and run locally:
   ```bash
   git clone https://github.com/cvete/elementor-auth-flow
   cd elementor-auth-flow
   npm install
   echo "DATABASE_URL=your-production-database-url" > .env
   npx prisma db push
   ```
3. Register a new user on production site
4. Login with that user

## Need Help?

Check Vercel Logs:
- https://vercel.com/cvete/elementor-auth-flow/logs

Check Database Connection:
- Can you connect to your database with the DATABASE_URL?
- Use a tool like pgAdmin or TablePlus to test

Browser Console:
- Open Developer Tools (F12)
- Check Console tab for errors
- Check Network tab to see failed requests
