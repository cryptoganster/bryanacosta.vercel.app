import { Terminal } from 'lucide-react'
import Image from 'next/image'

export function SocialLinks() {
  return (
    <div className="flex gap-4 sm:ml-4">
      <a
        className="size-12 rounded-xl bg-surface border border-white/5 flex items-center justify-center text-muted-foreground hover:text-white hover:border-primary/50 transition-all hover:bg-primary/10"
        href="#"
      >
        <Image
          src="/github-mark-white.svg"
          alt="GitHub"
          width={20}
          height={20}
          className="size-5"
        />
      </a>
      <a
        className="size-12 rounded-xl bg-surface border border-white/5 flex items-center justify-center text-muted-foreground hover:text-white hover:border-primary/50 transition-all hover:bg-primary/10"
        href="#"
      >
        <Terminal className="size-5" />
      </a>
    </div>
  )
}
