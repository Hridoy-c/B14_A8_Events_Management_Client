"use client";

import React, { useState } from "react";
import { SquarePen } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/lib/toast";
import { getType, type EventItem } from "@/components/shared/EventCard";

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

const EditBtn = ({ event, onUpdated }: Props) => {
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({
    title: event.title,
    type: getType(event),
    date: event.date,
    location: event.location,
    image: event.image,
    description: event.description,
  });

  // earliest selectable date is tomorrow
  const minDate = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate(),
    ).padStart(2, "0")}`;
  })();

  const update = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // reset the form to the latest event data every time the dialog opens
  const handleOpenChange = (next: boolean) => {
    if (next) {
      setForm({
        title: event.title,
        type: getType(event),
        date: event.date,
        location: event.location,
        image: event.image,
        description: event.description,
      });
    }
    setOpen(next);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const submitted = Object.fromEntries(formData.entries());

    try {
      setIsSaving(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/all-events/${event._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submitted),
        },
      );
      if (!res.ok) throw new Error("Update failed");

      onUpdated({ ...event, ...(submitted as Partial<EventItem>) });
      toast.success("Event updated!");
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Could not update the event. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass =
    "h-10 rounded-xl border-pine-200 bg-pine-50/40 text-sm focus-visible:ring-forest-500 dark:border-pine-800 dark:bg-pine-800/40";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-sage-50 px-4 py-2 text-xs font-semibold text-forest-700 transition-all hover:bg-sage-100 active:scale-95 dark:bg-sage-950/50 dark:text-sage-300 dark:hover:bg-sage-900/60"
        >
          <SquarePen className="h-3.5 w-3.5" />
          Edit
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl font-extrabold text-pine-900 dark:text-white">
            Edit Event
          </DialogTitle>
          <DialogDescription className="text-sm text-pine-500 dark:text-pine-400">
            Update the details of your event and save the changes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="edit-title">Event Title</Label>
            <Input
              id="edit-title"
              name="title"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="edit-type">Event Type</Label>
              <select
                id="edit-type"
                name="type"
                value={form.type}
                onChange={(e) => update("type", e.target.value)}
                className="h-10 w-full rounded-xl border border-pine-200 bg-pine-50/40 px-3 text-sm text-pine-900 outline-none focus-visible:border-forest-500 focus-visible:ring-2 focus-visible:ring-forest-500/30 dark:border-pine-800 dark:bg-pine-800/40 dark:text-pine-100"
              >
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-date">Event Date</Label>
              <Input
                id="edit-date"
                name="date"
                type="date"
                min={minDate}
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-location">Location / Venue</Label>
            <Input
              id="edit-location"
              name="location"
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-image">Thumbnail Image URL</Label>
            <Input
              id="edit-image"
              name="image"
              type="url"
              value={form.image}
              onChange={(e) => update("image", e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-description">Event Description</Label>
            <Textarea
              id="edit-description"
              name="description"
              rows={4}
              maxLength={600}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="rounded-xl border-pine-200 bg-pine-50/40 text-sm focus-visible:ring-forest-500 dark:border-pine-800 dark:bg-pine-800/40"
            />
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
  );
};

export default EditBtn;