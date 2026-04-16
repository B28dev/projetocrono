import { historyFeed } from '../../domain/history'
import { HistoryItem } from './HistoryItem'

export function HistoryList() {
  return (
    <div className="grid gap-4">
      {historyFeed.map((event, index) => (
        <div
          key={event.id}
          className="animate-[fade-in_420ms_var(--ease-standard)_both]"
          style={{ animationDelay: `${index * 70}ms` }}
        >
          <HistoryItem event={event} />
        </div>
      ))}
    </div>
  )
}
