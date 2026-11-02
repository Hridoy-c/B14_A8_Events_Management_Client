import { Skeleton } from "@/components/ui/skeleton";

/**
 * Mirrors the layout of <EventCard /> so the grid does not jump when the
 * real data arrives.
 */
export default function EventCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-pine-200/80 bg-white shadow-xs dark:border-pine-800 dark:bg-pine-900"
    >
      {/* Media */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-pine-100 dark:bg-pine-800">
        <Skeleton className="absolute inset-0 rounded-none bg-pine-200/70 dark:bg-pine-800" />
        <Skeleton className="absolute left-4 top-4 h-6 w-24 rounded-full bg-pine-300/70 dark:bg-pine-700" />
        <Skeleton className="absolute bottom-4 left-4 h-6 w-32 rounded-full bg-pine-300/70 dark:bg-pine-700" />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="mt-3 h-3.5 w-2/5" />

        <div className="mt-4 space-y-2">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-11/12" />
          <Skeleton className="h-3.5 w-3/5" />
        </div>

        <Skeleton className="mt-5 h-3.5 w-1/3" />

        <div className="mt-auto pt-5">
          <Skeleton className="h-10 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}
