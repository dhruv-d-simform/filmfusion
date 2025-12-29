import { useState, useEffect } from 'react';
import { getMediaDetails } from '../api/tvmaze';
import type { MovieOrSeries } from '../types/media';

export function useDetails(id: string | null) {
    const [details, setDetails] = useState<MovieOrSeries | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getMediaDetails(id);
                setDetails(data);
            } catch (e) {
                console.error(e);
                setError('Failed to fetch details.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    return { details, loading, error };
}
