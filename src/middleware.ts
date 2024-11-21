import envs from '@/config/envs';
import { getToken } from 'next-auth/jwt';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Define paths that require authentication
  const protectedRoutes = ['/', '/add', '/create'];

  console.log('RUNNING MIDDLEWARE');

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some((path) =>
    req.nextUrl.pathname.startsWith(path),
  );

  if (!isProtectedRoute) {
    // If the route is not protected, allow access
    return NextResponse.next();
  }

  // Get the token from the request (using NextAuth JWT)
  const token = await getToken({ req, secret: envs.auth.secret });

  if (!token) {
    // If no token exists, redirect to the login page
    const loginUrl = new URL('/signin', req.url);
    loginUrl.searchParams.set('callbackUrl', req.url); // Preserve the attempted URL
    return NextResponse.redirect(loginUrl);
  }

  // Allow access if the user is authenticated
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/add/:path*', '/create/:path*'], // Define protected routes
};
