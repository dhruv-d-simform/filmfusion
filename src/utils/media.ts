// Utility functions for sorting and formatting media data
import type { MovieOrSeries, Episode } from '../types/media';

export function sortByRelevance(
    items: MovieOrSeries[],
    query: string
): MovieOrSeries[] {
    // Simple relevance: prioritize title match, then genre, then description
    const q = query.toLowerCase();
    return items.sort((a, b) => {
        const aScore = scoreMedia(a, q);
        const bScore = scoreMedia(b, q);
        return bScore - aScore;
    });
}

function scoreMedia(media: MovieOrSeries, q: string): number {
    let score = 0;
    if (media.title.toLowerCase().includes(q)) score += 5;
    if (media.genres.some((g) => g.toLowerCase().includes(q))) score += 2;
    if (media.description.toLowerCase().includes(q)) score += 1;
    return score;
}

export function formatRuntime(runtime: number | null | undefined): string {
    if (!runtime) return '';
    const hours = Math.floor(runtime / 60);
    const mins = runtime % 60;
    return hours ? `${hours}h ${mins}m` : `${mins}m`;
}

export function groupEpisodesBySeason(
    episodes: Episode[]
): Record<number, Episode[]> {
    return episodes.reduce(
        (acc, ep) => {
            if (!acc[ep.seasonNumber]) acc[ep.seasonNumber] = [];
            acc[ep.seasonNumber].push(ep);
            return acc;
        },
        {} as Record<number, Episode[]>
    );
}
