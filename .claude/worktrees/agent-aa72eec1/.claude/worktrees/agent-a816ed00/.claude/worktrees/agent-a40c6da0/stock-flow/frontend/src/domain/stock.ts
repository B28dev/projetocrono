import { getStockLabel, getStockTone, isLowStock } from './productDefinition'
import { mockProducts } from '../mocks/products'

export const inventorySummary = {
  total: mockProducts.length,
  lowStock: mockProducts.filter(isLowStock).length,
  critical: mockProducts.filter((product) => product.quantidadeAtual === 0).length,
  active: mockProducts.filter((product) => product.ativo).length,
}

export const inventoryCards = mockProducts.map((product) => ({
  ...product,
  stockTone: getStockTone(product),
  stockLabel: getStockLabel(product),
}))
