# AGENT.md — KettleBud

> This file is the single source of truth for any AI agent working on this codebase.
> Read it fully before generating, editing, or reviewing any code.

---

## 1. Project Overview

**KettleBud** is a Duolingo-style fitness app for Spanish-speaking gym beginners.

- **Capa 1 — El Camino** (0–6 months): guided programs with structured routines.
- **Capa 2 — El Autónomo** (6+ months): autonomous training with more freedom.

Three user goals: `gain_muscle`, `lose_fat`, `feel_better`.

---

## 2. Tech Stack

| Layer    | Technology                                           |
| -------- | ---------------------------------------------------- |
| Mobile   | React Native + Expo (Expo Router for navigation)     |
| Language | **JavaScript only — NO TypeScript in the app**       |
| Backend  | Supabase (Auth, Postgres, Edge Functions in Deno/TS) |
| API      | Axios via `apiClient` at `src/services/apiClient.js` |
| i18n     | i18next + react-i18next (Spanish only for now)       |
| Fonts    | Baloo 2 (display) + Nunito (body) via expo-font      |

---

## 3. Project Structure

```
app/
  (tabs)/              → Tab-based screens (Inicio, Progreso, Explorar, Perfil)
  auth/                → Auth screens (magic link, Google, Apple)
  onboarding/          → Onboarding flow screens
  _layout.jsx          → Root layout
  index.jsx            → Entry redirect
  init.jsx             → App initialization

src/
  features/
    home/
      components/      → SessionPath, ActiveSession, SessionNode, PathConnector, EmptyHistory
      utils/
    onboarding/
      components/      → OnboardingHeader, OnboardingProgressBar
      hooks/           → useOnboardingConfig
      utils/
    [feature]/
      components/
      hooks/
      utils/
  hooks/               → Shared hooks (useAppFonts, useProtectedRoute)
  services/
    apiClient.js       → Axios instance with auth interceptor
    supabase/
      supabase.js      → Supabase client init
      magicLinkAuth.js → Magic link helpers
```

**Pattern:** features are organized by domain (`home/`, `onboarding/`, etc.), each with its own `components/`, `hooks/`, and `utils/`. Shared code lives in `src/hooks/` and `src/services/`.

---

## 4. Code Conventions

### Style Rules

- **No TypeScript** — all files are `.js` or `.jsx`
- **Single quotes**, no semicolons (enforced by ESLint)
- **Functional components only** with hooks
- **camelCase** for variables, props, DB columns, and file names (except components: PascalCase)
- **Path aliases:** `@/` maps to project root (e.g. `@/src/services/apiClient`)
- **No default exports** for hooks/utils; **default export** for components
- **JSDoc comments** on component props for documentation

### Component Rules

- Components are **pure and stateless** — receive data via props, no internal fetching
- Data fetching happens in **screens** or **custom hooks**, never inside components
- Use React Native's built-in **Animated API** for animations — no external animation libraries
- Use **react-native-svg** if SVG is needed (e.g. PathConnector curves)
- Keep components in their feature folder, not in a global components/ directory

### Naming

- Hooks: `useXxx.jsx` (e.g. `useWeeklyStatus.jsx`)
- Components: `XxxYyy.jsx` (PascalCase, e.g. `SessionPath.jsx`)
- Utils/constants: `camelCase.js` (e.g. `constants.js`)
- Edge functions: `kebab-case` (e.g. `weekly-status`, `save-plan`)

---

## 5. Design System

### Colors (from `theme.js`)

```javascript
colors.mainBackground = '#18181B' // App background (dark)
colors.main = '#F5A623' // Amber — primary/CTAs/active states
colors.mainLight = '#F5A62333' // Amber transparent
colors.dark = '#1A1A1A' // Deep dark
colors.gray = '#373635' // Gray — missed states, disabled
colors.white = '#FFFFFF' // Primary text on dark
colors.whiteLight = '#FFFFFFB3' // Muted text (70% opacity)
colors.error = '#EE2737' // Error states
colors.border = '#DADADA' // Borders
colors.success = '#45D192' //Success states

// Additional (not in theme.js yet — used in specific features):
mint = '#34D399' // Success/completed states
charcoal = '#2D3436' // Text on light, mascot color
gunmetal = '#374151' // Secondary gray
```

### Typography

- **Display font:** Baloo 2 (`baloo2`) — headings, labels, "HOY"
- **Body font:** Nunito (`nunito`) — descriptions, secondary text
- Weights available: see `theme.js` fonts object
- Import fonts via `useAppFonts` hook

### Dark Theme

The entire app uses a dark theme. Background is `#18181B`, text is white/whiteLight. Amber is the accent color for CTAs and active states. Mint green for success/completed. Gray for disabled/missed.

---

## 6. API Layer

### Client Setup (`src/services/apiClient.js`)

- Axios instance with `baseURL: SUPABASE_URL/functions/v1`
- Request interceptor injects `Authorization: Bearer <access_token>` from Supabase session
- Concurrent request deduplication on `getSession()` to prevent refresh token race conditions
- Env vars: `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`

### Edge Functions (Supabase/Deno)

| Endpoint        | Method | Auth | Description                                            |
| --------------- | ------ | ---- | ------------------------------------------------------ |
| `config`        | GET    | No   | Returns hardcoded catalogs (goals, days, injuries...)  |
| `preview-plan`  | POST   | No   | Stateless plan generator for onboarding preview        |
| `save-plan`     | POST   | Yes  | Persists plan: program → sprints → routines → sessions |
| `weekly-status` | POST   | Yes  | Returns current week timeline for Home screen          |

---

## 7. Brand

- **App name:** KettleBud
- **Mascot:** Kettlebi — gunmetal gray kettlebell character with yellow/amber bandana. Mature Duolingo-style (not childish). Appears next to active session node.
- **Tone:** Friendly, motivating, casual. All UI text in Spanish.

---

## 11. What NOT to Do

- ❌ Do NOT use TypeScript in the app
- ❌ Do NOT use external animation libraries (no Reanimated, no Moti)
- ❌ Do NOT fetch data inside presentational components
- ❌ Do NOT use localStorage/sessionStorage in any context
- ❌ Do NOT hardcode Spanish strings — use i18n keys when translations exist
- ❌ Do NOT use semicolons or double quotes in JS code
- ❌ Do NOT create global/shared component folders — keep components in their feature
- ❌ Do NOT assume calendar weeks — weeks start from `startedAt`
- ❌ Do NOT use cron jobs or scheduled processes for state calculation
- ❌ Do NOT create sessions for sprint 2 at plan creation time
