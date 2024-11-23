import { getToken } from 'next-auth/jwt';
import withAuth, { NextRequestWithAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './app/i18n/routing';

// export default withAuth(
//   function middleware(req: NextRequestWithAuth) {
//     if (req.nextUrl.pathname.startsWith('/dashboard')) {
//       if (req.nextauth.token?.role !== 'admin') {
//         return i18nMiddleware(req);
//       }
//     }
//     return i18nMiddleware(req);
//   },
//   {
//     callbacks: {
//       authorized() {
//         return true;
//       },
//     },
//   },
// );

// export const config = {
//   matcher: ['/', '/add/', '/create/:path*', '/dashboard/:path*'], // Define protected routes
// };

const publicPages = ['/signin', '/signup'];

const intlMiddleware = createIntlMiddleware(routing);

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  async function onSuccess(req: NextRequestWithAuth) {
    console.log('RUNNING AUTH MIDDLEARE');

    const token = await getToken({ req });

    if (!token) {
      const url = new URL('/en/signin', req.url);
      return NextResponse.redirect(url);
    }

    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      console.log('TRYING TO ACCESS TO DASHBOARD');
      if (req.nextauth.token?.role !== 'admin') {
        const url = new URL('/en', req.url);
        return NextResponse.redirect(url);
        // return intlMiddleware(req);
      }
    }

    return intlMiddleware(req);
  },
  {
    callbacks: {
      // Workaround to always run this middleware
      authorized: () => true,
    },
  },
);

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${routing.locales.join('|')}))?(${publicPages.join('|')})?/?$`,
    'i',
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage && req.nextUrl.pathname !== '/') {
    console.log('ES RUTA PUBLICA');

    return intlMiddleware(req);
  } else {
    console.log('ES RUTA PRIVADA');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
