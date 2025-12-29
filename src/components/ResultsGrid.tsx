import type { MovieOrSeries } from '../types/media';
import { Link } from 'react-router';

type ResultsGridProps = {
    results: MovieOrSeries[];
    loading: boolean;
    error: string | null;
};

export function ResultsGrid({ results, loading, error }: ResultsGridProps) {
    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
    }
    if (error) {
        return <div className="text-center text-red-500 py-8">{error}</div>;
    }
    if (!results.length) {
        return (
            <div className="text-center py-8 text-gray-500">
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
                    className="bg-white rounded shadow hover:shadow-lg transition flex flex-col items-start overflow-hidden text-left"
                >
                    <img
                        src={media.image || '/placeholder.png'}
                        alt={media.title}
                        className="w-full h-48 object-cover bg-gray-100"
                    />
                    <div className="p-4 w-full">
                        <h3 className="font-semibold text-lg mb-1">
                            {media.title}
                        </h3>
                        <div className="text-sm text-gray-600 mb-1">
                            {media.releaseDate?.slice(0, 4) || '—'} •{' '}
                            {media.genres[0] || '—'}
                        </div>
                        <div className="text-xs text-gray-500 mb-1">
                            {media.type === 'movie'
                                ? `Runtime: ${media.runtime || '—'} min`
                                : `Seasons: ${media.seasons || '—'}`}
                        </div>
                        <div className="text-xs text-yellow-600 font-bold">
                            IMDB: {media.imdbRating ?? '—'}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
