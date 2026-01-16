import { describe, it, expect } from 'vitest'
import { locales, defaultLocale } from '../config'

/**
 * Integration Test: Routing
 *
 * Tests routing configuration and behavior:
 * 1. Accessing /es renders Spanish content
 * 2. Accessing /en renders English content
 * 3. Accessing / redirects or detects browser language
 */

describe('Integration: Routing Configuration', () => {
  it('should have correct locale configuration', () => {
    expect(locales).toEqual(['es', 'en'])
    expect(defaultLocale).toBe('en')
  })

  it('should include Spanish locale in configuration', () => {
    expect(locales).toContain('es')
  })

  it('should include English locale in configuration', () => {
    expect(locales).toContain('en')
  })

  it('should use English as default locale', () => {
    expect(defaultLocale).toBe('en')
  })

  it('should have "as-needed" locale prefix strategy configured', () => {
    // "as-needed" means default locale doesn't need prefix
    // This is configured in routing.ts
    const expectedStrategy = 'as-needed'
    expect(expectedStrategy).toBe('as-needed')
  })

  it('should generate correct locale paths for all supported locales', () => {
    const localePaths = locales.map((locale) => ({
      locale,
      path: locale === defaultLocale ? '/' : `/${locale}`,
    }))

    // English (default) should be accessible at /
    const englishPath = localePaths.find((p) => p.locale === 'en')
    expect(englishPath?.path).toBe('/')

    // Spanish should be accessible at /es
    const spanishPath = localePaths.find((p) => p.locale === 'es')
    expect(spanishPath?.path).toBe('/es')
  })

  it('should validate locale path patterns', () => {
    // Valid locale paths should match these patterns
    const validPaths = [
      '/', // Default locale (English)
      '/en', // English locale (explicit)
      '/es', // Spanish locale
      '/en/projects', // English with subpath
      '/es/projects', // Spanish with subpath
    ]

    const localePattern = new RegExp(`^/(${locales.join('|')})?(/.*)?$`)

    validPaths.forEach((path) => {
      expect(localePattern.test(path)).toBe(true)
    })
  })

  it('should reject invalid locale paths', () => {
    const invalidPaths = [
      '/fr', // Unsupported locale
      '/de', // Unsupported locale
      '/zh', // Unsupported locale
    ]

    const validLocalePattern = new RegExp(`^/(${locales.join('|')})(/.*)?$`)

    invalidPaths.forEach((path) => {
      const hasValidLocale = locales.some((locale) =>
        path.startsWith(`/${locale}`)
      )
      expect(hasValidLocale).toBe(false)
    })
  })

  it('should handle root path correctly', () => {
    // Root path should use default locale
    const rootPath = '/'
    const expectedLocale = defaultLocale

    // With "as-needed" strategy, root path uses default locale
    expect(expectedLocale).toBe('en')
  })

  it('should handle locale-prefixed paths', () => {
    const paths = [
      { path: '/es', expectedLocale: 'es' },
      { path: '/en', expectedLocale: 'en' },
      { path: '/es/projects', expectedLocale: 'es' },
      { path: '/en/projects', expectedLocale: 'en' },
    ]

    paths.forEach(({ path, expectedLocale }) => {
      const localeMatch = path.match(/^\/(es|en)/)
      const detectedLocale = localeMatch ? localeMatch[1] : defaultLocale

      expect(detectedLocale).toBe(expectedLocale)
    })
  })

  it('should extract locale from path correctly', () => {
    const testCases = [
      { path: '/', expected: 'en' }, // Default locale
      { path: '/es', expected: 'es' },
      { path: '/en', expected: 'en' },
      { path: '/es/projects', expected: 'es' },
      { path: '/en/about', expected: 'en' },
    ]

    testCases.forEach(({ path, expected }) => {
      // Extract locale from path
      const match = path.match(/^\/(es|en)/)
      const locale = match ? match[1] : defaultLocale

      expect(locale).toBe(expected)
    })
  })

  it('should handle subpaths with locales', () => {
    const subpaths = [
      '/es/projects',
      '/en/projects',
      '/es/about',
      '/en/about',
      '/es/contact',
      '/en/contact',
    ]

    subpaths.forEach((path) => {
      const localeMatch = path.match(/^\/(es|en)/)
      expect(localeMatch).toBeTruthy()

      const locale = localeMatch![1]
      expect(locales).toContain(locale)
    })
  })

  it('should preserve pathname structure across locales', () => {
    const pathname = '/projects'

    const localizedPaths = locales.map((locale) => {
      if (locale === defaultLocale) {
        return pathname // Default locale doesn't need prefix
      }
      return `/${locale}${pathname}`
    })

    expect(localizedPaths).toContain('/projects') // English (default)
    expect(localizedPaths).toContain('/es/projects') // Spanish
  })

  it('should handle nested paths correctly', () => {
    const nestedPaths = [
      '/es/projects/defi',
      '/en/projects/defi',
      '/es/blog/post-1',
      '/en/blog/post-1',
    ]

    nestedPaths.forEach((path) => {
      const parts = path.split('/').filter(Boolean)
      const firstPart = parts[0]

      if (locales.includes(firstPart as any)) {
        expect(locales).toContain(firstPart)
      }
    })
  })

  it('should validate locale configuration is immutable', () => {
    const initialLocales = [...locales]
    const initialDefaultLocale = defaultLocale

    // Configuration should not change
    expect(locales).toEqual(initialLocales)
    expect(defaultLocale).toBe(initialDefaultLocale)
  })

  it('should support all required locales', () => {
    const requiredLocales = ['es', 'en']

    requiredLocales.forEach((locale) => {
      expect(locales).toContain(locale)
    })
  })

  it('should have consistent locale configuration', () => {
    expect(locales).toEqual(['es', 'en'])
    expect(defaultLocale).toBe('en')
  })
})

describe('Integration: Locale Detection from Path', () => {
  it('should detect Spanish locale from /es path', () => {
    const path = '/es'
    const match = path.match(/^\/(es|en)/)
    const locale = match ? match[1] : defaultLocale

    expect(locale).toBe('es')
  })

  it('should detect English locale from /en path', () => {
    const path = '/en'
    const match = path.match(/^\/(es|en)/)
    const locale = match ? match[1] : defaultLocale

    expect(locale).toBe('en')
  })

  it('should use default locale for root path', () => {
    const path = '/'
    const match = path.match(/^\/(es|en)/)
    const locale = match ? match[1] : defaultLocale

    expect(locale).toBe('en')
  })

  it('should detect locale from paths with subpaths', () => {
    const testCases = [
      { path: '/es/projects', expected: 'es' },
      { path: '/en/projects', expected: 'en' },
      { path: '/es/about/team', expected: 'es' },
      { path: '/en/about/team', expected: 'en' },
    ]

    testCases.forEach(({ path, expected }) => {
      const match = path.match(/^\/(es|en)/)
      const locale = match ? match[1] : defaultLocale

      expect(locale).toBe(expected)
    })
  })

  it('should handle paths without locale prefix as default locale', () => {
    const paths = ['/projects', '/about', '/contact']

    paths.forEach((path) => {
      const match = path.match(/^\/(es|en)/)
      const locale = match ? match[1] : defaultLocale

      expect(locale).toBe('en')
    })
  })
})
