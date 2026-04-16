import type { HTMLAttributes, PropsWithChildren } from 'react'

import { cn } from '../../utils/cn'

type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger'

type BadgeProps = PropsWithChildren<
  HTMLAttributes<HTMLSpanElement> & {
    tone?: BadgeTone
  }
>

const toneClasses: Record<BadgeTone, string> = {
  neutral: 'bg-surface-muted text-text-muted border-border',
  accent: 'bg-accent-soft text-accent border-transparent',
  success: 'bg-success-soft text-success border-transparent',
  warning: 'bg-warning-soft text-warning border-transparent',
  danger: 'bg-danger-soft text-danger border-transparent',
}

export function Badge({ children, className, tone = 'neutral', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex min-h-8 items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.02em]',
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
