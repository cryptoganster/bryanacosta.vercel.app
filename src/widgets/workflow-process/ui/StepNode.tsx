'use client'

import { WorkflowStep } from '@/entities/workflow-step'
import { getIconComponent } from '@/shared/lib'
import { cn } from '@/shared/lib'

interface StepNodeProps {
  step: WorkflowStep
  isFirst: boolean
}

export function StepNode({ step, isFirst }: StepNodeProps) {
  const Icon = getIconComponent(step.iconName)

  return (
    <div 
      className={cn(
        "absolute left-8 md:left-1/2 md:-translate-x-1/2",
        "flex items-center justify-center rounded-full bg-surface-dark",
        "shadow-lg z-20 transition-all duration-300",
        "w-12 h-12 md:w-16 md:h-16",
        "group-hover:scale-110",
        isFirst 
          ? "border-4 border-primary shadow-[0_0_20px_rgba(30,109,113,0.6)]"
          : "border-4 border-gray-700 group-hover:border-primary"
      )}
      aria-label={`Step ${step.number}`}
    >
      <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
    </div>
  )
}
