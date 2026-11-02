# EventPulse

**Discover & Manage Extraordinary Events** — a full-stack events management platform where organizers publish community drives and volunteers discover, join, and track them.

### 🔗 Live site

**https://b14-a8-events-management-client.vercel.app/**

---

## ✨ Features

- **Smart event discovery** — browse all upcoming events with category chips (Donation, Cleanup, Tree Plantation, Food Drive, Health Camp…) and instant search by title or location. Past events are filtered out automatically.
- **Detailed event pages** — every card opens a dedicated page with the full description, date, venue, organizer, thumbnail, shareable link, and a one-click "Join" flow.
- **Joined Events dashboard** — a personal page listing every event the signed-in user has joined, hydrated with live event details and sorted by event date (soonest first), with search and a friendly empty state.
- **Organizer dashboard** — create, view, edit, and delete your own events. Manage Events shows only the events published with your account, with inline edit dialogs and confirmation before deleting.
- **Real authentication** — email + password sign-in/sign-up plus Google and GitHub social login, powered by better-auth with a MongoDB adapter and session-aware navbar/account menu.
- **Light ⇄ Dark theme toggle** — a single button in the navbar switches the entire app between themes, remembers the choice in `localStorage`, respects the OS preference on first visit, and applies before first paint so there is no flash.
- **Validation everywhere** — create-event, update-event, and every authentication form validate required fields, email format, password strength (length + upper/lowercase), future-only event dates, and image URLs, with inline field errors and accessible `aria-invalid` states.
- **Responsive, branded UI** — EventPulse's forest → sage theme, Poppins headings, glassmorphic sticky navbar, equal-height event cards, and mobile-first layouts that work from small phones to wide desktops, with toast notifications for every action.

---

## 🗺️ Pages

| Route                  | Purpose                                            |
| ---------------------- | -------------------------------------------------- |
| `/`                    | Landing page with hero and featured events         |
| `/upcoming-events`     | All upcoming events with filters and search        |
| `/upcoming-events/[id]`| Event details and the join form                    |
| `/create-event`        | Publish a new event (signed-in only)               |
| `/manage-events`       | Edit or delete events you created                  |
| `/joined-events`       | Events you have joined, sorted by event date       |
| `/sign-in`, `/sign-up` | Authentication (email/password, Google, GitHub)    |

---

## 🛠️ Tech stack

- **Framework:** Next.js 16 (App Router, Turbopack) with React 19 and TypeScript (strict)
- **Styling:** Tailwind CSS v4 (CSS-first theme tokens), Base UI / shadcn components, `lucide-react` icons
- **Auth:** better-auth (email/password + Google + GitHub) with the MongoDB adapter
- **Data:** MongoDB Atlas, read/written through a companion Express API
- **Notifications:** custom toast provider (no `alert()`)

---

## 🚀 Getting started

### 1. Install

```bash
npm install
```

### 2. Configure environment

Create a `.env` file in the project root:

```env
MONGODB_URI=your-mongodb-connection-string
BETTER_AUTH_SECRET=your-secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_AUTH_CLIENT_ID=...
GOOGLE_AUTH_CLIENT_SECRET=...
GITHUB_AUTH_CLIENT_ID=...
GITHUB_AUTH_CLIENT_SECRETS=...
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Start the API

The event API lives in the sibling repository `../b14_a8_events_management_server` and must be running for data pages to load:

```bash
cd ../b14_a8_events_management_server
node index.js   # http://localhost:8000
```

### 4. Run the client

```bash
npm run dev     # http://localhost:3000
```

### Useful scripts

```bash
npx tsc --noEmit   # typecheck
npm run lint       # ESLint
npm run build      # production build
```

---

## 📁 Project structure

```
src/
├── app/                  # App Router pages, layouts, auth API route
│   ├── (auth)/           # sign-in, sign-up
│   ├── (protected)/      # create-event, manage-events, joined-events
│   └── upcoming-events/  # list + [id] details
├── components/
│   ├── shared/           # Navbar, Footer, EventCard, theme + toast providers
│   ├── protected/        # edit/delete event controls
│   └── ui/               # Base UI / shadcn primitives
└── lib/                  # auth config, theme, event validation, toast, utils
```

---

Built as part of the Programming Hero **Assignment 8 — Events Management** client.
