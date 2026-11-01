import type { LucideIcon } from "lucide-react";

type AccountPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  userName?: string | null;
  children: React.ReactNode;
};

export default function AccountPageShell({
  eyebrow,
  title,
  description,
  icon: Icon,
  userName,
  children,
}: AccountPageShellProps) {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-pine-50/60 dark:bg-pine-950">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-forest-500/15 via-sage-500/10 to-sage-500/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-sage-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-forest-100 bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-600 shadow-xs dark:border-forest-900 dark:bg-forest-950/60 dark:text-forest-400">
            <Icon className="h-3.5 w-3.5 text-sage-500" />
            {eyebrow}
          </div>

          <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-pine-900 dark:text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-pine-600 dark:text-pine-400 sm:text-base">
            {description}
          </p>

          {userName ? (
            <p className="mt-3 text-xs font-medium text-pine-500 dark:text-pine-400">
              Signed in as{" "}
              <span className="font-semibold text-pine-700 dark:text-pine-300">
                {userName}
              </span>
            </p>
          ) : null}
        </div>

        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
