"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/shared/ThemeProvider";

type Props = {
  className?: string;
};

export default function ThemeToggle({ className = "" }: Props) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`group relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-pine-200 bg-white/70 text-pine-600 transition-all duration-300 hover:border-sage-300 hover:bg-sage-50 hover:text-forest-600 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-pine-800 dark:bg-pine-900/60 dark:text-pine-300 dark:hover:border-sage-800 dark:hover:bg-pine-800/70 dark:hover:text-sage-300 dark:focus-visible:ring-offset-pine-950 ${className}`}
    >
      {/* Sun: shown while the dark theme is active */}
      <Sun
        aria-hidden="true"
        className={`h-5 w-5 transition-all duration-300 ${
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
        }`}
      />
      {/* Moon: shown while the light theme is active */}
      <Moon
        aria-hidden="true"
        className={`absolute h-5 w-5 transition-all duration-300 ${
          isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
      />
    </button>
  );
}
