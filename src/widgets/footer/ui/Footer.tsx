import { Link } from '@/i18n/routing'

export function Footer() {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          © 2024 DevPortfolio. Built with Next.js and Tailwind.
        </p>
        <div className="flex gap-6">
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-white transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-white transition-colors"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  )
}
