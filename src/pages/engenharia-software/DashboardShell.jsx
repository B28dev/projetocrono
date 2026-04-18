export default function DashboardShell({ children }) {
  return (
    <div className="min-h-screen bg-surface-1 text-zinc-100 dark:bg-[#EAEAE5] dark:text-stone-900">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-5 md:px-6 lg:px-8 lg:py-8">
        <div className="space-y-6 md:space-y-8 lg:space-y-10">
          {children}
        </div>
      </div>
    </div>
  );
}
