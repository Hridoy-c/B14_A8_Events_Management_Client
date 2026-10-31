import React from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import XIcon from "../../../public/icons/XIcon";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 11.001-4.124 2.062 2.062 0 01-.001 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

const exploreLinks = [
  { label: "Upcoming Events", href: "/upcoming-events" },
  { label: "Create an Event", href: "/create-event" },
  { label: "Grassroots Action", href: "/#grassroots" },
  { label: "Community in Action", href: "/#community" },
];

const involvedLinks = [
  { label: "Local Cause Alerts", href: "/alerts" },
  { label: "Volunteer Shifts", href: "/upcoming-events" },
  { label: "Community Stories", href: "/#community" },
  { label: "Sign In", href: "/sign-in" },
];

const companyLinks = [
  { label: "About EventPulse", href: "/#grassroots" },
  { label: "Create Account", href: "/sign-up" },
  { label: "Contact Us", href: "mailto:hello@eventpulse.app" },
  { label: "Back to Top", href: "#top" },
];

const socialLinks = [
  {
    label: "EventPulse on X",
    href: "https://x.com/eventpulse",
    icon: <XIcon className="h-4 w-4" />,
  },
  {
    label: "EventPulse on Instagram",
    href: "https://instagram.com/eventpulse",
    icon: <InstagramIcon className="h-4 w-4" />,
  },
  {
    label: "EventPulse on LinkedIn",
    href: "https://linkedin.com/company/eventpulse",
    icon: <LinkedInIcon className="h-4 w-4" />,
  },
];

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
];

function FooterColumn({
  id,
  title,
  links,
}: {
  id: string;
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <nav aria-labelledby={id}>
      <h3
        id={id}
        className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
      >
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
            >
              {link.label}
              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="relative overflow-hidden border-t border-white/10 bg-slate-950 text-slate-300"
    >
      {/* Brand gradient hairline */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500"
      />

      {/* Ambient accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-rose-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 md:py-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              aria-label="EventPulse Home"
              className="group inline-flex items-center gap-3"
            >
              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-rose-500 p-0.5 shadow-lg shadow-indigo-500/25 transition-all duration-300 group-hover:scale-105 group-hover:shadow-indigo-500/40">
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[14px] bg-slate-950">
                  <svg
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white transition-transform duration-300 group-hover:rotate-6"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 18L10 12L14 20L18 8L22 16L26 12"
                      stroke="url(#footer-pulse-gradient)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="18" cy="8" r="2.5" fill="#F43F5E" />
                    <circle cx="10" cy="12" r="1.5" fill="#6366F1" />
                    <circle cx="26" cy="12" r="1.5" fill="#F43F5E" />
                    <defs>
                      <linearGradient
                        id="footer-pulse-gradient"
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

                <span className="absolute -right-1 -top-1 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-slate-950 bg-rose-500" />
                </span>
              </div>

              <span className="font-heading text-2xl font-extrabold tracking-tight text-white">
                Event
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400 bg-clip-text text-transparent">
                  Pulse
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              A community-first event platform for the people who show up.
              Discover local events, organize with neighbors, and keep the
              causes you care about close.
            </p>

            <div className="mt-5 space-y-2.5 text-sm text-slate-400">
              <a
                href="mailto:hello@eventpulse.app"
                className="inline-flex items-center gap-2 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
              >
                <Mail className="h-4 w-4 shrink-0 text-indigo-400" />
                hello@eventpulse.app
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-rose-400" />
                Dhaka, Bangladesh
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label} (opens in a new tab)`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-white/25 hover:bg-white/10 hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <FooterColumn id="footer-explore" title="Explore" links={exploreLinks} />
          <FooterColumn
            id="footer-involved"
            title="Get Involved"
            links={involvedLinks}
          />
          <FooterColumn
            id="footer-company"
            title="EventPulse"
            links={companyLinks}
          />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} EventPulse. Built for neighbors
            who show up.
          </p>

          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-slate-200 focus-visible:text-slate-200 focus-visible:outline-none"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
