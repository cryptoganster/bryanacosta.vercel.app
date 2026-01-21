'use client'

import { useTranslations } from 'next-intl'
import { WorkflowTimeline } from './WorkflowTimeline'
import { WorkflowCTA } from './WorkflowCTA'

export function WorkflowProcess() {
  const t = useTranslations('workflow')

  return (
    <section
      id="workflow"
      className="relative py-16 md:py-24 px-6 overflow-hidden"
      aria-labelledby="workflow-heading"
    >
      {/* Blur backgrounds - Black versions of Hero style */}
      <div
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[90vw] max-w-[800px] h-[60vh] max-h-[600px] rounded-full blur-[120px] md:blur-[160px] opacity-50 pointer-events-none"
        style={{ background: '#000000', zIndex: 0 }}
      />
      <div
        className="absolute bottom-[40%] right-[-10%] w-[70vw] max-w-[500px] h-[50vh] max-h-[500px] rounded-full blur-[150px] md:blur-[200px] opacity-35 pointer-events-none"
        style={{ background: '#0a0a0a', zIndex: 0 }}
      />
      <div
        className="absolute top-[20%] left-[-10%] w-[60vw] max-w-[400px] h-[40vh] max-h-[400px] rounded-full blur-[80px] md:blur-[100px] opacity-35 pointer-events-none"
        style={{ background: '#000000', zIndex: 0 }}
      />

      {/* Grid pattern with mask - Same as Hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '3rem 3rem',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 50%, #000 60%, transparent 100%)',
          zIndex: 1,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 md:mb-20">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 backdrop-blur-sm text-white text-sm font-bold tracking-wide border border-white/10 shadow-lg">
            {t('badge')}
          </span>
          <h2
            id="workflow-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
          >
            {t('title.part1')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A2BFC] to-[#E05D72]">
              {t('title.highlight')}
            </span>{' '}
            {t('title.part2')}
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Timeline */}
        <WorkflowTimeline />

        {/* CTA Section */}
        <WorkflowCTA />
      </div>
    </section>
  )
}
