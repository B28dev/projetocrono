import { LoaderCircle } from 'lucide-react'

import { Card } from '../primitives/Card'

type LoadingStateProps = {
  title?: string
  description?: string
}

export function LoadingState({
  title = 'Carregando visão',
  description = 'Preparando a leitura do estoque para você.',
}: LoadingStateProps) {
  return (
    <Card className="flex min-h-56 flex-col items-center justify-center gap-4 border-dashed text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-accent-soft text-accent">
        <LoaderCircle className="size-6 animate-spin" />
      </span>
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-text">{title}</h2>
        <p className="text-sm text-text-muted">{description}</p>
      </div>
    </Card>
  )
}
