"use client";

import React, { useState } from "react";
import { SquarePen } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/lib/toast";
import { getType, type EventItem } from "@/components/shared/EventCard";
import {
  getMinEventDateISO,
  validateEvent,
  type EventFormErrors,
  type EventFormValues,
} from "@/lib/event-validation";

const eventTypes = [
  "Food Drive",
  "Donation",
  "Cleanup",
  "Tree Plantation",
  "Winter Relief",
  "Health Camp",
  "Community Meetup",
];

type Props = {
  event: EventItem;
  onUpdated: (updated: EventItem) => void;
};

const toFormValues = (event: EventItem): EventFormValues => ({
  title: event.title ?? "",
  type: getType(event),
  date: event.date ?? "",
  location: event.location ?? "",
  image: event.image ?? "",
  description: event.description ?? "",
});

const EditBtn = ({ event, onUpdated }: Props) => {
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<EventFormErrors>({});
  const [form, setForm] = useState<EventFormValues>(() => toFormValues(event));

  // earliest selectable date is tomorrow
  const minDate = getMinEventDateISO();

  const update = (field: keyof EventFormValues, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  // reset the form to the latest event data every time the dialog opens
  const handleOpenChange = (next: boolean) => {
    if (next) {
      setForm(toFormValues(event));
      setErrors({});
    }
    setOpen(next);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors = validateEvent(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    const title = form.title.trim();
    const location = form.location.trim();
    const image = form.image.trim();
    const description = form.description.trim();

    // Preserve whichever field the event already uses for its type so the
    // edit actually replaces the value EventCard reads.
    const typeKey: keyof EventItem = event.eventType
      ? "eventType"
      : event.category
        ? "category"
        : "type";

    const updated: EventItem = {
      ...event,
      title,
      date: form.date,
      location,
      image,
      description,
      [typeKey]: form.type,
    };

    const payload = {
      title,
      date: form.date,
      location,
      image,
      description,
      [typeKey]: form.type,
    };

    try {
      setIsSaving(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/all-events/${event._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      if (!res.ok) throw new Error(`Update failed with status ${res.status}`);

      onUpdated(updated);
      toast.success("Event updated!");
      setOpen(false);
    } catch (err) {
      console.error("Failed to update event:", err);
      toast.error("Could not update the event. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass =
    "h-10 rounded-xl border-pine-200 bg-pine-50/40 text-sm focus-visible:ring-forest-500 dark:border-pine-800 dark:bg-pine-800/40";
  const invalidClass = "border-red-500 focus-visible:ring-red-500";

  return (
    <>
      <button
        type="button"
        onClick={() => handleOpenChange(true)}
        className="inline-flex items-center justify-center gap-1.5 rounded-full bg-sage-50 px-4 py-2 text-xs font-semibold text-forest-700 transition-all hover:bg-sage-100 active:scale-95 dark:bg-sage-950/50 dark:text-sage-300 dark:hover:bg-sage-900/60"
      >
        <SquarePen className="h-3.5 w-3.5" />
        Edit
      </button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl font-extrabold text-pine-900 dark:text-white">
              Edit Event
            </DialogTitle>
            <DialogDescription className="text-sm text-pine-500 dark:text-pine-400">
              Update the details of your event and save the changes.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor={`edit-title-${event._id}`}>
                Event Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id={`edit-title-${event._id}`}
                name="title"
                maxLength={120}
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                aria-invalid={Boolean(errors.title)}
                aria-describedby={
                  errors.title ? `edit-title-error-${event._id}` : undefined
                }
                className={`${inputClass} ${errors.title ? invalidClass : ""}`}
              />
              {errors.title ? (
                <p
                  id={`edit-title-error-${event._id}`}
                  className="text-xs text-red-500"
                >
                  {errors.title}
                </p>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor={`edit-type-${event._id}`}>
                  Event Type <span className="text-red-500">*</span>
                </Label>
                <select
                  id={`edit-type-${event._id}`}
                  name="type"
                  value={form.type}
                  onChange={(e) => update("type", e.target.value)}
                  aria-invalid={Boolean(errors.type)}
                  aria-describedby={
                    errors.type ? `edit-type-error-${event._id}` : undefined
                  }
                  className={`h-10 w-full rounded-xl border bg-pine-50/40 px-3 text-sm text-pine-900 outline-none focus-visible:border-forest-500 focus-visible:ring-2 focus-visible:ring-forest-500/30 dark:bg-pine-800/40 dark:text-pine-100 ${
                    errors.type
                      ? "border-red-500"
                      : "border-pine-200 dark:border-pine-800"
                  }`}
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
                {errors.type ? (
                  <p
                    id={`edit-type-error-${event._id}`}
                    className="text-xs text-red-500"
                  >
                    {errors.type}
                  </p>
                ) : null}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor={`edit-date-${event._id}`}>
                  Event Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`edit-date-${event._id}`}
                  name="date"
                  type="date"
                  min={minDate}
                  value={form.date}
                  onChange={(e) => update("date", e.target.value)}
                  aria-invalid={Boolean(errors.date)}
                  aria-describedby={
                    errors.date ? `edit-date-error-${event._id}` : undefined
                  }
                  className={`${inputClass} ${errors.date ? invalidClass : ""}`}
                />
                {errors.date ? (
                  <p
                    id={`edit-date-error-${event._id}`}
                    className="text-xs text-red-500"
                  >
                    {errors.date}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={`edit-location-${event._id}`}>
                Location / Venue <span className="text-red-500">*</span>
              </Label>
              <Input
                id={`edit-location-${event._id}`}
                name="location"
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                aria-invalid={Boolean(errors.location)}
                aria-describedby={
                  errors.location
                    ? `edit-location-error-${event._id}`
                    : undefined
                }
                className={`${inputClass} ${
                  errors.location ? invalidClass : ""
                }`}
              />
              {errors.location ? (
                <p
                  id={`edit-location-error-${event._id}`}
                  className="text-xs text-red-500"
                >
                  {errors.location}
                </p>
              ) : null}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={`edit-image-${event._id}`}>
                Thumbnail Image URL <span className="text-red-500">*</span>
              </Label>
              <Input
                id={`edit-image-${event._id}`}
                name="image"
                type="url"
                value={form.image}
                onChange={(e) => update("image", e.target.value)}
                aria-invalid={Boolean(errors.image)}
                aria-describedby={
                  errors.image ? `edit-image-error-${event._id}` : undefined
                }
                className={`${inputClass} ${errors.image ? invalidClass : ""}`}
              />
              {errors.image ? (
                <p
                  id={`edit-image-error-${event._id}`}
                  className="text-xs text-red-500"
                >
                  {errors.image}
                </p>
              ) : null}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor={`edit-description-${event._id}`}>
                Event Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id={`edit-description-${event._id}`}
                name="description"
                rows={4}
                maxLength={600}
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                aria-invalid={Boolean(errors.description)}
                aria-describedby={
                  errors.description
                    ? `edit-description-error-${event._id}`
                    : undefined
                }
                className={`rounded-xl border-pine-200 bg-pine-50/40 text-sm focus-visible:ring-forest-500 dark:border-pine-800 dark:bg-pine-800/40 ${
                  errors.description ? invalidClass : ""
                }`}
              />
              <div className="flex items-center justify-between gap-4">
                {errors.description ? (
                  <p
                    id={`edit-description-error-${event._id}`}
                    className="text-xs text-red-500"
                  >
                    {errors.description}
                  </p>
                ) : (
                  <span className="text-xs text-pine-500 dark:text-pine-400">
                    At least 20 characters.
                  </span>
                )}
                <span className="text-xs tabular-nums text-pine-400">
                  {form.description.length}/600
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-pine-200 px-5 py-2.5 text-sm font-semibold text-pine-700 transition-all hover:bg-pine-100 active:scale-95 dark:border-pine-800 dark:text-pine-200 dark:hover:bg-pine-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-full bg-gradient-to-r from-forest-600 via-sage-600 to-sage-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-forest-500/20 transition-all hover:opacity-95 hover:shadow-forest-500/40 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditBtn;
