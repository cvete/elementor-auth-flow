import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  console.log('[MIDDLEWARE] Path:', request.nextUrl.pathname);

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
  })

  console.log('[MIDDLEWARE] Token exists:', !!token);
  console.log('[MIDDLEWARE] Token value:', token ? { email: token.email, id: token.id } : null);

  const isAuth = !!token
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') ||
                     request.nextUrl.pathname.startsWith('/register')

  console.log('[MIDDLEWARE] isAuth:', isAuth, 'isAuthPage:', isAuthPage);

  if (isAuthPage) {
    if (isAuth) {
      console.log('[MIDDLEWARE] Authenticated user on auth page, redirecting to dashboard');
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    console.log('[MIDDLEWARE] Unauthenticated user on auth page, allowing');
    return NextResponse.next()
  }

  if (!isAuth && request.nextUrl.pathname.startsWith('/dashboard')) {
    console.log('[MIDDLEWARE] Unauthenticated user trying to access dashboard, redirecting to login');
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!isAuth) {
      console.log('[MIDDLEWARE] Unauthenticated user trying to access admin, redirecting to login');
      return NextResponse.redirect(new URL('/login', request.url))
    }
    // Check if user is admin
    const isAdmin = token.email === 'maceski.cvete@gmail.com';
    if (!isAdmin) {
      console.log('[MIDDLEWARE] Non-admin user trying to access admin, redirecting to dashboard');
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  console.log('[MIDDLEWARE] Allowing request');
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
