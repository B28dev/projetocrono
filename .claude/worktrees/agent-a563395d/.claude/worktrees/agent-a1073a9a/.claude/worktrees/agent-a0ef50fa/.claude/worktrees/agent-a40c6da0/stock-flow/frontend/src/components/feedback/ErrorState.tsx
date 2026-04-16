import { TriangleAlert } from 'lucide-react'

import { Card } from '../primitives/Card'
import { Button } from '../primitives/Button'

type ErrorStateProps = {
  title?: string
  description?: string
  actionLabel?: string
}

export function ErrorState({
  title = 'Não foi possível carregar',
  description = 'Revise a conexão ou tente novamente quando o fluxo estiver disponível.',
  actionLabel = 'Tentar novamente',
}: ErrorStateProps) {
  return (
    <Card className="flex min-h-56 flex-col items-center justify-center gap-4 border-danger/25 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-danger-soft text-danger">
        <TriangleAlert className="size-6" />
      </span>
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-text">{title}</h2>
        <p className="text-sm text-text-muted">{description}</p>
      </div>
      <Button variant="secondary">{actionLabel}</Button>
    </Card>
  )
}
