import { NavLink } from 'react-router-dom'

import { NAV_ITEMS } from '../../config/navigation'
import { cn } from '../../utils/cn'

export function BottomNav() {
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border/80 bg-surface/92 px-3 py-3 backdrop-blur-xl md:hidden"
    >
      <ul className="mx-auto grid max-w-xl grid-cols-4 gap-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon

          return (
            <li key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold transition-all duration-200 ease-out',
                    isActive
                      ? 'bg-accent-soft text-accent shadow-soft'
                      : 'text-text-soft hover:bg-surface-muted hover:text-text',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={cn('size-5 transition-transform duration-200', isActive && 'scale-110')} />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
