import { WorkflowStep } from '../types'

export const workflowSteps: WorkflowStep[] = [
  {
    id: 'discovery',
    number: '01',
    iconName: 'Search',
    titleKey: 'workflow.steps.discovery.title',
    subtitleKey: 'workflow.steps.discovery.subtitle',
    activitiesKey: 'workflow.steps.discovery.activities',
    position: 'left',
  },
  {
    id: 'strategy',
    number: '02',
    iconName: 'Ruler',
    titleKey: 'workflow.steps.strategy.title',
    subtitleKey: 'workflow.steps.strategy.subtitle',
    activitiesKey: 'workflow.steps.strategy.activities',
    position: 'right',
  },
  {
    id: 'development',
    number: '03',
    iconName: 'Code',
    titleKey: 'workflow.steps.development.title',
    subtitleKey: 'workflow.steps.development.subtitle',
    activitiesKey: 'workflow.steps.development.activities',
    position: 'left',
  },
  {
    id: 'testing',
    number: '04',
    iconName: 'CheckCircle',
    titleKey: 'workflow.steps.testing.title',
    subtitleKey: 'workflow.steps.testing.subtitle',
    activitiesKey: 'workflow.steps.testing.activities',
    position: 'right',
  },
  {
    id: 'delivery',
    number: '05',
    iconName: 'Rocket',
    titleKey: 'workflow.steps.delivery.title',
    subtitleKey: 'workflow.steps.delivery.subtitle',
    activitiesKey: 'workflow.steps.delivery.activities',
    position: 'left',
  },
]
