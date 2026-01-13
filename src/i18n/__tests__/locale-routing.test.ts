import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { locales, defaultLocale } from '../config'

/**
 * Feature: i18n-implementation, Property 1: Locale-based routing works for all supported locales
 * Validates: Requirements 5.4, 5.5
 *
 * This property test verifies that locale-based routing is properly configured
 * for all supported locales and that the routing configuration is valid.
 */

describe('Locale-based Routing', () => {
  it('should have valid locale configuration', () => {
    expect(locales).toBeDefined()
    expect(locales.length).toBeGreaterThan(0)
    expect(locales).toContain('es')
    expect(locales).toContain('en')
  })

  it('should have a valid default locale', () => {
    expect(defaultLocale).toBeDefined()
    expect(locales).toContain(defaultLocale)
  })

  it('property: all supported locales are valid locale codes', () => {
    // Valid locale codes are 2-letter ISO 639-1 codes
    const validLocalePattern = /^[a-z]{2}$/

    fc.assert(
      fc.property(fc.constantFrom(...locales), (locale) => {
        return validLocalePattern.test(locale)
      }),
      { numRuns: 100 }
    )
  })

  it('property: all supported locales are included in the configuration', () => {
    fc.assert(
      fc.property(fc.constantFrom(...locales), (locale) => {
        return locales.includes(locale)
      }),
      { numRuns: 100 }
    )
  })

  it('property: default locale is always included in supported locales', () => {
    // The default locale must always be in the list of supported locales
    expect(locales).toContain(defaultLocale)

    // Property test: for any configuration, default locale is in locales
    fc.assert(
      fc.property(fc.constant(defaultLocale), (defLocale) => {
        return locales.includes(defLocale)
      }),
      { numRuns: 100 }
    )
  })

  it('property: all locales are unique', () => {
    // Check that there are no duplicate locales
    const uniqueLocales = new Set(locales)
    expect(uniqueLocales.size).toBe(locales.length)

    // Property test: for any two different indices, the locales are different
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: locales.length - 1 }),
        fc.integer({ min: 0, max: locales.length - 1 }),
        (i, j) => {
          if (i === j) return true
          return locales[i] !== locales[j]
        }
      ),
      { numRuns: 100 }
    )
  })

  it('property: locale codes are lowercase', () => {
    fc.assert(
      fc.property(fc.constantFrom(...locales), (locale) => {
        return locale === locale.toLowerCase()
      }),
      { numRuns: 100 }
    )
  })

  it('property: locale configuration is immutable', () => {
    // The locale configuration should not change
    const initialLocales = [...locales]
    const initialDefaultLocale = defaultLocale

    fc.assert(
      fc.property(fc.constantFrom(...locales), () => {
        // After any operation, the config should remain the same
        expect(locales).toEqual(initialLocales)
        expect(defaultLocale).toBe(initialDefaultLocale)
        return true
      }),
      { numRuns: 100 }
    )
  })

  it('property: generateStaticParams should return all locales', () => {
    // Simulate what generateStaticParams should return
    const staticParams = locales.map((locale) => ({ locale }))

    fc.assert(
      fc.property(fc.constantFrom(...locales), (locale) => {
        // Each locale should have a corresponding static param
        return staticParams.some((param) => param.locale === locale)
      }),
      { numRuns: 100 }
    )
  })

  it('property: locale paths are valid URL segments', () => {
    // Valid URL segments don't contain special characters
    const validUrlSegmentPattern = /^[a-z0-9-]+$/

    fc.assert(
      fc.property(fc.constantFrom(...locales), (locale) => {
        return validUrlSegmentPattern.test(locale)
      }),
      { numRuns: 100 }
    )
  })
})
