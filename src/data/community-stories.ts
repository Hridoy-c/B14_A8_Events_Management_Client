export interface CommunityStory {
  slug: string;
  tag: string;
  tagClass: string;
  title: string;
  location: string;
  date: string;
  organizer: string;
  description: string;
  impact: string;
  image: string;
  imageAlt: string;
  content: string[];
  highlights: string[];
}

export const communityStories: CommunityStory[] = [
  {
    slug: "food-boxes-one-neighborhood",
    tag: "Food Access",
    tagClass: "bg-forest-600/95",
    title: "500 food boxes, one neighborhood",
    location: "Dhanmondi, Dhaka",
    date: "Nov 7, 2026",
    organizer: "Dhanmondi Volunteers",
    description:
      "Local volunteers packed and delivered a week of essentials to families facing food insecurity.",
    impact: "500 families",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Volunteers unloading boxes of food for a community drive",
    content: [
      "What started as a small collection table outside a community center turned into a full neighborhood food drive. Volunteers sorted rice, lentils, oil, and fresh produce into 500 family boxes.",
      "The team mapped delivery routes by building, paired first-time volunteers with experienced organizers, and made sure every box reached a doorstep the same evening.",
      "Neighbors who had never met before worked side by side for a single goal: no family on their street would go without essentials that week.",
    ],
    highlights: [
      "500 family boxes packed and delivered",
      "32 volunteers joined across two shifts",
      "Routes covered 8 buildings in Dhanmondi",
    ],
  },
  {
    slug: "warm-coats-colder-season",
    tag: "Winter Relief",
    tagClass: "bg-sage-600/95",
    title: "Warm coats for a colder season",
    location: "Mirpur, Dhaka",
    date: "Nov 15, 2026",
    organizer: "Mirpur Youth Volunteers",
    description:
      "A neighborhood collection drive turned donated jackets and sweaters into warmth for 1,200 people.",
    impact: "1,200 coats",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Rows of donated clothes ready to be distributed",
    content: [
      "For three weekends, residents dropped off clean jackets, sweaters, and blankets at a local community hall. Students sorted every item by size and condition before packing them for distribution.",
      "The drive prioritized families, rickshaw pullers, and older residents who spend long hours outdoors. Each person received a warm layer and a pair of socks.",
      "By the final collection day, the team had enough clothing to support 1,200 people across Mirpur and nearby neighborhoods.",
    ],
    highlights: [
      "1,200 people received warm clothing",
      "3 weekend collection drives",
      "60 student volunteers helped sort donations",
    ],
  },
  {
    slug: "blankets-that-stay-the-night",
    tag: "Shelter",
    tagClass: "bg-forest-500/95",
    title: "Blankets that stay the night",
    location: "Mohammadpur, Dhaka",
    date: "Nov 20, 2026",
    organizer: "Mohammadpur Care Circle",
    description:
      "Volunteers walked the streets after dark to hand out blankets to pavement dwellers and seniors.",
    impact: "300 blankets",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Volunteers joining hands covered in red paint",
    content: [
      "When temperatures dropped, a small group of neighbors pooled their resources and bought 300 blankets. They spent the evening walking through Mohammadpur to find people sleeping outdoors.",
      "The team focused on pavement dwellers, orphanages, and older residents living alone. Each stop included a short conversation and a check on who might need medical support.",
      "The group now plans to repeat the drive every winter and keep a small emergency stock available year-round.",
    ],
    highlights: [
      "300 blankets distributed in one evening",
      "18 volunteers covered 6 areas",
      "Follow-up support arranged for 12 seniors",
    ],
  },
  {
    slug: "saturday-learning-circle",
    tag: "Education",
    tagClass: "bg-sage-500/95",
    title: "A Saturday learning circle",
    location: "Uttara, Dhaka",
    date: "Oct 18, 2026",
    organizer: "Uttara Learning Circle",
    description:
      "Local teachers and students turned a community room into a free weekend classroom for 80 children.",
    impact: "80 students",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Books, pencils, and learning blocks on a table",
    content: [
      "Every Saturday morning, a community room in Uttara fills with children, books, and the sound of practiced reading. The learning circle is free and open to any student who wants extra support.",
      "Volunteer teachers split students into small groups based on skill level, focusing on reading, writing, and basic math. Older students often return as helpers.",
      "The program started with 12 children and now supports 80, with a waiting list for the next term.",
    ],
    highlights: [
      "80 children attend weekly",
      "12 volunteer teachers",
      "Free learning materials for every student",
    ],
  },
  {
    slug: "garden-grown-by-neighbors",
    tag: "Environment",
    tagClass: "bg-forest-700/95",
    title: "A garden grown by neighbors",
    location: "Lalmatia, Dhaka",
    date: "Sep 26, 2026",
    organizer: "Lalmatia Neighbors",
    description:
      "Forty residents cleared an unused lot and planted a shared green space that now feeds the block.",
    impact: "40 volunteers",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Hands holding a small plant in soil",
    content: [
      "An empty corner lot had become a dumping ground. Neighbors decided to turn it into a shared garden instead, starting with a single weekend clean-up.",
      "Forty residents cleared debris, built raised beds, and planted herbs and vegetables. Local businesses donated soil, tools, and seedlings.",
      "The garden is now maintained by a rotating team of volunteers and shares its harvest with families in the building next door.",
    ],
    highlights: [
      "40 residents took part",
      "2.4 tons of waste cleared",
      "Shared harvest for 25 nearby families",
    ],
  },
  {
    slug: "next-generation-shows-up",
    tag: "Youth",
    tagClass: "bg-sage-600/95",
    title: "The next generation shows up",
    location: "Bashundhara, Dhaka",
    date: "Oct 4, 2026",
    organizer: "Bashundhara Youth Network",
    description:
      "Sixty young volunteers spent their weekend running a donation drive and welcoming first-time helpers.",
    impact: "60 volunteers",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Volunteer in a bright shirt helping at a community event",
    content: [
      "A group of high school and university students organized a weekend donation drive for local shelters. They handled everything from outreach to sorting and delivery.",
      "The team deliberately paired every first-time volunteer with someone who had done the work before, making it easy for newcomers to join the next drive.",
      "Sixty volunteers participated, and more than half signed up for future events before the day ended.",
    ],
    highlights: [
      "60 young volunteers participated",
      "3 shelters received donations",
      "35 first-time volunteers joined",
    ],
  },
];

export function getCommunityStory(slug: string) {
  return communityStories.find((story) => story.slug === slug);
}
