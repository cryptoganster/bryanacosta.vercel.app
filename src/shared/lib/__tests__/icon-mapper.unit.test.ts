import { describe, it, expect } from 'vitest'
import { getIconComponent } from '../icon-mapper'
import { Search, Ruler, Code, CheckCircle, Rocket } from 'lucide-react'

describe('getIconComponent', () => {
  it('should return correct component for valid icon name', () => {
    expect(getIconComponent('Search')).toBe(Search)
    expect(getIconComponent('Ruler')).toBe(Ruler)
    expect(getIconComponent('Code')).toBe(Code)
    expect(getIconComponent('CheckCircle')).toBe(CheckCircle)
    expect(getIconComponent('Rocket')).toBe(Rocket)
  })

  it('should return fallback (Search) for invalid icon name', () => {
    expect(getIconComponent('InvalidIcon')).toBe(Search)
    expect(getIconComponent('')).toBe(Search)
    expect(getIconComponent('NonExistent')).toBe(Search)
  })

  it('should map all workflow icon names correctly', () => {
    const workflowIcons = ['Search', 'Ruler', 'Code', 'CheckCircle', 'Rocket']

    workflowIcons.forEach((iconName) => {
      const IconComponent = getIconComponent(iconName)
      expect(IconComponent).toBeDefined()
      expect(IconComponent).toBeTruthy()
    })
  })
})
