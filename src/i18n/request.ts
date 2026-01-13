import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales, defaultLocale, type Locale } from './config'

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound()

  return {
    locale: locale as string,
    messages: (await import(`../../messages/${locale}.json`)).default,
    // Handle missing translation keys
    onError(error) {
      if (error.code === 'MISSING_MESSAGE') {
        // In development, log the missing key for debugging
        if (process.env.NODE_ENV === 'development') {
          console.warn(
            `Missing translation in locale ${locale}:`,
            error.message
          )
        }
      } else {
        // Log other errors
        console.error('i18n error:', error)
      }
    },
    // Return the key itself as fallback for missing translations
    getMessageFallback({ namespace, key, error }) {
      const path = [namespace, key].filter((part) => part != null).join('.')

      if (error.code === 'MISSING_MESSAGE') {
        // In development, return a clear indicator
        if (process.env.NODE_ENV === 'development') {
          return `[Missing: ${path}]`
        }
        // In production, return the key path
        return path
      }

      return `Error: ${path}`
    },
  }
})
