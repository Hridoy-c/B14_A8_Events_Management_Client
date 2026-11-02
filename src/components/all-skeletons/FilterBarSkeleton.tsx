import { Skeleton } from "@/components/ui/skeleton";

/** Placeholder for the category chips + search bar row. */
export default function FilterBarSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="mt-10 flex flex-col gap-4 border-t border-pine-200 pt-6 lg:flex-row lg:items-center lg:justify-between dark:border-pine-800"
    >
      <div className="flex flex-wrap gap-2">
        {[72, 88, 76, 104, 92, 68].map((width, index) => (
          <Skeleton
            key={`filter-chip-${index}`}
            className="h-7 rounded-full"
            style={{ width }}
          />
        ))}
      </div>

      <Skeleton className="h-10 w-full rounded-full lg:w-72" />
    </div>
  );
}
