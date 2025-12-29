# Tasks: Browse Movie/Series

## Phase 1: Setup

-   [ ] T001 Initialize Vite + React + TypeScript project in repo root
-   [ ] T002 Install dependencies: tailwindcss, shadcn/ui, @tanstack/react-query, react-router-dom, vitest, @testing-library/react, playwright
-   [ ] T003 Configure Tailwind CSS and shadcn/ui in tailwind.config.js and postcss.config.js
-   [ ] T004 Set up base project structure: src/components, src/pages, src/api, src/hooks, src/types, src/utils, tests/unit, tests/integration, tests/e2e

## Phase 2: Foundational

-   [ ] T005 Create TypeScript types for Movie, Series, Episode, CastMember in src/types/media.ts
-   [ ] T006 Implement API client for TVmaze in src/api/tvmaze.ts
-   [ ] T007 Create utility functions for sorting and formatting in src/utils/media.ts
-   [ ] T008 Set up TanStack Query provider in src/main.tsx
-   [ ] T009 Set up React Router with modal route support in src/main.tsx

## Phase 3: User Story 1 - Search and Browse (P1)

-   [ ] T010 [US1] Implement search bar component in src/components/SearchBar.tsx
-   [ ] T011 [US1] Implement search logic and hook in src/hooks/useSearch.ts
-   [ ] T012 [US1] Implement results grid component in src/components/ResultsGrid.tsx
-   [ ] T013 [US1] Integrate search and results grid in HomePage (src/pages/HomePage.tsx)
-   [ ] T014 [US1] Show empty state placeholder in HomePage (src/pages/HomePage.tsx)
-   [ ] T015 [US1] Add loading and error states to search/results grid
-   [ ] T016 [US1] [P] Unit test search bar and results grid in tests/unit/

## Phase 4: User Story 2 - View Details (P2)

-   [ ] T017 [US2] Implement details modal component in src/components/DetailsModal.tsx
-   [ ] T018 [US2] Fetch and display movie/series details in modal (src/hooks/useDetails.ts, src/components/DetailsModal.tsx)
-   [ ] T019 [US2] Show cast, images, description, release date, genres, creators, writers, languages, IMDB rating, trailers in modal
-   [ ] T020 [US2] Integrate modal route with HomePage (src/pages/HomePage.tsx, src/pages/DetailsModal.tsx)
-   [ ] T021 [US2] [P] Unit test details modal in tests/unit/

## Phase 5: User Story 3 - Explore Episodes (P3)

-   [ ] T022 [US3] Implement season tabs in details modal (src/components/SeasonTabs.tsx)
-   [ ] T023 [US3] Fetch and display episodes per season in details modal (src/hooks/useEpisodes.ts, src/components/SeasonTabs.tsx)
-   [ ] T024 [US3] Show episode summaries and IMDB ratings in season tabs
-   [ ] T025 [US3] [P] Unit test season tabs and episode list in tests/unit/

## Final Phase: Polish & Cross-Cutting

-   [ ] T026 Add accessibility features (keyboard navigation, ARIA) across all components
-   [ ] T027 Add responsive styles for mobile/desktop in Tailwind config and components
-   [ ] T028 Add error boundaries and fallback UI in src/components/
-   [ ] T029 Add integration tests for search, details modal, and episodes in tests/integration/
-   [ ] T030 Add e2e tests for main flows in tests/e2e/

## Dependencies

-   User Story 1 (Search and Browse) must be completed before User Story 2 (View Details)
-   User Story 2 must be completed before User Story 3 (Explore Episodes)
-   Setup and Foundational phases must be completed before any user story phases

## Parallel Execution Examples

-   T016, T021, T025 (unit tests for each story) can be run in parallel with their respective implementation tasks
-   T026, T027, T028 (polish tasks) can be run in parallel after main features are implemented

## Implementation Strategy

-   MVP: Complete all tasks for User Story 1 (T010–T016) for a working search and browse experience
-   Incrementally deliver User Story 2 and 3, then polish

## Format Validation

-   All tasks follow strict checklist format: `- [ ] T### [P?] [US?] Description with file path`
-   Each user story is independently testable
-   Task IDs are sequential and unique
-   Parallelizable tasks are marked with [P]
-   All file paths are explicit
