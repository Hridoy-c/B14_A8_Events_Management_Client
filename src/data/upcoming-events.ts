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

