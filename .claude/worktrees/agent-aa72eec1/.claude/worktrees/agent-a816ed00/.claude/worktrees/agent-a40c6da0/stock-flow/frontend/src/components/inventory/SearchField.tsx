import { Search } from 'lucide-react'

import { Input } from '../primitives/Input'

export function SearchField() {
  return (
    <label className="relative block">
      <span className="sr-only">Buscar produto</span>
      <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-text-soft" />
      <Input
        type="search"
        placeholder="Buscar produto por nome"
        className="pl-11"
        aria-label="Buscar produto por nome"
      />
    </label>
  )
}
