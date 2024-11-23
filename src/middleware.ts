import withAuth, { NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    console.log('RUNNING MIDDLEWARE');

    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      console.log('LLENDO A DASHBOARD');

      if (req.nextauth.token?.role !== 'admin') {
        console.log('HOLAAA');

        return NextResponse.rewrite(new URL('/', req.url));
      }
    }
  },
  {
    callbacks: {
      authorized({ token }) {
        return !!token;
      },
    },
  },
);

export const config = {
  matcher: ['/', '/add/', '/create/:path*', '/dashboard/:path*'], // Define protected routes
};
