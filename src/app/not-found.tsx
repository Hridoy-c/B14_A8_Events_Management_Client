import React from "react";
import Link from "next/link";
import {
  Home,
  CalendarDays,
  Sparkles,
  ArrowLeft,
  Compass,
} from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-50/50 dark:bg-slate-950 relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/15 via-purple-500/10 to-rose-500/15 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-indigo-500/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-rose-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="w-full max-w-2xl text-center relative z-10 space-y-6">
        {/* Error Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Error 404 • Page Off-Stage
          </span>
        </div>

        {/* Big 404 Typography */}
        <div className="relative select-none">
          <span className="text-8xl sm:text-9xl md:text-[11rem] font-extrabold tracking-tight font-heading leading-none bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 bg-clip-text text-transparent opacity-90 drop-shadow-sm">
            404
          </span>
        </div>

        {/* Main Heading conforming to Assignment Rules */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-heading">
            Looks Like This Stage Is{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 bg-clip-text text-transparent">
              Dark
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-lg mx-auto font-sans leading-relaxed">
            The event or page you are looking for may have ended, moved to a
            different venue, or does not exist. Let&apos;s get you back to the main stage.
          </p>
        </div>

        {/* Action Buttons adhering to exact home page button style */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary CTA: Back to Home */}
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 hover:opacity-95 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/40 active:scale-95 transition-all group cursor-pointer"
          >
            <Home className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
            <span>Back to Home</span>
          </Link>

          {/* Secondary CTA: Explore Upcoming Events */}
          <Link
            href="/upcoming-events"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-xs hover:shadow-md active:scale-95 transition-all group cursor-pointer"
          >
            <CalendarDays className="h-4 w-4 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
            <span>Explore Upcoming Events</span>
          </Link>
        </div>

        {/* Quick Helper Links */}
        <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800 max-w-md mx-auto">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Need immediate help? Reach out to our{" "}
            <Link
              href="#support"
              className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              EventPulse Support Concierge
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
