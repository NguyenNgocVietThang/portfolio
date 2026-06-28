# Tech Spec — THANGNNV Portfolio

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.0.0 | UI framework |
| react-dom | ^19.0.0 | React DOM renderer |
| vite | ^6.0.0 | Build tool |
| @vitejs/plugin-react | ^4.4.0 | Vite React plugin |
| typescript | ^5.7.0 | Type checking |
| tailwindcss | ^4.0.0 | Utility CSS |
| @tailwindcss/vite | ^4.0.0 | Tailwind Vite integration |
| gsap | ^3.12.0 | Animation engine (ScrollTrigger, SplitText plugins — all bundled, no extra installs) |
| lenis | ^1.1.0 | Smooth scroll with velocity |
| lucide-react | ^0.460.0 | Icons (envelope, phone, map-pin, github, linkedin, arrow, play, checkmark, paper-plane, menu, x, chevron-left, chevron-right, spinner) |

Fonts: Be Vietnam Pro, JetBrains Mono, Instrument Serif via Google Fonts CDN (loaded in `index.html` with `font-display: swap`).

---

## Component Inventory

### Layout

| Component | Source | Reuse |
|-----------|--------|-------|
| Navigation | Custom | Shared — fixed top nav, scroll-aware background transition, hamburger overlay on mobile. Active link via IntersectionObserver. Lenis `scrollTo()` for anchor links. |
| Footer | Custom | Shared — 3-column layout, static content. |
| PrismaticGlow | Custom | Shared — fixed container with 3 mouse-tracking gradient orbs. RAF lerp loop, touch fallback with Lissajous auto-animation. Mounts at app root. |
| GridOverlay | Custom | Shared — fixed grid pattern, opacity driven by Lenis scroll velocity. Desktop only. |
| CustomCursor | Custom | Shared — desktop only, lerp-smoothed follower. State machine: default / link-hover / project-hover. Toggle visibility on mobile. |
| LoadingScreen | Custom | Once — solid background + rotating CSS circle. Orchestrates entrance timeline. |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| HeroSection | Custom | Orchestrated entrance timeline (GSAP) triggered after loading screen dismisses. Left text + right portrait circle with conic-gradient border and float animation. |
| AboutSection | Custom | Two-column: bio text + 4-stat grid + 4 competency cards. Stat count-up animation. |
| ResumeSection | Custom | Filterable timeline. Filter tabs + GSAP-driven layout transitions (fade/scale/stagger). Vertical timeline with progressive line draw. |
| SkillsSection | Custom | Two-column skill lists with progress bars. Bars animate from 0 on scroll. Glow dot follows leading edge during fill. Additional tool tags row. |
| PortfolioSection | Custom | Featured project card with CSS architecture diagram + testimonial slider. Slider: horizontal slide/fade transitions, autoplay (6s), touch swipe, dot indicators. |
| ContactSection | Custom | Left: liquid glass contact cards + social icons. Right: form with validation states (idle / loading / success / error). |

### Reusable Components

| Component | Source | Used by |
|-----------|--------|---------|
| SectionHeading | Custom | All 5 content sections. Renders: section number (mono), title (clip-path reveal), subtitle (serif italic). Accepts number, title, subtitle props. |
| ClipPathReveal | Custom (hook or component wrapper) | All section titles + hero name. Wraps text in word spans, animates clip-path via GSAP ScrollTrigger. |
| EntranceAnimation | Custom (hook or component wrapper) | All section content groups. Applies 3D perspective scroll entrance (rotationX, y, z) with GSAP ScrollTrigger. |
| LiquidGlassCard | Custom | Contact info cards. Applies liquid-glass CSS with ::before edge glow and ::after specular highlight. |
| GradientOrb | Custom | All sections (parallax bg). Render-only — positioned absolute, large blurred radial gradient, translateY driven by scroll position. |

### Hooks

| Hook | Purpose |
|------|---------|
| useMousePosition | Returns lerp-smoothed mouse coords for PrismaticGlow and CustomCursor. Shared RAF loop to avoid multiple tickers. |
| useScrollVelocity | Reads Lenis velocity for GridOverlay opacity. Subscribes to Lenis scroll events. |
| useInView | Wrapper around GSAP ScrollTrigger for triggering one-shot entrance animations. |

---

## Animation Implementation

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Prismatic glow mouse tracking | Custom (RAF) | Single RAF loop updates 3 orb transforms via lerp. Mouse target stored in ref. Touch: precomputed Lissajous path. | 🔒 Medium |
| 3D perspective scroll entrance | GSAP + ScrollTrigger | `gsap.fromTo` with rotationX, y, z on each section's content container. Stagger children. One-shot trigger at "top 85%". | Medium |
| Clip-path text reveal | GSAP + ScrollTrigger | Split text into word spans. Animate `clipPath: inset()` from bottom to full. Stagger 0.08s per word. | Medium |
| Hero entrance sequence | GSAP timeline | Master timeline: caption fade → name clip-path (stagger words) → rule scaleX → title fade → bio fade → CTAs fade → portrait scale/rotate. Absolute offsets for choreography. | 🔒 High |
| Character shuffle text | Custom | On mouseenter: per-character setInterval cycling random charset symbols, resolving after staggered delay. Clear intervals on mouseleave. | Medium |
| Scroll-velocity grid overlay | Lenis + CSS | Lenis velocity → opacity calculation (clamp 0.02–0.12). Applied directly to element style. Disabled on mobile. | Low |
| Custom cursor | Custom (RAF) | RAF loop with lerp 0.15. CSS classes for states (default/link/project). Hide on mobile via media query. | Medium |
| Portrait circle effects | CSS | Conic-gradient border via ::before with `animation: rotate 20s linear infinite`. Float: `translateY` keyframes 6s. Pulse: `scale` keyframes 4s. All pure CSS. | Low |
| Stat count-up | GSAP + ScrollTrigger | `gsap.to` on proxy object with `snap` to final value. Update DOM text in onUpdate. Triggered at "top 75%". | Low |
| Resume filter transition | GSAP timeline | Outgoing: opacity+scale fade out → `display:none`. Incoming: `display:flex` → opacity+scale fade in with stagger. Tab click triggers timeline. | Medium |
| Timeline progressive draw | GSAP + ScrollTrigger | Animate timeline line `scaleY: 0→1` (transform-origin: top). Each node staggers 0.2s. Date dot pulse on enter. | Medium |
| Skill progress bar fill | GSAP + ScrollTrigger | Animate `width: 0%→target%` over 1.2s. Leading-edge glow dot translates along bar width, fading at completion. Trigger per skill item. | Medium |
| Testimonial slider transition | GSAP | Outgoing: `x:0→-100%`, `opacity:1→0`. Incoming: `x:100%→0`, `opacity:0→1`. 0.6s, `power2.inOut`. | Medium |
| Project architecture diagram | CSS + GSAP | Nodes: staggered scale-in (0→1). Connection lines: `scaleX/scaleY: 0→1` from center node. Pulse opacity keyframes on all elements. | Medium |
| Liquid glass shimmer | CSS | `::before` opacity oscillates 0.2↔0.35 over 3s infinite via keyframes. Pure CSS. | Low |
| Submit button shimmer | CSS | `::after` pseudo-element with gradient, `translateX` sweep animation on hover. Pure CSS. | Low |
| Loading screen | GSAP | CSS rotating circle. On fonts-loaded: fade out container (opacity→0, 0.6s), then unmount. | Low |
| Nav background transition | CSS + JS | CSS transition on background/backdrop-filter. JS toggles class after 100px scroll. | Low |
| Smooth scrolling | Lenis | Global Lenis instance. `lerp: 0.1`, `duration: 1.2`. RAF synced with GSAP ticker. ScrollTrigger.refresh on route changes (not needed for single page). | Low |
| Section parallax orbs | GSAP ScrollTrigger | GradientOrb translateY set to `scrollY * 0.3/0.4` via ScrollTrigger scrub. | Low |
| CSS Houdini text distortion | CSS Paint API | Register paint worklet for wavy underline. Feature-detect: if `CSS.paintWorklet` unsupported, fallback to static `text-decoration-color`. | 🔒 Low |

---

## State & Logic

### Resume filter state
Active filter category ("all" | "education" | "project" | "certificate") stored in React state. On change: compute visible entries, trigger GSAP layout transition timeline. Timeline must complete hide-phase before showing new items to avoid layout jump.

### Testimonial slider state
Current slide index (number). Autoplay timer (setInterval 6s) paused on hover via mouseenter/mouseleave. Touch swipe: track touchstart/touchend deltaX, threshold 50px to advance/retreat. Navigation arrows and dot indicators share the same index state.

### Contact form state
Form state machine: "idle" → "loading" → "success"/"error". Validation: required fields (name, email, message) + email regex. Errors displayed per-field. Submit handler simulates API call (setTimeout 1.5s), then transitions to success with visual state change (green bg, checkmark).

### Lenis ↔ GSAP integration
Single global Lenis instance created at app root. `lenis.on('scroll', ScrollTrigger.update)` to keep GSAP in sync. `gsap.ticker.add((time) => lenis.raf(time * 1000))` for shared RAF loop. Destroy on unmount.

### Mouse position sharing
Single `useMousePosition` hook with one RAF lerp loop. Emits smoothed coordinates to PrismaticGlow and CustomCursor subscribers. Avoids duplicate RAF loops and conflicting lerp calculations.

---

## Other Key Decisions

**No shadcn/ui** — This is a fully custom dark-themed portfolio with no standard UI patterns (no forms table, no dialogs, no dropdowns). All components are bespoke. Using shadcn would add unnecessary abstraction with inverted styling effort.

**No React Router** — Single-page portfolio with section anchors only. Lenis `scrollTo('#section-id')` handles navigation. No route changes, no code splitting needed.

**GSAP SplitText plugin** — Use GSAP's bundled SplitText (free since 2025) for word/character splitting in clip-path reveals and character shuffle. No need for manual DOM splitting logic.

**CSS Houdini as progressive enhancement** — The text distortion paint worklet is non-critical. If `CSS.paintWorklet` is undefined, silently fall back to standard text decoration. No polyfill needed.

**Testimonial video** — Use HTML5 `<video>` element with custom controls overlay (play button, thin progress bar, mute toggle). No external video library — the design specifies minimal controls. Poster frame generated as static image asset.

**Portrait image** — The user-provided `IMG_2037.jpg` is used directly in the Hero portrait circle. No generation needed for this asset.
