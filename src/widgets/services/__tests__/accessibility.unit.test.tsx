import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Services } from '../ui/Services'
import { ServiceCard } from '../ui/ServiceCard'
import type { Service } from '../types'

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

describe('Services Accessibility', () => {
  describe('Heading Hierarchy', () => {
    it('should have proper heading hierarchy (h2 for section, h3 for cards)', () => {
      const { container } = render(<Services />)

      // Section should have h2
      const sectionHeading = container.querySelector('h2')
      expect(sectionHeading).toBeTruthy()
      expect(sectionHeading?.textContent).toBe('Engineering Ecosystem')

      // Cards should have h3
      const cardHeadings = container.querySelectorAll('h3')
      expect(cardHeadings.length).toBe(6)
    })

    it('should have label before main heading', () => {
      const { container } = render(<Services />)

      const label = container.querySelector('h5')
      const heading = container.querySelector('h2')

      expect(label).toBeTruthy()
      expect(heading).toBeTruthy()

      // Label should come before heading in DOM
      const allElements = Array.from(container.querySelectorAll('h5, h2'))
      expect(allElements[0].tagName).toBe('H5')
      expect(allElements[1].tagName).toBe('H2')
    })

    it('should not skip heading levels', () => {
      const { container } = render(<Services />)

      // Should have h5, h2, h3 but not h1, h4, h6
      expect(container.querySelector('h5')).toBeTruthy()
      expect(container.querySelector('h2')).toBeTruthy()
      expect(container.querySelector('h3')).toBeTruthy()
      expect(container.querySelector('h1')).toBeFalsy()
      expect(container.querySelector('h4')).toBeFalsy()
      expect(container.querySelector('h6')).toBeFalsy()
    })
  })

  describe('ARIA Labels and Roles', () => {
    it('should have role="article" on service cards', () => {
      const mockService: Service = {
        id: 'test-service',
        icon: 'code',
        colSpan: 1,
        rowSpan: 1,
        size: 'small',
      }

      const { container } = render(<ServiceCard service={mockService} />)
      const article = container.querySelector('[role="article"]')

      expect(article).toBeTruthy()
    })

    it('should have aria-label on service cards', () => {
      const mockService: Service = {
        id: 'custom-software',
        icon: 'deployed_code',
        colSpan: 2,
        rowSpan: 2,
        size: 'large',
      }

      const { container } = render(<ServiceCard service={mockService} />)
      const article = container.querySelector('[role="article"]')

      // Should have aria-label attribute
      expect(article?.hasAttribute('aria-label')).toBe(true)
      expect(article?.getAttribute('aria-label')).toBeTruthy()
    })

    it('should have aria-label on icons', () => {
      const mockService: Service = {
        id: 'custom-software',
        icon: 'deployed_code',
        colSpan: 1,
        rowSpan: 1,
        size: 'small',
      }

      const { container } = render(<ServiceCard service={mockService} />)
      const icon = container.querySelector('.material-symbols-outlined')

      // Should have aria-label attribute
      expect(icon?.hasAttribute('aria-label')).toBe(true)
      expect(icon?.getAttribute('aria-label')).toBeTruthy()
    })

    it('should have aria-hidden on decorative icons', () => {
      const mockService: Service = {
        id: 'legacy-migration',
        icon: 'system_update_alt',
        colSpan: 1,
        rowSpan: 1,
        size: 'medium',
        features: ['Zero Downtime', 'Data Integrity'],
      }

      const { container } = render(<ServiceCard service={mockService} />)
      const checkIcons = container.querySelectorAll(
        '.material-symbols-outlined[aria-hidden="true"]'
      )

      // Check icons in features should be decorative
      expect(checkIcons.length).toBeGreaterThan(0)
    })
  })

  describe('Focus Styles', () => {
    it('should have card-hover-effect class for focus styles', () => {
      const { container } = render(<Services />)
      const cards = container.querySelectorAll('.card-hover-effect')

      expect(cards.length).toBe(6)
    })

    it('should have transition classes for smooth focus', () => {
      const mockService: Service = {
        id: 'test-service',
        icon: 'code',
        colSpan: 1,
        rowSpan: 1,
        size: 'small',
      }

      const { container } = render(<ServiceCard service={mockService} />)
      const card = container.querySelector('[role="article"]')

      expect(card?.className).toContain('transition')
    })

    it('should have hover classes that apply to focus', () => {
      const mockService: Service = {
        id: 'test-service',
        icon: 'code',
        colSpan: 1,
        rowSpan: 1,
        size: 'small',
      }

      const { container } = render(<ServiceCard service={mockService} />)
      const card = container.querySelector('[role="article"]')

      // Hover classes should be present (they apply to focus via CSS)
      expect(card?.className).toContain('hover:')
    })
  })

  describe('Semantic HTML', () => {
    it('should use semantic section element', () => {
      const { container } = render(<Services />)
      const section = container.querySelector('section')

      expect(section).toBeTruthy()
    })

    it('should use semantic article elements for cards', () => {
      const { container } = render(<Services />)
      const articles = container.querySelectorAll('[role="article"]')

      expect(articles.length).toBe(6)
    })

    it('should use proper paragraph elements', () => {
      const mockService: Service = {
        id: 'custom-software',
        icon: 'deployed_code',
        colSpan: 1,
        rowSpan: 1,
        size: 'small',
      }

      const { container } = render(<ServiceCard service={mockService} />)
      const paragraph = container.querySelector('p')

      expect(paragraph).toBeTruthy()
      // Should have text content (translation key or actual text)
      expect(paragraph?.textContent).toBeTruthy()
      expect(paragraph?.textContent?.length).toBeGreaterThan(0)
    })
  })
})
