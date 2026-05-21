# AGENTS.md

## Project Overview

This repository contains a Vite + React + TypeScript single-page prototype for a Chinese patent exchange and service-matching homepage. The product goal is to help users publish patent-related needs, browse demand posts, select patent services, and move toward consultation or transaction matching.

The app is currently frontend-only. There is no backend, database, authentication, payment, or real customer-service integration. All post data is stored in React component state during the browser session.

## Tech Stack

- Vite
- React
- TypeScript
- Plain CSS
- `lucide-react` for UI icons

## Commands

Install dependencies:

```bash
npm install
```

Start local development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview a production build:

```bash
npm run preview
```

## Important Files

- `src/App.tsx`: Main single-page application, data models, initial mock posts, service definitions, form state, and interaction logic.
- `src/App.css`: Layout, responsive styling, cards, forms, service selection, and visual tone.
- `src/main.tsx`: React entry point.
- `src/index.css`: Global CSS reset and base typography.
- `public/patent-exchange.svg`: Hero visual asset.
- `README.md`: Short user-facing project summary and run instructions.

## Implementation Guidelines

- Keep the site as a single-page prototype unless explicitly asked to add routing.
- Preserve the professional, trustworthy visual tone: light background, restrained color palette, dense but readable information, and clear service-platform structure.
- Use Chinese UI copy by default.
- Prefer editing the existing mock data and component state in `src/App.tsx` for prototype changes.
- Keep service cards and demand posts accessible as semantic buttons/articles where appropriate.
- Use `lucide-react` icons for new UI actions when an icon is helpful.
- Avoid adding backend APIs, persistence, login, payments, or chat unless the task explicitly requests them.
- Do not introduce a UI framework unless there is a clear project need; plain CSS is the current pattern.

## Data Shape

The current component-level types are:

- `Post`: title, technical field, service type, budget, description, status, and created time.
- `Service`: name, summary, audience, price, tags, and icon.

If a future backend is added, keep these concepts stable and map API data into these UI-friendly shapes rather than spreading wire-format fields throughout the component tree.

## Styling Notes

- Cards use small radii and restrained borders.
- The layout must stay responsive across desktop and mobile.
- Buttons and form controls should have stable dimensions to avoid layout shift.
- Avoid decorative gradients, oversized marketing sections, and purely atmospheric visuals. The page should feel like a usable service marketplace, not a landing-page mockup.

## Testing Checklist

Before handing off changes, verify:

- `npm run build` passes when dependencies are installed.
- The publish form rejects empty required fields.
- Submitting a valid demand adds a new post to the demand hall.
- Selecting service cards updates the selected service panel.
- Navigation buttons scroll to the expected sections.
- Desktop and mobile layouts do not overlap or overflow.

## Known Environment Note

During initial creation in this workspace, the local shell did not have a working `npm` command available, so dependency installation and Vite build verification may need to be run in an environment with Node.js and npm installed.
