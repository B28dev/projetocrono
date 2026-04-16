import type { InputHTMLAttributes } from 'react'

import { cn } from '../../utils/cn'

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'min-h-12 w-full rounded-2xl border border-border bg-surface px-4 text-sm text-text shadow-soft',
        'placeholder:text-text-soft transition-colors duration-200 ease-out',
        'focus:border-accent focus:bg-bg-elevated focus:outline-none',
        className,
      )}
      {...props}
    />
  )
}
