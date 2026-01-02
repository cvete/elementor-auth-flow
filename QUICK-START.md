# Quick Start Guide - Next.js Version

## 🚀 3-Step Setup

### Step 1: Run the Setup Script

**On Windows:**
```bash
setup-nextjs.bat
```

**On Linux/Mac:**
```bash
chmod +x setup-nextjs.sh
./setup-nextjs.sh
```

This will automatically:
- ✅ Backup your Vite files
- ✅ Remove old files
- ✅ Rename Next.js files
- ✅ Install dependencies

### Step 2: Configure Supabase

Your `.env.local` is already created with credentials. No changes needed unless you want to use a different Supabase project.

### Step 3: Start Development Server

```bash
npm run dev
```

Visit: **http://localhost:3000**

---

## ✅ That's It!

You should now see your login page at `http://localhost:3000`

## 📝 Test the App

1. **Register**: Go to `/register` and create an account
2. **Login**: Login with your credentials
3. **Dashboard**: You should be redirected to `/dashboard`
4. **Browse**: Check out the TV channels
5. **Sign Out**: Click "Sign Out" in the header

---

## ❌ Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules .next
npm install
```

### "Supabase connection failed"
Check `.env.local` has correct values:
```env
NEXT_PUBLIC_SUPABASE_URL=https://vbswbnktvfivrmwnqgkt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### "Port 3000 already in use"
```bash
# Kill the process using port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

### Setup script doesn't run
**Windows**: Right-click `setup-nextjs.bat` → "Run as administrator"
**Linux/Mac**: Make sure it's executable: `chmod +x setup-nextjs.sh`

---

## 📖 Need More Help?

- **Full Documentation**: [README-NEXTJS.md](README-NEXTJS.md)
- **Migration Details**: [MIGRATION-GUIDE.md](MIGRATION-GUIDE.md)
- **File Structure**: [FILE-MAP.md](FILE-MAP.md)
- **Complete Overview**: [NEXTJS-SUMMARY.md](NEXTJS-SUMMARY.md)

---

## 🎉 Success Indicators

Your setup worked if you can:
- ✅ Run `npm run dev` without errors
- ✅ See the login page at `http://localhost:3000`
- ✅ Register a new account
- ✅ Login successfully
- ✅ Access the dashboard
- ✅ See TV channel cards

---

**Happy coding! 🚀**
