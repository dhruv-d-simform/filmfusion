# Data Model: Browse Movie/Series

## Entities

### Movie/Series

-   id: string
-   title: string
-   description: string
-   image: string (poster or main image URL)
-   releaseDate: string
-   genres: string[]
-   creators: string[]
-   writers: string[]
-   languages: string[]
-   imdbRating: number | null
-   type: 'movie' | 'series'
-   runtime: number | null (for movies)
-   seasons: number | null (for series)

### CastMember

-   id: string
-   name: string
-   image: string (profile image URL)
-   character: string

### Episode

-   id: string
-   seasonNumber: number
-   episodeNumber: number
-   title: string
-   summary: string
-   imdbRating: number | null

## Relationships

-   Movie/Series has many CastMembers
-   Series has many Episodes (grouped by seasonNumber)

## Validation Rules

-   All required fields (id, title, type) must be present
-   imdbRating, runtime, and other optional fields may be null if not available
-   For series, seasons > 0 and episodes must have valid season/episode numbers

## State Transitions

-   N/A (entities are read-only, fetched from API)
