import type React from 'react'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Noto_Sans, Space_Grotesk, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { locales, type Locale } from '@/i18n/config'
import '../globals.css'

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://devportfolio.com'

  return {
    title: t('title'),
    description: t('description'),
    generator: 'v0.app',
    icons: {
      icon: [
        {
          url: '/icon-light-32x32.png',
          media: '(prefers-color-scheme: light)',
        },
        {
          url: '/icon-dark-32x32.png',
          media: '(prefers-color-scheme: dark)',
        },
        {
          url: '/icon.svg',
          type: 'image/svg+xml',
        },
      ],
      apple: '/apple-icon.png',
    },
    openGraph: {
      title: t('openGraph.title'),
      description: t('openGraph.description'),
      siteName: t('openGraph.siteName'),
      locale: locale,
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        es: `${baseUrl}/es`,
        en: `${baseUrl}/en`,
        'x-default': `${baseUrl}/es`,
      },
    },
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} className="dark">
      <body
        className={`${notoSans.variable} ${spaceGrotesk.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider
          messages={messages}
          onError={(error) => {
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
          }}
          getMessageFallback={({ namespace, key, error }) => {
            const path = [namespace, key]
              .filter((part) => part != null)
              .join('.')

            if (error.code === 'MISSING_MESSAGE') {
              // In development, return a clear indicator
              if (process.env.NODE_ENV === 'development') {
                return `[Missing: ${path}]`
              }
              // In production, return the key path
              return path
            }

            return `Error: ${path}`
          }}
        >
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
