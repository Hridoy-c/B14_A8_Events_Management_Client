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
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";
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
            ? "bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-md shadow-slate-900/5 dark:shadow-black/20"
            : "bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50"
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
              <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-rose-500 p-0.5 shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 group-hover:scale-105 transition-all duration-300">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center overflow-hidden">
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
                    <circle cx="18" cy="8" r="2.5" fill="#F43F5E" />
                    <circle cx="10" cy="12" r="1.5" fill="#6366F1" />
                    <circle cx="26" cy="12" r="1.5" fill="#F43F5E" />
                    <defs>
                      <linearGradient
                        id="pulse-gradient"
                        x1="6"
                        y1="14"
                        x2="26"
                        y2="14"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#6366F1" />
                        <stop offset="0.5" stopColor="#A855F7" />
                        <stop offset="1" stopColor="#F43F5E" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Subtle pulsing live indicator on logo */}
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500 border-2 border-white dark:border-slate-950" />
                </span>
              </div>

              {/* Brand Name Typography with Google Fonts Outfit */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white font-heading">
                    Event
                    <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 bg-clip-text text-transparent">
                      Pulse
                    </span>
                  </span>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 -mt-1 hidden sm:block">
                  Live Experiences
                </span>
              </div>
            </Link>

            {/* 2. UPCOMING EVENTS (CLEAN LINK) */}
            <nav className="hidden md:flex items-center">
              <Link
                href="/upcoming-events"
                className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/80 dark:hover:bg-indigo-950/40 border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900/60 transition-all duration-200"
              >
                <CalendarDays className="h-4 w-4 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
                <span>Upcoming Events</span>

                {/* Live Counter Badge */}
                <span className="relative flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
                  Live
                </span>
              </Link>
            </nav>

            {/* 3. AUTH AREA & MOBILE MENU TOGGLE */}
            <div className="flex items-center gap-2 sm:gap-3">
              {isPending ? (
                <div
                  className="h-10 w-10 rounded-full border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-800 animate-pulse"
                  aria-hidden="true"
                />
              ) : user ? (
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className="group relative flex items-center gap-1 rounded-full p-0.5 outline-none transition focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
                      aria-label={`Open profile menu for ${displayName}`}
                      title={displayName}
                    >
                      <Avatar
                        size="lg"
                        className="h-10 w-10 ring-2 ring-indigo-500/30 shadow-md shadow-indigo-500/10"
                      >
                        {user.image ? (
                          <AvatarImage src={user.image} alt={displayName} />
                        ) : null}
                        <AvatarFallback className="bg-gradient-to-br from-indigo-600 via-purple-600 to-rose-500 text-sm font-bold text-white">
                          {initials}
                        </AvatarFallback>
                      </Avatar>

                      <ChevronDown className="h-3.5 w-3.5 text-slate-500 transition-transform duration-200 group-data-[popup-open]:rotate-180 dark:text-slate-400" />

                      {/* Display name shown on hover / keyboard focus */}
                      <span className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[popup-open]:opacity-0 dark:bg-white dark:text-slate-900">
                        {displayName}
                      </span>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      sideOffset={12}
                      className="w-64 min-w-64 rounded-2xl border border-slate-200/80 bg-white p-1.5 shadow-xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900"
                    >
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className="px-2.5 py-2">
                          <span className="block truncate text-sm font-semibold text-slate-900 dark:text-white">
                            {displayName}
                          </span>
                          <span className="block truncate text-xs font-normal text-slate-500 dark:text-slate-400">
                            {user.email}
                          </span>
                        </DropdownMenuLabel>
                      </DropdownMenuGroup>

                      <DropdownMenuSeparator />

                      {accountLinks.map(({ href, label, icon: Icon }) => (
                        <DropdownMenuItem
                          key={href}
                          render={<Link href={href} />}
                          className="cursor-pointer gap-2.5 rounded-xl px-2.5 py-2 text-sm font-medium text-slate-700 focus:bg-indigo-50 focus:text-indigo-700 dark:text-slate-200 dark:focus:bg-indigo-950/50 dark:focus:text-indigo-300"
                        >
                          <Icon className="h-4 w-4 text-indigo-500" />
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
                    className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/70 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-rose-900/70 dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    {isSigningOut ? "..." : "Logout"}
                  </button>
                </div>
              ) : (
                <Link
                  href="/sign-in"
                  className="relative group inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white overflow-hidden shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 active:scale-95 cursor-pointer"
                >
                  {/* Background Gradient using Primary (Indigo) & Secondary (Coral Rose) */}
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 group-hover:opacity-95 transition-opacity" />

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
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
          <div className="md:hidden border-t border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl px-4 pt-4 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
            {/* Upcoming Events Mobile Link */}
            <Link
              href="/upcoming-events"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-3.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 text-slate-900 dark:text-white font-semibold text-sm border border-indigo-100 dark:border-indigo-900/50"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-indigo-600 text-white">
                  <CalendarDays className="h-4 w-4" />
                </div>
                <span>Upcoming Events</span>
              </div>
              <span className="flex items-center gap-1 px-2.5 py-0.5 text-xs font-bold rounded-full bg-rose-500 text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
                Live
              </span>
            </Link>

            {user ? (
              <div className="space-y-3">
                {/* Signed-in user card */}
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
                  <Avatar
                    size="lg"
                    className="ring-2 ring-indigo-500/30"
                  >
                    {user.image ? (
                      <AvatarImage src={user.image} alt={displayName} />
                    ) : null}
                    <AvatarFallback className="bg-gradient-to-br from-indigo-600 via-purple-600 to-rose-500 text-sm font-bold text-white">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                      {displayName}
                    </p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">
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
                      className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-900 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-300"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
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
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 font-semibold text-sm transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-rose-900/70 dark:bg-rose-950/30 dark:text-rose-400 dark:hover:bg-rose-950/50"
                >
                  <LogOut className="h-4 w-4" />
                  {isSigningOut ? "Logging out..." : "Logout"}
                </button>
              </div>
            ) : (
              <Link
                href="/sign-in"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 active:scale-[0.98] transition-all cursor-pointer"
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
