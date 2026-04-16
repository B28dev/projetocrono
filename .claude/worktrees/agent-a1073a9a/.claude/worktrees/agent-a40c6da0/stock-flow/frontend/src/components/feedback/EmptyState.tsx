import { Inbox } from 'lucide-react'

import { Card } from '../primitives/Card'
import { Button } from '../primitives/Button'

type EmptyStateProps = {
  title?: string
  description?: string
  actionLabel?: string
}

export function EmptyState({
  title = 'Nada por aqui ainda',
  description = 'Assim que houver itens ou movimentações, esta área vai refletir o fluxo do estoque.',
  actionLabel,
}: EmptyStateProps) {
  return (
    <Card className="flex min-h-56 flex-col items-center justify-center gap-4 border-dashed text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-surface-muted text-text-muted">
        <Inbox className="size-6" />
      </span>
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-text">{title}</h2>
        <p className="text-sm text-text-muted">{description}</p>
      </div>
      {actionLabel ? <Button variant="secondary">{actionLabel}</Button> : null}
    </Card>
  )
}
