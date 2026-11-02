"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  CalendarRange,
  ChevronDown,
  LogIn,
  LogOut,
  Menu,
  Plus,
  Ticket,
  X,
} from "lucide-react";
import { toast } from "@/lib/toast";

import { authClient } from "@/lib/auth-client";
import ThemeToggle from "@/components/shared/ThemeToggle";
import UserMenuSkeleton from "@/components/all-skeletons/UserMenuSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const accountLinks = [
  { href: "/create-event", label: "Create Event", icon: Plus },
  { href: "/manage-events", label: "Manage Events", icon: CalendarRange },
  { href: "/joined-events", label: "Joined Events", icon: Ticket },
];

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

export default function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  // Monitor scroll for dynamic elevation styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const displayName =
    user?.name?.trim() || user?.email?.split("@")[0] || "EventPulse member";
  const initials = getInitials(user?.name, user?.email);

  const handleSignOut = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(
          error.message || "We couldn't log you out. Please try again."
        );
        return;
      }

      setIsMobileMenuOpen(false);
      toast.success("You've been logged out.");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("We couldn't log you out. Please try again.");
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/85 dark:bg-pine-950/85 backdrop-blur-xl border-b border-pine-200/80 dark:border-pine-800/80 shadow-md shadow-pine-900/5 dark:shadow-black/20"
            : "bg-white/70 dark:bg-pine-950/70 backdrop-blur-md border-b border-pine-200/50 dark:border-pine-800/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* 1. APP LOGO / NAME */}
            <Link
              href="/"
              className="group flex items-center gap-3 focus:outline-none"
              aria-label="EventPulse Home"
            >
              {/* Custom Gradient Vector Logo Icon */}
              <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-forest-700 via-sage-500 to-sage-300 p-0.5 shadow-lg shadow-forest-500/25 group-hover:shadow-sage-500/40 group-hover:scale-105 transition-all duration-300">
                <div className="w-full h-full bg-pine-950 rounded-[14px] flex items-center justify-center overflow-hidden">
                  {/* SVG Graphic with dynamic soundwave & event spark */}
                  <svg
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white transform group-hover:rotate-6 transition-transform duration-300"
                  >
                    <path
                      d="M6 18L10 12L14 20L18 8L22 16L26 12"
                      stroke="url(#pulse-gradient)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="18" cy="8" r="2.5" fill="#DAF1DE" />
                    <circle cx="10" cy="12" r="1.5" fill="#8EB69B" />
                    <circle cx="26" cy="12" r="1.5" fill="#DAF1DE" />
                    <defs>
                      <linearGradient
                        id="pulse-gradient"
                        x1="6"
                        y1="14"
                        x2="26"
                        y2="14"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#8EB69B" />
                        <stop offset="0.5" stopColor="#DAF1DE" />
                        <stop offset="1" stopColor="#DAF1DE" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Subtle pulsing live indicator on logo */}
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-sage-500 border-2 border-white dark:border-pine-950" />
                </span>
              </div>

              {/* Brand Name Typography with Google Fonts Outfit */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-extrabold tracking-tight text-pine-900 dark:text-white font-heading">
                    Event
                    <span className="bg-gradient-to-r from-forest-600 via-sage-600 to-sage-500 bg-clip-text text-transparent">
                      Pulse
                    </span>
                  </span>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-pine-400 dark:text-pine-500 -mt-1 hidden sm:block">
                  Live Experiences
                </span>
              </div>
            </Link>

            {/* 2. UPCOMING EVENTS (CLEAN LINK) */}
            <nav className="hidden md:flex items-center">
              <Link
                href="/upcoming-events"
                className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-pine-700 dark:text-pine-200 hover:text-forest-600 dark:hover:text-forest-400 hover:bg-forest-50/80 dark:hover:bg-forest-950/40 border border-transparent hover:border-forest-100 dark:hover:border-forest-900/60 transition-all duration-200"
              >
                <CalendarDays className="h-4 w-4 text-forest-600 dark:text-forest-400 group-hover:scale-110 transition-transform" />
                <span>Upcoming Events</span>

                {/* Live Counter Badge */}
                <span className="relative flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold rounded-full bg-sage-500/10 text-sage-600 dark:text-sage-400 border border-sage-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-sage-500 animate-pulse" />
                  Live
                </span>
              </Link>
            </nav>

            {/* 3. AUTH AREA & MOBILE MENU TOGGLE */}
            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              {isPending ? (
                <UserMenuSkeleton />
              ) : user ? (
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className="group relative flex items-center gap-1 rounded-full p-0.5 outline-none transition focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-pine-950"
                      aria-label={`Open profile menu for ${displayName}`}
                      title={displayName}
                    >
                      <Avatar
                        size="lg"
                        className="h-10 w-10 ring-2 ring-forest-500/30 shadow-md shadow-forest-500/10"
                      >
                        {user.image ? (
                          <AvatarImage src={user.image} alt={displayName} />
                        ) : null}
                        <AvatarFallback className="bg-gradient-to-br from-forest-600 via-sage-600 to-sage-500 text-sm font-bold text-white">
                          {initials}
                        </AvatarFallback>
                      </Avatar>

                      <ChevronDown className="h-3.5 w-3.5 text-pine-500 transition-transform duration-200 group-data-[popup-open]:rotate-180 dark:text-pine-400" />

                      {/* Display name shown on hover / keyboard focus */}
                      <span className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-pine-900 px-2.5 py-1 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[popup-open]:opacity-0 dark:bg-white dark:text-pine-900">
                        {displayName}
                      </span>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      sideOffset={12}
                      className="w-64 min-w-64 rounded-2xl border border-pine-200/80 bg-white p-1.5 shadow-xl shadow-pine-900/10 dark:border-pine-800 dark:bg-pine-900"
                    >
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className="px-2.5 py-2">
                          <span className="block truncate text-sm font-semibold text-pine-900 dark:text-white">
                            {displayName}
                          </span>
                          <span className="block truncate text-xs font-normal text-pine-500 dark:text-pine-400">
                            {user.email}
                          </span>
                        </DropdownMenuLabel>
                      </DropdownMenuGroup>

                      <DropdownMenuSeparator />

                      {accountLinks.map(({ href, label, icon: Icon }) => (
                        <DropdownMenuItem
                          key={href}
                          render={<Link href={href} />}
                          className="cursor-pointer gap-2.5 rounded-xl px-2.5 py-2 text-sm font-medium text-pine-700 focus:bg-forest-50 focus:text-forest-700 dark:text-pine-200 dark:focus:bg-forest-950/50 dark:focus:text-forest-300"
                        >
                          <Icon className="h-4 w-4 text-forest-500" />
                          {label}
                        </DropdownMenuItem>
                      ))}

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        variant="destructive"
                        disabled={isSigningOut}
                        onClick={handleSignOut}
                        className="cursor-pointer gap-2.5 rounded-xl px-2.5 py-2 text-sm font-medium"
                      >
                        <LogOut className="h-4 w-4" />
                        {isSigningOut ? "Logging out..." : "Logout"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Visible Logout button next to the profile picture */}
                  <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-pine-200 bg-white/70 px-3 py-2 text-xs font-semibold text-pine-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60 dark:border-pine-800 dark:bg-pine-900/60 dark:text-pine-300 dark:hover:border-red-900/70 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    {isSigningOut ? "..." : "Logout"}
                  </button>
                </div>
              ) : (
                <Link
                  href="/sign-in"
                  className="hidden md:inline-flex relative group items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white overflow-hidden shadow-md shadow-forest-500/20 hover:shadow-forest-500/40 transition-all duration-300 active:scale-95 cursor-pointer"
                >
                  {/* Background Gradient using Primary (Indigo) & Secondary (Coral Rose) */}
                  <span className="absolute inset-0 bg-gradient-to-r from-forest-600 via-sage-600 to-sage-500 group-hover:opacity-95 transition-opacity" />

                  {/* Subtle Shimmer Sweep on Hover */}
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                  <span className="relative flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </span>
                </Link>
              )}

              {/* Mobile Menu Hamburger Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-pine-200 dark:border-pine-800 text-pine-700 dark:text-pine-200 hover:bg-pine-100 dark:hover:bg-pine-800 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE NAVIGATION DRAWER */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-pine-200/80 dark:border-pine-800/80 bg-white/95 dark:bg-pine-950/95 backdrop-blur-2xl px-4 pt-4 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
            {/* Upcoming Events Mobile Link */}
            <Link
              href="/upcoming-events"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-3.5 rounded-xl bg-forest-50/60 dark:bg-forest-950/40 text-pine-900 dark:text-white font-semibold text-sm border border-forest-100 dark:border-forest-900/50"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-forest-600 text-white">
                  <CalendarDays className="h-4 w-4" />
                </div>
                <span>Upcoming Events</span>
              </div>
              <span className="flex items-center gap-1 px-2.5 py-0.5 text-xs font-bold rounded-full bg-sage-500 text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
                Live
              </span>
            </Link>

            {user ? (
              <div className="space-y-3">
                {/* Signed-in user card */}
                <div className="flex items-center gap-3 rounded-2xl border border-pine-200 bg-white p-3.5 dark:border-pine-800 dark:bg-pine-900">
                  <Avatar
                    size="lg"
                    className="ring-2 ring-forest-500/30"
                  >
                    {user.image ? (
                      <AvatarImage src={user.image} alt={displayName} />
                    ) : null}
                    <AvatarFallback className="bg-gradient-to-br from-forest-600 via-sage-600 to-sage-500 text-sm font-bold text-white">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-pine-900 dark:text-white">
                      {displayName}
                    </p>
                    <p className="truncate text-xs text-pine-500 dark:text-pine-400">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Protected account links */}
                <div className="grid gap-2">
                  {accountLinks.map(({ href, label, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl border border-pine-200 bg-white px-3.5 py-3 text-sm font-semibold text-pine-700 transition hover:border-forest-200 hover:bg-forest-50 hover:text-forest-700 dark:border-pine-800 dark:bg-pine-900 dark:text-pine-200 dark:hover:border-forest-900 dark:hover:bg-forest-950/40 dark:hover:text-forest-300"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest-50 text-forest-600 dark:bg-forest-950/60 dark:text-forest-400">
                        <Icon className="h-4 w-4" />
                      </span>
                      {label}
                    </Link>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-red-200 bg-red-50 text-red-600 font-semibold text-sm transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/50"
                >
                  <LogOut className="h-4 w-4" />
                  {isSigningOut ? "Logging out..." : "Logout"}
                </button>
              </div>
            ) : (
              <Link
                href="/sign-in"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-forest-600 via-sage-600 to-sage-500 text-white font-semibold text-sm shadow-lg shadow-forest-500/25 active:scale-[0.98] transition-all cursor-pointer"
              >
                <LogIn className="h-4 w-4" />
                <span>Login to EventPulse</span>
              </Link>
            )}
          </div>
        )}
      </header>
    </>
  );
}
