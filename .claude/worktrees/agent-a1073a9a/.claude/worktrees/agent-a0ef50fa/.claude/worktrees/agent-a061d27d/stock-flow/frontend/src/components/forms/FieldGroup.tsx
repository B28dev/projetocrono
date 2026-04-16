import type { PropsWithChildren } from 'react'

import { cn } from '../../utils/cn'

type FieldGroupProps = PropsWithChildren<{
  label: string
  hint?: string
  required?: boolean
  className?: string
}>

export function FieldGroup({ label, hint, required = false, className, children }: FieldGroupProps) {
  return (
    <label className={cn('grid gap-2', className)}>
      <span className="text-sm font-medium text-text">
        {label} {required ? <span className="text-danger">*</span> : null}
      </span>
      {children}
      {hint ? <span className="text-xs text-text-soft">{hint}</span> : null}
    </label>
  )
}
