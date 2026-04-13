import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // 2026 FACTORY LOGIC: Extract tenant from subdomain
  // e.g., zakher.genesis-factory.app -> x-tenant-id: zakher
  const tenantId = host.split('.')[0] || 'default';

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-tenant-id', tenantId);

  // ── Self-Healing Redirect Shield ──
  // Intercept /properties/* routes and check for old slugs
  const propertyMatch = pathname.match(/^\/properties\/([^/]+)$/);
  if (propertyMatch) {
    const slug = propertyMatch[1];
    try {
      const cmsUrl = process.env.DIRECTUS_URL || process.env.CMS_URL || '';
      const token = process.env.ADMIN_TOKEN || '';

      if (cmsUrl && token) {
        const res = await fetch(
          `${cmsUrl}/items/redirects?filter[old_slug][_eq]=${encodeURIComponent(slug)}&filter[collection][_eq]=properties&limit=1`,
          {
            headers: { Authorization: `Bearer ${token}` },
            next: { revalidate: 60 }, // Cache redirect lookups for 60s
          }
        );

        if (res.ok) {
          const data = await res.json();
          const redirect = data?.data?.[0];
          if (redirect?.new_slug) {
            const redirectUrl = new URL(`/properties/${redirect.new_slug}`, request.url);
            return NextResponse.redirect(redirectUrl, redirect.status_code || 301);
          }
        }
      }
    } catch (error) {
      // Redirect lookup failed — fall through silently to normal routing
      console.error('[Genesis] Redirect Shield lookup failed:', error);
    }
  }

  // ── i18n Routing ──
  const locales = ['en', 'es', 'fr', 'pt'];
  const defaultLocale = 'en';

  if (
    !pathname.startsWith('/_next') &&
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/private-admin') &&
    !pathname.includes('.')
  ) {
    const pathnameHasLocale = locales.some(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (!pathnameHasLocale) {
      request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
      return NextResponse.redirect(request.nextUrl);
    }

    // Inject detected locale as x-lang header for dynamic <html lang="…"> in root layout
    const detectedLocale = locales.find(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    ) || defaultLocale;
    requestHeaders.set('x-lang', detectedLocale);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
