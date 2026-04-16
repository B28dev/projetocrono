import productDefinitionData from '../../../shared/product-definition.json'
import type { ProductDefinition } from '../types/product-definition'
import type { MovementType, Product, ProductCategory, ProductUnit, StatusTone } from '../types/product'

const productDefinition = productDefinitionData as ProductDefinition

export const PRODUCT_NAME = productDefinition.product.currentName
export const PRODUCT_DESCRIPTION = productDefinition.product.description
export const PRODUCT_CATEGORIES = productDefinition.categories as ProductCategory[]
export const PRODUCT_UNITS = productDefinition.units as ProductUnit[]
export const PRODUCT_FIELDS = productDefinition.productFields
export const PRODUCT_ACTIONS = productDefinition.actions
export const MOVEMENT_TYPES = productDefinition.movementTypes as MovementType[]
// TODO Etapa 2/2.1: remover este alias quando a UI consumir o domínio de movimentações diretamente.
export const HISTORY_EVENT_TYPES = MOVEMENT_TYPES
export const NAVIGATION_BASE = productDefinition.navigation
export const PRODUCT_PROFILES = productDefinition.profiles

export function isLowStock(product: Product) {
  return product.quantidadeAtual <= product.estoqueMinimo
}

export function getStockTone(product: Product): StatusTone {
  if (product.quantidadeAtual === 0) {
    return 'critico'
  }

  if (isLowStock(product)) {
    return 'baixo'
  }

  return 'normal'
}

export function getStockLabel(product: Product) {
  const tone = getStockTone(product)

  if (tone === 'critico') {
    return 'Crítico'
  }

  if (tone === 'baixo') {
    return 'Estoque baixo'
  }

  return 'Em dia'
}

export function getPrimaryProfile() {
  return PRODUCT_PROFILES.find((profile) => profile.primary) ?? PRODUCT_PROFILES[0]
}
