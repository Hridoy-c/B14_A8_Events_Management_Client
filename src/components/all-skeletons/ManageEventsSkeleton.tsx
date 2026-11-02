import EventGridSkeleton from "@/components/all-skeletons/EventGridSkeleton";
import PageHeaderSkeleton from "@/components/all-skeletons/PageHeaderSkeleton";

/** Full-page placeholder for /manage-events. */
export default function ManageEventsSkeleton() {
  return (
    <section
      aria-busy="true"
      aria-live="polite"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8"
    >
      <span className="sr-only">Loading your events…</span>
      <PageHeaderSkeleton withAction />
      <EventGridSkeleton count={6} className="mt-10" />
    </section>
  );
}
