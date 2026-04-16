import type { SelectHTMLAttributes } from 'react'

import { cn } from '../../utils/cn'

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        'min-h-12 w-full appearance-none rounded-2xl border border-border bg-surface px-4 text-sm text-text shadow-soft',
        'transition-colors duration-200 ease-out focus:border-accent focus:bg-bg-elevated focus:outline-none',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  )
}
