"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/lib/toast";

type Props = {
  id?: string;
  title: string;
  onDeleted: () => void;
};

const DeleteBtn = ({ id, title, onDeleted }: Props) => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); // keep the dialog open while the request runs
    if (!id) return;

    try {
      setIsDeleting(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/all-events/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");

      onDeleted();
      toast.success("Event deleted.");
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Could not delete the event. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 transition-all hover:bg-red-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-950/70"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-heading text-pine-900 dark:text-white">
            Delete this event?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-pine-600 dark:text-pine-400">
            &quot;{title}&quot; will be permanently removed. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {isDeleting ? "Deleting..." : "Yes, delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBtn;