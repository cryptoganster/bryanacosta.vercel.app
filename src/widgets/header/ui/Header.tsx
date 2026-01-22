'use client'

import { useState, useEffect } from 'react'
import { Terminal, Menu, X } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/shared/ui/button'
import { FloatingPillNav, useNavigation } from '@/features/navigation'
import { LanguageSwitcher } from '@/shared/ui/language-switcher'
import { useTranslations } from 'next-intl'

export function Header() {
  const t = useTranslations('header')
  const { items: navItems, activeSection } = useNavigation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Restore menu state after language change
  useEffect(() => {
    const menuWasOpen = sessionStorage.getItem('mobileMenuOpen') === 'true'
    if (menuWasOpen) {
      setIsMobileMenuOpen(true)
      sessionStorage.removeItem('mobileMenuOpen')
    }
  }, [])

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        // Detect viewport size for responsive offset
        const isMobile = window.innerWidth < 768
        const headerOffset = isMobile ? 25 : 88
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset

        console.log('Mobile:', isMobile, 'Offset:', headerOffset) // Debug log

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      }
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className="fixed top-0 w-full z-50 pt-4 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className="flex items-center justify-between h-16 px-6 rounded-full shadow-lg"
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow:
                '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Logo */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="size-10 bg-gradient-to-br from-primary to-neon-purple rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                <Terminal className="text-white size-5" />
              </div>
              <h2 className="text-white text-xl font-bold tracking-tight font-display">
                {t('brand')}
              </h2>
            </div>

            {/* Navigation - Desktop */}
            <div className="hidden md:block">
              <FloatingPillNav items={navItems} activeSection={activeSection} />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Language Switcher - Desktop only */}
              <div className="hidden md:block">
                <LanguageSwitcher />
              </div>

              {/* Divider */}
              <div className="hidden md:block h-6 w-px bg-white/20" />

              {/* Social Links - Desktop only */}
              <div className="hidden md:flex items-center gap-2">
                <a
                  href="https://linkedin.com/in/bryan-stevens-acosta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
                  aria-label="LinkedIn"
                >
                  <Image
                    src="/social-logos/linkedin.svg"
                    alt="LinkedIn"
                    width={20}
                    height={20}
                    className="size-5"
                  />
                </a>
                <a
                  href="https://github.com/bryanstevensacosta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
                  aria-label="GitHub"
                >
                  <Image
                    src="/social-logos/github.svg"
                    alt="GitHub"
                    width={20}
                    height={20}
                    className="size-5"
                  />
                </a>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white rounded-full"
                onClick={handleMenuToggle}
                aria-label={isMobileMenuOpen ? t('closeMenu') : t('openMenu')}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="size-5" />
                ) : (
                  <Menu className="size-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Content with Glassmorphism */}
          <div
            className="absolute top-24 left-6 right-6 rounded-3xl shadow-2xl z-10"
            style={{
              background: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow:
                '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Navigation Links */}
            <nav className="flex flex-col p-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-4 py-3 text-base font-medium text-muted-foreground hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Divider */}
            <div className="h-px bg-white/10 mx-4" />

            {/* Language Switcher */}
            <div className="p-4">
              <LanguageSwitcher variant="inline" />
            </div>

            {/* Divider */}
            <div className="h-px bg-white/10 mx-4" />

            {/* Social Links - Mobile */}
            <div className="p-4 pb-6 flex items-center justify-center gap-4">
              <a
                href="https://linkedin.com/in/bryan-stevens-acosta"
                target="_blank"
                rel="noopener noreferrer"
                className="size-12 rounded-full flex items-center justify-center hover:bg-white/10 transition-all active:scale-95"
                aria-label="LinkedIn"
              >
                <Image
                  src="/social-logos/linkedin.svg"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                  className="size-6"
                />
              </a>
              <a
                href="https://github.com/bryanstevensacosta"
                target="_blank"
                rel="noopener noreferrer"
                className="size-12 rounded-full flex items-center justify-center hover:bg-white/10 transition-all active:scale-95"
                aria-label="GitHub"
              >
                <Image
                  src="/social-logos/github.svg"
                  alt="GitHub"
                  width={24}
                  height={24}
                  className="size-6"
                />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
