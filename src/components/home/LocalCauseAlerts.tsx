"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  CircleCheck,
  Mail,
  ShieldCheck,
} from "lucide-react";

const perks = [
  "Urgent local needs",
  "Volunteer shifts",
  "Impact updates",
  "One email a week",
];

export default function LocalCauseAlerts() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }

    setError("");
    setIsLoading(true);

    // Demo subscription. Replace with the alerts API call.
    setTimeout(() => {
      setIsLoading(false);
      setSubscribed(true);
    }, 700);
  };

  return (
    <section id="alerts" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 px-6 py-10 shadow-2xl shadow-indigo-950/20 sm:px-10 lg:px-12">
          {/* Ambient accents */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-indigo-500/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-rose-500/20 blur-3xl"
          />

          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-xs font-semibold text-indigo-200 backdrop-blur-sm">
                <Bell className="h-3.5 w-3.5 text-rose-400" />
                Local cause alerts
              </div>

              <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                The causes near you,{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400 bg-clip-text text-transparent">
                  in your inbox.
                </span>
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                Get one short weekly email with verified local causes,
                volunteer shifts, and the moments where showing up matters
                most.
              </p>

              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {perks.map((perk) => (
                  <li
                    key={perk}
                    className="flex items-center gap-2 text-xs font-medium text-slate-300"
                  >
                    <CircleCheck className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              {subscribed ? (
                <div className="flex items-start gap-3" role="status" aria-live="polite">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400 ring-1 ring-emerald-400/20">
                    <CircleCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      You&apos;re on the list.
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-300">
                      We&apos;ll send local cause alerts to{" "}
                      <span className="font-semibold text-white">{email}</span>.
                    </p>
                    <Link
                      href="/alerts"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 transition-colors hover:text-indigo-200"
                    >
                      Choose your causes
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setSubscribed(false);
                        setEmail("");
                      }}
                      className="mt-3 block text-xs font-medium text-slate-400 transition-colors hover:text-white"
                    >
                      Use a different email
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Subscribe to local cause alerts"
                >
                  <label
                    htmlFor="home-alert-email"
                    className="text-xs font-semibold uppercase tracking-wider text-slate-300"
                  >
                    Email address
                  </label>

                  <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
                      <input
                        id="home-alert-email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value);
                          if (error) setError("");
                        }}
                        placeholder="name@example.com"
                        aria-invalid={error ? true : undefined}
                        aria-describedby={error ? "home-alert-email-error" : undefined}
                        className="h-11 w-full rounded-full border border-white/15 bg-white/10 pl-10 pr-4 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 px-5 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-all hover:opacity-95 hover:shadow-indigo-500/40 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isLoading ? "Subscribing..." : "Get alerts"}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>

                  {error && (
                    <p
                      id="home-alert-email-error"
                      role="alert"
                      className="mt-2 text-xs text-rose-400"
                    >
                      {error}
                    </p>
                  )}

                  <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    No spam. Unsubscribe anytime.
                  </p>

                  <Link
                    href="/alerts"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 transition-colors hover:text-indigo-200"
                  >
                    Choose your causes
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
