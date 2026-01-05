# Production Debugging Guide

## Current Issue
Login and registration not working on https://elementor-auth-flow.vercel.app

**Symptoms:**
- Registration shows "user already registered" error
- Login just refreshes the page without error message
- Environment variables are confirmed set in Vercel

## Diagnostic Steps

### Step 1: Test Database Connection

Visit: https://elementor-auth-flow.vercel.app/api/test-connection

This endpoint will return:
- Database connection status
- User count in database
- Sample user info (without sensitive data)
- Environment variable presence check

**Expected Response:**
```json
{
  "success": true,
  "message": "Database connection successful",
  "data": {
    "userCount": 1,
    "sampleUser": {
      "id": "xxx",
      "email": "user@example.com",
      "emailVerified": true,
      "createdAt": "2025-01-05T..."
    },
    "environment": {
      "nodeEnv": "production",
      "hasNextAuthUrl": true,
      "hasNextAuthSecret": true,
      "hasDatabaseUrl": true
    }
  }
}
```

**If this fails:**
- Database connection is broken
- Check DATABASE_URL in Vercel environment variables
- Ensure database is accessible from Vercel's IP ranges

### Step 2: Check Vercel Function Logs

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to "Deployments" tab
4. Click on the latest deployment
5. Click "Functions" tab
6. Look for error logs during login attempts

**What to look for:**
- `[AUTH]` prefixed logs from auth.ts
- Database connection errors
- NextAuth errors
- JWT/session errors

### Step 3: Verify Environment Variables

**Required variables in Vercel:**

```bash
DATABASE_URL=postgresql://user:password@host:5432/database
NEXTAUTH_URL=https://elementor-auth-flow.vercel.app
NEXTAUTH_SECRET=<32+ character random string>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
RESEND_API_KEY=<your-resend-api-key>
FROM_EMAIL=noreply@yourdomain.com
```

**Common issues:**
- `NEXTAUTH_URL` must NOT have trailing slash
- `NEXTAUTH_URL` must match exactly (http vs https)
- `NEXTAUTH_SECRET` should be 32+ characters
- `DATABASE_URL` must be accessible from Vercel

### Step 4: Verify Database Schema

The database might be connected but missing tables. Run this command locally with production database URL:

```bash
# Set production database URL temporarily
export DATABASE_URL="your-production-database-url"

# Apply schema
npx prisma db push

# Or run migrations
npx prisma migrate deploy
```

### Step 5: Test Login with Browser Console

1. Open https://elementor-auth-flow.vercel.app/login
2. Open browser DevTools (F12)
3. Go to Console tab
4. Try to login
5. Look for console logs starting with `[AUTH]`

**What you should see:**
```
Attempting login with email: user@example.com
Login result: { ok: true, error: null, ... }
Login successful, redirecting...
```

**What indicates a problem:**
```
Login result: { ok: false, error: "CredentialsSignin" }
```

### Step 6: Check Network Tab

1. Open https://elementor-auth-flow.vercel.app/login
2. Open browser DevTools (F12)
3. Go to Network tab
4. Try to login
5. Look for POST request to `/api/auth/callback/credentials`

**Check:**
- Status code (should be 200 or 302 redirect)
- Response body
- Response cookies (should set next-auth.session-token)

### Step 7: Verify Cookie Settings

NextAuth needs to set cookies. Check if cookies are being set:

1. Go to Application tab in DevTools
2. Look under Cookies > https://elementor-auth-flow.vercel.app
3. Look for cookies like:
   - `next-auth.session-token`
   - `next-auth.csrf-token`
   - `next-auth.callback-url`

**If cookies are missing:**
- Browser might be blocking cookies
- NEXTAUTH_URL mismatch
- Cookie domain issues

## Common Fixes

### Fix 1: Regenerate NEXTAUTH_SECRET

```bash
# Generate a new secret
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Update in Vercel environment variables and redeploy.

### Fix 2: Database Schema Not Applied

```bash
# Connect to production database
export DATABASE_URL="your-production-database-url"

# Push schema
npx prisma db push
```

### Fix 3: NEXTAUTH_URL Mismatch

Ensure it's exactly: `https://elementor-auth-flow.vercel.app` (no trailing slash)

### Fix 4: Redeploy After Environment Variable Changes

After changing environment variables in Vercel:
1. Go to Deployments
2. Click "..." on latest deployment
3. Click "Redeploy"

Environment variables don't take effect until you redeploy!

## Testing the Fix

After applying fixes:

1. Visit https://elementor-auth-flow.vercel.app/api/test-connection
   - Should return success with user count

2. Try to register a NEW user with a NEW email
   - Should receive verification email
   - Should redirect to login page

3. Try to login with existing user
   - Should redirect to /dashboard
   - Should see user name in header

## Still Not Working?

If the issue persists after all steps:

1. Check if the database is on a private network
   - Vercel needs public access or VPC connection

2. Check if database has connection limits
   - Vercel functions are serverless and create many connections
   - Consider using connection pooling (e.g., PgBouncer)

3. Check Vercel function timeout
   - Default is 10 seconds for hobby plan
   - Database queries might be timing out

4. Try a test deployment with a different database
   - Rule out database-specific issues

## Contact Support

If none of these steps work, provide:
- Output from /api/test-connection
- Vercel function logs during login attempt
- Browser console logs during login attempt
- Network tab screenshot showing the auth callback request
