import EventCardSkeleton from "@/components/all-skeletons/EventCardSkeleton";

type Props = {
  /** How many placeholder cards to render. Defaults to a full 3×2 grid. */
  count?: number;
  className?: string;
};

export default function EventGridSkeleton({ count = 6, className = "" }: Props) {
  return (
    <div
      aria-hidden="true"
      className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <EventCardSkeleton key={`event-skeleton-${index}`} />
      ))}
    </div>
  );
}
