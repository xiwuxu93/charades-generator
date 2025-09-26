import { NextRequest, NextResponse } from 'next/server';

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
    return NextResponse.redirect(redirectedUrl, 308);
  }

  // Check if path starts with /es/ - these go to Spanish locale
  if (pathname.startsWith('/es/') || pathname === '/es') {
    // Rewrite to [locale] structure
    return NextResponse.rewrite(new URL(`/es${pathname.slice(3)}`, request.url));
  }

  // For root path, rewrite to English locale without redirect
  if (pathname === '/') {
    return NextResponse.rewrite(new URL('/en', request.url));
  }

  // For all other paths (without /es prefix), these are English routes
  // Rewrite to English locale in [locale] structure - no redirect, just rewrite
  return NextResponse.rewrite(new URL(`/en${pathname}`, request.url));
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
