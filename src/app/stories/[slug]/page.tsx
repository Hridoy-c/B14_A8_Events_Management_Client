import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CircleCheck,
  MapPin,
  Users,
} from "lucide-react";
import {
  communityStories,
  getCommunityStory,
} from "@/data/community-stories";

type StoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return communityStories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({
  params,
}: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getCommunityStory(slug);

  if (!story) {
    return { title: "Story not found — EventPulse" };
  }

  return {
    title: `${story.title} — EventPulse`,
    description: story.description,
  };
}

export default async function StoryDetailsPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = getCommunityStory(slug);

  if (!story) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <Link
        href="/#community"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-pine-500 transition-colors hover:text-forest-600 dark:text-pine-400 dark:hover:text-sage-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Community in Action
      </Link>

      <article className="mt-4 overflow-hidden rounded-3xl border border-pine-200/80 bg-white shadow-xl shadow-forest-950/5 dark:border-pine-800 dark:bg-pine-900">
        {/* Hero */}
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={story.image}
            alt={story.imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-pine-950/85 via-pine-950/30 to-transparent"
          />

          <span
            className={`absolute left-4 top-4 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold text-white shadow-sm backdrop-blur-sm ${story.tagClass}`}
          >
            {story.tag}
          </span>

          <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
              {story.title}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs font-medium text-white/90 sm:text-sm">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-sage-300" />
                {story.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-sage-300" />
                {story.date}
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="grid gap-8 p-5 sm:p-8 md:grid-cols-[1fr_15rem]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-sage-600 dark:text-sage-300">
              The story
            </p>

            <div className="mt-3 space-y-4">
              {story.content.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-relaxed text-pine-600 dark:text-pine-400"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 border-t border-pine-100 pt-6 dark:border-pine-800">
              <h2 className="font-heading text-lg font-bold text-pine-900 dark:text-white">
                What changed
              </h2>
              <ul className="mt-3 space-y-2">
                {story.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2 text-sm text-pine-600 dark:text-pine-400"
                  >
                    <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-forest-600 dark:text-sage-400" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-pine-200 bg-pine-50/60 p-4 dark:border-pine-800 dark:bg-pine-800/40">
            <p className="text-xs font-bold uppercase tracking-wider text-pine-500 dark:text-pine-400">
              Impact
            </p>
            <p className="mt-1 font-heading text-2xl font-extrabold tracking-tight text-pine-900 dark:text-white">
              {story.impact}
            </p>

            <div className="mt-4 border-t border-pine-200/70 pt-3 dark:border-pine-700">
              <p className="text-xs font-bold uppercase tracking-wider text-pine-500 dark:text-pine-400">
                Organized by
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-pine-700 dark:text-pine-300">
                <Users className="h-3.5 w-3.5 shrink-0 text-sage-500" />
                {story.organizer}
              </p>
            </div>

            <Link
              href="/upcoming-events"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-forest-600 via-sage-600 to-sage-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-forest-500/20 transition-all hover:opacity-95 hover:shadow-forest-500/40 active:scale-95"
            >
              Find a local event
              <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </article>
    </div>
  );
}
