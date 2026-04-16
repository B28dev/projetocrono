export type NavigationId = 'estoque' | 'cadastrar' | 'historico' | 'dashboard'

export type ProductCategory =
  | 'Limpeza'
  | 'Higiene'
  | 'Escritório'
  | 'Copa'
  | 'Descartáveis'
  | 'Manutenção'
  | 'Outros'

export type ProductUnit = 'un' | 'cx' | 'pct' | 'rol' | 'kg' | 'lt'

export type Product = {
  id: string
  nome: string
  categoria: ProductCategory
  unidade: ProductUnit
  quantidadeAtual: number
  estoqueMinimo: number
  observacoes?: string
  ativo: boolean
  createdAt: string
  updatedAt: string
}

export type MovementType = 'entrada' | 'saida' | 'ajuste' | 'cadastro' | 'remocao'

export type HistoryEvent = {
  id: string
  type: MovementType
  productId: string
  productName: string
  category: ProductCategory
  quantityChanged?: number
  previousQuantity?: number
  resultingQuantity?: number
  createdAt: string
  reason?: string
  note?: string
}

export type StatusTone = 'normal' | 'baixo' | 'critico'
