import type { PropsWithChildren } from 'react'

import { cn } from '../../utils/cn'

type PageContainerProps = PropsWithChildren<{
  className?: string
}>

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <section className={cn('mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-4 sm:px-6 lg:px-8', className)}>
      {children}
    </section>
  )
}
