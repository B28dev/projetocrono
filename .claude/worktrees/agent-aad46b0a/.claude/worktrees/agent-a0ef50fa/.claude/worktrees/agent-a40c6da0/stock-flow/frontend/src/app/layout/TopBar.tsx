import { BellDot, Sparkles } from 'lucide-react'

import { PRODUCT_DESCRIPTION, PRODUCT_NAME, getPrimaryProfile } from '../../domain/productDefinition'
import { Badge } from '../../components/primitives/Badge'
import { Button } from '../../components/primitives/Button'
import { Card } from '../../components/primitives/Card'

export function TopBar() {
  const primaryProfile = getPrimaryProfile()

  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-bg-elevated/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Card className="flex flex-1 items-center justify-between gap-4 rounded-[1.75rem] border-border/80 bg-surface/80 px-4 py-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="accent">{PRODUCT_NAME}</Badge>
              <Badge>{primaryProfile?.name}</Badge>
            </div>
            <p className="mt-2 text-sm font-semibold text-text">Controle simples, rápido e pronto para a rotina.</p>
            <p className="mt-1 line-clamp-1 text-sm text-text-muted">{PRODUCT_DESCRIPTION}</p>
          </div>

          <div className="flex items-center gap-2">
            <Button size="icon" variant="secondary" aria-label="Ver novidades">
              <Sparkles className="size-5" />
            </Button>
            <Button size="icon" variant="secondary" aria-label="Ver alertas">
              <BellDot className="size-5" />
            </Button>
          </div>
        </Card>
      </div>
    </header>
  )
}
