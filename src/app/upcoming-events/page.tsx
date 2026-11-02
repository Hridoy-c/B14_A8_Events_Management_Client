"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Plus,
  Search,
  Tag,
  UserRound,
} from "lucide-react";
import EventCard from "@/components/shared/EventCard";
import EventGridSkeleton from "@/components/all-skeletons/EventGridSkeleton";

type EventItem = {
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
const getType = (event: EventItem) =>
  (event.eventType ?? event.type ?? event.category ?? "").trim();

const categories = [
  "All",
  "Donation",
  "Cleanup",
  "Tree Plantation",
  "Winter Relief",
  "Food Drive",
  "Health Camp",
  "Community Meetup",
];

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-events`)
      .then((res) => res.json())
      .then((data: EventItem[]) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcoming = data.filter((event) => new Date(event.date) >= today); // hide past events

        setEvents(upcoming);
      })
      .catch((err) => console.error("Failed to load events:", err))
      .finally(() => setLoading(false));
  }, []);

  // category + search filter
  const filteredEvents = events.filter((event) => {
    const matchCategory =
      activeCategory === "All" ||
      getType(event).toLowerCase() === activeCategory.toLowerCase();

    const query = search.trim().toLowerCase();
    const matchSearch =
      !query ||
      event.title.toLowerCase().includes(query) ||
      event.location.toLowerCase().includes(query);

    return matchCategory && matchSearch;
  });

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      {/* Heading */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl space-y-4">
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-pine-900 sm:text-4xl lg:text-5xl dark:text-white">
            Upcoming{" "}
            <span className="bg-gradient-to-r from-forest-600 via-sage-600 to-sage-500 bg-clip-text text-transparent">
              Events
            </span>
          </h1>
          <p className="font-sans text-base leading-relaxed text-pine-600 sm:text-lg dark:text-pine-400">
            Discover volunteer initiatives scheduled for upcoming dates. Past
            events are automatically excluded so you can focus on active drives.
          </p>
        </div>

        <Link
          href="/create-event"
          className="inline-flex items-center gap-2 self-start rounded-full bg-gradient-to-r from-forest-600 via-sage-600 to-sage-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-forest-500/20 transition-all hover:opacity-95 hover:shadow-forest-500/40 active:scale-95 md:self-auto"
        >
          <Plus className="h-4 w-4" />
          Create Event
        </Link>
      </div>

      {/* Filters + Search */}
      <div className="mt-10 flex flex-col gap-4 border-t border-pine-200 pt-6 lg:flex-row lg:items-center lg:justify-between dark:border-pine-800">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-forest-600 via-sage-600 to-sage-500 text-white shadow-md shadow-forest-500/20"
                  : "border border-pine-200 text-pine-700 hover:bg-pine-100 dark:border-pine-800 dark:text-pine-200 dark:hover:bg-pine-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-pine-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events or areas..."
            className="h-10 w-full rounded-full border border-pine-200 bg-white pl-10 pr-4 text-sm text-pine-900 outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 dark:border-pine-800 dark:bg-pine-900 dark:text-white"
          />
        </div>
      </div>

      {/* Events grid */}
      {loading ? (
        <EventGridSkeleton count={6} className="mt-10" />
      ) : filteredEvents.length === 0 ? (
        <p className="mt-16 text-center text-pine-500 dark:text-pine-400">
          No events found.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event._id ?? event.title} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
