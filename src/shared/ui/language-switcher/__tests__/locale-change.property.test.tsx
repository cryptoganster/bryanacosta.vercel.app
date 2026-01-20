import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  render,
  screen,
  fireEvent,
  cleanup,
  within,
} from '@testing-library/react'
import * as fc from 'fast-check'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { locales, localeNames } from '@/i18n/config'
import type { Locale } from '@/i18n/config'

/**
 * Feature: i18n-implementation, Property 4: Locale changes trigger UI re-render
 * Validates: Requirements 4.3
 *
 * This property test verifies that when a user changes the locale through the
 * language switcher, the UI properly re-renders with the new locale's content.
 */

// Mock next-intl hooks
const mockUseLocale = vi.fn()
const mockReplace = vi.fn()
const mockUsePathname = vi.fn()

vi.mock('next-intl', () => ({
  useLocale: () => mockUseLocale(),
}))

vi.mock('@/i18n/routing', () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
  usePathname: () => mockUsePathname(),
}))

describe('Locale Change Behavior Property Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    cleanup()
  })

  afterEach(() => {
    cleanup()
  })

  it(
    'property: locale changes trigger router navigation',
    { timeout: 10000 },
    () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...locales),
          fc.constantFrom(...locales),
          (currentLocale, targetLocale) => {
            cleanup()
            // Setup
            mockUseLocale.mockReturnValue(currentLocale)
            mockUsePathname.mockReturnValue('/')
            mockReplace.mockClear()

            // Render component
            const { unmount } = render(<LanguageSwitcher />)

            // Open dropdown
            const triggerButton = screen.getByRole('button', {
              name: /change language/i,
            })
            fireEvent.click(triggerButton)

            // Find and click the target locale button
            const targetButton = screen.getByRole('button', {
              name: `Switch to ${localeNames[targetLocale]}`,
            })
            fireEvent.click(targetButton)

            // Verify router.replace was called with correct arguments
            expect(mockReplace).toHaveBeenCalledWith('/', {
              locale: targetLocale,
            })
            expect(mockReplace).toHaveBeenCalledTimes(1)

            // Cleanup
            unmount()
            cleanup()
            return true
          }
        ),
        { numRuns: 50 }
      )
    }
  )

  it('property: UI re-renders with new active locale after change', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...locales),
        fc.constantFrom(...locales),
        (initialLocale, newLocale) => {
          // Setup with initial locale
          mockUseLocale.mockReturnValue(initialLocale)
          mockUsePathname.mockReturnValue('/')

          // First render
          const { unmount, rerender, container } = render(<LanguageSwitcher />)

          // Open dropdown
          const buttons = container.querySelectorAll(
            'button[aria-label="Change language"]'
          )
          const triggerButton = buttons[0] as HTMLButtonElement
          fireEvent.click(triggerButton)

          // Verify initial active state
          const dropdown = container.querySelector('.absolute.right-0')
          if (dropdown) {
            const initialButton = within(dropdown as HTMLElement).getByRole(
              'button',
              {
                name: `Switch to ${localeNames[initialLocale]}`,
              }
            )
            expect(initialButton?.className).toContain('bg-white/10')
            expect(initialButton?.getAttribute('aria-current')).toBe('true')
          }

          // Simulate locale change by updating the mock
          mockUseLocale.mockReturnValue(newLocale)

          // Re-render component (simulating React re-render after locale change)
          rerender(<LanguageSwitcher />)

          // Open dropdown again
          const buttons2 = container.querySelectorAll(
            'button[aria-label="Change language"]'
          )
          const triggerButton2 = buttons2[0] as HTMLButtonElement
          fireEvent.click(triggerButton2)

          // Verify new active state
          const dropdown2 = container.querySelector('.absolute.right-0')
          if (dropdown2) {
            const newButton = within(dropdown2 as HTMLElement).getByRole(
              'button',
              {
                name: `Switch to ${localeNames[newLocale]}`,
              }
            )
            expect(newButton?.className).toContain('bg-white/10')
            expect(newButton?.getAttribute('aria-current')).toBe('true')

            // Verify old locale is no longer active (if different)
            if (initialLocale !== newLocale) {
              const oldButton = within(dropdown2 as HTMLElement).getByRole(
                'button',
                {
                  name: `Switch to ${localeNames[initialLocale]}`,
                }
              )
              expect(oldButton?.className).not.toContain('bg-white/10')
              expect(oldButton?.getAttribute('aria-current')).toBe('false')
            }
          }

          // Cleanup
          unmount()
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  it('property: locale change preserves pathname', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...locales),
        fc.constantFrom(...locales),
        (currentLocale, targetLocale) => {
          cleanup()
          // Setup
          mockUseLocale.mockReturnValue(currentLocale)
          mockUsePathname.mockReturnValue('/')
          mockReplace.mockClear()

          // Render and trigger locale change
          const { unmount } = render(<LanguageSwitcher />)

          // Open dropdown
          const triggerButton = screen.getByRole('button', {
            name: /change language/i,
          })
          fireEvent.click(triggerButton)

          const targetButton = screen.getByRole('button', {
            name: `Switch to ${localeNames[targetLocale]}`,
          })
          fireEvent.click(targetButton)

          // Verify router.replace was called
          expect(mockReplace).toHaveBeenCalledWith('/', {
            locale: targetLocale,
          })

          // Cleanup
          unmount()
          cleanup()
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  it('property: all locale buttons remain clickable after any locale change', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...locales),
        fc.constantFrom(...locales),
        (initialLocale, changedLocale) => {
          // Setup
          mockUseLocale.mockReturnValue(initialLocale)
          mockUsePathname.mockReturnValue('/')

          // Render
          const { unmount, container } = render(<LanguageSwitcher />)

          // Open dropdown
          const buttons = container.querySelectorAll(
            'button[aria-label="Change language"]'
          )
          const triggerButton = buttons[0] as HTMLButtonElement
          fireEvent.click(triggerButton)

          // Click to change locale
          const dropdown = container.querySelector('.absolute.right-0')
          if (dropdown) {
            const changeButton = within(dropdown as HTMLElement).getByRole(
              'button',
              {
                name: `Switch to ${localeNames[changedLocale]}`,
              }
            )
            fireEvent.click(changeButton)
          }

          // Update mock to reflect change
          mockUseLocale.mockReturnValue(changedLocale)

          // Open dropdown again
          const buttons2 = container.querySelectorAll(
            'button[aria-label="Change language"]'
          )
          const triggerButton2 = buttons2[0] as HTMLButtonElement
          fireEvent.click(triggerButton2)

          // Verify all buttons are still present and clickable
          const dropdown2 = container.querySelector('.absolute.right-0')
          if (dropdown2) {
            locales.forEach((locale) => {
              const button = within(dropdown2 as HTMLElement).getByRole(
                'button',
                {
                  name: `Switch to ${localeNames[locale]}`,
                }
              ) as HTMLButtonElement
              expect(button).toBeDefined()
              expect(button?.disabled).toBeFalsy()
            })
          }

          // Cleanup
          unmount()
          return true
        }
      ),
      { numRuns: 50 }
    )
  }, 10000)

  it('property: locale change is idempotent (changing to same locale is safe)', () => {
    fc.assert(
      fc.property(fc.constantFrom(...locales), (locale) => {
        // Setup
        mockUseLocale.mockReturnValue(locale)
        mockUsePathname.mockReturnValue('/')
        mockReplace.mockClear()

        // Render
        const { unmount } = render(<LanguageSwitcher />)

        // Open dropdown
        const triggerButton = screen.getByRole('button', {
          name: /change language/i,
        })
        fireEvent.click(triggerButton)

        // Click the already active locale
        const button = screen.getByRole('button', {
          name: `Switch to ${localeNames[locale]}`,
        })
        fireEvent.click(button)

        // Should still call router.replace (idempotent operation)
        expect(mockReplace).toHaveBeenCalledWith('/', { locale })

        // Cleanup
        unmount()
        return true
      }),
      { numRuns: 100 }
    )
  })
})
