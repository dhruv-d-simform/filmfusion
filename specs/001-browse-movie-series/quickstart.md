# Quickstart: FilmFusion (Browse Movie/Series)

## Prerequisites

-   Node.js (v18+ recommended)
-   pnpm (preferred) or npm/yarn

## Setup

```bash
pnpm install
# or
npm install
```

## Start Development Server

```bash
pnpm dev
# or
npm run dev
```

## Project Structure

-   `src/` — Main source code
    -   `components/` — UI components (cards, modals, tabs)
    -   `pages/` — HomePage, DetailsModal
    -   `api/` — API clients for public movie APIs (e.g., TVmaze)
    -   `hooks/` — Custom React hooks
    -   `types/` — TypeScript types
    -   `utils/` — Utility functions
-   `tests/` — Unit, integration, and e2e tests

## Main Libraries

-   Vite, React, TypeScript
-   Tailwind CSS, shadcn/ui
-   TanStack Query, React Router
-   Vitest, React Testing Library, Playwright

## How to Search

-   Use the search bar on the home page to find movies/series by title, cast, genre, etc.
-   Results appear in a grid of cards. Click a card to open the details modal.

## How to View Details

-   The details modal shows all info for the selected item.
-   For series, use the tabs to switch between seasons and see episode lists.

## API Keys

-   No API key is required. The app uses only free public APIs (e.g., TVmaze) that do not require authentication.

## Accessibility & Performance

-   All UI must be accessible (keyboard, screen reader, color contrast)
-   Search and modal open must be fast (<300ms perceived)

## Testing

-   Run all tests:
    ```bash
    pnpm test
    # or
    npm test
    ```
