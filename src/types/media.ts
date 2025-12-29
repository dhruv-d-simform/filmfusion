// Types for Movie, Series, Episode, CastMember

export type MediaType = 'movie' | 'series';

export interface CastMember {
    id: string;
    name: string;
    image: string;
    character: string;
}

export interface Episode {
    id: string;
    seasonNumber: number;
    episodeNumber: number;
    title: string;
    summary: string;
    imdbRating: number | null;
}

export interface MovieOrSeries {
    id: string;
    title: string;
    description: string;
    image: string;
    releaseDate: string;
    genres: string[];
    creators: string[];
    writers: string[];
    languages: string[];
    imdbRating: number | null;
    type: MediaType;
    runtime?: number | null; // for movies
    seasons?: number | null; // for series
    cast?: CastMember[];
    episodes?: Episode[];
}
