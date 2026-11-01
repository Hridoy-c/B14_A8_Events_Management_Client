<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Repository Notes

## Project shape

- Single Next.js 16 App Router app, not a monorepo. `@/*` maps to `src/*`.
- This is the **client** repo despite `package.json` still being named `b14_a8_events_management_server`.
- Routes currently implemented: `/`, `/alerts`, `/sign-in`, `/sign-up`, plus the 404 page. `src/app/(auth)/` is a route group, so it does not appear in the URL.
- Auth and the local-cause-alert subscription are UI-only: they fake submission with `alert()`/local state + `setTimeout`. There is no API client, server action, auth provider, or env var usage yet.
- `Navbar` links to `/upcoming-events` and `/create-event`, but those routes do not exist yet.
- App shell: `src/app/layout.tsx` (fonts + `Navbar`). Home: `src/app/page.tsx` composes sections from `src/components/home/`; dummy upcoming-event data is in `src/data/upcoming-events.ts`. Shared components in `src/components/shared/`; generated primitives in `src/components/ui/`.

## Commands

Use npm only (`package-lock.json`); the README's yarn/pnpm/bun options are boilerplate.

- `npm run dev` — Next 16 with Turbopack
- `npm run build` — production build; also runs the TypeScript check. Currently passes.
- `npm run lint` — flat ESLint, no `next lint`. Currently **fails on pre-existing issues**, including `react-hooks/set-state-in-effect` in `AuthDialog`, `components/ui/carousel.tsx`, and `hooks/use-mobile.ts`.
- `npx tsc --noEmit` — standalone typecheck
- `npx eslint <path>` — lint only touched files instead of assuming the whole-repo lint failure is yours
- No test runner or test script is configured.

## UI/toolchain gotchas

- The design contract is `ASSIGNMENT_REQUIREMENTS.md`; `.agents/rules/assignment-requirements.md` mirrors it, so keep both in sync. Rules are mandatory: EventPulse branding, Poppins headings (`font-heading`), Plus Jakarta Sans body (`font-sans`), forest→sage gradient CTAs, `max-w-7xl` containers, `py-16 md:py-24` sections, new X logo, full responsiveness.
- Brand palette (the only accent colors allowed): `#051F20` `#0B2B26` `#163832` `#235347` `#8EB69B` `#DAF1DE`, exposed as the `forest-*`, `sage-*`, and `pine-*` (neutral) Tailwind scales in `globals.css`. Use `red-*` only for real errors. Existing pages already use these scales — don't reintroduce indigo/rose/purple/slate utilities.
- Some current UI predates the spec (e.g. hero heading scale, teal Register button). Follow the spec rather than copying those deviations.
- Tailwind v4 is CSS-first: there is no `tailwind.config.*`. Theme tokens and gradient helpers live in `src/app/globals.css`; CSS is wired through `@tailwindcss/turbopack` in `next.config.ts`.
- `components.json` uses shadcn style `base-nova`, built on **Base UI** (`@base-ui/react`), not Radix. There is no `asChild`; use Base UI's `render` prop or wrap the element.
- `cn` comes from the `cn` package (re-exported by `@/lib/utils`). Generated files in `src/components/ui/` import it directly and usually omit semicolons; avoid reformatting them wholesale.
- Fonts are loaded in `layout.tsx` via `next/font/google` as `--font-heading` (Poppins) and `--font-sans` (Plus Jakarta Sans). Dark-mode tokens exist, but there is no theme provider/toggle.
- The X logo component is at `public/icons/XIcon.tsx`, outside `src/` and therefore not reachable through the `@/` alias.

