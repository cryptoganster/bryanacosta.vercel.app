import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Services } from '../ui/Services'

// Mock next-intl
const mockTranslations = {
  label: 'Capabilities',
  title: 'Engineering Ecosystem',
  subtitle: 'We build resilient digital infrastructure',
  cards: {
    'custom-software': {
      title: 'Custom Software & MVPs',
      description: 'Scalable architecture for high-growth startups',
    },
    'legacy-migration': {
      title: 'Legacy Migration',
      description: 'Modernize aging infrastructure',
    },
    'multi-platform': {
      title: 'Multi-Platform',
      description: 'Seamless experiences across platforms',
    },
    'ai-integration': {
      title: 'AI Integration',
      description: 'LLM Agents & Automation',
    },
    'ux-ui-design': {
      title: 'UX/UI Design',
      description: 'Functional interfaces',
    },
    'landing-pages': {
      title: 'Landing Pages',
      description: 'High-conversion architecture',
    },
  },
}

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const keys = key.split('.')
    let value: any = mockTranslations
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  },
}))

describe('Services Integration Tests', () => {
  describe('Full Page Rendering', () => {
    it('should render complete Services section with all components', () => {
      const { container } = render(<Services />)

      // Section should exist
      const section = container.querySelector('section')
      expect(section).toBeTruthy()

      // Background pattern should exist
      const bgPattern = container.querySelector('.bg-grid-pattern')
      expect(bgPattern).toBeTruthy()

      // Header should exist
      expect(screen.getByText('Capabilities')).toBeInTheDocument()
      expect(screen.getByText('Engineering Ecosystem')).toBeInTheDocument()
      expect(
        screen.getByText('We build resilient digital infrastructure')
      ).toBeInTheDocument()

      // All 6 service cards should exist
      const cards = container.querySelectorAll('[role="article"]')
      expect(cards.length).toBe(6)

      // Grid should exist
      const grid = container.querySelector('.grid')
      expect(grid).toBeTruthy()
    })

    it('should render all service cards with correct data', () => {
      const { container } = render(<Services />)

      // Check all service cards are present by checking headings
      const headings = container.querySelectorAll('h3')
      expect(headings.length).toBe(6)

      // Check that each heading has content
      headings.forEach((heading) => {
        expect(heading.textContent).toBeTruthy()
        expect(heading.textContent?.length).toBeGreaterThan(0)
      })
    })

    it('should render with proper responsive grid layout', () => {
      const { container } = render(<Services />)
      const grid = container.querySelector('.grid')

      // Should have responsive grid classes
      expect(grid?.className).toContain('grid-cols-1')
      expect(grid?.className).toContain('md:grid-cols-2')
      expect(grid?.className).toContain('lg:grid-cols-4')
      expect(grid?.className).toContain('gap-5')
      expect(grid?.className).toContain('auto-rows-[minmax(180px,auto)]')
    })
  })

  describe('Theme Integration', () => {
    it('should use theme-aware classes throughout', () => {
      const { container } = render(<Services />)

      // Check for theme token usage
      const section = container.querySelector('section')
      expect(section).toBeTruthy()

      // Cards should have theme-aware border and background
      const cards = container.querySelectorAll('[role="article"]')
      cards.forEach((card) => {
        expect(card.className).toMatch(/border/)
        expect(card.className).toMatch(/bg-/)
      })

      // Text should use theme colors
      expect(container.innerHTML).toMatch(/text-(primary|muted|foreground)/)
    })

    it('should have hover effects that work with theme', () => {
      const { container } = render(<Services />)

      // All cards should have hover effect class
      const cards = container.querySelectorAll('.card-hover-effect')
      expect(cards.length).toBe(6)

      // Cards should have hover classes
      cards.forEach((card) => {
        expect(card.className).toContain('hover:')
      })
    })

    it('should have AI card with special theme variant', () => {
      const { container } = render(<Services />)

      // AI card should have special class
      const aiCard = container.querySelector('.ai-card')
      expect(aiCard).toBeTruthy()
    })
  })

  describe('Locale Integration', () => {
    it('should display translated content', () => {
      const { container } = render(<Services />)

      // Section header should be translated
      expect(screen.getByText('Capabilities')).toBeInTheDocument()
      expect(screen.getByText('Engineering Ecosystem')).toBeInTheDocument()

      // All card titles should have content (translated or keys)
      const headings = container.querySelectorAll('h3')
      expect(headings.length).toBe(6)
      headings.forEach((heading) => {
        expect(heading.textContent).toBeTruthy()
      })
    })

    it('should use translation keys correctly', () => {
      const { container } = render(<Services />)

      // Should not have any untranslated keys visible
      expect(container.innerHTML).not.toContain('services.label')
      expect(container.innerHTML).not.toContain('services.title')
      expect(container.innerHTML).not.toContain('services.subtitle')
    })
  })

  describe('Data Integration', () => {
    it('should render services from data layer', () => {
      const { container } = render(<Services />)

      // Should have exactly 6 services
      const cards = container.querySelectorAll('[role="article"]')
      expect(cards.length).toBe(6)
    })

    it('should apply correct grid spans from data', () => {
      const { container } = render(<Services />)

      // Custom Software should be 2x2 (first card in the grid)
      const cards = container.querySelectorAll('[role="article"]')
      const firstCard = cards[0]

      // First card should have large spans
      expect(firstCard).toBeTruthy()
      if (firstCard) {
        expect(firstCard.className).toContain('lg:col-span-2')
        expect(firstCard.className).toContain('lg:row-span-2')
      }
    })

    it('should apply correct sizes from data', () => {
      const { container } = render(<Services />)

      // Should have cards with different sizes
      const cards = container.querySelectorAll('[role="article"]')
      const hasLarge = Array.from(cards).some((card) =>
        card.className.includes('min-h-[380px]')
      )
      const hasMedium = Array.from(cards).some((card) =>
        card.className.includes('min-h-[320px]')
      )
      const hasSmall = Array.from(cards).some((card) =>
        card.className.includes('min-h-[180px]')
      )

      expect(hasLarge).toBe(true)
      expect(hasMedium).toBe(true)
      expect(hasSmall).toBe(true)
    })
  })

  describe('Component Integration', () => {
    it('should integrate ServiceCard components correctly', () => {
      const { container } = render(<Services />)

      // Each card should have all required elements
      const cards = container.querySelectorAll('[role="article"]')
      cards.forEach((card) => {
        // Should have icon
        const icon = card.querySelector('.material-symbols-outlined')
        expect(icon).toBeTruthy()

        // Should have heading
        const heading = card.querySelector('h3')
        expect(heading).toBeTruthy()

        // Should have description
        const description = card.querySelector('p')
        expect(description).toBeTruthy()
      })
    })

    it('should maintain proper component hierarchy', () => {
      const { container } = render(<Services />)

      // Section > Container > Header + Grid
      const section = container.querySelector('section')
      const innerContainer = section?.querySelector('.max-w-\\[1280px\\]')
      expect(innerContainer).toBeTruthy()

      const header = innerContainer?.querySelector('div')
      expect(header).toBeTruthy()

      const grid = innerContainer?.querySelector('.grid')
      expect(grid).toBeTruthy()
    })
  })

  describe('Styling Integration', () => {
    it('should have background grid pattern with correct styles', () => {
      const { container } = render(<Services />)

      const bgPattern = container.querySelector('.bg-grid-pattern')
      expect(bgPattern).toBeTruthy()
      expect(bgPattern?.className).toContain('absolute')
      expect(bgPattern?.className).toContain('inset-0')
      expect(bgPattern?.className).toContain('pointer-events-none')
    })

    it('should have proper spacing and layout', () => {
      const { container } = render(<Services />)

      const section = container.querySelector('section')
      expect(section?.className).toContain('py-16')
      expect(section?.className).toContain('px-4')
      expect(section?.className).toContain('sm:px-6')
    })

    it('should have responsive header layout', () => {
      const { container } = render(<Services />)

      const header = container.querySelector('.flex.flex-col')
      expect(header?.className).toContain('md:flex-row')
      expect(header?.className).toContain('md:items-end')
      expect(header?.className).toContain('justify-between')
    })
  })
})
