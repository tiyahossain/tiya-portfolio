# Tiya Hossain — Portfolio

A **New Brutalism** personal portfolio for **Tiya Hossain**, Full-Stack Web Developer
(React & Node.js). Built from scratch on a single-page scrolling layout with:

- **React 19 + TypeScript** (TSX)
- **Tailwind CSS v4** (class-based dark mode, custom brutalist design tokens)
- **Framer Motion** (scroll-triggered reveals, marquees, sticker float animations)
- **Three.js** (procedural 3D mascot in the hero)
- **Lucide React** (icons) + inline brand marks for GitHub / LinkedIn / X
- Chunky 2px borders, hard offset shadows, flat loud colours, marker highlights, mono labels

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + production build (outputs to /dist)
npm run preview  # preview the production build
```

## Project structure

```
src/
├── assets/            # profile photo slot + project thumbnails (SVG placeholders)
├── components/
│   ├── Navbar.tsx     # sticky nav, active-link pill, animated burger menu
│   ├── Hero.tsx       # headline, avatar slot, CTAs, tech marquee
│   ├── About.tsx      # narrative + code card + pillars
│   ├── Skills.tsx     # Frontend / Backend / Tools cards + SkillBar
│   ├── SkillBar.tsx   # animated proficiency bar with count-up
│   ├── Projects.tsx   # 3 project cards + repository CTA
│   ├── ProjectCard.tsx# thumbnail, description, Live Demo & GitHub links
│   ├── Education.tsx  # degrees & certifications
│   ├── Timeline.tsx   # self-drawing vertical timeline
│   ├── ContactForm.tsx# validated form with error/success states
│   ├── ThemeToggle.tsx# animated dark/light switch (Tailwind dark: classes)
│   ├── Footer.tsx     # social links, nav, copyright
│   └── …              # small helpers (Reveal, Section, motion, SocialLinks…)
└── pages/
    └── Home.tsx       # single-page layout aggregating every section
```

### 3D mascot

`src/components/Mascot.tsx` is the interactive hero avatar — “Madame Fluffington 3D”,
a procedural Persian cat in a suit built entirely from Three.js primitives. It is
restyled to match the brutalism system (cream/black, hard shadows, square slabs).

- **Gaze tracking** — the head and iris follow your cursor
- **Drag to orbit** — rotate the 3D view; click to pet (purr + floating hearts)
- **Moods** — Pet/Purr, Boss Mode (quote machine), Tilt Glasses, Cat Nap, Wink
- **Web Audio** — meow, purr, glasses chime and tap sounds (default on, toggle in the header)
- **Customizer** — 4 suit wardrobes, glasses toggle + tilt, floral ear pins, sparkles, reset camera
- **Dark/light aware** — the UI flips with the theme; the butter pedestal stays loud in both
- Petting / mood buttons change the on-canvas quote (see the `BOSS_QUOTES` map)

The mascot swaps the old polaroid `<img>` placeholder — there is no `profileImage` import
in `Hero.tsx` anymore. If you'd rather use a real photo, render one inside the hero grid
alongside or instead of `<Mascot />`.

## Making it yours

| What | Where |
| --- | --- |
| Real photo (optional) | The hero avatar slot is the 3D mascot now; render a photo there instead of `<Mascot />` in `src/components/Hero.tsx` |
| Mascot quotes / suits | `BOSS_QUOTES` and `SUIT_THEMES_3D` in `src/components/Mascot.tsx` |
| Project screenshots | Swap the SVGs in `src/assets/`; edit images in `src/components/Projects.tsx` |
| Project copy / links | `PROJECTS` array in `src/components/Projects.tsx` |
| Social URLs | `SOCIALS` in `src/components/SocialLinks.tsx` |
| Contact details / email | `CONTACT_DETAILS` in `src/components/ContactForm.tsx`, footer, hero |
| Skills & levels | `CATEGORIES` in `src/components/Skills.tsx` |
| Degrees & certifications | `ENTRIES` in `src/components/Education.tsx` |
| Education / cert links | `credentialUrl` on any timeline entry |
| Accent palette | `--color-butter / sky / jam / leaf / tang / grape` in `src/index.css` |
| Fonts | Google Fonts link in `index.html` (Archivo Black, Space Grotesk, Space Mono) |

### Brutalist design system

`src/index.css` defines the whole system:

- **Tokens** — `ink` & `paper` flip with the theme (light: black/cream, dark: cream/black);
  `card` is the surface; accents are loud and constant. `ink-solid` is always dark, for
  text sitting on accent blocks.
- **Hard shadows** — `shadow-brutal`, `-sm`, `-lg` (solid, zero blur offset shadows).
- **Surfaces** — `btn-brutal` (press-down slab), `card-brutal` (border + hard shadow),
  `sticker`, `chip-brutal`, `.social-tile`.
- **Highlights** — `mark-butter / sky / jam / leaf` marker spans for headline emphasis.
- **Patterns** — `bg-grid(-soft)`, `bg-checker(-paper)`, `bg-stripes`, `mask-fade-edges`.
- **Motion** — `marquee`, `caret`, `wiggle`, `bounce-y` keyframes.

### Connecting the contact form

The form already prevents default submission and simulates a send. To wire a real
service (Formspree, EmailJS, Resend, your own API), find the commented placeholder
in `handleSubmit` inside `src/components/ContactForm.tsx` and replace the simulated
delay with your fetch call. Validation, loading, success and error states are handled.

### Designer-to-developed details

- Dark/light theme persists via `localStorage` and respects the system preference —
  with an anti-flash script in `index.html`.
- All social/credential links open in a new tab with `target="_blank" rel="noopener noreferrer"`.
- Scroll animations respect `prefers-reduced-motion`.
- Keyboard-friendly: skip link, focus rings, ARIA labels, `aria-current` on nav.