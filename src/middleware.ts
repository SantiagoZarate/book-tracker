import { getToken } from 'next-auth/jwt';
import withAuth, { NextRequestWithAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './app/i18n/routing';

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
        const url = new URL('/home', req.url);
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

  if (isPublicPage) {
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
