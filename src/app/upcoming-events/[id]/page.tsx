"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Heart,
  Mail,
  MapPin,
  Share2,
  ShieldCheck,
  Tag,
  Users,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { toast } from "@/lib/toast";

type EventItem = {
  _id: string;
  title: string;
  type?: string;
  category?: string;
  date: string;
  location: string;
  description: string;
  image: string;
  organizerName?: string;
  organizerEmail?: string;
};

const guidelines = [
  "Please arrive 15 minutes before the scheduled time at the designated location.",
  "Wear comfortable clothing suitable for physical social work and distribution.",
  "Bring any pre-coordinated relief packages or distribution items if requested.",
];

export default function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [joined, setJoined] = useState(false);
  const [volunteers, setVolunteers] = useState(0);

  useEffect(() => {
    if (!id) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-events/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data: EventItem) => setEvent(data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  const handleJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please sign in to join this event.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const submitted = Object.fromEntries(formData.entries());
    console.log("Joining event with data:", submitted);
    

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/joined-events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitted),
      });

      if (res.status === 409) {
        setJoined(true);
        toast.error("You have already joined this event.");
        return;
      }
      if (!res.ok) throw new Error("Join failed");

      setJoined(true);
      setVolunteers((v) => v + 1);
      toast.success("You joined this event!", "Thank you for volunteering.");
    } catch (err) {
      console.error(err);
      toast.error("Could not join the event. Please try again.");
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied!", "Share it with your friends.");
    } catch {
      toast.error("Could not copy the link.");
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center text-pine-500 dark:text-pine-400">
        Loading event...
      </div>
    );
  }

  if (notFound || !event) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center text-pine-600 dark:text-pine-400">
        Event not found.
      </div>
    );
  }

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const organizerName = event.organizerName ?? "Organizer";
  const initial = organizerName.charAt(0).toUpperCase();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <Link
        href="/upcoming-events"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-pine-500 transition-colors hover:text-forest-600 dark:text-pine-400 dark:hover:text-sage-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Upcoming Events
      </Link>

      <article className="mt-4 overflow-hidden rounded-3xl border border-pine-200/80 bg-white shadow-xl shadow-forest-950/5 dark:border-pine-800 dark:bg-pine-900">
        {/* Hero */}
        <div className="relative aspect-[16/8] w-full overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-pine-950/85 via-pine-950/30 to-transparent"
          />

          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-forest-700 shadow-sm">
            <Tag className="h-3 w-3" />
            {event.type ?? event.category ?? "Event"}
          </span>

          <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7">
            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
              {event.title}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs font-medium text-white/90 sm:text-sm">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-sage-300" />
                {event.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-sage-300" />
                {formattedDate}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6 p-5 sm:p-8">
          {/* Join bar */}
          <div className="flex flex-col gap-4 rounded-2xl border border-pine-200 bg-pine-50/60 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-pine-800 dark:bg-pine-800/40">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage-100 text-forest-600 dark:bg-sage-900/50 dark:text-sage-300">
                <Users className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-pine-900 dark:text-white">
                  {volunteers} Volunteers Joined
                </p>
                <p className="text-xs text-pine-500 dark:text-pine-400">
                  Sign up to join hands for this drive
                </p>
              </div>
            </div>

            <form onSubmit={handleJoin} className="flex items-center gap-2">
              <input type="hidden" name="eventId" value={event._id} />
              <input type="hidden" name="eventTitle" value={event.title} />
              <input type="hidden" name="userName" value={user?.name ?? ""} />
              <input type="hidden" name="userEmail" value={user?.email ?? ""} />

              <button
                type="button"
                onClick={handleShare}
                aria-label="Copy event link"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-pine-200 text-pine-600 transition-all hover:bg-pine-100 active:scale-95 dark:border-pine-700 dark:text-pine-300 dark:hover:bg-pine-800"
              >
                <Share2 className="h-4 w-4" />
              </button>

              <button
                type="submit"
                disabled={joined}
                className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all active:scale-95 sm:flex-none ${
                  joined
                    ? "cursor-default border border-forest-600 bg-white text-forest-700 dark:bg-pine-900 dark:text-sage-300"
                    : "bg-gradient-to-r from-forest-600 via-sage-600 to-sage-500 text-white shadow-md shadow-forest-500/20 hover:opacity-95 hover:shadow-forest-500/40"
                }`}
              >
                {joined ? (
                  <>
                    <Check className="h-4 w-4" />
                    Joined
                  </>
                ) : (
                  <>
                    <Heart className="h-4 w-4" />
                    Join Event
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Content + organizer */}
          <div className="grid gap-6 md:grid-cols-[1fr_16rem]">
            <div>
              <h2 className="font-heading text-lg font-bold text-pine-900 dark:text-white">
                About this Social Initiative
              </h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-pine-600 dark:text-pine-400">
                {event.description}
              </p>

              <div className="mt-5 border-t border-pine-100 pt-5 dark:border-pine-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-pine-500 dark:text-pine-400">
                  Volunteer Guidelines
                </h3>
                <ul className="mt-3 space-y-2">
                  {guidelines.map((rule) => (
                    <li
                      key={rule}
                      className="flex items-start gap-2 text-sm text-pine-600 dark:text-pine-400"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sage-500" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Organizer */}
            <aside className="h-fit rounded-2xl border border-pine-200 bg-white p-4 dark:border-pine-800 dark:bg-pine-900">
              <h3 className="text-xs font-bold uppercase tracking-wider text-pine-500 dark:text-pine-400">
                Initiative Organizer
              </h3>

              <div className="mt-3 flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-forest-600 to-sage-500 text-base font-bold text-white">
                  {initial}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-pine-900 dark:text-white">
                    {organizerName}
                  </p>
                  {event.organizerEmail ? (
                    <p className="flex items-center gap-1 truncate text-xs text-pine-500 dark:text-pine-400">
                      <Mail className="h-3 w-3 shrink-0" />
                      <span className="truncate">{event.organizerEmail}</span>
                    </p>
                  ) : null}
                </div>
              </div>

              <p className="mt-4 flex items-center gap-1.5 border-t border-pine-100 pt-3 text-xs font-medium text-sage-600 dark:border-pine-800 dark:text-sage-300">
                <ShieldCheck className="h-3.5 w-3.5" />
                Verified Platform Member
              </p>
            </aside>
          </div>
        </div>
      </article>
    </div>
  );
}