"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarCheck, Search, Ticket } from "lucide-react";

import EventCard, { type EventItem } from "@/components/shared/EventCard";
import EventGridSkeleton from "@/components/all-skeletons/EventGridSkeleton";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/lib/toast";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

// Shape of a document stored in the `joined-events` collection.
// It only stores references to the event, not the full event fields.
type JoinedEvent = {
  _id?: string;
  eventId: string;
  eventTitle?: string;
  userName?: string;
  userEmail: string;
  joinedAt?: string;
};

const JoinedEventsPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user?.email) return;

    let cancelled = false;

    const loadJoinedEvents = async () => {
      setLoading(true);
      const token = await getTokenFromServer();

      try {
        const joinedRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/joined-events/${encodeURIComponent(user.email)}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        );
        if (!joinedRes.ok) throw new Error("Failed to load joined events");

        const joined = (await joinedRes.json()) as JoinedEvent[];
        if (joined.length === 0) {
          if (!cancelled) setEvents([]);
          return;
        }

        // Joined records only hold an eventId, so hydrate them with the
        // real event documents before handing them to EventCard.
        const allRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/all-events`,
        );
        if (!allRes.ok) throw new Error("Failed to load events");

        const allEvents = (await allRes.json()) as EventItem[];
        const byId = new Map(
          allEvents.map((event) => [String(event._id), event]),
        );

        const hydrated = joined
          .map((record) => byId.get(String(record.eventId)))
          // Skip events that were deleted after the user joined.
          .filter((event): event is EventItem => Boolean(event))
          // Soonest event date first.
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          );

        if (!cancelled) setEvents(hydrated);
      } catch (err) {
        console.error("Failed to load joined events:", err);
        if (!cancelled) {
          setEvents([]);
          toast.error("Could not load your joined events. Please try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadJoinedEvents();

    return () => {
      cancelled = true;
    };
  }, [user?.email]);

  const query = search.trim().toLowerCase();
  const filteredEvents = query
    ? events.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query),
      )
    : events;

  const isLoading = isPending || (user && loading);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      {/* Heading */}
      <div className="flex flex-col gap-6 border-b border-pine-200 pb-8 md:flex-row md:items-end md:justify-between dark:border-pine-800">
        <div className="max-w-2xl space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-sage-200 bg-sage-50 px-3 py-1 text-xs font-semibold text-forest-600 dark:border-sage-900 dark:bg-sage-950/50 dark:text-sage-300">
            <Ticket className="h-3.5 w-3.5" />
            Your Volunteering
          </span>

          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-pine-900 sm:text-4xl lg:text-5xl dark:text-white">
            Joined{" "}
            <span className="bg-gradient-to-r from-forest-600 via-sage-600 to-sage-500 bg-clip-text text-transparent">
              Events
            </span>
          </h1>

          <p className="font-sans text-base leading-relaxed text-pine-600 sm:text-lg dark:text-pine-400">
            Every initiative you have signed up for in one place. Review the
            details or jump back into an event to see what is next.
          </p>
        </div>

        <Link
          href="/upcoming-events"
          className="inline-flex items-center gap-2 self-start rounded-full border border-pine-200 px-5 py-2.5 text-sm font-semibold text-pine-700 transition-all hover:bg-pine-100 active:scale-95 md:self-auto dark:border-pine-800 dark:text-pine-200 dark:hover:bg-pine-800"
        >
          <CalendarCheck className="h-4 w-4" />
          Find More Events
        </Link>
      </div>

      {/* Search */}
      {!isLoading && user && events.length > 0 && (
        <div className="mt-8 flex justify-end">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-pine-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search joined events..."
              className="h-10 w-full rounded-full border border-pine-200 bg-white pl-10 pr-4 text-sm text-pine-900 outline-none focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20 dark:border-pine-800 dark:bg-pine-900 dark:text-white"
            />
          </div>
        </div>
      )}

      {/* Content */}
      {isLoading ? (
        <EventGridSkeleton count={3} className="mt-10" />
      ) : !user ? (
        <p className="mt-16 text-center text-pine-500 dark:text-pine-400">
          Please{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-forest-600 underline dark:text-sage-300"
          >
            sign in
          </Link>{" "}
          to see the events you have joined.
        </p>
      ) : events.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <p className="text-pine-500 dark:text-pine-400">
            You haven&apos;t joined any events yet.
          </p>
          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-forest-600 via-sage-600 to-sage-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-forest-500/20 transition-all hover:opacity-95 hover:shadow-forest-500/40 active:scale-95"
          >
            Browse Upcoming Events
          </Link>
        </div>
      ) : filteredEvents.length === 0 ? (
        <p className="mt-16 text-center text-pine-500 dark:text-pine-400">
          No joined events match &ldquo;{search.trim()}&rdquo;.
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
};

export default JoinedEventsPage;
