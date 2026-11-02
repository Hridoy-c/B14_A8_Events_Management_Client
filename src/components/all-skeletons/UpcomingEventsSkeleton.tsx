import EventGridSkeleton from "@/components/all-skeletons/EventGridSkeleton";
import FilterBarSkeleton from "@/components/all-skeletons/FilterBarSkeleton";
import PageHeaderSkeleton from "@/components/all-skeletons/PageHeaderSkeleton";

/** Full-page placeholder for /upcoming-events. */
export default function UpcomingEventsSkeleton() {
  return (
    <section
      aria-busy="true"
      aria-live="polite"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8"
    >
      <span className="sr-only">Loading upcoming events…</span>
      <PageHeaderSkeleton withBadge={false} withAction />
      <FilterBarSkeleton />
      <EventGridSkeleton count={6} className="mt-10" />
    </section>
  );
}
