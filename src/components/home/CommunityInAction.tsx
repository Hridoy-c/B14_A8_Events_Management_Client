"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  MapPin,
  Users,
} from "lucide-react";

const stories = [
  {
    slug: "food-boxes-one-neighborhood",
    tag: "Food Access",
    tagClass: "bg-forest-600/95",
    title: "500 food boxes, one neighborhood",
    location: "Dhanmondi, Dhaka",
    description:
      "Local volunteers packed and delivered a week of essentials to families facing food insecurity.",
    impact: "500 families",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Volunteers unloading boxes of food for a community drive",
  },
  {
    slug: "warm-coats-colder-season",
    tag: "Winter Relief",
    tagClass: "bg-sage-600/95",
    title: "Warm coats for a colder season",
    location: "Mirpur, Dhaka",
    description:
      "A neighborhood collection drive turned donated jackets and sweaters into warmth for 1,200 people.",
    impact: "1,200 coats",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Rows of donated clothes ready to be distributed",
  },
  {
    slug: "blankets-that-stay-the-night",
    tag: "Shelter",
    tagClass: "bg-forest-500/95",
    title: "Blankets that stay the night",
    location: "Mohammadpur, Dhaka",
    description:
      "Volunteers walked the streets after dark to hand out blankets to pavement dwellers and seniors.",
    impact: "300 blankets",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Volunteers joining hands covered in red paint",
  },
  {
    slug: "saturday-learning-circle",
    tag: "Education",
    tagClass: "bg-sage-500/95",
    title: "A Saturday learning circle",
    location: "Uttara, Dhaka",
    description:
      "Local teachers and students turned a community room into a free weekend classroom for 80 children.",
    impact: "80 students",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Books, pencils, and learning blocks on a table",
  },
  {
    slug: "garden-grown-by-neighbors",
    tag: "Environment",
    tagClass: "bg-forest-700/95",
    title: "A garden grown by neighbors",
    location: "Lalmatia, Dhaka",
    description:
      "Forty residents cleared an unused lot and planted a shared green space that now feeds the block.",
    impact: "40 volunteers",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Hands holding a small plant in soil",
  },
  {
    slug: "next-generation-shows-up",
    tag: "Youth",
    tagClass: "bg-sage-600/95",
    title: "The next generation shows up",
    location: "Bashundhara, Dhaka",
    description:
      "Sixty young volunteers spent their weekend running a donation drive and welcoming first-time helpers.",
    impact: "60 volunteers",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Volunteer in a bright shirt helping at a community event",
  },
];

export default function CommunityInAction() {
  return (
    <section
      id="community"
      className="relative overflow-hidden py-16 md:py-24"
    >
      {/* Ambient accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-sage-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-sage-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl space-y-5 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sage-100 bg-sage-50/80 px-4 py-1.5 text-xs font-semibold text-sage-700 shadow-xs dark:border-sage-900/60 dark:bg-sage-950/40 dark:text-sage-300">
            <Users className="h-3.5 w-3.5 text-sage-500" />
            Real people, real change
          </div>

          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-pine-900 sm:text-4xl lg:text-5xl dark:text-white">
            Community{" "}
            <span className="bg-gradient-to-r from-forest-600 via-sage-600 to-sage-500 bg-clip-text text-transparent">
              in Action
            </span>
          </h2>

          <p className="mx-auto max-w-2xl font-sans text-base leading-relaxed text-pine-600 sm:text-lg dark:text-pine-400">
            Small acts of care add up. Meet the organizers, volunteers, and
            neighbors turning local effort into measurable change.
          </p>
        </div>

        {/* Impact stories */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <article
              key={story.slug}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-pine-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-forest-950/10 dark:border-pine-800 dark:bg-pine-900"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-pine-950/45 via-transparent to-transparent"
                />

                <span
                  className={`absolute left-4 top-4 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold text-white shadow-sm backdrop-blur-sm ${story.tagClass}`}
                >
                  {story.tag}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="flex items-center gap-1.5 text-xs font-medium text-pine-500 dark:text-pine-400">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-forest-500" />
                  {story.location}
                </p>

                <h3 className="mt-2 font-heading text-lg font-bold tracking-tight text-pine-900 dark:text-white">
                  <Link
                    href={`/stories/${story.slug}`}
                    className="transition-colors hover:text-forest-600 dark:hover:text-forest-400"
                  >
                    {story.title}
                  </Link>
                </h3>

                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-pine-600 dark:text-pine-400">
                  {story.description}
                </p>

                <div className="mt-auto flex items-end justify-between gap-4 border-t border-pine-100 pt-4 dark:border-pine-800">
                  <div>
                    <p className="font-heading text-xl font-extrabold tracking-tight text-pine-900 dark:text-white">
                      {story.impact}
                    </p>
                    <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-pine-400">
                      Impact
                    </p>
                  </div>

                  <Link
                    href={`/stories/${story.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-pine-200 px-3.5 py-2 text-xs font-semibold text-pine-700 transition-all hover:border-forest-200 hover:bg-forest-50 hover:text-forest-700 active:scale-95 dark:border-pine-800 dark:text-pine-200 dark:hover:border-forest-900 dark:hover:bg-forest-950/40 dark:hover:text-forest-300"
                  >
                    Read story
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
