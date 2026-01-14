import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'
import { locales, defaultLocale } from './config'

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always', // Always show locale prefix for clarity
})

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing)
