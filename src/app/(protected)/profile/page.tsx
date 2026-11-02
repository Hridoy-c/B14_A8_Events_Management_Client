"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  Camera,
  Mail,
  RotateCcw,
  Save,
  Trash2,
  UserRound,
} from "lucide-react";

import AccountPageShell from "@/components/shared/AccountPageShell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/lib/toast";

const MAX_NAME_LENGTH = 60;
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const AVATAR_SIZE = 256;

type ProfileUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  emailVerified?: boolean;
};

function getInitials(name?: string | null, email?: string | null) {
  const trimmedName = name?.trim();

  if (trimmedName) {
    const parts = trimmedName.split(/\s+/);
    const first = parts[0]?.[0] ?? "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return `${first}${last}`.toUpperCase() || "?";
  }

  return (email?.trim()[0] ?? "?").toUpperCase();
}

/**
 * Turns the selected file into a small square data URL. Keeping the picture
 * inline lets better-auth store it in `user.image` without any upload API.
 */
async function fileToAvatarDataUrl(file: File): Promise<string> {
  const objectUrl = URL.createObjectURL(file);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const element = new window.Image();
      element.onload = () => resolve(element);
      element.onerror = () =>
        reject(new Error("The selected file is not a valid image."));
      element.src = objectUrl;
    });

    // Center-crop to a square so the circular avatar is never stretched.
    const side = Math.min(image.naturalWidth, image.naturalHeight);
    const sourceX = (image.naturalWidth - side) / 2;
    const sourceY = (image.naturalHeight - side) / 2;

    const canvas = document.createElement("canvas");
    canvas.width = AVATAR_SIZE;
    canvas.height = AVATAR_SIZE;

    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas is not supported in this browser.");

    context.drawImage(
      image,
      sourceX,
      sourceY,
      side,
      side,
      0,
      0,
      AVATAR_SIZE,
      AVATAR_SIZE,
    );

    const webp = canvas.toDataURL("image/webp", 0.85);
    return webp.startsWith("data:image/webp")
      ? webp
      : canvas.toDataURL("image/png");
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function ProfileForm({ user }: { user: ProfileUser }) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(user.name ?? "");
  const [image, setImage] = useState<string | null>(user.image ?? null);
  const [imageChanged, setImageChanged] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const trimmedName = name.trim();
  const nameError = !trimmedName
    ? "Your name is required."
    : trimmedName.length < 2
      ? "Use at least 2 characters."
      : trimmedName.length > MAX_NAME_LENGTH
        ? `Use ${MAX_NAME_LENGTH} characters or fewer.`
        : "";
  const showNameError = submitted && Boolean(nameError);
  const isDirty = trimmedName !== (user.name ?? "").trim() || imageChanged;
  const isBusy = isSaving || isProcessingImage;

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    // Reset so selecting the same file again still fires onChange.
    event.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }

    if (file.size > MAX_FILE_BYTES) {
      toast.error("Please choose an image smaller than 5 MB.");
      return;
    }

    setIsProcessingImage(true);

    try {
      const nextImage = await fileToAvatarDataUrl(file);
      setImage(nextImage);
      setImageChanged(true);
    } catch {
      toast.error("We couldn't process that image. Please try another one.");
    } finally {
      setIsProcessingImage(false);
    }
  };

  const handleRemoveImage = () => {
    if (!image) return;
    setImage(null);
    setImageChanged(true);
  };

  const handleReset = () => {
    setName(user.name ?? "");
    setImage(user.image ?? null);
    setImageChanged(false);
    setSubmitted(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    if (nameError || !isDirty) return;

    setIsSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name: trimmedName,
        ...(imageChanged ? { image } : {}),
      });

      if (error) {
        toast.error(
          error.message || "We couldn't update your profile. Please try again.",
        );
        return;
      }

      setImageChanged(false);
      toast.success("Profile updated.");
    } catch {
      toast.error(
        "We couldn't update your profile. Check your connection and try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const inputClass =
    "h-10 rounded-xl border-pine-200 bg-pine-50/50 text-sm focus-visible:ring-forest-500 dark:border-pine-800 dark:bg-pine-800/40";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto w-full max-w-3xl rounded-2xl border border-pine-200/80 bg-white p-6 shadow-xl shadow-forest-950/5 sm:p-8 dark:border-pine-800 dark:bg-pine-900"
    >
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
        {/* Avatar + picture actions */}
        <div className="flex flex-col items-center gap-3 sm:w-48">
          <Avatar className="h-28 w-28 shadow-lg shadow-forest-500/10 ring-4 ring-forest-500/15">
            {image ? (
              <AvatarImage
                src={image}
                alt={trimmedName || "Profile picture"}
              />
            ) : null}
            <AvatarFallback className="bg-gradient-to-br from-forest-600 via-sage-600 to-sage-500 text-3xl font-bold text-white">
              {getInitials(trimmedName, user.email)}
            </AvatarFallback>
          </Avatar>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isBusy}
              className="inline-flex items-center gap-1.5 rounded-full border border-pine-200 px-3.5 py-2 text-xs font-semibold text-pine-700 transition-all hover:bg-pine-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 dark:border-pine-800 dark:text-pine-200 dark:hover:bg-pine-800"
            >
              <Camera className="h-3.5 w-3.5" />
              {isProcessingImage ? "Processing..." : "Change photo"}
            </button>

            {image ? (
              <button
                type="button"
                onClick={handleRemoveImage}
                disabled={isBusy}
                className="inline-flex items-center gap-1.5 rounded-full border border-red-200 px-3.5 py-2 text-xs font-semibold text-red-600 transition-all hover:bg-red-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900/70 dark:text-red-400 dark:hover:bg-red-950/40"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Remove
              </button>
            ) : null}
          </div>

          <p className="text-center text-[11px] leading-relaxed text-pine-500 dark:text-pine-400">
            JPG, PNG or WebP
            <br />
            up to 5 MB
          </p>
        </div>

        {/* Name + email */}
        <div className="flex-1 space-y-5">
          <div className="space-y-1.5">
            <Label
              htmlFor="profile-name"
              className="text-xs font-semibold uppercase tracking-wider text-pine-700 dark:text-pine-300"
            >
              Full Name
            </Label>
            <Input
              id="profile-name"
              name="name"
              autoComplete="name"
              maxLength={MAX_NAME_LENGTH}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              aria-invalid={showNameError || undefined}
              aria-describedby={
                showNameError ? "profile-name-error" : undefined
              }
              className={`${inputClass} ${
                showNameError
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }`}
            />
            {showNameError ? (
              <p id="profile-name-error" className="text-xs text-red-500">
                {nameError}
              </p>
            ) : (
              <p className="text-xs text-pine-500 dark:text-pine-400">
                This is the name shown on the events you create.
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="profile-email"
              className="text-xs font-semibold uppercase tracking-wider text-pine-700 dark:text-pine-300"
            >
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-pine-400" />
              <Input
                id="profile-email"
                type="email"
                value={user.email}
                readOnly
                disabled
                className={`${inputClass} cursor-not-allowed pl-10`}
              />
            </div>
            <p className="flex items-center gap-1 text-xs text-pine-500 dark:text-pine-400">
              {user.emailVerified ? (
                <>
                  <BadgeCheck className="h-3.5 w-3.5 text-sage-500" />
                  Verified email — it can&apos;t be changed here.
                </>
              ) : (
                "Your email address can't be changed here."
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col-reverse gap-2 border-t border-pine-100 pt-5 sm:flex-row sm:justify-end dark:border-pine-800">
        {isDirty ? (
          <button
            type="button"
            onClick={handleReset}
            disabled={isBusy}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-pine-200 px-5 py-2.5 text-sm font-semibold text-pine-700 transition-all hover:bg-pine-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 dark:border-pine-800 dark:text-pine-200 dark:hover:bg-pine-800"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        ) : null}

        <button
          type="submit"
          disabled={isBusy || !isDirty}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-forest-600 via-sage-600 to-sage-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-forest-500/20 transition-all hover:opacity-95 hover:shadow-forest-500/40 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

function ProfileSkeleton() {
  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl border border-pine-200/80 bg-white p-6 shadow-xl shadow-forest-950/5 sm:p-8 dark:border-pine-800 dark:bg-pine-900">
      <div className="flex flex-col gap-8 sm:flex-row">
        <div className="flex flex-col items-center gap-3 sm:w-48">
          <Skeleton className="h-28 w-28 rounded-full" />
          <Skeleton className="h-8 w-32 rounded-full" />
        </div>
        <div className="flex-1 space-y-5">
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-10 w-40 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  return (
    <AccountPageShell
      eyebrow="Account Settings"
      title="Your Profile"
      description="Update the name and photo that appear across EventPulse. Changes are saved straight to your account."
      icon={UserRound}
      userName={user?.name}
    >
      {isPending ? (
        <ProfileSkeleton />
      ) : !user ? (
        <div className="mx-auto w-full max-w-3xl rounded-2xl border border-pine-200/80 bg-white p-10 text-center shadow-xl shadow-forest-950/5 dark:border-pine-800 dark:bg-pine-900">
          <UserRound className="mx-auto h-10 w-10 text-pine-300 dark:text-pine-600" />
          <p className="mt-4 text-pine-600 dark:text-pine-400">
            Please{" "}
            <Link
              href="/sign-in?redirect=/profile"
              className="font-semibold text-forest-600 underline dark:text-sage-300"
            >
              sign in
            </Link>{" "}
            to view and update your profile.
          </p>
        </div>
      ) : (
        <ProfileForm key={user.id} user={user as ProfileUser} />
      )}
    </AccountPageShell>
  );
}
