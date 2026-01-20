import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { StepNode } from '../StepNode'
import { WorkflowStep } from '@/entities/workflow-step'

const mockStep: WorkflowStep = {
  id: 'test',
  number: '01',
  iconName: 'Search',
  titleKey: 'test.title',
  subtitleKey: 'test.subtitle',
  activitiesKey: 'test.activities',
  position: 'left',
}

describe('StepNode', () => {
  it('should render first step with primary border', () => {
    const { container } = render(<StepNode step={mockStep} isFirst={true} />)
    const node = container.firstChild as HTMLElement
    
    expect(node.className).toContain('border-primary')
  })

  it('should render non-first steps with gray border', () => {
    const { container } = render(<StepNode step={mockStep} isFirst={false} />)
    const node = container.firstChild as HTMLElement
    
    expect(node.className).toContain('border-gray-700')
  })

  it('should render icon correctly', () => {
    const { container } = render(<StepNode step={mockStep} isFirst={false} />)
    const icon = container.querySelector('svg')
    
    expect(icon).toBeDefined()
  })

  it('should have responsive sizing classes', () => {
    const { container } = render(<StepNode step={mockStep} isFirst={false} />)
    const node = container.firstChild as HTMLElement
    
    expect(node.className).toContain('w-12')
    expect(node.className).toContain('h-12')
    expect(node.className).toContain('md:w-16')
    expect(node.className).toContain('md:h-16')
  })

  it('should have aria-label present', () => {
    const { container } = render(<StepNode step={mockStep} isFirst={false} />)
    const node = container.firstChild as HTMLElement
    
    expect(node.getAttribute('aria-label')).toBe('Step 01')
  })
})
