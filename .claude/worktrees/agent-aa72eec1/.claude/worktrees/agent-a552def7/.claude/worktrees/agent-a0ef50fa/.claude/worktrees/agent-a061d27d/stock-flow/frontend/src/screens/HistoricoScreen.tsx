import { Clock3 } from 'lucide-react'

import { PageContainer } from '../app/layout/PageContainer'
import { HistoryList } from '../components/history/HistoryList'
import { Badge } from '../components/primitives/Badge'
import { Card } from '../components/primitives/Card'

export function HistoricoScreen() {
  return (
    <PageContainer>
      <Card elevated className="grid gap-4 overflow-hidden bg-linear-to-br from-surface to-surface-accent">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Badge tone="accent">Conferência e rastreio</Badge>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text">Histórico operacional</h1>
            <p className="mt-2 max-w-2xl text-sm text-text-muted">
              Linha do tempo clara para acompanhar cadastro, entradas, saídas, ajustes e remoções na V1.
            </p>
          </div>
          <span className="flex size-14 items-center justify-center rounded-3xl bg-accent-soft text-accent shadow-soft">
            <Clock3 className="size-7" />
          </span>
        </div>
      </Card>

      <HistoryList />
    </PageContainer>
  )
}
