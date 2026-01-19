import { services } from '../lib/services.data'
import type { Service } from '../types'

export function useServices(): Service[] {
  return services
}
