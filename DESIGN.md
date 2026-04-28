---
name: Lucas-Adebayo Daniel Portfolio
description: Personal portfolio for a Full-Stack Developer & AI Engineer. Polished, technical, confident.
colors:
  ink: "#171717"
  charcoal: "#262626"
  graphite: "#525252"
  stone: "#a3a3a3"
  mist: "#e5e5e5"
  parchment: "#f5f5f5"
  canvas: "#ffffff"
  warm-tint: "#f7f5f3"
typography:
  display:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(3rem, 7vw, 6rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  section: "80px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.charcoal}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.graphite}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.2xl}"
    padding: "24px"
  chip:
    backgroundColor: "{colors.parchment}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
  input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "12px 16px"
---

# Design System: Lucas-Adebayo Daniel Portfolio

## 1. Overview

**Creative North Star: "The Architect's Blueprint"**

This portfolio is structured like a well-engineered blueprint: every element has a purpose, every spacing value is measured, and the overall composition reads with quiet authority. The design rejects decoration for its own sake. Instead, confidence comes from precision — typography that holds the grid, surfaces that lift with physical logic, and motion that responds to the user's intent rather than performing for attention.

The atmosphere is dark-by-default (the blueprint paper at night), with a fully realized light mode for daytime browsing. Both themes share the same structural logic: high contrast for readability, generous whitespace for breathing room, and tactile feedback on every interactive element. The interface should feel like running your hand over machined aluminum: cool, precise, and satisfying.

What this system explicitly rejects (pulled from PRODUCT.md): corporate career-page templating, SaaS landing-page clichés, over-designed clutter where effects compete for attention, and "AI slop" aesthetics like neon-on-black or decorative glassmorphism.

**Key Characteristics:**
- Structural precision over decorative flourish
- Neutral-warm palette with a single functional accent reserved for CTAs
- Tactile, responsive components with clear physical affordance
- Dimensional elevation: surfaces lift and cast shadows with purpose
- Motion serves wayfinding and hierarchy, never spectacle

## 2. Colors

The palette is a warm-tinted neutral system. Every gray carries a whisper of warmth (low chroma, ~30-40 hue) to avoid the clinical chill of pure grayscale. The strategy is **Restrained**: tinted neutrals carry 90%+ of the surface, with a single subtle warm accent reserved for primary actions and the most important focal points.

### Primary
- **Blueprint Ink** (`#171717`): Primary buttons, active navigation, headings, key text. The darkest value. Used sparingly and intentionally.

### Neutral
- **Blueprint Charcoal** (`#262626`): Dark mode surfaces, secondary elevated backgrounds, hover states on dark elements.
- **Blueprint Graphite** (`#525252`): Secondary text, muted labels, inactive states. The workhorse gray.
- **Blueprint Stone** (`#a3a3a3`): Borders, dividers, disabled text, placeholder copy. Never used for readable body text.
- **Blueprint Mist** (`#e5e5e5`): Light borders, hairline dividers, subtle separators.
- **Blueprint Parchment** (`#f5f5f5`): Light mode card backgrounds, chip backgrounds, subtle surface tints.
- **Blueprint Canvas** (`#ffffff`): Primary background in light mode. Also the text color on dark surfaces.
- **Warm Tint** (`#f7f5f3`): Aspirational warm neutral for section alternation and soft backgrounds. Currently unused; introduce for tonal layering.

### Functional Accents (non-brand, used only for category tags)
- **AI/ML Purple** (`#a855f7` / `#9333ea`): Category chips for artificial intelligence and machine learning projects.
- **Full-Stack Blue** (`#3b82f6` / `#2563eb`): Category chips for full-stack web projects.
- **Tools Green** (`#22c55e` / `#16a34a`): Category chips for utility and desktop tools.
- **Data Orange** (`#f97316` / `#ea580c`): Category chips for data science projects.

**The Neutrals-First Rule.** The brand palette contains zero saturated color. Any hue that appears must earn its place through functional necessity (category tags) or extreme restraint (accent on ≤5% of any screen). The interface's confidence comes from its refusal to shout.

## 3. Typography

**Display Font:** Inter (with system-ui, -apple-system, sans-serif fallback)
**Body Font:** Inter (same stack)
**Label/Mono Font:** Inter (system mono for code references only)

**Character:** A single sans-serif family used with discipline. Inter's clarity and slight technical character reinforce the "Architect's Blueprint" north star. No serif contrast, no decorative scripts. Hierarchy is created through scale and weight, not family switching.

### Hierarchy
- **Display** (700, `clamp(3rem, 7vw, 6rem)`, 1.1 line-height): Hero headlines only. The largest moment on the page. Used once per view.
- **Headline** (700, `clamp(2.25rem, 4vw, 3rem)`, 1.2 line-height): Section titles (About Me, Featured Projects, Skills & Tech Stack). Always with `-0.02em` letter-spacing.
- **Title** (700, `1.5rem`, 1.3 line-height): Card titles, subheadings within sections, form section headers.
- **Body** (400, `1rem`, 1.6 line-height): Paragraphs, descriptions, general content. Max line length 65–75ch.
- **Label** (500, `0.875rem`, 1.4 line-height): Navigation links, buttons, tags, metadata. Occasionally uppercase with `0.05em` letter-spacing for category labels.

**The One Family Rule.** Inter handles every typographic role. Differentiation comes from size and weight, not family. This restraint is intentional: it keeps the system cohesive and avoids the "font salad" effect of mixed families.

## 4. Elevation

This system uses **dimensional, lifted surfaces**. Depth is conveyed through layered shadows that suggest physical elevation above the canvas. Shadows are structural, not ambient: a card at rest already casts a subtle shadow, and that shadow deepens on hover to communicate interactivity.

Tonal layering (background color shifts) is used alongside shadows for hierarchy, particularly in dark mode where pure shadows can be harder to read.

### Shadow Vocabulary
- **Rest** (`0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)`): Default card shadow. Barely visible but enough to separate from the background.
- **Lifted** (`0 10px 25px -5px rgba(0,0,0,0.1), 0 4px 10px -2px rgba(0,0,0,0.05)`): Hover state for cards and interactive surfaces. Communicates "this responds to you."
- **Floating** (`0 20px 40px -10px rgba(0,0,0,0.15), 0 8px 16px -4px rgba(0,0,0,0.08)`): Modal surfaces, dropdowns, or any element that demands attention by breaking the z-plane.
- **Dark Mode Rest** (`0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)`): Dark mode equivalent. Slightly stronger because dark backgrounds absorb shadow.
- **Dark Mode Lifted** (`0 10px 25px -5px rgba(0,0,0,0.4), 0 4px 10px -2px rgba(0,0,0,0.25)`): Dark mode hover state.

**The No-Nested-Cards Rule.** Cards may contain content, lists, and media, but they never contain other cards. Nested elevation is confusing and visually noisy. If a card needs internal grouping, use tonal shifts (background color changes) or spacing, not additional card containers.

## 5. Components

### Buttons
- **Shape:** Gently rounded corners (`8px` / `{rounded.lg}`)
- **Primary:** Background `{colors.ink}` (`#171717`), text `{colors.canvas}` (`#ffffff`), padding `12px 24px`. In dark mode, inverts to white background with ink text.
- **Hover / Focus:** Background shifts to `{colors.charcoal}` (`#262626`), subtle `scale(1.02)` transform, `0.2s ease-out` transition. Focus ring: `2px` offset, `{colors.stone}` color.
- **Outline:** Transparent background, `{colors.mist}` border (`#e5e5e5`), `{colors.graphite}` text. Hover: background fills to `{colors.parchment}` (`#f5f5f5`).
- **Tactile feedback:** `scale(0.98)` on active/press state. Buttons must feel responsive to touch.

### Chips / Tags
- **Shape:** Fully pill-shaped (`9999px` / `{rounded.full}`)
- **Filter Chips:** Background `{colors.parchment}`, text `{colors.graphite}`, border transparent at rest. Active state: background `{colors.ink}`, text `{colors.canvas}`, border `{colors.ink}`.
- **Category Chips:** Use functional accent colors (purple, blue, green, orange) with very low saturation backgrounds (`bg-purple-50`, `dark:bg-purple-500/10`) to maintain the neutral-first strategy.
- **Internal padding:** `8px 16px`

### Cards / Containers
- **Corner Style:** Soft but defined (`16px` / `{rounded.2xl}`)
- **Background:** `{colors.canvas}` in light mode, `{colors.charcoal}` in dark mode
- **Shadow Strategy:** Rest shadow at default, Lifted shadow on hover (`-translate-y-1` + shadow transition)
- **Border:** `1px solid {colors.mist}` (light) / `1px solid {colors.charcoal}` (dark). Subtle but present.
- **Internal Padding:** `24px` (`{spacing.lg}`)
- **Signature behavior:** Project cards use 3D perspective tilt on hover (`perspective(1000px) rotateX/Y`) as a technical demonstration. This is a brand-moment effect, not a default card behavior.

### Inputs / Fields
- **Style:** Background `{colors.canvas}`, `1px solid {colors.mist}` border, `12px` radius (`{rounded.xl}`), padding `12px 16px`
- **Focus:** Border shifts to `{colors.stone}` (`#a3a3a3`), `1px` ring in same color. No glow, no colored focus states.
- **Placeholder:** `{colors.stone}` at 70% opacity
- **Error / Disabled:** Error uses a functional red (`#ef4444`) border and text. Disabled uses `{colors.parchment}` background and `{colors.stone}` text.

### Navigation
- **Style:** Transparent at page top, transitioning to glass on scroll (`backdrop-blur-md`, `{colors.canvas}` at 80% opacity, bottom border `{colors.mist}`)
- **Typography:** Label weight, `0.875rem`
- **Active state:** Ink text color with a small underline indicator (`2px` height, full width, rounded)
- **Hover:** Text shifts to ink color, subtle `translateY(-2px)`
- **Mobile:** Full-screen overlay with staggered entrance animation for links

### Signature Component: Project Card 3D
A distinctive card that demonstrates technical capability. On mouse move, the card tilts in 3D space (`perspective: 1000px`, rotation based on cursor position). Inner content translates on the Z-axis (`translateZ(20px)`) for parallax depth. A subtle gradient line appears at the bottom edge on hover. This component is a brand statement: it proves the builder can craft interactive 3D experiences.

## 6. Do's and Don'ts

### Do:
- **Do** keep the palette neutral-first. Warm-tinted grays are the foundation; any color must justify its presence functionally.
- **Do** use dimensional shadows for cards and elevated surfaces. Surfaces should feel physically lifted.
- **Do** provide tactile feedback on all interactive elements: hover lift, press scale, visible focus rings.
- **Do** respect `prefers-reduced-motion`. Disable 3D tilt and simplify entrance animations for users who request reduced motion.
- **Do** cap body text line length at 65–75ch for optimal readability.
- **Do** use `16px` (`rounded-2xl`) for cards and `8px` (`rounded-lg`) for buttons consistently.

### Don't:
- **Don't** use gradient text (`background-clip: text` with gradients). The navbar logo currently violates this; replace with a solid color treatment.
- **Don't** use glassmorphism as decoration. Backdrop blur is acceptable only for the navbar's scroll state, where it serves a functional purpose (maintaining readability over content).
- **Don't** create nested cards. Use tonal background shifts or spacing to group content within a card.
- **Don't** use side-stripe borders (`border-left` or `border-right` > 1px as colored accents). Rewrite with full borders, background tints, or leading icons.
- **Don't** use the hero-metric template (big number, small label, supporting stats, gradient accent). The current stats grid in the About section is acceptable because it uses tonal cards without gradients, but avoid making it the visual focus.
- **Don't** create identical card grids without variation. If every card has the same icon + heading + text pattern, the layout feels templated.
- **Don't** use modals as a first solution. Exhaust inline, progressive disclosure, and expandable alternatives first.
- **Don't** use em dashes in copy. Use commas, colons, semicolons, periods, or parentheses instead.
- **Don't** let the interface feel corporate or impersonal. Warmth comes from human copy, unconventional layout choices, and details that show craft.
