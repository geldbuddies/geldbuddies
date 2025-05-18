import { Session } from 'better-auth/types';
import { NextRequest, NextResponse } from 'next/server';

// List of protected routes that require authentication
const PROTECTED_ROUTES = ['/teacher', '/classroom', '/dashboard', '/profile', '/settings'] as const;

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check if the current path is a protected route
  const isProtectedRoute = PROTECTED_ROUTES.some((route) => path.startsWith(route));

  if (isProtectedRoute) {
    const response = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    });
    console.log('response', response);
    const { data: session } = (await response.json()) as { data: Session };

    console.log('session', session);

    // If the user isn't authenticated
    if (!session) {
      // Redirect to the login page with a callback URL
      const redirectUrl = new URL('/login', request.nextUrl.origin);
      redirectUrl.searchParams.set('callbackUrl', encodeURI(request.nextUrl.pathname));
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

// Configure which routes should be handled by this middleware
export const config = {
  matcher: [
    '/teacher/:path*',
    '/classroom/:path*',
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
  ],
};
