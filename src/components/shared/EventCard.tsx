import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Tag, UserRound } from "lucide-react";

export type EventItem = {
  _id?: string;
  title: string;
  category?: string;
  eventType?: string;
  type?: string;
  date: string;
  location: string;
  description: string;
  organizer?: string;
  organizerName?: string;
  image: string;
  imageAlt?: string;
};

// reads the event type from whichever field your DB uses
export const getType = (event: EventItem) =>
  (event.eventType ?? event.type ?? event.category ?? "").trim();

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-pine-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-forest-950/10 dark:border-pine-800 dark:bg-pine-900">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={event.image}
          alt={event.imageAlt ?? event.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-pine-950/60 via-pine-950/5 to-transparent"
        />

        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-forest-600/95 px-3 py-1 text-[11px] font-semibold text-white shadow-sm backdrop-blur-sm">
          <Tag className="h-3 w-3" />
          {getType(event) || "Event"}
        </span>

        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-pine-950/70 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
          <CalendarDays className="h-3 w-3" />
          {formatDate(event.date)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-heading text-lg font-bold tracking-tight text-pine-900 dark:text-white">
          {event.title}
        </h3>

        <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-pine-500 dark:text-pine-400">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-forest-500" />
          {event.location}
        </p>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-pine-600 dark:text-pine-400">
          {event.description}
        </p>

        <p className="mt-4 flex items-center gap-1.5 border-t border-pine-100 pt-4 text-xs text-pine-500 dark:border-pine-800 dark:text-pine-400">
          <UserRound className="h-3.5 w-3.5 shrink-0 text-sage-500" />
          {event.organizerName ?? event.organizer ?? "Organizer"}
        </p>

        <div className="mt-auto pt-5">
          <Link
            href={`/upcoming-events/${event._id}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-forest-600 via-sage-600 to-sage-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-forest-500/20 transition-all hover:opacity-95 hover:shadow-forest-500/40 active:scale-95"
          >
            View Event
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}