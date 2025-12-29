/* eslint-disable @typescript-eslint/no-explicit-any */
// TVmaze API client for FilmFusion
import type { MovieOrSeries } from '../types/media';

const BASE_URL = 'https://api.tvmaze.com';

export async function searchMedia(query: string): Promise<MovieOrSeries[]> {
    const res = await fetch(
        `${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`
    );
    const data = await res.json();
    return data.map((item: any) => tvmazeToMedia(item.show));
}

export async function getMediaDetails(id: string): Promise<MovieOrSeries> {
    const res = await fetch(
        `${BASE_URL}/shows/${id}?embed[]=cast&embed[]=episodes`
    );
    const data = await res.json();
    return tvmazeToMedia(data);
}

function tvmazeToMedia(show: any): MovieOrSeries {
    return {
        id: String(show.id),
        title: show.name,
        description: show.summary ? show.summary.replace(/<[^>]+>/g, '') : '',
        image: show.image?.original || show.image?.medium || '',
        releaseDate: show.premiered || '',
        genres: show.genres || [],
        creators: show.createdBy ? [show.createdBy] : [],
        writers: [], // TVmaze does not provide writers
        languages: show.language ? [show.language] : [],
        imdbRating: show.rating?.average || null,
        type:
            show.type === 'Scripted' && show._embedded?.episodes
                ? 'series'
                : 'movie',
        runtime: show.runtime || null,
        seasons: show._embedded?.episodes
            ? Math.max(...show._embedded.episodes.map((e: any) => e.season))
            : null,
        cast:
            show._embedded?.cast?.map((c: any) => ({
                id: String(c.person.id),
                name: c.person.name,
                image: c.person.image?.medium || '',
                character: c.character?.name || '',
            })) || [],
        episodes:
            show._embedded?.episodes?.map((e: any) => ({
                id: String(e.id),
                seasonNumber: e.season,
                episodeNumber: e.number,
                title: e.name,
                summary: e.summary ? e.summary.replace(/<[^>]+>/g, '') : '',
                imdbRating: e.rating?.average || null,
            })) || [],
    };
}
