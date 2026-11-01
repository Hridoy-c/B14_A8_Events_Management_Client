# Assignment Design & Layout Rules

You must strictly adhere to these rules across all pages, sections, and components:

0. **Brand Palette** (mandatory):
   - Only the forest → sage → mint ramp: `#051F20`, `#0B2B26`, `#163832`, `#235347`, `#8EB69B`, `#DAF1DE`.
   - Tailwind scales: `forest-*`, `sage-*`, `pine-*` (neutral). Avoid indigo, purple, rose, teal, or amber accents; keep `red-*` for genuine error/destructive messaging only.

1. **Heading Consistency**:
   - Keep the main heading style (font, size, color) consistent across all sections.
   - Use `Poppins` (`font-heading`) for titles, with `text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-pine-900 dark:text-white`.
   - Gradient highlights: `bg-gradient-to-r from-forest-600 via-sage-600 to-sage-500 bg-clip-text text-transparent`.

2. **Typography & Paragraph Spacing**:
   - Keep paragraph spacing balanced and text easily readable.
   - Use `Plus Jakarta Sans` (`font-sans`), `text-pine-600 dark:text-pine-400`, `leading-relaxed`.

3. **Uniform Images & Equal Dimensions**:
   - Maintain uniform image sizes and spacing.
   - Use grid layout with equal image sizes.
   - Keep all cards equal height and width (especially in services, projects, products, or events sections) using `flex flex-col h-full` and `aspect-[16/10]` or fixed uniform image containers.

4. **Button Styling**:
   - Use the same button style as on the home page across all components:
     - Primary button: `px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-forest-600 via-sage-600 to-sage-500 shadow-md shadow-forest-500/20 hover:shadow-forest-500/40 hover:opacity-95 active:scale-95 transition-all`.

5. **Spacing & Alignment**:
   - Ensure good spacing and proper alignment (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`, section spacing `py-16 md:py-24`).

6. **Navbar Heading & Logo**:
   - Keep the heading/logo the same style and size as on the home page (`EventPulse`, height `h-20`).

7. **Social Icons**:
   - Use the new X logo instead of the old Twitter bird to match the latest rebrand.

8. **Full Responsiveness**:
   - Make it responsive for all devices, including mobile, tablet, and desktop views.
