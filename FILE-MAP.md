# File Map: Which Files to Use

## 🔴 Vite Files (OLD - Will be removed/backed up)
```
❌ src/                          → OLD React app directory
❌ index.html                    → OLD Vite entry point
❌ vite.config.ts               → OLD Vite configuration
❌ package.json                 → OLD dependencies (Vite, React Router)
❌ package-lock.json            → OLD lock file
❌ tsconfig.json                → OLD TypeScript config
❌ tsconfig.app.json            → OLD TypeScript config
❌ tsconfig.node.json           → OLD TypeScript config
❌ tailwind.config.ts           → OLD Tailwind config
❌ postcss.config.js            → OLD PostCSS config
```

## 🟢 Next.js Files (NEW - These are what you'll use)
```
✅ app/                          → NEW Next.js pages
   ├── dashboard/page.tsx
   ├── login/page.tsx
   ├── register/page.tsx
   ├── forgot-password/page.tsx
   ├── layout.tsx
   ├── page.tsx
   └── globals.css

✅ components/                   → NEW React components
   ├── ui/                       → shadcn/ui components
   ├── AuthLayout.tsx
   ├── AuthForm.tsx
   ├── SocialLoginButtons.tsx
   ├── DashboardLayout.tsx
   ├── DashboardHeader.tsx
   ├── DashboardFooter.tsx
   ├── TVChannelList.tsx
   └── ChannelCard.tsx

✅ lib/                          → NEW utilities
   ├── supabase/
   │   ├── client.ts
   │   ├── server.ts
   │   └── middleware.ts
   └── utils.ts

✅ hooks/                        → Custom hooks
   └── use-toast.ts

✅ middleware.ts                 → Auth middleware

✅ package-nextjs.json           → NEW dependencies
✅ tsconfig-nextjs.json          → NEW TypeScript config
✅ tailwind-nextjs.config.ts    → NEW Tailwind config
✅ postcss-nextjs.config.js     → NEW PostCSS config
✅ next.config.ts               → Next.js configuration
✅ .env.local                   → Environment variables
✅ .env.example                 → Environment template
✅ .gitignore-nextjs            → NEW gitignore
```

## 📚 Documentation Files
```
📖 README-NEXTJS.md             → Complete Next.js documentation
📖 MIGRATION-GUIDE.md           → Step-by-step migration guide
📖 NEXTJS-SUMMARY.md            → Quick overview (this file)
📖 FILE-MAP.md                  → This file
```

## 🔧 Setup Scripts
```
🔧 setup-nextjs.bat             → Windows automated setup
🔧 setup-nextjs.sh              → Linux/Mac automated setup
```

## 🔄 What the Setup Script Does

When you run `setup-nextjs.bat` (Windows) or `setup-nextjs.sh` (Linux/Mac):

1. **Creates backup**: `vite-backup/` directory
   ```
   vite-backup/
   ├── src/                     → Your old React code
   ├── package.json             → Old dependencies
   └── ... (other Vite files)
   ```

2. **Removes** these files:
   ```
   ❌ src/
   ❌ index.html
   ❌ vite.config.ts
   ❌ package.json
   ❌ tsconfig.json
   ❌ tailwind.config.ts
   ❌ postcss.config.js
   ```

3. **Renames** Next.js files:
   ```
   package-nextjs.json           → package.json
   tsconfig-nextjs.json          → tsconfig.json
   tailwind-nextjs.config.ts     → tailwind.config.ts
   postcss-nextjs.config.js      → postcss.config.js
   .gitignore-nextjs             → .gitignore
   README-NEXTJS.md              → README.md
   ```

4. **Final structure** after setup:
   ```
   elementor-auth-flow/
   ├── app/                      ✅ Next.js pages
   ├── components/               ✅ Components
   ├── lib/                      ✅ Utilities
   ├── hooks/                    ✅ Hooks
   ├── public/                   ✅ Static files
   ├── vite-backup/              📦 Your old code
   ├── middleware.ts             ✅
   ├── package.json              ✅ (was package-nextjs.json)
   ├── tsconfig.json             ✅ (was tsconfig-nextjs.json)
   ├── tailwind.config.ts        ✅ (was tailwind-nextjs.config.ts)
   ├── next.config.ts            ✅
   ├── .env.local                ✅
   └── README.md                 ✅ (was README-NEXTJS.md)
   ```

## 🎯 Quick Decision Guide

### "Which files should I edit?"

**After running the setup script**, you'll edit:
- ✅ `package.json` (dependencies)
- ✅ `.env.local` (environment variables)
- ✅ Files in `app/` (pages)
- ✅ Files in `components/` (components)

**You won't need to touch**:
- ❌ Anything with `-nextjs` suffix (these get renamed)
- ❌ Anything in `vite-backup/` (that's just backup)
- ❌ Old Vite files (they're removed)

### "What if I want to keep both versions?"

Instead of running the setup script, manually create a new directory:

```bash
cd ..
mkdir elementor-auth-flow-nextjs
cd elementor-auth-flow-nextjs

# Copy Next.js files
cp -r ../elementor-auth-flow/app .
cp -r ../elementor-auth-flow/components .
cp -r ../elementor-auth-flow/lib .
cp -r ../elementor-auth-flow/hooks .
cp ../elementor-auth-flow/package-nextjs.json ./package.json
# ... etc
```

Then you'll have:
```
Desktop/tvstanici/
├── elementor-auth-flow/           → Original Vite version
└── elementor-auth-flow-nextjs/    → New Next.js version
```

## 🚀 After Setup, Run:

```bash
# Install dependencies (if not done by setup script)
npm install

# Start development server
npm run dev

# Visit
http://localhost:3000
```

## ✅ Verification Checklist

Your setup is correct if:
- [ ] `package.json` exists (not `package-nextjs.json`)
- [ ] `app/` directory exists
- [ ] `components/` directory exists
- [ ] `lib/` directory exists
- [ ] `middleware.ts` exists
- [ ] `.env.local` has Supabase credentials
- [ ] `vite-backup/` contains your old code (optional)
- [ ] `npm run dev` starts without errors

---

**TIP**: If you get confused, just run the setup script again. It will backup everything first!
