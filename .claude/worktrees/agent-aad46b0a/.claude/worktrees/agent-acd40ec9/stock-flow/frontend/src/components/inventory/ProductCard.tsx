import { Minus, PencilLine, Plus, Trash2 } from 'lucide-react'

import type { Product } from '../../types/product'
import { formatQuantity } from '../../utils/formatters'
import { Button } from '../primitives/Button'
import { Card } from '../primitives/Card'
import { StockStatusBadge } from './StockStatusBadge'

type ProductCardProps = {
  product: Product & {
    stockTone: 'normal' | 'baixo' | 'critico'
    stockLabel: string
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card elevated className="space-y-4 transition duration-300 ease-out hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold tracking-[0.12em] text-text-soft uppercase">
            {product.categoria}
          </p>
          <h3 className="text-base font-semibold text-text">{product.nome}</h3>
          <p className="text-sm text-text-muted">ID {product.id}</p>
        </div>
        <StockStatusBadge label={product.stockLabel} tone={product.stockTone} />
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-surface-muted p-3">
          <p className="text-text-soft">Quantidade atual</p>
          <p className="mt-1 text-lg font-semibold text-text">
            {formatQuantity(product.quantidadeAtual, product.unidade)}
          </p>
        </div>
        <div className="rounded-2xl bg-surface-muted p-3">
          <p className="text-text-soft">Estoque mínimo</p>
          <p className="mt-1 text-lg font-semibold text-text">
            {formatQuantity(product.estoqueMinimo, product.unidade)}
          </p>
        </div>
      </div>

      <p className="text-sm text-text-muted">{product.observacoes}</p>

      <div className="grid grid-cols-4 gap-2">
        <Button size="icon" variant="secondary" aria-label={`Diminuir ${product.nome}`}>
          <Minus className="size-4" />
        </Button>
        <Button size="icon" variant="primary" aria-label={`Aumentar ${product.nome}`}>
          <Plus className="size-4" />
        </Button>
        <Button size="icon" variant="secondary" aria-label={`Editar ${product.nome}`}>
          <PencilLine className="size-4" />
        </Button>
        <Button size="icon" variant="ghost" aria-label={`Remover ${product.nome}`}>
          <Trash2 className="size-4" />
        </Button>
      </div>
    </Card>
  )
}
