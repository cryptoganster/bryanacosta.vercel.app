import {
  Search,
  Ruler,
  Code,
  CheckCircle,
  Rocket,
  LucideIcon,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Search,
  Ruler,
  Code,
  CheckCircle,
  Rocket,
}

export function getIconComponent(iconName: string): LucideIcon {
  return iconMap[iconName] || Search
}
