'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

const techStack = [
  { logo: '/logos/python.png', altKey: 'python' },
  { logo: '/logos/java.png', altKey: 'java' },
  { logo: '/logos/typescript.png', altKey: 'typescript' },
  { logo: '/logos/nodejs.png', altKey: 'nodejs' },
  { logo: '/logos/nestjs.svg', altKey: 'nestjs' },
  { logo: '/logos/html5.png', altKey: 'html5' },
  { logo: '/logos/css3.png', altKey: 'css3' },
  { logo: '/logos/javascript.png', altKey: 'javascript' },
  { logo: '/logos/react.png', altKey: 'react' },
  { logo: '/logos/vite.png', altKey: 'vite' },
  { logo: '/logos/postgres.png', altKey: 'postgres' },
  { logo: '/logos/aws.png', altKey: 'aws' },
  { logo: '/logos/google-cloud.png', altKey: 'googleCloud' },
  { logo: '/logos/azure.png', altKey: 'azure' },
  { logo: '/logos/kubernetes.png', altKey: 'kubernetes' },
  { logo: '/logos/terraform.svg', altKey: 'terraform' },
]

/**
 * OPTIMIZADO PARA MÓVILES - CSS puro con GPU acceleration
 *
 * Performance:
 * - 0KB JavaScript overhead
 * - GPU-accelerated (OMTA - Off Main Thread Animation)
 * - 60fps en móviles de gama baja
 * - Solo anima 'transform' (no causa reflow/repaint)
 *
 * Fuentes: Mozilla MDN, Framer Motion benchmarks
 */
export function TechStackScroller() {
  const t = useTranslations('techStack')

  return (
    <div
      className="w-full max-w-4xl pt-2 sm:pt-4 pb-2 relative overflow-hidden mask-gradient-x"
      data-testid="tech-stack-scroller"
    >
      <div
        className="flex animate-scroll-seamless hover:[animation-play-state:paused] will-change-transform"
        style={{ width: 'calc(100px * 32)' }}
      >
        {/* Primera copia - 16 logos */}
        {techStack.map((tech, index) => (
          <div
            key={`first-${index}`}
            className="flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all cursor-default"
            style={{ width: '100px', height: '48px', flexShrink: 0 }}
          >
            <Image
              src={tech.logo}
              alt={t(tech.altKey as any)}
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
              loading="lazy"
            />
          </div>
        ))}
        {/* Segunda copia - 16 logos */}
        {techStack.map((tech, index) => (
          <div
            key={`second-${index}`}
            className="flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all cursor-default"
            style={{ width: '100px', height: '48px', flexShrink: 0 }}
            aria-hidden="true"
          >
            <Image
              src={tech.logo}
              alt={t(tech.altKey as any)}
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
