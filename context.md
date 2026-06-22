# Karl Landing Page — Context & Conventions

**Purpose:** Marketing landing page for Karl, an AI Data Intelligence Agent by Kanerika Inc.—a native Microsoft Fabric workload that lets business users ask data questions in plain English.

---

## Tech Stack (Exact Versions)

```
next:                  ^15.1.0
react:                 ^19.0.0
react-dom:             ^19.0.0
framer-motion:         ^11.15.0
tailwindcss:           ^4.0.0
@tailwindcss/postcss:  ^4.0.0
typescript:            ^5.3.3
postcss:               ^8.4.32
```

- **App Router** with TypeScript
- **No autoprefixer** (v4 prefixes automatically)

---

## Critical Conventions (Already Caused Breakage)

### Tailwind v4: CSS-First, No `.config.ts` Scanning

- **There is NO `tailwind.config.ts` theme.**
- Theme tokens live in `app/globals.css` under `@theme { ... }` (future use) or extended in `tailwind.config.ts` under `extend` only.
- `globals.css` begins with `@import "tailwindcss";` — **never v3 directives** (`@tailwind base/components/utilities`).
- Content scanning is automatic in v4; `content: [...]` in `tailwind.config.ts` is optional but kept for clarity.
- Colors, fonts, animations defined in `tailwind.config.ts` `extend` section work as Tailwind utilities.

### PostCSS: Must Use `@tailwindcss/postcss`

- **File:** `postcss.config.mjs` (ESM, not `.js` or `.cjs`)
- **Content:**
  ```javascript
  export default {
    plugins: ["@tailwindcss/postcss"],
  };
  ```
- **No autoprefixer.** Do NOT add it.
- **No `tailwindcss` directly as plugin.** Must be `@tailwindcss/postcss`.

### Next 15 + React 19 + framer-motion ^11.15+

- **Never pin** `next@14` with `react@19` (peer conflict).
- **Never use** `--force` or `--legacy-peer-deps`.
- **framer-motion must be** `^11.15.0` or higher for React 19 compatibility.

### Path Alias: `@/*` → Project Root

```typescript
import { Hero } from '@/components/Hero';
import { useScrollProgress } from '@/lib/useScrollProgress';
```

Configured in `tsconfig.json`:
```json
"paths": {
  "@/*": ["./*"]
}
```

### Components with Hooks/Refs/Browser APIs Need `'use client'`

- `Hero.tsx` — Framer Motion, useScroll, useTransform
- `AnnounceBar.tsx` — useState
- All components in `/components` use `'use client'`

---

## File Structure & Purpose

```
app/
  layout.tsx              → Root layout; imports Inter from next/font, sets metadata
  page.tsx                → Home page; assembles Hero, AnnounceBar, IndustryStrip
  globals.css             → @import "tailwindcss"; core styles; prefers-reduced-motion

components/
  Hero.tsx                → Fixed hero with Framer Motion scroll animations
  AnnounceBar.tsx         → Dismissible Fabric Marketplace banner
  Nav.tsx                 → Navigation overlay (currently unused; nav built into Hero)
  IndustryStrip.tsx       → Bottom bar; industries + "See how it works" CTA

lib/
  useScrollProgress.ts    → Custom hook + easing helpers (currently unused; Hero uses Framer directly)

public/
  karl-hero.mp4           → Background video (placeholder — user must add real MP4)

package.json, tsconfig.json, next.config.js, tailwind.config.ts, postcss.config.mjs, README.md
```

---

## Design Tokens

### Colors (From `tailwind.config.ts` Extend)

```typescript
colors: {
  dark:              '#0a0a0a',  // Primary background
  'dark-secondary':  '#0d0d0d',
  'dark-tertiary':   '#111111',
  'karl-purple':     '#7F77DD',  // Accent (use sparingly)
}
```

### Additional Colors (Hard-Coded in Components)

```
Text:          #ffffff
Text Muted:    rgba(255,255,255,0.62)
Border:        rgba(255,255,255,0.15)
Black:         #000000
Announce BG:   #111111
Announce Dark: #222222
Announce Text: #777777
Announce Link: #cccccc
```

### Fonts

- **Inter** — Body, UI, nav (via `next/font` in `app/layout.tsx`, weights 400–800)
- **Georgia** — Hero headline (serif, system font; `fontFamily.serif` in `tailwind.config.ts`)

### Text & Spacing Classes (Tailwind v4)

- `text-white` → `#ffffff`
- `text-white/62` → `rgba(255,255,255,0.62)` (muted)
- `bg-white/7` → `rgba(255,255,255,0.07)` (hover states)
- `bg-dark` → `#0a0a0a`
- `px-12, py-2.25, gap-2` → Tailwind spacing scale (1 unit = 4px)
- `font-serif`, `font-bold`, `text-6xl md:text-7xl` → responsive headline

---

## Hero Scroll Behaviour (Actual Code Values)

**Scroll zone:** 0 → 280px (not 220px as originally mentioned)

Over scroll 0→280px:

| Effect | Start | End | Applied To |
|--------|-------|-----|------------|
| Video blur | 0px | 5px | `motion.video` filter |
| Dark overlay opacity | 0 | 0.8 | `#overlay-extra` (absolute div) |
| Hero content opacity | 0 | 1 | `motion.div` (headline + sub + CTA) |
| Hero content Y translate | 28px | 0px | Same `motion.div` |
| Scroll hint opacity | 1 | 0 | Fades out over 0→186px (66% of zone) |

**Implementation:** Framer Motion `useScroll()` + `useTransform()` in `Hero.tsx`. No vanilla JS animation loop.

```typescript
const scrollProgress = useTransform(scrollY, [0, 280], [0, 1], { clamp: true });
const blurValue = useTransform(scrollProgress, [0, 1], [0, 5]);
const overlayOpacity = useTransform(scrollProgress, [0, 1], [0, 0.8]);
const contentOpacity = useTransform(scrollProgress, [0, 1], [0, 1], { clamp: true });
const contentY = useTransform(scrollProgress, [0, 1], [28, 0]);
const scrollHintOpacity = useTransform(scrollProgress, [0, 0.66], [1, 0], { clamp: true });
```

**Spacer:** `<div className="h-[280px] relative z-0" />` below fixed hero provides scroll room.

---

## Accessibility & Responsive

- **Semantic HTML:** `<nav>`, `<a>`, `<button>`, proper heading hierarchy
- **prefers-reduced-motion:** Respected globally in `globals.css` (all animations disabled)
- **Responsive:** `md:` breakpoint used in Hero headline (`text-6xl md:text-7xl`); mobile-first
- **Color contrast:** White text on dark video + overlay ensures readability
- **Video:** `autoPlay muted loop playsinline` ensures autoplay on mobile

---

## Out of Scope

❌ Do NOT scaffold or add:
- Demo section (placeholder text only)
- Architecture section
- Pricing table
- Footer
- Additional pages

❌ Do NOT reword hero copy:
```
"Your Data Team, On Demand."
"The most successful enterprises don't wait for insight — they demand it. 
 Karl puts the full power of your data in every leader's hands, instantly. 
 No analysts. No dashboards. Just answers, the moment you need them."
```

---

## Commands

```bash
npm install              # Install dependencies
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Build for production
npm start                # Run production server
npm run lint             # Run ESLint
```

---

## Known Gotchas

1. **Tailwind v4 PostCSS**
   - Mistake: Using `postcss.config.js` instead of `.mjs`; result = `__esModule` error
   - Mistake: Adding `autoprefixer` plugin; result = v4 does it automatically
   - Mistake: Using `tailwindcss` directly instead of `@tailwindcss/postcss`; result = plugin not found
   - **Fix:** Single `postcss.config.mjs` with only `["@tailwindcss/postcss"]`

2. **Next 15 + React 19 Peer Conflict**
   - Mistake: Pinning `next@14` with `react@19`; result = peer dep warning
   - Mistake: Using `--force` or `--legacy-peer-deps`; result = broken installs
   - **Fix:** Use `next@^15.1.0` with `react@^19.0.0`

3. **Framer Motion Compatibility**
   - Mistake: Using `framer-motion@^11.0.0` with React 19; result = hook errors
   - **Fix:** `framer-motion@^11.15.0` minimum

4. **Globals CSS Directives**
   - Mistake: Using v3 directives (`@tailwind base;`, `@tailwind components;`, `@tailwind utilities;`)
   - **Result:** v4 does not recognize them; page unstyled
   - **Fix:** Use `@import "tailwindcss";` (single line)


---

## For AI Assistants: Mirror These Rules

If you prefer your own rules file, mirror the key conventions from **sections 1–5** into:
- `.github/copilot-instructions.md` (GitHub Copilot, Cursor)
- `CLAUDE.md` (Claude Code)
- `.cursorrules` (Cursor)
- `AGENTS.md` (custom agents)

**Minimum rules to include:**
- Tailwind v4 is CSS-first; use `@import "tailwindcss"` in globals, no config scanning
- PostCSS: `postcss.config.mjs` with only `@tailwindcss/postcss` plugin
- Next 15 + React 19 + framer-motion ^11.15+; never --force
- Path alias `@/*` points to project root
- Components with hooks/refs need `'use client'`
- Scroll zone is 0→280px (not 220px); blur 0→5px, overlay 0→0.8
- Do NOT add demo/pricing/footer sections; hero copy is locked

---

### Next.js 16 / Turbopack Compilation Hang (OOM)

- **Issue:** Next.js Turbopack compiler hangs indefinitely and spawns 50+ Node.js runtime processes, eventually running out of memory during `next dev`.
- **Cause:** Importing massive raw HTML strings (e.g., via `dangerouslySetInnerHTML`) directly into `.tsx` components causes the TypeScript compiler to generate a massive Abstract Syntax Tree (AST), blowing up memory limits.
- **Fix:** Move massive text/HTML strings into external `.json` files (e.g., `content.json`) and import the JSON object instead. Next.js processes JSON files significantly more efficiently than raw TSX strings, completely bypassing the AST memory limit.

---

**Last updated:** 2026-06-19 | Verified against actual codebase
