export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Page header skeleton */}
      <div className="space-y-2">
        <div className="h-7 w-48 rounded-lg bg-gray-200 dark:bg-gray-800" />
        <div className="h-4 w-72 rounded-lg bg-gray-100 dark:bg-gray-800/60" />
      </div>

      {/* Stat cards skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gray-100 dark:bg-gray-800" />
              <div className="space-y-1.5 flex-1">
                <div className="h-3 w-20 rounded bg-gray-100 dark:bg-gray-800" />
                <div className="h-6 w-28 rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 overflow-hidden">
        <div className="p-5 border-b dark:border-gray-800">
          <div className="h-5 w-32 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="divide-y dark:divide-gray-800">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4">
              <div className="h-4 w-24 rounded bg-gray-100 dark:bg-gray-800" />
              <div className="h-4 w-32 rounded bg-gray-100 dark:bg-gray-800" />
              <div className="h-4 w-16 rounded bg-gray-100 dark:bg-gray-800" />
              <div className="ml-auto h-5 w-16 rounded-full bg-gray-100 dark:bg-gray-800" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
