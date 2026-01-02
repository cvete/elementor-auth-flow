#!/bin/bash

# Setup script for Next.js migration
# This script will prepare your project to use the Next.js version

echo "======================================"
echo "Next.js Migration Setup Script"
echo "======================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package-nextjs.json" ]; then
    echo "Error: package-nextjs.json not found!"
    echo "Please run this script from the project root directory."
    exit 1
fi

echo "This script will:"
echo "1. Backup Vite files to 'vite-backup/' directory"
echo "2. Remove Vite-specific files"
echo "3. Rename Next.js config files to their proper names"
echo "4. Install dependencies"
echo ""

read -p "Do you want to continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Setup cancelled."
    exit 0
fi

echo ""
echo "Step 1: Creating backup of Vite files..."
mkdir -p vite-backup
cp -r src vite-backup/ 2>/dev/null
cp index.html vite-backup/ 2>/dev/null
cp vite.config.ts vite-backup/ 2>/dev/null
cp package.json vite-backup/ 2>/dev/null
cp package-lock.json vite-backup/ 2>/dev/null
cp tsconfig.json vite-backup/ 2>/dev/null
cp tsconfig.app.json vite-backup/ 2>/dev/null
cp tsconfig.node.json vite-backup/ 2>/dev/null
cp tailwind.config.ts vite-backup/ 2>/dev/null
cp postcss.config.js vite-backup/ 2>/dev/null
echo "✓ Backup created in vite-backup/"

echo ""
echo "Step 2: Removing Vite files..."
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
rm -f eslint.config.js
echo "✓ Vite files removed"

echo ""
echo "Step 3: Renaming Next.js config files..."
mv package-nextjs.json package.json
mv tsconfig-nextjs.json tsconfig.json
mv tailwind-nextjs.config.ts tailwind.config.ts
mv postcss-nextjs.config.js postcss.config.js
mv .gitignore-nextjs .gitignore 2>/dev/null
mv README-NEXTJS.md README.md
echo "✓ Config files renamed"

echo ""
echo "Step 4: Checking environment variables..."
if [ ! -f ".env.local" ]; then
    echo "⚠ Warning: .env.local not found!"
    echo "Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "✓ .env.local created"
    echo ""
    echo "IMPORTANT: Edit .env.local and add your Supabase credentials!"
else
    echo "✓ .env.local already exists"
fi

echo ""
echo "Step 5: Installing dependencies..."
npm install
if [ $? -eq 0 ]; then
    echo "✓ Dependencies installed successfully"
else
    echo "✗ Error installing dependencies"
    exit 1
fi

echo ""
echo "======================================"
echo "Setup Complete! 🎉"
echo "======================================"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your Supabase credentials"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Visit http://localhost:3000"
echo ""
echo "Your Vite files have been backed up to: vite-backup/"
echo ""
echo "For more information, see MIGRATION-GUIDE.md"
echo ""
