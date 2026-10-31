export type EventCategory = "Food Drive" | "Donation";

export interface UpcomingEvent {
  slug: string;
  title: string;
  category: EventCategory;
  date: string;
  location: string;
  description: string;
  organizer: string;
  image: string;
  imageAlt: string;
}

/**
 * Temporary homepage data. Replace this with the upcoming-events API
 * response once the events endpoint is connected.
 */
export const upcomingEvents: UpcomingEvent[] = [
  {
    slug: "community-food-drive",
    title: "Community Food Drive",
    category: "Food Drive",
    date: "Sat, Nov 7, 2026",
    location: "Dhanmondi, Dhaka",
    description:
      "Pack and distribute essential food boxes to families facing food insecurity across the neighborhood.",
    organizer: "Dhanmondi Volunteers",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Volunteers unloading boxes of food for a community drive",
  },
  {
    slug: "winter-clothes-distribution",
    title: "Winter Clothes Distribution",
    category: "Donation",
    date: "Sun, Nov 15, 2026",
    location: "Mirpur 10, Dhaka",
    description:
      "Collecting and distributing warm clothes, jackets, sweaters, and shawls to underprivileged families, rickshaw pullers, and street children.",
    organizer: "Mirpur Youth Volunteers",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Rows of donated clothes ready to be distributed",
  },
  {
    slug: "blanket-distribution-for-the-needy",
    title: "Blanket Distribution for the Needy",
    category: "Donation",
    date: "Fri, Nov 20, 2026",
    location: "Mohammadpur, Dhaka",
    description:
      "Night-time blanket distribution drive across pavement dwellers, orphanages, and senior citizens across Mohammadpur and nearby communities.",
    organizer: "Mohammadpur Care Circle",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Volunteers joining hands covered in red paint",
  },
];
