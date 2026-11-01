"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
import EventCard from "../shared/EventCard";

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
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          ) // earliest first
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
              gatherings happening near you. Show up, lend a hand, and help move
              the work forward.
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
          {events.map((event) => (
            <EventCard key={event._id ?? event.title} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentUpcomingEvents;
