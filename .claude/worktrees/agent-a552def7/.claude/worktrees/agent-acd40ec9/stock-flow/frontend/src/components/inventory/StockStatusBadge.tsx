import { Badge } from '../primitives/Badge'
import type { StatusTone } from '../../types/product'

type StockStatusBadgeProps = {
  label: string
  tone: StatusTone
}

export function StockStatusBadge({ label, tone }: StockStatusBadgeProps) {
  if (tone === 'critico') {
    return <Badge tone="danger">{label}</Badge>
  }

  if (tone === 'baixo') {
    return <Badge tone="warning">{label}</Badge>
  }

  return <Badge tone="success">{label}</Badge>
}
