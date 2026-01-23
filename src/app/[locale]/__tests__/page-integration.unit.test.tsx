import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'

// Mock next/dynamic to bypass lazy loading in tests
vi.mock('next/dynamic', () => ({
  __esModule: true,
  default: (fn: any, options?: any) => {
    // Create a wrapper component that will use the mocked version
    const DynamicComponent = (props: any) => {
      const [Component, setComponent] = React.useState<any>(null)

      React.useEffect(() => {
        // Resolve the dynamic import immediately in tests
        fn().then((mod: any) => {
          setComponent(() => mod.default)
        })
      }, [])

      if (!Component) {
        // Return the loading component if provided
        return options?.loading ? options.loading() : null
      }

      return <Component {...props} />
    }

    DynamicComponent.displayName = 'DynamicComponent'
    return DynamicComponent
  },
}))

// Mock all widgets
vi.mock('@/widgets/header/ui/Header', () => ({
  Header: () => <header data-testid="header">Header</header>,
}))

vi.mock('@/widgets/hero/ui', () => ({
  Hero: () => <section data-testid="hero">Hero</section>,
}))

vi.mock('@/widgets/workflow-process', () => ({
  WorkflowProcess: () => <section data-testid="workflow">Workflow</section>,
}))

vi.mock('@/widgets/services', () => ({
  Services: () => <section data-testid="services">Services</section>,
}))

vi.mock('@/widgets/featured-projects/ui/FeaturedProjects', () => ({
  FeaturedProjects: () => (
    <section data-testid="featured-projects">FeaturedProjects</section>
  ),
}))

vi.mock('@/widgets/contact', () => ({
  Contact: () => <section data-testid="contact">Contact</section>,
}))

// Import Page after mocks are set up
import Page from '../page'

describe('Page Integration', () => {
  it('should render all sections in correct order', async () => {
    const { container } = render(<Page />)

    // Wait for dynamic components to load
    await vi.waitFor(() => {
      expect(screen.getByTestId('header')).toBeInTheDocument()
      expect(screen.getByTestId('hero')).toBeInTheDocument()
      expect(screen.getByTestId('workflow')).toBeInTheDocument()
      expect(screen.getByTestId('services')).toBeInTheDocument()
      expect(screen.getByTestId('featured-projects')).toBeInTheDocument()
      expect(screen.getByTestId('contact')).toBeInTheDocument()
    })

    // Get all sections in DOM order
    const sections = Array.from(container.querySelectorAll('[data-testid]'))
    const order = sections.map((el) => el.getAttribute('data-testid'))

    expect(order).toEqual([
      'header',
      'hero',
      'workflow',
      'services',
      'featured-projects',
      'contact',
    ])
  })

  it('should render Services component after Hero', async () => {
    const { container } = render(<Page />)

    // Wait for dynamic components to load
    await vi.waitFor(() => {
      expect(screen.getByTestId('workflow')).toBeInTheDocument()
      expect(screen.getByTestId('services')).toBeInTheDocument()
    })

    const sections = Array.from(container.querySelectorAll('[data-testid]'))
    const heroIndex = sections.findIndex(
      (el) => el.getAttribute('data-testid') === 'hero'
    )
    const workflowIndex = sections.findIndex(
      (el) => el.getAttribute('data-testid') === 'workflow'
    )
    const servicesIndex = sections.findIndex(
      (el) => el.getAttribute('data-testid') === 'services'
    )

    // Workflow comes after Hero
    expect(workflowIndex).toBeGreaterThan(heroIndex)
    // Services comes after Workflow
    expect(servicesIndex).toBeGreaterThan(workflowIndex)
  })

  it('should render Services component before FeaturedProjects', async () => {
    const { container } = render(<Page />)

    // Wait for dynamic components to load
    await vi.waitFor(() => {
      expect(screen.getByTestId('services')).toBeInTheDocument()
      expect(screen.getByTestId('featured-projects')).toBeInTheDocument()
    })

    const sections = Array.from(container.querySelectorAll('[data-testid]'))
    const servicesIndex = sections.findIndex(
      (el) => el.getAttribute('data-testid') === 'services'
    )
    const featuredProjectsIndex = sections.findIndex(
      (el) => el.getAttribute('data-testid') === 'featured-projects'
    )

    expect(servicesIndex).toBeLessThan(featuredProjectsIndex)
  })
})
