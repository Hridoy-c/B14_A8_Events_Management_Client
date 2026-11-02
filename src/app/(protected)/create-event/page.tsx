"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Heart,
  ImageIcon,
  Lock,
  MapPin,
  PlusCircle,
  Sparkles,
  Type,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { toast } from "@/lib/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";


const eventTypes = [
  "Food Drive",
  "Donation",
  "Cleanup",
  "Tree Plantation",
  "Winter Relief",
  "Health Camp",
  "Community Meetup",
];

const imagePresets = [
  {
    label: "Winter Clothes",
    url: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Blanket Relief",
    url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Cleanup",
    url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    label: "Tree Plantation",
    url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
  },
];

type FormState = {
  title: string;
  type: string;
  date: string;
  location: string;
  image: string;
  description: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const emptyForm: FormState = {
  title: "",
  type: "",
  date: "",
  location: "",
  image: "",
  description: "",
};

function toISODate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function CreateEventPage() {
  const router = useRouter();
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const user = session?.user ?? null;
  const organizerEmail = user?.email ?? "";

  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Today is never allowed — the earliest selectable date is tomorrow.
  const { todayISO, minDateISO } = useMemo(() => {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    return { todayISO: toISODate(now), minDateISO: toISODate(tomorrow) };
  }, []);

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const validate = (values: FormState): FormErrors => {
    const next: FormErrors = {};

    if (!values.title.trim()) next.title = "Give your event a clear title.";
    if (!values.type) next.type = "Select the type of event.";
    if (!values.date) {
      next.date = "Choose a date for your event.";
    } else if (values.date <= todayISO) {
      next.date = "The date must be in the future.";
    }
    if (!values.location.trim()) next.location = "Add a venue or location.";
    if (!values.image.trim()) {
      next.image = "Add a thumbnail image URL.";
    } else if (!/^https?:\/\/\S+$/i.test(values.image.trim())) {
      next.image = "Use a valid image URL starting with http.";
    }
    if (!values.description.trim()) {
      next.description = "Describe what volunteers should expect.";
    }

    return next;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      toast.error("Please sign in to create an event.");
      return;
    }

    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    const payload = {
      ...form,
      organizerName: user.name ?? null,
      organizerEmail: user.email ?? null,
    };

    setIsSubmitting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

      toast.success("Event created!", "It now appears in Manage Events.");
      setForm(emptyForm);
      router.push("/upcoming-events");
    } catch (err) {
      console.error("Failed to create event:", err);
      toast.error("Could not create the event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-forest-500/10 via-sage-300/20 to-sage-200/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <Link
          href="/upcoming-events"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-pine-500 transition-colors hover:text-forest-600 dark:text-pine-400 dark:hover:text-sage-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Upcoming Events
        </Link>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-4 rounded-3xl border border-pine-200/80 bg-white p-6 shadow-xl shadow-forest-950/5 sm:p-9 dark:border-pine-800 dark:bg-pine-900"
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-sage-200 bg-sage-50 px-3 py-1 text-xs font-semibold text-forest-600 dark:border-sage-900 dark:bg-sage-950/50 dark:text-sage-300">
            <Sparkles className="h-3.5 w-3.5 text-sage-500" />
            Social Service Drive
          </span>

          <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-pine-900 sm:text-4xl dark:text-white">
            Create a Community Event
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-pine-600 sm:text-base dark:text-pine-400">
            Organize a local relief effort, environmental cleanup, or community
            support drive.
          </p>

          <div className="mt-8 space-y-5">
            {/* Event Title */}
            <div className="space-y-1.5">
              <Label htmlFor="event-title" className="text-sm font-semibold text-pine-800 dark:text-pine-200">
                Event Title <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Type className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-pine-400" />
                <Input
                  id="event-title"
                  name="title"

                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  placeholder="e.g. Winter Clothes Distribution — Mirpur 10, Dhaka"
                  aria-invalid={Boolean(errors.title)}
                  className="h-11 rounded-xl border-pine-200 bg-pine-50/40 pl-10 text-sm shadow-xs focus-visible:ring-forest-500 dark:border-pine-800 dark:bg-pine-800/40"
                />
              </div>
              {errors.title ? (
                <p className="text-xs text-red-500">{errors.title}</p>
              ) : null}
            </div>

            {/* Type + Date */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="event-type" className="text-sm font-semibold text-pine-800 dark:text-pine-200">
                  Event Type <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Heart className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-pine-400" />
                  <select
                    id="event-type"
                    name="type"
                    value={form.type}
                    onChange={(e) => update("type", e.target.value)}
                    aria-invalid={Boolean(errors.type)}
                    className="h-11 w-full appearance-none rounded-xl border border-pine-200 bg-pine-50/40 pl-10 pr-9 text-sm text-pine-900 shadow-xs outline-none transition-colors focus-visible:border-forest-500 focus-visible:ring-3 focus-visible:ring-forest-500/30 aria-invalid:border-red-500 dark:border-pine-800 dark:bg-pine-800/40 dark:text-pine-100"
                  >
                    <option value="" disabled>
                      Select an event type
                    </option>
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 fill-none stroke-pine-400 stroke-2"
                  >
                    <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {errors.type ? (
                  <p className="text-xs text-red-500">{errors.type}</p>
                ) : null}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="event-date" className="text-sm font-semibold text-pine-800 dark:text-pine-200">
                  Event Date <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-pine-400" />
                  <Input
                    id="event-date"
                    name="date"
                    type="date"
                    min={minDateISO}
                    value={form.date}
                    onChange={(e) => update("date", e.target.value)}
                    aria-invalid={Boolean(errors.date)}
                    aria-describedby="event-date-hint"
                    className="h-11 rounded-xl border-pine-200 bg-pine-50/40 pl-10 text-sm shadow-xs focus-visible:ring-forest-500 dark:border-pine-800 dark:bg-pine-800/40 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-70"
                  />
                </div>
                {errors.date ? (
                  <p className="text-xs text-red-500">{errors.date}</p>
                ) : (
                  <p id="event-date-hint" className="text-xs text-pine-500 dark:text-pine-400">
                    Only future dates are allowed — today or earlier is not accepted.
                  </p>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <Label htmlFor="event-location" className="text-sm font-semibold text-pine-800 dark:text-pine-200">
                Location / Venue <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-pine-400" />
                <Input
                  id="event-location"
                  name="location"
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  placeholder="e.g. Murgapara Town Hall, Dhaka"
                  aria-invalid={Boolean(errors.location)}
                  className="h-11 rounded-xl border-pine-200 bg-pine-50/40 pl-10 text-sm shadow-xs focus-visible:ring-forest-500 dark:border-pine-800 dark:bg-pine-800/40"
                />
              </div>
              {errors.location ? (
                <p className="text-xs text-red-500">{errors.location}</p>
              ) : null}
            </div>

            {/* Thumbnail */}
            <div className="space-y-1.5">
              <Label htmlFor="event-image" className="text-sm font-semibold text-pine-800 dark:text-pine-200">
                Thumbnail Image URL <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <ImageIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-pine-400" />
                <Input
                  id="event-image"
                  name="image"
                  type="url"
                  inputMode="url"
                  value={form.image}
                  onChange={(e) => update("image", e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  aria-invalid={Boolean(errors.image)}
                  className="h-11 rounded-xl border-pine-200 bg-pine-50/40 pl-10 text-sm shadow-xs focus-visible:ring-forest-500 dark:border-pine-800 dark:bg-pine-800/40"
                />
              </div>
              {errors.image ? (
                <p className="text-xs text-red-500">{errors.image}</p>
              ) : null}

              <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 pt-1">
                <span className="text-xs font-medium text-pine-500 dark:text-pine-400">
                  Quick photo presets:
                </span>
                {imagePresets.map((preset) => {
                  const active = form.image === preset.url;
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => update("image", preset.url)}
                      className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
                        active
                          ? "border-forest-600 bg-forest-600 text-white"
                          : "border-pine-200 bg-white text-forest-600 hover:border-sage-300 hover:bg-sage-50 dark:border-pine-700 dark:bg-pine-900 dark:text-sage-300 dark:hover:bg-pine-800"
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label htmlFor="event-description" className="text-sm font-semibold text-pine-800 dark:text-pine-200">
                Event Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="event-description"
                name="description"
                rows={5}
                maxLength={600}
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Explain the purpose of the drive, volunteers required, items being distributed, or tasks to complete..."
                aria-invalid={Boolean(errors.description)}
                className="min-h-32 rounded-xl border-pine-200 bg-pine-50/40 px-3.5 py-3 text-sm shadow-xs focus-visible:ring-forest-500 dark:border-pine-800 dark:bg-pine-800/40"
              />
              <div className="flex items-center justify-between gap-4">
                {errors.description ? (
                  <p className="text-xs text-red-500">{errors.description}</p>
                ) : (
                  <span className="text-xs text-pine-500 dark:text-pine-400">
                    Keep it short and practical.
                  </span>
                )}
                <span className="text-xs tabular-nums text-pine-400">
                  {form.description.length}/600
                </span>
              </div>
            </div>

            {/* Organizer email */}
            <div className="flex flex-col gap-1 rounded-xl border border-pine-200 bg-pine-50/60 px-4 py-3 text-xs sm:flex-row sm:items-center sm:justify-between dark:border-pine-800 dark:bg-pine-800/40">
              <span className="flex items-center gap-2 font-medium text-pine-500 dark:text-pine-400">
                <Lock className="h-3.5 w-3.5" />
                Organizer Email attached:
              </span>
              {isSessionPending ? (
                <span className="truncate font-semibold text-pine-500 dark:text-pine-300">
                  Checking your account…
                </span>
              ) : organizerEmail ? (
                <span className="truncate font-semibold text-pine-800 dark:text-pine-100">
                  {user?.name ? `${user.name} · ` : ""}
                  {organizerEmail}
                </span>
              ) : (
                <span className="truncate font-medium text-pine-500 dark:text-pine-400">
                  Not signed in —{" "}
                  <Link
                    href="/sign-in"
                    className="font-semibold text-forest-600 underline underline-offset-2 dark:text-sage-300"
                  >
                    sign in
                  </Link>{" "}
                  to attach your email
                </span>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full rounded-xl bg-gradient-to-r from-forest-600 via-sage-600 to-sage-500 text-sm font-semibold text-white shadow-md shadow-forest-500/20 transition-all hover:opacity-95 hover:shadow-forest-500/40 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                "Publishing event..."
              ) : (
                <>
                  <PlusCircle className="h-4 w-4" />
                  Publish Event
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
