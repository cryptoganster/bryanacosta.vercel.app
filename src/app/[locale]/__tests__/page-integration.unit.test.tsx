import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../page'

// Mock all widgets
vi.mock('@/widgets/header/ui/Header', () => ({
  Header: () => <header data-testid="header">Header</header>,
}))

vi.mock('@/widgets/hero/ui', () => ({
  Hero: () => <section data-testid="hero">Hero</section>,
}))

vi.mock('@/widgets/services', () => ({
  Services: () => <section data-testid="services">Services</section>,
}))

vi.mock('@/widgets/featured-projects/ui/FeaturedProjects', () => ({
  FeaturedProjects: () => (
    <section data-testid="featured-projects">FeaturedProjects</section>
  ),
}))

describe('Page Integration', () => {
  it('should render all sections in correct order', () => {
    const { container } = render(<Page />)

    const header = screen.getByTestId('header')
    const hero = screen.getByTestId('hero')
    const services = screen.getByTestId('services')
    const featuredProjects = screen.getByTestId('featured-projects')

    expect(header).toBeInTheDocument()
    expect(hero).toBeInTheDocument()
    expect(services).toBeInTheDocument()
    expect(featuredProjects).toBeInTheDocument()

    // Get all sections in DOM order
    const sections = Array.from(container.querySelectorAll('[data-testid]'))
    const order = sections.map((el) => el.getAttribute('data-testid'))

    expect(order).toEqual(['header', 'hero', 'services', 'featured-projects'])
  })

  it('should render Services component after Hero', () => {
    const { container } = render(<Page />)

    const sections = Array.from(container.querySelectorAll('[data-testid]'))
    const heroIndex = sections.findIndex(
      (el) => el.getAttribute('data-testid') === 'hero'
    )
    const servicesIndex = sections.findIndex(
      (el) => el.getAttribute('data-testid') === 'services'
    )

    expect(servicesIndex).toBeGreaterThan(heroIndex)
  })

  it('should render Services component before FeaturedProjects', () => {
    const { container } = render(<Page />)

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
