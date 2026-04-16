import { inventoryCards } from '../../domain/stock'
import { ProductCard } from './ProductCard'

export function ProductList() {
  return (
    <div className="grid gap-4">
      {inventoryCards.map((product, index) => (
        <div
          key={product.id}
          className="animate-[fade-in_420ms_var(--ease-standard)_both]"
          style={{ animationDelay: `${index * 70}ms` }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}
