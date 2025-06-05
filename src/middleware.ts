import type { auth } from '@/server/auth';
import { NextRequest, NextResponse } from 'next/server';

type Session = typeof auth.$Infer.Session;

// Protected routes that require authentication
const protectedRoutes = ['/teacher', '/classroom', '/dashboard', '/profile', '/account'];

export async function middleware(request: NextRequest) {
  // Get the pathname from the request URL
  const path = request.nextUrl.pathname;

  // Check if the current path is in the protected routes
  const isProtectedRoute = protectedRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );

  // Only for redirecting, this doesn't replace an auth check in pages or layouts
  if (isProtectedRoute) {
    try {
      // Use standard fetch instead of betterFetch
      const response = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
        headers: {
          cookie: request.headers.get('cookie') || '', // Forward the cookies from the request
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch session');
      }

      const { session } = (await response.json()) as { session: Session | null };

      if (!session) {
        // Create callback URL to redirect back after authentication
        const callbackUrl = encodeURIComponent(request.url);
        return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, request.url));
      }
    } catch (error) {
      // If there's an error fetching the session, redirect to login
      const callbackUrl = encodeURIComponent(request.url);
      return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
