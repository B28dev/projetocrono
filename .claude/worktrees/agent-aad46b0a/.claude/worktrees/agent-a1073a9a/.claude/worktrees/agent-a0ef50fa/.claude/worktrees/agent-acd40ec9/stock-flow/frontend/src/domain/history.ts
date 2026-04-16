import { mockHistoryEvents } from '../mocks/historyEvents'

const historyTypeLabels = {
  cadastro: 'Produto cadastrado',
  entrada: 'Entrada registrada',
  saida: 'Saída registrada',
  ajuste: 'Ajuste manual',
  remocao: 'Produto removido',
} as const

// TODO Etapa 2/2.1: substituir o feed mockado por movimentações reais do domínio.
export const historyFeed = mockHistoryEvents.map((event) => ({
  ...event,
  label: historyTypeLabels[event.type],
}))
