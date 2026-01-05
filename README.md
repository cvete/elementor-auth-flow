# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/8cddb9e8-02f2-4153-b489-3f9ec7d69f36

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/8cddb9e8-02f2-4153-b489-3f9ec7d69f36) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Next.js
- React
- TypeScript
- shadcn-ui
- Tailwind CSS
- Prisma
- NextAuth.js

## How can I deploy this project?

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Configure the following environment variables in Vercel:
   - `DATABASE_URL` - Your PostgreSQL database URL
   - `NEXTAUTH_URL` - Your production URL (e.g., https://yourdomain.com)
   - `NEXTAUTH_SECRET` - A random secret string
   - `GOOGLE_CLIENT_ID` - (Optional) Google OAuth client ID
   - `GOOGLE_CLIENT_SECRET` - (Optional) Google OAuth secret
   - `RESEND_API_KEY` - Your Resend API key for emails
   - `FROM_EMAIL` - Your verified sender email address

4. Deploy!

### Database Setup

Make sure to run Prisma migrations on your production database:

```bash
npx prisma generate
npx prisma db push
```

## Features

- 🔐 User authentication with NextAuth.js (Email/Password + Google OAuth)
- 📧 Email verification for new registrations
- 🔑 Password reset functionality with email
- 📺 Live TV channel streaming
- 🌍 Multi-language support (English, Macedonian, German)
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS and shadcn/ui
