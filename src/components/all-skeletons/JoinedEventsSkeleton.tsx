import { Skeleton } from "@/components/ui/skeleton";
import EventGridSkeleton from "@/components/all-skeletons/EventGridSkeleton";
import PageHeaderSkeleton from "@/components/all-skeletons/PageHeaderSkeleton";

/** Full-page placeholder for /joined-events. */
export default function JoinedEventsSkeleton() {
  return (
    <section
      aria-busy="true"
      aria-live="polite"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8"
    >
      <span className="sr-only">Loading your joined events…</span>
      <PageHeaderSkeleton withAction />

      <div className="mt-8 flex justify-end">
        <Skeleton className="h-10 w-full rounded-full sm:w-72" />
      </div>

      <EventGridSkeleton count={3} className="mt-10" />
    </section>
  );
}
