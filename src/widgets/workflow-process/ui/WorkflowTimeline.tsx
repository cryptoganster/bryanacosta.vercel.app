'use client'

import { workflowSteps } from '@/entities/workflow-step'
import { WorkflowStep } from './WorkflowStep'
import { TimelineLine } from './TimelineLine'

export function WorkflowTimeline() {
  return (
    <div className="relative py-10 px-4 md:px-10">
      {/* Central Timeline Line */}
      <TimelineLine />

      {/* Process Steps */}
      <div
        className="flex flex-col gap-12 md:gap-0 relative z-10"
        role="list"
        aria-label="Workflow process steps"
      >
        {workflowSteps.map((step, index) => (
          <WorkflowStep
            key={step.id}
            step={step}
            index={index}
            isFirst={index === 0}
          />
        ))}
      </div>
    </div>
  )
}
