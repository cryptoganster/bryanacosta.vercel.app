import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { locales, defaultLocale } from './i18n/config'

export default createMiddleware({
  ...routing,
  localeDetection: true,
  localePrefix: routing.localePrefix,
  defaultLocale,
  locales,
})

export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next (Next.js internals)
  // - _vercel (Vercel internals)
  // - files with extensions (e.g. favicon.ico)
  matcher: ['/', '/(es|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
}
