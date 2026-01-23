import { Header } from '@/widgets/header/ui/Header'
import { Hero } from '@/widgets/hero/ui'
import dynamicImport from 'next/dynamic'

// Lazy load below-fold components to improve initial load performance
const WorkflowProcess = dynamicImport(
  () =>
    import('@/widgets/workflow-process').then((mod) => ({
      default: mod.WorkflowProcess,
    })),
  {
    loading: () => <div className="min-h-screen" />,
  }
)

const Services = dynamicImport(
  () => import('@/widgets/services').then((mod) => ({ default: mod.Services })),
  {
    loading: () => <div className="min-h-screen" />,
  }
)

const FeaturedProjects = dynamicImport(
  () =>
    import('@/widgets/featured-projects/ui/FeaturedProjects').then((mod) => ({
      default: mod.FeaturedProjects,
    })),
  {
    loading: () => <div className="min-h-screen" />,
  }
)

const Contact = dynamicImport(
  () => import('@/widgets/contact').then((mod) => ({ default: mod.Contact })),
  {
    loading: () => <div className="min-h-screen" />,
  }
)

// Next.js route config
export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-neon-purple/30 selection:text-white">
      <Header />
      <Hero />
      <WorkflowProcess />
      <Services />
      <FeaturedProjects />
      <Contact />
    </div>
  )
}
