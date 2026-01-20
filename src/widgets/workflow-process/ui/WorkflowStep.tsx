'use client'

import { WorkflowStep as WorkflowStepType } from '@/entities/workflow-step'
import { StepCard } from './StepCard'
import { StepNode } from './StepNode'
import { cn } from '@/shared/lib'

interface WorkflowStepProps {
  step: WorkflowStepType
  index: number
  isFirst: boolean
}

export function WorkflowStep({ step, index, isFirst }: WorkflowStepProps) {
  const isLeft = step.position === 'left'
  
  return (
    <div 
      className={cn(
        "group relative flex flex-col md:flex-row items-start md:items-center w-full",
        index > 0 && "md:mt-[-40px]"
      )}
      role="listitem"
    >
      {/* Desktop: Left content */}
      {isLeft && (
        <div className="hidden md:flex w-1/2 pr-16 justify-end">
          <StepCard step={step} />
        </div>
      )}

      {/* Desktop: Spacer for right-aligned cards */}
      {!isLeft && <div className="hidden md:block w-1/2 pr-16" />}

      {/* Center Node */}
      <StepNode step={step} isFirst={isFirst} />

      {/* Mobile: Always right of line */}
      <div className="md:hidden pl-24 w-full">
        <StepCard step={step} isMobile />
      </div>

      {/* Desktop: Right content */}
      {!isLeft && (
        <div className="hidden md:block w-1/2 pl-16">
          <StepCard step={step} />
        </div>
      )}

      {/* Desktop: Spacer for left-aligned cards */}
      {isLeft && <div className="hidden md:block w-1/2 pl-16" />}
    </div>
  )
}
