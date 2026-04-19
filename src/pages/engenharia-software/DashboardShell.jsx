export default function DashboardShell({ children }) {
  return (
    <div className="min-h-screen bg-surface-1 text-zinc-100 dark:bg-[#EAEAE5] dark:text-stone-900">
      <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-5 md:px-6 lg:px-8 lg:py-7">
        <div className="space-y-5 md:space-y-6 lg:space-y-7">
          {children}
        </div>
      </div>
    </div>
  );
}
