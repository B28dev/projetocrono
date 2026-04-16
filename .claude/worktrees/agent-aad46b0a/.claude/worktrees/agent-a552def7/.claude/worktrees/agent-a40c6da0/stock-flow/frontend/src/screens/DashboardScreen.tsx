import { ChartColumnBig } from 'lucide-react'

import { PageContainer } from '../app/layout/PageContainer'
import { AlertList } from '../components/dashboard/AlertList'
import { RecentMovements } from '../components/dashboard/RecentMovements'
import { SummaryGrid } from '../components/dashboard/SummaryGrid'
import { LoadingState } from '../components/feedback/LoadingState'
import { Badge } from '../components/primitives/Badge'
import { Card } from '../components/primitives/Card'

export function DashboardScreen() {
  return (
    <PageContainer>
      <Card elevated className="grid gap-4 overflow-hidden bg-linear-to-br from-surface to-surface-accent">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Badge tone="accent">Leitura gerencial</Badge>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text">Dashboard do estoque</h1>
            <p className="mt-2 max-w-2xl text-sm text-text-muted">
              Resumo visual com foco em itens ativos, alertas e movimentações recentes para apoio rápido à decisão.
            </p>
          </div>
          <span className="flex size-14 items-center justify-center rounded-3xl bg-accent-soft text-accent shadow-soft">
            <ChartColumnBig className="size-7" />
          </span>
        </div>
      </Card>

      <SummaryGrid />

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <AlertList />
        <RecentMovements />
      </div>

      <LoadingState
        title="Estados reutilizáveis já definidos"
        description="Loading, empty e error estão prontos para reaproveitamento em integrações futuras."
      />
    </PageContainer>
  )
}
