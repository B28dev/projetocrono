import { ArrowUpRight } from 'lucide-react'

import { Card } from './Card'

type StatCardProps = {
  label: string
  value: number
  helper: string
}

export function StatCard({ label, value, helper }: StatCardProps) {
  return (
    <Card elevated className="flex min-h-36 flex-col justify-between gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-text-muted">{label}</p>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-text">{value}</p>
        </div>
        <span className="flex size-10 items-center justify-center rounded-2xl bg-accent-soft text-accent">
          <ArrowUpRight className="size-5" />
        </span>
      </div>
      <p className="text-sm text-text-muted">{helper}</p>
    </Card>
  )
}
