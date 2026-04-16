import { historyFeed } from './history'
import { inventoryCards, inventorySummary } from './stock'

export const dashboardStats = [
  {
    id: 'total',
    label: 'Itens ativos',
    value: inventorySummary.active,
    helper: 'Base atual do estoque visível.',
  },
  {
    id: 'baixo',
    label: 'Em alerta',
    value: inventorySummary.lowStock,
    helper: 'Itens em estoque baixo ou zerado.',
  },
  {
    id: 'critico',
    label: 'Críticos',
    value: inventorySummary.critical,
    helper: 'Itens zerados e com prioridade máxima.',
  },
]

export const dashboardAlerts = inventoryCards
  .filter((product) => product.stockTone !== 'normal')
  .slice(0, 4)

export const dashboardMovements = historyFeed.slice(0, 4)
