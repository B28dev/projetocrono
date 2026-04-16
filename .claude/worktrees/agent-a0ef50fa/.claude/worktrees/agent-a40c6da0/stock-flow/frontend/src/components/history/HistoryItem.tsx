import { ArrowDownLeft, ArrowUpRight, ClipboardPenLine, PackageMinus, PackagePlus } from 'lucide-react'

import type { HistoryEvent } from '../../types/product'
import { formatDateTime, formatRelativeLabel } from '../../utils/formatters'
import { Badge } from '../primitives/Badge'
import { Card } from '../primitives/Card'

type HistoryItemProps = {
  event: HistoryEvent & {
    label: string
  }
}

const iconMap = {
  cadastro: PackagePlus,
  entrada: ArrowUpRight,
  saida: ArrowDownLeft,
  ajuste: ClipboardPenLine,
  remocao: PackageMinus,
} as const

const toneMap = {
  cadastro: 'accent',
  entrada: 'success',
  saida: 'warning',
  ajuste: 'neutral',
  remocao: 'danger',
} as const

export function HistoryItem({ event }: HistoryItemProps) {
  const Icon = iconMap[event.type]

  return (
    <Card className="flex gap-4">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-surface-muted text-text-muted">
        <Icon className="size-5" />
      </span>
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={toneMap[event.type]}>{event.label}</Badge>
          <span className="text-xs text-text-soft">{formatRelativeLabel(event.createdAt)}</span>
        </div>
        <div>
          <p className="font-semibold text-text">{event.productName}</p>
          <p className="text-sm text-text-muted">{event.category}</p>
        </div>
        <p className="text-sm text-text-muted">{event.note}</p>
        <div className="flex flex-wrap items-center gap-3 text-xs text-text-soft">
          <span>{formatDateTime(event.createdAt)}</span>
          {typeof event.previousQuantity === 'number' && typeof event.resultingQuantity === 'number' ? (
            <span>
              {event.previousQuantity} → {event.resultingQuantity}
            </span>
          ) : null}
        </div>
      </div>
    </Card>
  )
}
