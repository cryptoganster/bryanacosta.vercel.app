export type WorkflowStepIcon =
  | 'Search'
  | 'Ruler'
  | 'Code'
  | 'CheckCircle'
  | 'Rocket'

export interface WorkflowStep {
  id: string
  number: string // "01", "02", etc.
  iconName: WorkflowStepIcon
  titleKey: string // i18n key for title
  subtitleKey: string // i18n key for subtitle
  activitiesKey: string // i18n key for activities array
  position: 'left' | 'right' // Desktop layout position
}
