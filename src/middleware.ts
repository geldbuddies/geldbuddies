import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // Bypass all authentication checks in development
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }

  const path = request.nextUrl.pathname;
  
  // Check if this is a protected route
  const isTeacherRoute = path.startsWith('/teacher');
  const isClassroomRoute = path.startsWith('/classroom');
  
  if (isTeacherRoute || isClassroomRoute) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // If the user isn't authenticated
    if (!token) {
      // Redirect to the login page with a callback URL
      const redirectUrl = new URL('/login', request.nextUrl.origin);
      redirectUrl.searchParams.set('callbackUrl', encodeURI(request.nextUrl.pathname));
      return NextResponse.redirect(redirectUrl);
    }
    
    // Role-specific checks
    if (isTeacherRoute && token.role !== 'teacher') {
      // If trying to access teacher routes without teacher role
      return NextResponse.redirect(new URL('/unauthorized', request.nextUrl.origin));
    }
  }

  return NextResponse.next();
}

// Configure which routes should be handled by this middleware
export const config = {
  matcher: ['/teacher/:path*', '/classroom/:path*'],
}; 