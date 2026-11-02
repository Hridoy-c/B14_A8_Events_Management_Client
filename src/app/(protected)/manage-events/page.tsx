"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Edit,
  Eye,
  MapPin,
  PlusCircle,
  Settings,
  SquarePen,
  Tag,
  Trash2,
  UserRound,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { toast } from "@/lib/toast";
import { getType, type EventItem } from "@/components/shared/EventCard";
import EventGridSkeleton from "@/components/all-skeletons/EventGridSkeleton";
import EditBtn from "@/components/protected/EditBtn";
import DeleteBtn from "@/components/protected/DeleteBtn";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const ManageEventsPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-events/${user.email}`)
      .then((res) => res.json())
      .then((data: EventItem[]) => setEvents(data))
      .catch((err) => console.error("Failed to load events:", err))
      .finally(() => setLoading(false));
  }, [user?.email]);

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!window.confirm("Delete this event? This cannot be undone.")) return;

    try {
      setDeletingId(id);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/all-events/${id}`,
        {
          method: "DELETE",
        },
      );
      if (!res.ok) throw new Error("Delete failed");

      setEvents((prev) => prev.filter((event) => event._id !== id));
      toast.success("Event deleted.");
    } catch (err) {
      console.error(err);
      toast.error("Could not delete the event. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      {/* Heading */}
      <div className="flex flex-col gap-6 border-b border-pine-200 pb-8 md:flex-row md:items-end md:justify-between dark:border-pine-800">
        <div className="max-w-2xl space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-sage-200 bg-sage-50 px-3 py-1 text-xs font-semibold text-forest-600 dark:border-sage-900 dark:bg-sage-950/50 dark:text-sage-300">
            <Settings className="h-3.5 w-3.5" />
            Organizer Dashboard
          </span>

          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-pine-900 sm:text-4xl lg:text-5xl dark:text-white">
            Manage My{" "}
            <span className="bg-gradient-to-r from-forest-600 via-sage-600 to-sage-500 bg-clip-text text-transparent">
              Events
            </span>
          </h1>

          <p className="font-sans text-base leading-relaxed text-pine-600 dark:text-pine-400">
            View, edit, and manage the social drives you have published. Only
            you have permission to edit or delete your created initiatives.
          </p>
        </div>

        <Link
          href="/create-event"
          className="inline-flex items-center gap-2 self-start rounded-full bg-gradient-to-r from-forest-600 via-sage-600 to-sage-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-forest-500/20 transition-all hover:opacity-95 hover:shadow-forest-500/40 active:scale-95 md:self-auto"
        >
          <PlusCircle className="h-4 w-4" />
          Create New Event
        </Link>
      </div>

      {/* Content */}
      {isPending || (user && loading) ? (
        <EventGridSkeleton count={6} className="mt-10" />
      ) : !user ? (
        <p className="mt-16 text-center text-pine-500 dark:text-pine-400">
          Please{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-forest-600 underline dark:text-sage-300"
          >
            sign in
          </Link>{" "}
          to manage your events.
        </p>
      ) : events.length === 0 ? (
        <p className="mt-16 text-center text-pine-500 dark:text-pine-400">
          You haven&apos;t created any events yet.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <article
              key={event._id ?? event.title}
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
                <h3 className="font-heading text-lg font-bold tracking-tight text-forest-600 dark:text-sage-300">
                  {event.title}
                </h3>

                <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-pine-500 dark:text-pine-400">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-forest-500" />
                  {event.location}
                </p>

                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-pine-600 dark:text-pine-400">
                  {event.description}
                </p>

                <p className="mt-4 flex items-center gap-1.5 border-t border-pine-100 pt-4 text-xs text-pine-500 dark:border-pine-800 dark:text-pine-400">
                  <UserRound className="h-3.5 w-3.5 shrink-0 text-sage-500" />
                  {event.organizerName ?? event.organizer ?? "Organizer"}
                </p>

                {/* Actions */}
                <div className="mt-auto flex items-center gap-2 pt-5">
                  <Link
                    href={`/upcoming-events/${event._id}`}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-pine-200 px-4 py-2 text-xs font-semibold text-pine-700 transition-all hover:bg-pine-100 active:scale-95 dark:border-pine-800 dark:text-pine-200 dark:hover:bg-pine-800"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    View
                  </Link>

                  <EditBtn
                    event={event}
                    onUpdated={(updated) =>
                      setEvents((prev) =>
                        prev.map((e) => (e._id === updated._id ? updated : e)),
                      )
                    }
                  />
                  <DeleteBtn
                    id={event._id}
                    title={event.title}
                    onDeleted={() =>
                      setEvents((prev) =>
                        prev.filter((e) => e._id !== event._id),
                      )
                    }
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default ManageEventsPage;
