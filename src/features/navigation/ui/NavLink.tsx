import { Link } from '@/i18n/routing'
import { cn } from '@/shared/lib/cn'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function NavLink({ href, children, className }: NavLinkProps) {
  return (
    <Link
      className={cn(
        'text-muted-foreground hover:text-white transition-all text-sm font-medium tracking-wide',
        className
      )}
      href={href}
    >
      {children}
    </Link>
  )
}
