import { NextRequest, NextResponse } from 'next/server';

const LOCALE_COOKIE = 'site-locale';
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function setLocaleCookie(response: NextResponse, locale: string) {
  response.cookies.set({
    name: LOCALE_COOKIE,
    value: locale,
    maxAge: ONE_YEAR_SECONDS,
    path: '/',
  });
  response.headers.set('x-site-locale', locale);
  return response;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Redirect any /en requests back to the root equivalents so the site never exposes /en URLs
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const redirectedUrl = request.nextUrl.clone();
    let withoutLocale = pathname === '/en' ? '/' : pathname.replace(/^\/en/, '') || '/';
    if (withoutLocale !== '/' && !withoutLocale.endsWith('/')) {
      withoutLocale = `${withoutLocale}/`;
    }
    redirectedUrl.pathname = withoutLocale;
    const response = NextResponse.redirect(redirectedUrl, 308);
    return setLocaleCookie(response, 'en');
  }

  // Check if path starts with /es/ - these go to Spanish locale
  if (pathname.startsWith('/es/') || pathname === '/es') {
    // Rewrite to [locale] structure
    const response = NextResponse.rewrite(new URL(`/es${pathname.slice(3)}`, request.url));
    return setLocaleCookie(response, 'es');
  }

  // For root path, rewrite to English locale without redirect
  if (pathname === '/') {
    const response = NextResponse.rewrite(new URL('/en', request.url));
    return setLocaleCookie(response, 'en');
  }

  // For all other paths (without /es prefix), these are English routes
  // Rewrite to English locale in [locale] structure - no redirect, just rewrite
  const response = NextResponse.rewrite(new URL(`/en${pathname}`, request.url));
  return setLocaleCookie(response, 'en');
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
