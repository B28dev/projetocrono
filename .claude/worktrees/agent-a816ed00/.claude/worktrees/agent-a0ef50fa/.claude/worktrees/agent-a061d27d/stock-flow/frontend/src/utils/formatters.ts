export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

export function formatRelativeLabel(value: string) {
  const now = Date.now()
  const target = new Date(value).getTime()
  const diffInHours = Math.round((target - now) / (1000 * 60 * 60))

  if (Math.abs(diffInHours) < 24) {
    const formatter = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' })
    return formatter.format(diffInHours, 'hour')
  }

  const diffInDays = Math.round(diffInHours / 24)
  return new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' }).format(diffInDays, 'day')
}

export function formatQuantity(value: number, unit: string) {
  return `${value} ${unit}`
}
