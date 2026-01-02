@echo off
REM Setup script for Next.js migration (Windows)
REM This script will prepare your project to use the Next.js version

echo ======================================
echo Next.js Migration Setup Script
echo ======================================
echo.

REM Check if we're in the right directory
if not exist "package-nextjs.json" (
    echo Error: package-nextjs.json not found!
    echo Please run this script from the project root directory.
    pause
    exit /b 1
)

echo This script will:
echo 1. Backup Vite files to 'vite-backup\' directory
echo 2. Remove Vite-specific files
echo 3. Rename Next.js config files to their proper names
echo 4. Install dependencies
echo.

set /p continue="Do you want to continue? (y/n) "
if /i not "%continue%"=="y" (
    echo Setup cancelled.
    pause
    exit /b 0
)

echo.
echo Step 1: Creating backup of Vite files...
if not exist "vite-backup" mkdir vite-backup
if exist "src" xcopy /E /I /Y src vite-backup\src > nul
if exist "index.html" copy /Y index.html vite-backup\ > nul
if exist "vite.config.ts" copy /Y vite.config.ts vite-backup\ > nul
if exist "package.json" copy /Y package.json vite-backup\ > nul
if exist "package-lock.json" copy /Y package-lock.json vite-backup\ > nul
if exist "tsconfig.json" copy /Y tsconfig.json vite-backup\ > nul
if exist "tsconfig.app.json" copy /Y tsconfig.app.json vite-backup\ > nul
if exist "tsconfig.node.json" copy /Y tsconfig.node.json vite-backup\ > nul
if exist "tailwind.config.ts" copy /Y tailwind.config.ts vite-backup\ > nul
if exist "postcss.config.js" copy /Y postcss.config.js vite-backup\ > nul
echo - Backup created in vite-backup\

echo.
echo Step 2: Removing Vite files...
if exist "src" rmdir /S /Q src
if exist "index.html" del /Q index.html
if exist "vite.config.ts" del /Q vite.config.ts
if exist "package.json" del /Q package.json
if exist "package-lock.json" del /Q package-lock.json
if exist "tsconfig.json" del /Q tsconfig.json
if exist "tsconfig.app.json" del /Q tsconfig.app.json
if exist "tsconfig.node.json" del /Q tsconfig.node.json
if exist "tailwind.config.ts" del /Q tailwind.config.ts
if exist "postcss.config.js" del /Q postcss.config.js
if exist "eslint.config.js" del /Q eslint.config.js
echo - Vite files removed

echo.
echo Step 3: Renaming Next.js config files...
ren package-nextjs.json package.json
ren tsconfig-nextjs.json tsconfig.json
ren tailwind-nextjs.config.ts tailwind.config.ts
ren postcss-nextjs.config.js postcss.config.js
if exist ".gitignore-nextjs" ren .gitignore-nextjs .gitignore
ren README-NEXTJS.md README.md
echo - Config files renamed

echo.
echo Step 4: Checking environment variables...
if not exist ".env.local" (
    echo Warning: .env.local not found!
    echo Creating .env.local from .env.example...
    copy /Y .env.example .env.local > nul
    echo - .env.local created
    echo.
    echo IMPORTANT: Edit .env.local and add your Supabase credentials!
) else (
    echo - .env.local already exists
)

echo.
echo Step 5: Installing dependencies...
call npm install
if %ERRORLEVEL% EQU 0 (
    echo - Dependencies installed successfully
) else (
    echo x Error installing dependencies
    pause
    exit /b 1
)

echo.
echo ======================================
echo Setup Complete! 🎉
echo ======================================
echo.
echo Next steps:
echo 1. Edit .env.local with your Supabase credentials
echo 2. Run 'npm run dev' to start the development server
echo 3. Visit http://localhost:3000
echo.
echo Your Vite files have been backed up to: vite-backup\
echo.
echo For more information, see MIGRATION-GUIDE.md
echo.
pause
