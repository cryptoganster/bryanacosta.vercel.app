'use client'

import { useState, useEffect } from 'react'
import { Terminal, Menu, X } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { FloatingPillNav, useNavigation } from '@/features/navigation'
import { LanguageSwitcher } from '@/shared/ui/language-switcher'
import { useTranslations } from 'next-intl'

export function Header() {
  const t = useTranslations('header')
  const { items: navItems } = useNavigation()
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

  const handleNavClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className="fixed top-0 w-full z-50 pt-4 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16 px-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full shadow-lg shadow-black/20">
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
              <FloatingPillNav items={navItems} />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Language Switcher - Desktop only */}
              <div className="hidden md:block">
                <LanguageSwitcher />
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white rounded-full"
                onClick={handleMenuToggle}
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

          {/* Menu Content */}
          <div className="absolute top-24 left-6 right-6 bg-black/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl z-10">
            {/* Navigation Links */}
            <nav className="flex flex-col p-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-4 py-3 text-base font-medium text-muted-foreground hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  onClick={handleNavClick}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Divider */}
            <div className="h-px bg-white/10 mx-4" />

            {/* Language Switcher */}
            <div className="p-4 pb-6">
              <LanguageSwitcher variant="inline" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
