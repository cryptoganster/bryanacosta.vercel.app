'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/shared/ui/button'
import { ArrowRight } from 'lucide-react'

export function WorkflowCTA() {
  const t = useTranslations('workflow.cta')

  const handleStartDiscovery = () => {
    const contactSection = document.querySelector('#contact')
    if (contactSection) {
      const isMobile = window.innerWidth < 768
      const headerOffset = isMobile ? 25 : 88
      const elementPosition = contactSection.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="py-20 px-6 relative z-10">
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-surface-dark to-[#1a2026] rounded-3xl p-10 md:p-16 border border-gray-800 text-center relative overflow-hidden shadow-2xl">
        {/* Decorative glows */}
        <div 
          className="absolute -top-20 -left-20 w-64 h-64 bg-[#4C02FB]/20 rounded-full blur-[80px]" 
          aria-hidden="true"
        />
        <div 
          className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#4C02FB]/20 rounded-full blur-[80px]" 
          aria-hidden="true"
        />

        {/* Content */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative z-10">
          {t('title')}
        </h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto relative z-10">
          {t('description')}
        </p>
        <Button
          onClick={handleStartDiscovery}
          className="relative z-10 group bg-[#4C02FB] hover:bg-[#3D02C9] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-[#4C02FB]/25 flex items-center gap-2 mx-auto"
        >
          {t('button')}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  )
}
