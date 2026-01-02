# Migration Guide: Vite + React to Next.js

This guide will help you complete the migration from the Vite version to the Next.js version of the tvstanici application.

## Current State

Your project currently contains both versions:
- **Vite version**: Original code in `src/` directory
- **Next.js version**: New code in `app/`, `components/`, `lib/` directories

## File Reorganization Steps

To use the Next.js version, you need to reorganize your project files:

### Option 1: Clean Installation (Recommended)

1. **Backup your current project**:
   ```bash
   cd ..
   cp -r elementor-auth-flow elementor-auth-flow-vite-backup
   cd elementor-auth-flow
   ```

2. **Remove Vite-specific files**:
   ```bash
   rm -rf src/
   rm -f index.html
   rm -f vite.config.ts
   rm -f package.json
   rm -f package-lock.json
   rm -f tsconfig.json
   rm -f tsconfig.app.json
   rm -f tsconfig.node.json
   rm -f tailwind.config.ts
   rm -f postcss.config.js
   ```

3. **Rename Next.js config files**:
   ```bash
   mv package-nextjs.json package.json
   mv tsconfig-nextjs.json tsconfig.json
   mv tailwind-nextjs.config.ts tailwind.config.ts
   mv postcss-nextjs.config.js postcss.config.js
   mv .gitignore-nextjs .gitignore
   mv README-NEXTJS.md README.md
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

### Option 2: Keep Both Versions

If you want to keep both versions in separate directories:

1. **Create a new directory for Next.js version**:
   ```bash
   cd ..
   mkdir elementor-auth-flow-nextjs
   cd elementor-auth-flow-nextjs
   ```

2. **Copy Next.js files from original directory**:
   ```bash
   # Copy application directories
   cp -r ../elementor-auth-flow/app .
   cp -r ../elementor-auth-flow/components .
   cp -r ../elementor-auth-flow/lib .
   cp -r ../elementor-auth-flow/hooks .
   cp -r ../elementor-auth-flow/public .

   # Copy configuration files
   cp ../elementor-auth-flow/package-nextjs.json ./package.json
   cp ../elementor-auth-flow/tsconfig-nextjs.json ./tsconfig.json
   cp ../elementor-auth-flow/tailwind-nextjs.config.ts ./tailwind.config.ts
   cp ../elementor-auth-flow/postcss-nextjs.config.js ./postcss.config.js
   cp ../elementor-auth-flow/next.config.ts .
   cp ../elementor-auth-flow/middleware.ts .
   cp ../elementor-auth-flow/.env.local .
   cp ../elementor-auth-flow/.env.example .
   cp ../elementor-auth-flow/.gitignore-nextjs ./.gitignore
   cp ../elementor-auth-flow/README-NEXTJS.md ./README.md
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## Configuration Checklist

After reorganizing, verify these configurations:

### 1. Environment Variables
- [ ] Create `.env.local` with Supabase credentials
- [ ] Verify `NEXT_PUBLIC_SUPABASE_URL` is set
- [ ] Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set

### 2. Supabase Setup
- [ ] Supabase project is active
- [ ] Email authentication is enabled
- [ ] Redirect URLs are configured (add `http://localhost:3000/dashboard`)

### 3. Dependencies
- [ ] All npm packages installed successfully
- [ ] No peer dependency warnings

### 4. File Structure
```
project-root/
├── app/                    # Next.js pages
├── components/             # React components
├── lib/                    # Utilities and Supabase
├── hooks/                  # Custom hooks
├── public/                 # Static assets
├── middleware.ts           # Auth middleware
├── next.config.ts          # Next.js config
├── tailwind.config.ts      # Tailwind config
├── tsconfig.json           # TypeScript config
└── package.json            # Dependencies
```

## Testing the Migration

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Test Authentication Flow**:
   - [ ] Visit `http://localhost:3000` (should redirect to `/login`)
   - [ ] Register a new account at `/register`
   - [ ] Check email for verification (if required)
   - [ ] Login at `/login`
   - [ ] Verify redirect to `/dashboard`
   - [ ] Test sign out functionality
   - [ ] Verify redirect back to `/login`

3. **Test Protected Routes**:
   - [ ] Try accessing `/dashboard` while logged out (should redirect to login)
   - [ ] Login and access `/dashboard` (should work)

4. **Test UI Components**:
   - [ ] Verify TV channel cards display correctly
   - [ ] Test tab switching (Trending vs On Demand)
   - [ ] Verify responsive design on mobile
   - [ ] Check all buttons and forms work

## Key Changes from Vite Version

### 1. Import Statements
```typescript
// Vite (old)
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

// Next.js (new)
import Link from 'next/link'
import { useRouter } from 'next/navigation'
```

### 2. Navigation
```typescript
// Vite (old)
const navigate = useNavigate()
navigate('/dashboard')

// Next.js (new)
const router = useRouter()
router.push('/dashboard')
router.refresh() // if you need to refresh server data
```

### 3. Images
```typescript
// Vite (old)
<img src={logo} alt="Logo" />

// Next.js (new)
import Image from 'next/image'
<Image src={logo} alt="Logo" fill />
```

### 4. Client Components
All components using hooks or browser APIs need `'use client'` at the top:
```typescript
'use client';

import { useState } from 'react';
```

## Troubleshooting

### Issue: Module not found
**Solution**: Ensure all imports use the `@/` alias correctly:
```typescript
import { Button } from "@/components/ui/button"
```

### Issue: Supabase errors
**Solution**:
1. Check `.env.local` exists and has correct values
2. Restart dev server after changing env variables
3. Verify Supabase project is active

### Issue: Middleware not working
**Solution**:
1. Check `middleware.ts` exists in root directory
2. Verify matcher patterns are correct
3. Clear browser cookies and try again

### Issue: Build errors
**Solution**:
1. Delete `.next` folder: `rm -rf .next`
2. Clear npm cache: `npm cache clean --force`
3. Reinstall: `rm -rf node_modules && npm install`

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production
Remember to add these in your deployment platform:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Need Help?

Refer to the official documentation:
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase SSR Documentation](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
