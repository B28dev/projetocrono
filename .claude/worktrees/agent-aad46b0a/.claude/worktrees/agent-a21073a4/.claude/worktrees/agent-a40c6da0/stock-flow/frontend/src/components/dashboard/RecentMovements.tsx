import { dashboardMovements } from '../../domain/dashboard'
import { formatDateTime } from '../../utils/formatters'
import { Card } from '../primitives/Card'

export function RecentMovements() {
  return (
    <Card elevated className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-text">Movimentações recentes</h2>
        <p className="text-sm text-text-muted">Resumo das últimas alterações no fluxo do estoque.</p>
      </div>

      <div className="grid gap-3">
        {dashboardMovements.map((movement) => (
          <div key={movement.id} className="rounded-2xl bg-surface-muted p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-text">{movement.label}</p>
                <p className="text-sm text-text-muted">{movement.productName}</p>
              </div>
              <span className="text-xs text-text-soft">{formatDateTime(movement.createdAt)}</span>
            </div>
            <p className="mt-2 text-sm text-text-muted">{movement.note}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
