# Assignment 8: Events Management Client - Core Design & UI Requirements

> **Note**: These rules must be strictly adhered to across all sections, pages, and components of the project.

---

### 1. Typography & Main Headings
- **Heading Consistency**: Keep the main heading style (font, size, weight, color) identical across all sections.
  - **Font**: `Outfit` (`var(--font-heading)`)
  - **Style/Size**: `text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white`
  - **Accent**: Gradient accent text `bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 bg-clip-text text-transparent`
- **Paragraphs & Body Text**:
  - Balanced paragraph spacing with high readability.
  - **Font**: `Plus Jakarta Sans` (`var(--font-sans)`)
  - Text color: `text-slate-600 dark:text-slate-400`
  - Line height: `leading-relaxed`

---

### 2. Button Styling
- **Uniform Button Style**: Use the exact same button styling everywhere as on the home page:
  - **Primary CTA**: `px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:opacity-95 active:scale-95 transition-all`
  - **Secondary / Ghost**: `px-5 py-2.5 rounded-full text-sm font-semibold border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all`

---

### 3. Grid Layout, Equal Card Dimensions & Uniform Images
- **Grid Layout**: Use CSS Grid with equal column tracks:
  - Mobile: `grid-cols-1`
  - Tablet: `md:grid-cols-2`
  - Desktop: `lg:grid-cols-3` (or `xl:grid-cols-4` where applicable)
  - Gap: `gap-6` or `gap-8`
- **Equal Height & Width Cards**:
  - Every card must have `flex flex-col h-full` so all cards in a row stretch to equal height.
  - Card body must have `flex-1 flex flex-col justify-between`.
- **Uniform Image Dimensions**:
  - Fixed aspect ratio on all media containers (e.g. `aspect-[16/10]` or `h-48 w-full`).
  - Image class: `w-full h-full object-cover rounded-t-2xl`.

---

### 4. Navbar Logo & Headings
- Keep the navbar heading and logo the exact same style and size across the whole application:
  - Brand Name: **EventPulse**
  - Brand Logo Icon: Gradient rounded badge with soundwave and live pulse beacon.
  - Height & Padding: Fixed `h-20`, sticky glassmorphic backdrop `backdrop-blur-xl`.

---

### 5. Spacing, Alignment & Container Rules
- Standard Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- Section Spacing: `py-16 md:py-24` with balanced margins.

---

### 6. Social Branding: New X Logo
- Always use the new **X logo** (`<svg>` path) instead of the outdated Twitter bird icon to adhere to the latest rebrand.

---

### 7. Full Device Responsiveness
- Test and support all viewports:
  - **Mobile**: `<640px` (optimized touch targets, mobile drawer, stacked cards)
  - **Tablet**: `640px - 1024px` (2-column grids, fluid spacing)
  - **Desktop**: `>1024px` (multi-column grids, inline navigation)
