export { default } from 'next-auth/middleware';

// import envs from '@/config/envs';
// import { getToken } from 'next-auth/jwt';
// import { NextResponse, type NextRequest } from 'next/server';

// export async function middleware(req: NextRequest) {
//   // Get the token from the request (using NextAuth JWT)
//   const token = await getToken({ req, secret: envs.auth.secret });

//   if (!token) {
//     // If no token exists, redirect to the login page
//     const loginUrl = new URL('/signin', req.url);
//     loginUrl.searchParams.set('callbackUrl', req.url); // Preserve the attempted URL
//     return NextResponse.redirect(loginUrl);
//   }

//   // Allow access if the user is authenticated
//   return NextResponse.next();
// }

export const config = {
  matcher: ['/', '/add/:path*', '/create/:path*'], // Define protected routes
};
