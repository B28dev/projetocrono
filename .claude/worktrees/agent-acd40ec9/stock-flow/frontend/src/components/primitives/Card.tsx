import type { HTMLAttributes, PropsWithChildren } from 'react'

import { cn } from '../../utils/cn'

type CardProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    elevated?: boolean
  }
>

export function Card({ children, className, elevated = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-border bg-surface/95 p-4 backdrop-blur-sm transition-transform duration-200 ease-out',
        elevated ? 'shadow-card' : 'shadow-soft',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
