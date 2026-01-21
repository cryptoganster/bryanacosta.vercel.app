import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { TimelineLine } from '../TimelineLine'

describe('TimelineLine', () => {
  it('should render with correct structure', () => {
    const { container } = render(<TimelineLine />)
    const timeline = container.firstChild as HTMLElement

    expect(timeline).toBeDefined()
    expect(timeline.tagName).toBe('DIV')
  })

  it('should have gradient layers present', () => {
    const { container } = render(<TimelineLine />)
    const timeline = container.firstChild as HTMLElement

    expect(timeline.children.length).toBe(2)
  })

  it('should have animation classes applied', () => {
    const { container } = render(<TimelineLine />)
    const timeline = container.firstChild as HTMLElement
    const animatedLayer = timeline.children[1] as HTMLElement

    expect(animatedLayer.style.animation).toContain('flow')
  })

  it('should have responsive positioning classes', () => {
    const { container } = render(<TimelineLine />)
    const timeline = container.firstChild as HTMLElement

    expect(timeline.className).toContain('left-8')
    expect(timeline.className).toContain('md:left-1/2')
  })

  it('should have aria-hidden attribute', () => {
    const { container } = render(<TimelineLine />)
    const timeline = container.firstChild as HTMLElement

    expect(timeline.getAttribute('aria-hidden')).toBe('true')
  })
})
