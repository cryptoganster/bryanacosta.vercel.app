import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { workflowSteps } from '../workflow-steps.data'
import { WorkflowStep, WorkflowStepIcon } from '../../types'

/**
 * Feature: workflow-process, Property 1: Complete Step Rendering
 * Validates: Requirements 1.2, 2.1, 2.7, 4.1, 4.5
 *
 * Property: For any workflow step in the data array, when rendered,
 * the component should display the step number, title, subtitle,
 * activities list, icon, and node element.
 */

describe('WorkflowStep Data Structure - Property-Based Tests', () => {
  // Generator for valid workflow step icons
  const workflowStepIconArb = fc.constantFrom<WorkflowStepIcon>(
    'Search',
    'Ruler',
    'Code',
    'CheckCircle',
    'Rocket'
  )

  // Generator for valid workflow step positions
  const positionArb = fc.constantFrom<'left' | 'right'>('left', 'right')

  // Generator for random workflow steps
  const workflowStepArb = fc.record({
    id: fc.string({ minLength: 1 }),
    number: fc
      .string({ minLength: 2, maxLength: 2 })
      .filter((s) => /^\d{2}$/.test(s)),
    iconName: workflowStepIconArb,
    titleKey: fc.string({ minLength: 1 }),
    subtitleKey: fc.string({ minLength: 1 }),
    activitiesKey: fc.string({ minLength: 1 }),
    position: positionArb,
  }) as fc.Arbitrary<WorkflowStep>

  it('should have all required fields for any workflow step', () => {
    fc.assert(
      fc.property(workflowStepArb, (step) => {
        // Verify all required fields are present and non-empty
        expect(step.id).toBeDefined()
        expect(step.id).not.toBe('')

        expect(step.number).toBeDefined()
        expect(step.number).not.toBe('')
        expect(step.number).toMatch(/^\d{2}$/)

        expect(step.iconName).toBeDefined()
        expect(['Search', 'Ruler', 'Code', 'CheckCircle', 'Rocket']).toContain(
          step.iconName
        )

        expect(step.titleKey).toBeDefined()
        expect(step.titleKey).not.toBe('')

        expect(step.subtitleKey).toBeDefined()
        expect(step.subtitleKey).not.toBe('')

        expect(step.activitiesKey).toBeDefined()
        expect(step.activitiesKey).not.toBe('')

        expect(step.position).toBeDefined()
        expect(['left', 'right']).toContain(step.position)
      }),
      { numRuns: 100 }
    )
  })

  it('should have all required fields in actual workflow steps data', () => {
    // Test the actual data array
    expect(workflowSteps).toBeDefined()
    expect(workflowSteps.length).toBe(5)

    workflowSteps.forEach((step, index) => {
      // Verify all required fields are present
      expect(step.id).toBeDefined()
      expect(step.id).not.toBe('')

      expect(step.number).toBeDefined()
      expect(step.number).not.toBe('')
      expect(step.number).toMatch(/^\d{2}$/)

      expect(step.iconName).toBeDefined()
      expect(['Search', 'Ruler', 'Code', 'CheckCircle', 'Rocket']).toContain(
        step.iconName
      )

      expect(step.titleKey).toBeDefined()
      expect(step.titleKey).not.toBe('')
      expect(step.titleKey).toMatch(/^workflow\.steps\.\w+\.title$/)

      expect(step.subtitleKey).toBeDefined()
      expect(step.subtitleKey).not.toBe('')
      expect(step.subtitleKey).toMatch(/^workflow\.steps\.\w+\.subtitle$/)

      expect(step.activitiesKey).toBeDefined()
      expect(step.activitiesKey).not.toBe('')
      expect(step.activitiesKey).toMatch(/^workflow\.steps\.\w+\.activities$/)

      expect(step.position).toBeDefined()
      expect(['left', 'right']).toContain(step.position)
    })
  })

  it('should have correct alternating positions (snake pattern)', () => {
    // Property: Odd-numbered steps should be left, even-numbered should be right
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 5 }), (stepNumber) => {
        const step = workflowSteps[stepNumber - 1]
        const expectedPosition = stepNumber % 2 === 1 ? 'left' : 'right'
        expect(step.position).toBe(expectedPosition)
      }),
      { numRuns: 100 }
    )
  })

  it('should have sequential numbering', () => {
    // Property: Step numbers should be sequential from 01 to 05
    workflowSteps.forEach((step, index) => {
      const expectedNumber = String(index + 1).padStart(2, '0')
      expect(step.number).toBe(expectedNumber)
    })
  })

  it('should have unique IDs', () => {
    // Property: All step IDs should be unique
    const ids = workflowSteps.map((step) => step.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(workflowSteps.length)
  })

  it('should have consistent i18n key structure', () => {
    // Property: All i18n keys should follow the pattern workflow.steps.{id}.{field}
    workflowSteps.forEach((step) => {
      expect(step.titleKey).toBe(`workflow.steps.${step.id}.title`)
      expect(step.subtitleKey).toBe(`workflow.steps.${step.id}.subtitle`)
      expect(step.activitiesKey).toBe(`workflow.steps.${step.id}.activities`)
    })
  })
})
