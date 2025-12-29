import type { MovieOrSeries } from '../types/media';
import { Link } from 'react-router';

type ResultsGridProps = {
    results: MovieOrSeries[];
    loading: boolean;
    error: string | null;
};

export function ResultsGrid({ results, loading, error }: ResultsGridProps) {
    if (loading) {
        return (
            <div className="text-center py-8 text-muted-foreground animate-pulse">
                Loading...
            </div>
        );
    }
    if (error) {
        return (
            <div className="text-center text-red-400 py-8 font-semibold">
                {error}
            </div>
        );
    }
    if (!results.length) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                No results found.
            </div>
        );
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
            {results.map((media) => (
                <Link
                    key={media.id}
                    to={`details/${media.id}`}
                    className="bg-card rounded-xl shadow-lg hover:scale-[1.03] hover:shadow-2xl transition-all flex flex-col items-start overflow-hidden text-left border border-border group"
                >
                    <img
                        src={media.image || '/placeholder.png'}
                        alt={media.title}
                        className="w-full h-48 object-cover bg-muted group-hover:opacity-90 transition"
                    />
                    <div className="p-4 w-full">
                        <h3 className="font-semibold text-lg mb-1 text-foreground group-hover:text-primary transition">
                            {media.title}
                        </h3>
                        <div className="text-sm text-muted-foreground mb-1">
                            {media.releaseDate?.slice(0, 4) || '—'} •{' '}
                            {media.genres[0] || '—'}
                        </div>
                        <div className="text-xs text-muted-foreground mb-1">
                            {media.type === 'movie'
                                ? `Runtime: ${media.runtime || '—'} min`
                                : `Seasons: ${media.seasons || '—'}`}
                        </div>
                        <div className="text-xs text-yellow-400 font-bold">
                            IMDB: {media.imdbRating ?? '—'}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
