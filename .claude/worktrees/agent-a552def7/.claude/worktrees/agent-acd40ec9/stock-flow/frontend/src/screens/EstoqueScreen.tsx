import { ArrowRight, Package } from 'lucide-react'

import { PageContainer } from '../app/layout/PageContainer'
import { EmptyState } from '../components/feedback/EmptyState'
import { ProductList } from '../components/inventory/ProductList'
import { SearchField } from '../components/inventory/SearchField'
import { Badge } from '../components/primitives/Badge'
import { Button } from '../components/primitives/Button'
import { Card } from '../components/primitives/Card'
import { inventorySummary } from '../domain/stock'

export function EstoqueScreen() {
  return (
    <PageContainer>
      <Card elevated className="grid gap-4 overflow-hidden bg-linear-to-br from-surface to-surface-accent">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <Badge tone="accent">Operação diária</Badge>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text">Estoque em visão rápida</h1>
            <p className="mt-2 max-w-2xl text-sm text-text-muted">
              Busca, leitura de status e ações rápidas pensadas para rotina de depósito e conferência no celular.
            </p>
          </div>
          <span className="flex size-14 items-center justify-center rounded-3xl bg-accent-soft text-accent shadow-soft">
            <Package className="size-7" />
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-surface/85 p-4">
            <p className="text-sm text-text-muted">Itens ativos</p>
            <p className="mt-1 text-2xl font-semibold text-text">{inventorySummary.active}</p>
          </div>
          <div className="rounded-2xl bg-warning-soft p-4">
            <p className="text-sm text-warning">Em alerta</p>
            <p className="mt-1 text-2xl font-semibold text-text">{inventorySummary.lowStock}</p>
          </div>
          <div className="rounded-2xl bg-danger-soft p-4">
            <p className="text-sm text-danger">Críticos</p>
            <p className="mt-1 text-2xl font-semibold text-text">{inventorySummary.critical}</p>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="grid gap-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-text">Produtos cadastrados</h2>
              <p className="text-sm text-text-muted">Toque em qualquer ação para visualizar a casca do fluxo operacional.</p>
            </div>
            <Button variant="secondary" className="hidden items-center gap-2 sm:inline-flex">
              Ver histórico
              <ArrowRight className="size-4" />
            </Button>
          </div>

          <SearchField />
          <ProductList />
        </section>

        <aside className="grid gap-4">
          <Card elevated className="space-y-3">
            <div>
              <h2 className="text-lg font-semibold text-text">Ações disponíveis</h2>
              <p className="text-sm text-text-muted">Base visual já alinhada às ações obrigatórias da V1.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge tone="accent">Cadastrar produto</Badge>
              <Badge>Aumentar quantidade</Badge>
              <Badge>Diminuir quantidade</Badge>
              <Badge>Editar digitando</Badge>
              <Badge>Remover produto</Badge>
            </div>
          </Card>

          <EmptyState
            title="Mais filtros entram na Etapa 2"
            description="A base visual já está pronta para receber filtros, paginação e integração com dados reais."
          />
        </aside>
      </div>
    </PageContainer>
  )
}
