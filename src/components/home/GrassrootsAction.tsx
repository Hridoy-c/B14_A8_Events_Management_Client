"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CircleCheck,
  HeartHandshake,
  MapPin,
  Megaphone,
  TrendingUp,
} from "lucide-react";

const pillars = [
  {
    number: "01",
    icon: MapPin,
    title: "Organize locally",
    description:
      "Turn a kitchen-table idea into a real gathering with neighborhood event pages, volunteer roles, and simple check-in.",
    points: ["Neighborhood event pages", "Volunteer shifts and roles"],
  },
  {
    number: "02",
    icon: Megaphone,
    title: "Mobilize your people",
    description:
      "Turn supporters into participants with shareable invites, timely reminders, and live updates your community can act on.",
    points: ["One-click sharing", "Real-time attendee updates"],
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Measure what matters",
    description:
      "See who showed up, who stayed involved, and where to focus next so every gathering builds toward lasting change.",
    points: ["Attendance and engagement", "Post-event follow-up"],
  },
];

export default function GrassrootsAction() {
  return (
    <section
      id="grassroots"
      className="relative overflow-hidden bg-white py-16 md:py-24 dark:bg-slate-950"
    >
      {/* Ambient background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-rose-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-rose-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl space-y-5 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/80 px-4 py-1.5 text-xs font-semibold text-indigo-700 shadow-xs dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-300">
            <HeartHandshake className="h-3.5 w-3.5 text-rose-500" />
            People-powered by design
          </div>

          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            Built for{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 bg-clip-text text-transparent">
              Grassroots Action
            </span>
          </h2>

          <p className="mx-auto max-w-2xl font-sans text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
            From the first neighborhood meeting to a city-wide movement,
            EventPulse gives organizers the tools to move people from awareness
            to action — and keep them connected long after the event ends.
          </p>
        </div>

        {/* Action pillars */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map(({ number, icon: Icon, title, description, points }, index) => (
            <article
              key={title}
              className={`group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-950/5 dark:border-slate-800 dark:bg-slate-900/80 ${
                index === pillars.length - 1 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-rose-500/10 text-indigo-600 ring-1 ring-indigo-100 transition-transform duration-200 group-hover:scale-105 dark:text-indigo-400 dark:ring-indigo-900/60">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-heading text-xs font-bold tracking-[0.2em] text-slate-300 dark:text-slate-700">
                  {number}
                </span>
              </div>

              <div className="flex flex-1 flex-col">
                <h3 className="mt-5 font-heading text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {description}
                </p>

                <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                  {points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-xs font-medium text-slate-600 dark:text-slate-400"
                    >
                      <CircleCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {/* Action callout */}
        <div className="relative mt-12 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 px-6 py-10 shadow-2xl shadow-indigo-950/20 sm:px-10 lg:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-indigo-500/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-rose-500/20 blur-3xl"
          />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-400">
                Start where you are
              </p>
              <h3 className="mt-2 font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Your neighborhood is the starting line.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                Bring people together around the issues that matter. Create a
                local event, invite your community, and turn one good
                conversation into collective action.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link
                href="/create-event"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-all hover:opacity-95 hover:shadow-indigo-500/40 active:scale-95"
              >
                <span>Start a Grassroots Event</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/upcoming-events"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/10 active:scale-95"
              >
                Find a Local Event
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
