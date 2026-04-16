import {
  History,
  LayoutDashboard,
  Package,
  PlusSquare,
  type LucideIcon,
} from 'lucide-react'

import { NAVIGATION_BASE } from '../domain/productDefinition'
import type { NavigationId } from '../types/product'

const iconMap: Record<NavigationId, LucideIcon> = {
  estoque: Package,
  cadastrar: PlusSquare,
  historico: History,
  dashboard: LayoutDashboard,
}

const pathMap: Record<NavigationId, string> = {
  estoque: '/estoque',
  cadastrar: '/cadastrar',
  historico: '/historico',
  dashboard: '/dashboard',
}

export const NAV_ITEMS = NAVIGATION_BASE.map((item) => ({
  ...item,
  id: item.id as NavigationId,
  path: pathMap[item.id as NavigationId],
  icon: iconMap[item.id as NavigationId],
}))
