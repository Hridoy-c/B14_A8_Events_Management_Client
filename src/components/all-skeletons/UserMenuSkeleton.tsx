import { Skeleton } from "@/components/ui/skeleton";

/** Placeholder for the signed-in avatar + chevron in the navbar. */
export default function UserMenuSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center gap-1 rounded-full p-0.5"
    >
      <Skeleton className="h-10 w-10 rounded-full" />
      <Skeleton className="h-3.5 w-3.5 rounded-full" />
    </div>
  );
}
