import { ArrowRight } from 'lucide-react'

import { dashboardAlerts } from '../../domain/dashboard'
import { formatQuantity } from '../../utils/formatters'
import { Card } from '../primitives/Card'
import { StockStatusBadge } from '../inventory/StockStatusBadge'

export function AlertList() {
  return (
    <Card elevated className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-text">Itens em alerta</h2>
          <p className="text-sm text-text-muted">Leitura rápida do que precisa de ação operacional.</p>
        </div>
        <span className="flex size-10 items-center justify-center rounded-2xl bg-surface-muted text-text-muted">
          <ArrowRight className="size-5" />
        </span>
      </div>

      <div className="grid gap-3">
        {dashboardAlerts.map((item) => (
          <div key={item.id} className="rounded-2xl bg-surface-muted p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-text">{item.nome}</p>
                <p className="text-sm text-text-muted">{item.categoria}</p>
              </div>
              <StockStatusBadge label={item.stockLabel} tone={item.stockTone} />
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-text-muted">
              <span>{formatQuantity(item.quantidadeAtual, item.unidade)}</span>
              <span>Mínimo {formatQuantity(item.estoqueMinimo, item.unidade)}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
