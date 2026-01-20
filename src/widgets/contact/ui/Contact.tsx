'use client'

import { cn } from '@/shared/lib/cn'
import { TrustIndicators } from './TrustIndicators'
import { ContactForm } from './ContactForm'

interface ContactProps {
  className?: string
}

export function Contact({ className }: ContactProps) {
  return (
    <section
      id="contact"
      className={cn(
        'relative overflow-hidden py-16 px-4 sm:px-6',
        'bg-background',
        className
      )}
    >
      <div className="max-w-[1280px] relative mx-auto">
        {/* Two-column layout for desktop, single column for mobile */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Trust Indicators */}
          <div className="flex flex-col justify-center">
            <TrustIndicators />
          </div>

          {/* Right Column - Contact Form */}
          <div className="flex flex-col justify-center">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
