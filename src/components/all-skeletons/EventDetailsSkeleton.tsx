import { Skeleton } from "@/components/ui/skeleton";

/** Full-page placeholder for /upcoming-events/[id]. */
export default function EventDetailsSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className="mx-auto max-w-4xl px-4 py-8 sm:px-6 md:py-12 lg:px-8"
    >
      <span className="sr-only">Loading event details…</span>

      <div aria-hidden="true">
        <Skeleton className="h-4 w-52" />

        <div className="mt-4 overflow-hidden rounded-3xl border border-pine-200/80 bg-white shadow-xl shadow-forest-950/5 dark:border-pine-800 dark:bg-pine-900">
          {/* Hero */}
          <div className="relative aspect-[16/8] w-full overflow-hidden">
            <Skeleton className="h-full w-full rounded-none bg-pine-200/70 dark:bg-pine-800" />
            <div className="absolute bottom-5 left-5 right-5 space-y-3 sm:bottom-7 sm:left-7">
              <Skeleton className="h-8 w-3/4 bg-pine-300/60 dark:bg-pine-700" />
              <div className="flex gap-5">
                <Skeleton className="h-4 w-32 bg-pine-300/60 dark:bg-pine-700" />
                <Skeleton className="h-4 w-40 bg-pine-300/60 dark:bg-pine-700" />
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="space-y-6 p-5 sm:p-8">
            <Skeleton className="h-24 w-full rounded-2xl" />

            <div className="space-y-3">
              <Skeleton className="h-6 w-44" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-4/5" />
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-pine-100 pt-6 dark:border-pine-800">
              <div className="flex items-center gap-3">
                <Skeleton className="h-11 w-11 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-10 w-28 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
