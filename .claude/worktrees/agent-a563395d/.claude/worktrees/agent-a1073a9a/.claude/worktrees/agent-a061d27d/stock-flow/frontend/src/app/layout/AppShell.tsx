import { Outlet, useLocation } from 'react-router-dom'

import { NAV_ITEMS } from '../../config/navigation'
import { DesktopSidebar } from './DesktopSidebar'
import { BottomNav } from './BottomNav'
import { TopBar } from './TopBar'

export function AppShell() {
  const location = useLocation()
  const currentItem = NAV_ITEMS.find((item) => item.path === location.pathname)

  return (
    <div className="min-h-screen pb-24 md:pb-0">
      <TopBar />
      <div className="mx-auto flex w-full max-w-6xl gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <DesktopSidebar />
        <main className="min-w-0 flex-1 animate-[fade-in_420ms_var(--ease-standard)_both]" aria-label={currentItem?.label ?? 'Conteúdo principal'}>
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  )
}
