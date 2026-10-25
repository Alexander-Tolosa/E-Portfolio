# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — dev server (http://localhost:3000)
- `npm run build` / `npm run start` — production build / serve
- `npm run lint` — ESLint (flat config, `eslint.config.mjs`)
- `npx tsc --noEmit` — type check (no test suite exists)

Next.js 16 / React 19 / Tailwind v4 (via `@tailwindcss/postcss`). Per AGENTS.md, this Next.js differs from older versions: read the relevant guide in `node_modules/next/dist/docs/` before writing framework-level code. Path alias: `@/*` → `src/*`.

## Architecture

Single-person portfolio, App Router under `src/app`.

- **All site copy lives in `src/data/content.ts`** (typed `content` object: personal info, projects, certifications, affiliations, hackathons, etc.). Pages and sections read from it; add new entries there rather than hardcoding in JSX. Images go in `public/assets/...`.
- **Layout shell** (`src/app/layout.tsx`): `ThemeProvider` → `SoundProvider` → `HoverSoundProvider`, wrapping a fixed desktop `Sidebar` (≥lg) and a `MobileHeader` slide-over. Both consume the same exported `groups` nav array from `components/layout/Sidebar.tsx`, so **a new page needs one entry there** to appear on desktop and mobile. Nav items with `/#id` hrefs are highlighted by `useScrollSpy` using `spyIds` (keep in sync with section ids on the home page).
- **Home page** (`src/app/page.tsx`, client component) composes `src/sections/*`. Sub-pages (`affiliations`, `hackathons`, `experience`, `projects`, `projects/[id]`) are standalone routes using the same narrow centered column (`max-w-[640–680px]`, `pt-[84px] lg:pt-10` to clear the mobile header) and `MinimalFooter`.
- **Theming**: dark is the default everywhere. State is in `context/ThemeContext.tsx` (`theme-mode`: system | light | dark in localStorage; `system` follows the OS). A blocking inline script in `layout.tsx` sets the `dark`/`light` class on `<html>` before paint and must mirror the context's resolution logic. Theme switches use the View Transitions API radial reveal. Colors are CSS variables in `globals.css` (`--brand-*`, `--sidebar-accent`), exposed to Tailwind as `brand-*` utilities.
- **API routes** (`src/app/api/{contact,newsletter,github}`): contact/newsletter send via Resend and need `RESEND_API_KEY` (and optional `CONTACT_NOTIFICATION_EMAIL`) in `.env.local`; see `.env.example`. `github` backs the contribution heatmap in `sections/GithubStreak.tsx`.
- **Photo lightbox**: the hackathons page uses a client-side viewer inside `components/ui/HackathonShowcase.tsx` (Esc/arrow keys, body scroll lock); reuse that pattern rather than adding a library. Photos are large PNGs under `public/assets/hackathons/` served through `next/image`.
- UI uses `framer-motion` for animation and `lucide-react` for icons.
