import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

import { cn } from '../../utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'md' | 'sm' | 'icon'

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant
    size?: ButtonSize
  }
>

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-white shadow-floating hover:bg-accent-strong active:scale-[0.98] active:bg-accent-strong',
  secondary:
    'bg-surface text-text border border-border shadow-soft hover:border-border-strong hover:bg-surface-muted active:scale-[0.98]',
  ghost:
    'bg-transparent text-text-muted hover:bg-surface-muted hover:text-text active:scale-[0.98]',
  danger:
    'bg-danger text-white shadow-soft hover:opacity-95 active:scale-[0.98]',
}

const sizeClasses: Record<ButtonSize, string> = {
  md: 'min-h-11 px-4 py-3 text-sm font-semibold',
  sm: 'min-h-11 px-3 py-2.5 text-sm font-medium',
  icon: 'size-11 items-center justify-center p-0',
}

export function Button({
  children,
  className,
  type = 'button',
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex rounded-xl transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-50',
        'focus-visible:outline-none',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
