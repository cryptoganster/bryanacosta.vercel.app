import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StepCard } from '../StepCard'
import { WorkflowStep } from '@/entities/workflow-step'

// Mock next-intl with proper implementation
vi.mock('next-intl', () => ({
  useTranslations: () => {
    const t = (key: string) => {
      const translations: Record<string, string> = {
        'test.title': 'Test Title',
        'test.subtitle': 'Test Subtitle',
      }
      return translations[key] || key
    }
    t.raw = (key: string) => {
      if (key === 'test.activities') {
        return ['Activity 1', 'Activity 2']
      }
      return []
    }
    return t
  },
}))

const mockStep: WorkflowStep = {
  id: 'test',
  number: '01',
  iconName: 'Search',
  titleKey: 'test.title',
  subtitleKey: 'test.subtitle',
  activitiesKey: 'test.activities',
  position: 'left',
}

describe('StepCard', () => {
  it('should render all content fields', () => {
    const { container } = render(<StepCard step={mockStep} />)
    
    expect(screen.getByText('Test Title')).toBeDefined()
    expect(screen.getByText('Test Subtitle')).toBeDefined()
    expect(screen.getByText('Activity 1')).toBeDefined()
    expect(screen.getByText('Activity 2')).toBeDefined()
  })

  it('should render step number', () => {
    render(<StepCard step={mockStep} />)
    
    expect(screen.getByText(/01\./)).toBeDefined()
  })

  it('should render activities list with icons', () => {
    const { container } = render(<StepCard step={mockStep} />)
    const icons = container.querySelectorAll('svg')
    
    // Should have at least activity icons (2) + background icon (1)
    expect(icons.length).toBeGreaterThanOrEqual(3)
  })

  it('should apply mobile padding when isMobile is true', () => {
    const { container } = render(<StepCard step={mockStep} isMobile={true} />)
    const card = container.firstChild as HTMLElement
    
    expect(card.className).toContain('p-6')
  })

  it('should apply desktop padding when isMobile is false', () => {
    const { container } = render(<StepCard step={mockStep} isMobile={false} />)
    const card = container.firstChild as HTMLElement
    
    expect(card.className).toContain('p-8')
  })

  it('should have hover effect classes', () => {
    const { container } = render(<StepCard step={mockStep} />)
    const card = container.firstChild as HTMLElement
    
    expect(card.className).toContain('hover:border-[#4C02FB]/50')
    expect(card.className).toContain('group-hover:-translate-y-1')
  })
})
