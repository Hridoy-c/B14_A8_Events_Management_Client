"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CalendarDays,
  LogIn,
  Menu,
  X,
} from "lucide-react";
import AuthDialog from "./AuthDialog";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

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

            {/* 3. LOGIN BUTTON & MOBILE MENU TOGGLE */}
            <div className="flex items-center gap-3">
              {/* Login Button: Triggers shadcn Dialog directly over home page */}
              <button
                type="button"
                onClick={() => setIsAuthOpen(true)}
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
              </button>

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

            {/* Mobile Login Button to open Dialog */}
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsAuthOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 active:scale-[0.98] transition-all cursor-pointer"
            >
              <LogIn className="h-4 w-4" />
              <span>Login to EventPulse</span>
            </button>
          </div>
        )}
      </header>

      {/* shadcn/ui Auth Dialog rendered over home page */}
      <AuthDialog open={isAuthOpen} onOpenChange={setIsAuthOpen} />
    </>
  );
}
