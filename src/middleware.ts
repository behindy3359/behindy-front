import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_ROUTES, isPublicRoute } from '@/shared/utils/navigation/navigationUtils';

const STATIC_FILE_REGEX = /\.[^/]+$/;

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (STATIC_FILE_REGEX.test(pathname)) {
    return NextResponse.next();
  }

  const refreshToken = request.cookies.get('refreshToken')?.value;
  const isAuthenticated = Boolean(refreshToken);
  const isPublicPath = isPublicRoute(pathname);

  if (isAuthenticated && AUTH_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isPublicPath) {
    return NextResponse.next();
  }

  if (!isAuthenticated) {
    const loginUrl = new URL('/auth/login', request.url);
    const redirectPath = search ? `${pathname}${search}` : pathname;
    loginUrl.searchParams.set('redirect', redirectPath);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|_next/data|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
