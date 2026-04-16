import { NavLink } from 'react-router-dom'

import { NAV_ITEMS } from '../../config/navigation'
import { cn } from '../../utils/cn'

export function DesktopSidebar() {
  return (
    <aside className="sticky top-28 hidden h-[calc(100vh-8rem)] w-72 shrink-0 md:block">
      <nav aria-label="Navegação lateral" className="rounded-[1.75rem] border border-border/80 bg-surface/90 p-3 shadow-soft backdrop-blur-sm">
        <ul className="grid gap-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon

            return (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      'flex min-h-14 items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 ease-out',
                      isActive
                        ? 'bg-accent text-white shadow-floating'
                        : 'text-text-muted hover:bg-surface-muted hover:text-text',
                    )
                  }
                >
                  <Icon className="size-5" />
                  <div>
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p className="text-xs opacity-80">{item.purpose}</p>
                  </div>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
