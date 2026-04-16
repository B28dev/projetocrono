import { Save } from 'lucide-react'

import { PRODUCT_CATEGORIES, PRODUCT_UNITS } from '../../domain/productDefinition'
import { Button } from '../primitives/Button'
import { Card } from '../primitives/Card'
import { Input } from '../primitives/Input'
import { Select } from '../primitives/Select'
import { FieldGroup } from './FieldGroup'

export function ProductForm() {
  return (
    <Card elevated className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <FieldGroup label="Nome do produto" required hint="Use um nome curto e objetivo para facilitar a busca.">
          <Input placeholder="Ex.: Papel toalha interfolha" />
        </FieldGroup>

        <FieldGroup label="Categoria" required hint="Categorias fechadas para manter padronização na V1.">
          <Select defaultValue="">
            <option value="" disabled>
              Selecione uma categoria
            </option>
            {PRODUCT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </FieldGroup>

        <FieldGroup label="Unidade" required hint="Define como o item será controlado no estoque.">
          <Select defaultValue="">
            <option value="" disabled>
              Selecione a unidade
            </option>
            {PRODUCT_UNITS.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </Select>
        </FieldGroup>

        <FieldGroup label="Quantidade atual" required hint="Valor inicial já conhecido no momento do cadastro.">
          <Input type="number" min="0" placeholder="0" />
        </FieldGroup>

        <FieldGroup label="Estoque mínimo" required hint="Quando a quantidade atual atingir este valor, o item entra em alerta.">
          <Input type="number" min="0" placeholder="0" />
        </FieldGroup>
      </div>

      <FieldGroup label="Observações" hint="Opcional. Use apenas quando existir contexto operacional importante.">
        <textarea
          rows={4}
          placeholder="Ex.: Uso diário nos banheiros e recepção."
          className="min-h-28 w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-text shadow-soft placeholder:text-text-soft focus:border-accent focus:bg-bg-elevated focus:outline-none"
        />
      </FieldGroup>

      <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-text-muted">
          Etapa visual: o layout já prepara o fluxo para integração futura com backend e autenticação.
        </p>
        <Button className="justify-center gap-2">
          <Save className="size-4" />
          Salvar produto
        </Button>
      </div>
    </Card>
  )
}
