"use client";

import React from "react";
import Link from "next/link";
import {
  Flame,
  CalendarDays,
  PlusCircle,
  ArrowRight,
} from "lucide-react";

export default function Banner() {
  const stats = [
    {
      value: "1,450+",
      label: "Active Volunteers",
      color: "text-forest-600 dark:text-sage-300",
    },
    {
      value: "180+",
      label: "Events Completed",
      color: "text-sage-600 dark:text-sage-300",
    },
    {
      value: "24,000+",
      label: "Lives Impacted",
      color: "text-forest-600 dark:text-sage-300",
    },
    {
      value: "100%",
      label: "Community Driven",
      color: "text-sage-600 dark:text-sage-300",
    },
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-14 md:pt-16 md:pb-20">
      {/* Glow background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-br from-forest-500/20 via-sage-400/20 to-sage-300/30 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute -top-24 right-1/4 h-64 w-64 bg-sage-300/30 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Live Indicator Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-pine-900 border border-sage-200/80 dark:border-pine-800 shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sage-500" />
            </span>
            <span className="text-xs font-semibold text-pine-700 dark:text-pine-300">
              Over 2,400+ Live Events Happening This Month
            </span>
            <span className="text-sage-500 font-bold text-xs flex items-center gap-0.5">
              <Flame className="h-3.5 w-3.5" />
              Hot
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-pine-900 dark:text-white font-heading leading-tight">
            Discover, Experience & Cherish Every{" "}
            <span className="bg-gradient-to-r from-forest-600 via-sage-600 to-sage-500 bg-clip-text text-transparent">
              Unforgettable Event
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-pine-600 dark:text-pine-400 max-w-2xl mx-auto font-sans leading-relaxed">
            From electric stadium concerts and tech conferences to intimate
            jazz nights and culinary workshops. Your next great story starts
            here with <span className="font-semibold text-pine-900 dark:text-white">EventPulse</span>.
          </p>

          {/* Two Action Buttons with Distinct Colors and Icons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Button 1: Explore Upcoming Events (deep forest brand gradient) */}
            <Link
              href="/upcoming-events"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-forest-600 to-sage-600 hover:from-forest-500 hover:to-sage-500 shadow-lg shadow-forest-500/25 hover:shadow-forest-500/40 active:scale-95 transition-all group cursor-pointer"
            >
              <CalendarDays className="h-4.5 w-4.5 group-hover:scale-110 transition-transform" />
              <span>Explore Upcoming Events</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Button 2: Create an Event (soft mint secondary) */}
            <Link
              href="/create-event"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold text-forest-900 bg-gradient-to-r from-sage-100 via-sage-200 to-sage-300 border border-sage-300/70 hover:from-sage-200 hover:to-sage-200 shadow-lg shadow-sage-500/20 hover:shadow-sage-500/30 active:scale-95 transition-all group cursor-pointer"
            >
              <PlusCircle className="h-4.5 w-4.5 group-hover:rotate-90 transition-transform" />
              <span>Create an Event</span>
            </Link>
          </div>
        </div>

        {/* STATS COUNTER CARDS GRID */}
        <div className="pt-8 sm:pt-11 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-5 sm:p-6 rounded-2xl bg-white dark:bg-pine-900 border border-pine-200/80 dark:border-pine-800 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 h-full"
              >
                <span
                  className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-heading ${stat.color}`}
                >
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-medium text-pine-500 dark:text-pine-400 mt-1 text-center">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
