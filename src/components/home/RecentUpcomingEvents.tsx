"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Heart,
  Leaf,
  MapPin,
  Sparkles,
  UserRound,
  type LucideIcon,
} from "lucide-react";

type EventItem = {
  _id?: string;
  slug?: string;
  title: string;
  category?: string;
  date: string;
  location: string;
  description: string;
  organizer: string;
  image: string;
  imageAlt?: string;
};

const categoryStyles: Record<string, { badge: string; icon: LucideIcon }> = {
  "food drive": {
    badge: "bg-forest-600/95",
    icon: Leaf,
  },
  donation: {
    badge: "bg-sage-600/95",
    icon: Heart,
  },
};

const defaultCategoryStyle = {
  badge: "bg-pine-600/95",
  icon: Sparkles,
};


const RecentUpcomingEvents = () => {
  const [events, setEvents] = useState<EventItem[]>([]);

useEffect(() => {
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-events`)
    .then((res) => res.json())
    .then((data: EventItem[]) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // start of today, so today's events still show

      const upcoming = data
        .filter((event) => new Date(event.date) >= today) // hide past events
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // earliest first
        .slice(0, 6);

      setEvents(upcoming);
    })
    .catch((err) => console.error("Failed to load events:", err));
}, []);

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Ambient accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-16 h-72 w-72 rounded-full bg-forest-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-sage-100 bg-sage-50/80 px-4 py-1.5 text-xs font-semibold text-sage-600 shadow-xs dark:border-sage-900/60 dark:bg-sage-950/40 dark:text-sage-300">
              <Sparkles className="h-3.5 w-3.5" />
              Fresh from the community
            </div>

            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-pine-900 sm:text-4xl lg:text-5xl dark:text-white">
              Recent{" "}
              <span className="bg-gradient-to-r from-forest-600 via-sage-600 to-sage-500 bg-clip-text text-transparent">
                Upcoming Events
              </span>
            </h2>

            <p className="max-w-xl font-sans text-base leading-relaxed text-pine-600 sm:text-lg dark:text-pine-400">
              Discover local drives, donation campaigns, and community
              gatherings happening near you. Show up, lend a hand, and help
              move the work forward.
            </p>
          </div>

          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-2 self-start rounded-full border border-pine-200 px-5 py-2.5 text-sm font-semibold text-pine-700 transition-all hover:bg-pine-100 active:scale-95 md:self-auto dark:border-pine-800 dark:text-pine-200 dark:hover:bg-pine-800"
          >
            View all events
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Event cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => {
            const category =
              categoryStyles[(event.category ?? "").trim().toLowerCase()] ??
              defaultCategoryStyle;
            const CategoryIcon = category.icon;
            const eventId = event._id ?? event.slug ?? "";

            return (
              <article
                key={eventId}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-pine-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-forest-950/10 dark:border-pine-800 dark:bg-pine-900"
              >
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

                  <span
                    className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold text-white shadow-sm backdrop-blur-sm ${category.badge}`}
                  >
                    <CategoryIcon className="h-3 w-3" />
                    {event.category ?? "Event"}
                  </span>

                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-pine-950/70 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                    <CalendarDays className="h-3 w-3" />
                    {event.date}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-heading text-lg font-bold tracking-tight text-pine-900 dark:text-white">
                    <Link
                      href={`/events/${eventId}`}
                      className="transition-colors hover:text-forest-600 dark:hover:text-forest-400"
                    >
                      {event.title}
                    </Link>
                  </h3>

                  <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-pine-500 dark:text-pine-400">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-forest-500" />
                    {event.location}
                  </p>

                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-pine-600 dark:text-pine-400">
                    {event.description}
                  </p>

                  <p className="mt-4 flex items-center gap-1.5 text-xs text-pine-500 dark:text-pine-400">
                    <UserRound className="h-3.5 w-3.5 shrink-0 text-sage-500" />
                    {event.organizer}
                  </p>

                  <div className="mt-auto pt-5">
                    <Link
                      href={`/events/${eventId}`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-forest-600 via-sage-600 to-sage-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-forest-500/20 transition-all hover:opacity-95 hover:shadow-forest-500/40 active:scale-95"
                    >
                      View Event
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecentUpcomingEvents;