import { ClipboardList } from 'lucide-react'

import { PageContainer } from '../app/layout/PageContainer'
import { ProductForm } from '../components/forms/ProductForm'
import { Badge } from '../components/primitives/Badge'
import { Card } from '../components/primitives/Card'
import { PRODUCT_FIELDS } from '../domain/productDefinition'

export function CadastroScreen() {
  return (
    <PageContainer>
      <Card elevated className="grid gap-4 overflow-hidden bg-linear-to-br from-surface to-surface-accent">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Badge tone="accent">Cadastro guiado</Badge>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text">Novo item de estoque</h1>
            <p className="mt-2 max-w-2xl text-sm text-text-muted">
              Estrutura pronta para cadastro rápido, leitura clara e expansão futura com autenticação e backend.
            </p>
          </div>
          <span className="flex size-14 items-center justify-center rounded-3xl bg-accent-soft text-accent shadow-soft">
            <ClipboardList className="size-7" />
          </span>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <ProductForm />

        <aside className="grid gap-4">
          <Card elevated className="space-y-3">
            <h2 className="text-lg font-semibold text-text">Campos da V1</h2>
            <div className="grid gap-2 text-sm text-text-muted">
              {PRODUCT_FIELDS.map((field) => (
                <div key={field.name} className="flex items-center justify-between rounded-2xl bg-surface-muted px-3 py-2">
                  <span>{field.name}</span>
                  <span className="text-xs font-semibold text-text-soft">{field.required ? 'Obrigatório' : 'Opcional'}</span>
                </div>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </PageContainer>
  )
}
