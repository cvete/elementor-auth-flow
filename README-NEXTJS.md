# tvstanici - Next.js Version

This is the Next.js version of the tvstanici TV streaming platform, migrated from the original Vite + React application while maintaining the same frontend design and functionality.

## Features

- **Authentication System**: Complete user authentication with Supabase
  - Email/password login and registration
  - Password reset functionality
  - Social login (Google, Facebook) support
  - Protected routes with middleware

- **Modern Tech Stack**:
  - **Next.js 15** with App Router
  - **React 18** with Server Components
  - **TypeScript** for type safety
  - **Tailwind CSS** for styling
  - **shadcn/ui** component library
  - **Supabase** for authentication and backend

- **TV Channel Features**:
  - Browse trending channels
  - View on-demand content
  - Search functionality
  - Responsive design

## Project Structure

```
elementor-auth-flow/
├── app/
│   ├── dashboard/
│   │   └── page.tsx          # Dashboard page (protected)
│   ├── login/
│   │   └── page.tsx          # Login page
│   ├── register/
│   │   └── page.tsx          # Registration page
│   ├── forgot-password/
│   │   └── page.tsx          # Password reset page
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home (redirects to login)
│   └── globals.css           # Global styles
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── AuthLayout.tsx        # Auth pages layout
│   ├── AuthForm.tsx          # Reusable auth form
│   ├── SocialLoginButtons.tsx
│   ├── DashboardLayout.tsx   # Dashboard layout
│   ├── DashboardHeader.tsx   # Dashboard header
│   ├── DashboardFooter.tsx   # Dashboard footer
│   ├── TVChannelList.tsx     # TV channel list component
│   └── ChannelCard.tsx       # Individual channel card
├── lib/
│   ├── supabase/
│   │   ├── client.ts         # Client-side Supabase
│   │   ├── server.ts         # Server-side Supabase
│   │   └── middleware.ts     # Middleware Supabase
│   └── utils.ts              # Utility functions
├── hooks/
│   └── use-toast.ts          # Toast notifications hook
├── middleware.ts             # Next.js middleware for auth
└── next.config.ts            # Next.js configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm installed
- A Supabase account and project

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Key Differences from Vite Version

### 1. **Routing**
- **Vite**: React Router DOM with client-side routing
- **Next.js**: File-based routing with App Router

### 2. **Authentication**
- **Vite**: Used `@supabase/auth-helpers-react`
- **Next.js**: Uses `@supabase/ssr` for better SSR support

### 3. **Components**
- **Vite**: All client components
- **Next.js**: Mix of Server and Client Components (marked with `'use client'`)

### 4. **Image Handling**
- **Vite**: Standard `<img>` tags
- **Next.js**: Uses `next/image` for optimization

### 5. **Navigation**
- **Vite**: `<Link>` from react-router-dom, `useNavigate()`
- **Next.js**: `<Link>` from next/link, `useRouter()` from next/navigation

### 6. **Middleware**
- **Vite**: Protected routes via React components
- **Next.js**: Server middleware for route protection

## Migration Steps Completed

1. ✅ Created Next.js project structure with App Router
2. ✅ Configured TypeScript, Tailwind CSS, and PostCSS
3. ✅ Migrated all UI components from shadcn/ui
4. ✅ Set up Supabase with SSR support
5. ✅ Created authentication pages (login, register, forgot-password)
6. ✅ Implemented protected route middleware
7. ✅ Migrated dashboard and TV channel components
8. ✅ Set up environment variables

## Authentication Flow

1. **Public Routes**: `/login`, `/register`, `/forgot-password`
2. **Protected Routes**: `/dashboard` (requires authentication)
3. **Middleware**: Automatically redirects unauthenticated users to login
4. **Session Management**: Handled by Supabase with cookie-based sessions

## Environment Variables

Required environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Self-hosted with Node.js

## Design System

The application uses the same design system as the original:
- **Primary Color**: Purple (#9333ea)
- **Secondary Color**: Blue (#3b82f6)
- **Gradient**: Purple to Blue
- **Font**: Inter (via next/font)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

## Support

For issues or questions, please contact the development team.
