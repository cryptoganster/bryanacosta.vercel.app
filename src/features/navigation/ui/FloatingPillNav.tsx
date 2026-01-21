'use client'

import { Link } from '@/i18n/routing'
import { cn } from '@/shared/lib/cn'

interface NavItem {
  label: string
  href: string
}

interface FloatingPillNavProps {
  items: NavItem[]
  activeSection: string | null
  className?: string
}

export function FloatingPillNav({
  items,
  activeSection,
  className,
}: FloatingPillNavProps) {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        // Responsive offset: mobile vs desktop (same as Header)
        const isMobile = window.innerWidth < 768
        const headerOffset = isMobile ? 25 : 88
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      }
    }
  }

  return (
    <nav className={cn('inline-flex items-center gap-2', className)}>
      {items.map((item) => {
        const isActive = activeSection === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            className={cn(
              'group relative px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300',
              'hover:scale-105 active:scale-95',
              isActive
                ? 'text-white border'
                : 'text-muted-foreground hover:text-white border'
            )}
            style={
              isActive
                ? {
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    boxShadow:
                      '0 4px 20px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  }
                : {
                    background: 'transparent',
                    borderColor: 'transparent',
                  }
            }
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                e.currentTarget.style.backdropFilter = 'blur(10px)'
                ;(e.currentTarget.style as any).WebkitBackdropFilter =
                  'blur(10px)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.backdropFilter = 'none'
                ;(e.currentTarget.style as any).WebkitBackdropFilter = 'none'
                e.currentTarget.style.borderColor = 'transparent'
              }
            }}
          >
            <span className="relative z-10">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
