export type ServiceSize = 'small' | 'medium' | 'large'
export type ServiceVariant = 'default' | 'ai'

export interface Service {
  id: string
  icon: string
  size: ServiceSize
  colSpan?: 1 | 2
  rowSpan?: 1 | 2
  variant?: ServiceVariant
  badges?: string[]
  features?: string[]
  platforms?: string[]
  backgroundImage?: string
}
