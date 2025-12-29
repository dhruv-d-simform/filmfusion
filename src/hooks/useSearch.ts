import { useState } from 'react';
import { searchMedia } from '../api/tvmaze';
import { sortByRelevance } from '../utils/media';
import type { MovieOrSeries } from '../types/media';

export function useSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<MovieOrSeries[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function search(q: string) {
        setQuery(q);
        setLoading(true);
        setError(null);
        try {
            const data = await searchMedia(q);
            setResults(sortByRelevance(data, q));
        } catch (e) {
            console.error(e);
            setError('Failed to fetch results.');
            setResults([]);
        } finally {
            setLoading(false);
        }
    }

    return { query, results, loading, error, search };
}
