import type { Metadata } from "next";
import { Poppins, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import ToastProvider from "@/components/shared/ToastProvider";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { THEME_STORAGE_KEY } from "@/lib/theme";


const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "EventPulse — Discover & Manage Extraordinary Events",
  description:
    "Explore upcoming festivals, concerts, conferences, and workshops with EventPulse. Live ticketing and unforgettable experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Runs before hydration so the saved theme is applied before first paint.
  const themeInitScript = `(function(){try{var stored=localStorage.getItem("${THEME_STORAGE_KEY}");var isDark=stored?stored==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;var root=document.documentElement;root.classList.toggle("dark",isDark);root.style.colorScheme=isDark?"dark":"light";}catch(e){}})();`;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </head>
      <body
        id="top"
        className="min-h-full flex flex-col font-sans bg-background text-foreground"
      >
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
