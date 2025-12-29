# Research: Browse Movie/Series

## Decision: Public Movie APIs for Data (No API Key Required)

-   **Rationale**: The app must use only free public APIs that do not require an API key. TVmaze is fully free, requires no API key, and provides rich data for both movies and series (titles, images, cast, ratings, episodes, etc.).
-   **Alternatives considered**: TMDB and OMDb (require API keys, not allowed per requirements), Trakt.tv (requires auth), custom scrapers (not allowed).

## Decision: Modal Route for Details

-   **Rationale**: React Router supports modal routes, allowing the details page to open as a modal over the home page. This matches the user experience requirement.
-   **Alternatives considered**: Separate details page (breaks context), custom modal state (harder to deep-link).

## Decision: UI Libraries

-   **Rationale**: Tailwind CSS and shadcn/ui provide accessible, customizable components. TanStack Query is the standard for React data fetching/caching. All are actively maintained and open source.
-   **Alternatives considered**: MUI, Chakra UI (heavier, less Tailwind synergy), SWR (less feature-rich than TanStack Query).

## Decision: Testing Stack

-   **Rationale**: Vitest and React Testing Library are standard for unit/integration tests in Vite/React/TS projects. Playwright is best for e2e browser testing.
-   **Alternatives considered**: Jest (less Vite-native), Cypress (good, but Playwright is more modern for e2e).

## Decision: Grid Layout for Results

-   **Rationale**: Grid layout is best for visual browsing of media. Cards with images, title, year, genre, runtime/seasons, and IMDB rating provide at-a-glance info.
-   **Alternatives considered**: List view (less visual), table (not suitable for media browsing).

## Decision: Tabs for Series Seasons

-   **Rationale**: Tabs are a familiar UI for switching between seasons. Each tab lists episodes for that season, matching user expectations.
-   **Alternatives considered**: Accordion (less compact), dropdown (less discoverable).

## Decision: No Persistent Storage

-   **Rationale**: All data is fetched live from APIs; no need for local storage or backend.
-   **Alternatives considered**: IndexedDB/localStorage (not needed for this use case).

## All NEEDS CLARIFICATION resolved: No open unknowns remain for this phase.
