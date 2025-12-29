# FilmFusion

FilmFusion is a modern, dark-mode web application for browsing and exploring TV shows using the TVmaze API. It provides a fast, visually appealing interface to search for any TV show, view detailed information, and explore episodes and cast members in an intuitive modal layout.

## Features

- **Search TV Shows:** Quickly find any TV show by name with instant results.
- **Show Details Modal:** Click on a show to view a beautiful modal with:
    - Overview, genres, release year, rating, creators, writers, and languages
    - Responsive tabbed layout for Overview, Cast, and Episodes
    - "Show More/Less" toggle for long descriptions
- **Episodes & Seasons:**
    - Browse all seasons and episodes for each show
    - Horizontally scrollable season tabs, vertically scrollable episode list
    - Episode summaries and ratings
- **Cast Grid:**
    - View cast members in a responsive grid
    - Cast images, names, and character names
- **Dark Mode:**
    - Custom dark theme for comfortable viewing
- **Responsive Design:**
    - Works great on desktop and mobile

## Tech Stack

- **React** (TypeScript, Vite)
- **Tailwind CSS** (custom dark theme)
- **shadcn/ui** (UI components)
- **TanStack Query** (data fetching)
- **TVmaze API** (no API key required)

## Getting Started

1. **Install dependencies:**
    ```bash
    npm install
    ```
2. **Start the development server:**
    ```bash
    npm run dev
    ```
3. **Open in browser:**
   Visit `http://localhost:5173` (or the port shown in your terminal)

## Folder Structure

- `src/components/` — UI components (DetailsModal, SearchBar, etc.)
- `src/pages/` — Main pages (HomePage)
- `src/types/` — TypeScript types
- `src/index.css` — Global styles and theme

## Customization

- **Theme:** Easily adjust colors in `src/index.css` for your own dark/light theme.
- **UI:** Modify components in `src/components/` for layout or feature changes.

## Credits

- Data provided by [TVmaze API](https://www.tvmaze.com/api)
- UI inspired by modern streaming platforms
