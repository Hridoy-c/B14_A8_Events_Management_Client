import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  withBadge?: boolean;
  withAction?: boolean;
};

/** Shared header placeholder: eyebrow badge, page title and intro paragraph. */
export default function PageHeaderSkeleton({
  withBadge = true,
  withAction = false,
}: Props) {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col gap-6 border-b border-pine-200 pb-8 md:flex-row md:items-end md:justify-between dark:border-pine-800"
    >
      <div className="w-full max-w-2xl space-y-4">
        {withBadge ? <Skeleton className="h-6 w-40 rounded-full" /> : null}
        <Skeleton className="h-9 w-3/4 sm:h-11" />
        <div className="space-y-2 pt-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>

      {withAction ? (
        <Skeleton className="h-11 w-44 rounded-full" />
      ) : null}
    </div>
  );
}
