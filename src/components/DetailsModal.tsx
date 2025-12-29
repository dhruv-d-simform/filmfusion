import { useEffect, useState } from 'react';
import type { MovieOrSeries } from '../types/media';

interface DetailsModalProps {
    media: MovieOrSeries;
    onClose: () => void;
}

export function DetailsModal({ media, onClose }: DetailsModalProps) {
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') onClose();
        }
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    // For series: group episodes by season
    const [seasonTab, setSeasonTab] = useState(1);
    const episodesBySeason =
        media.type === 'series' && Array.isArray(media.episodes)
            ? media.episodes.reduce(
                  (acc, ep) => {
                      if (!acc[ep.seasonNumber]) acc[ep.seasonNumber] = [];
                      acc[ep.seasonNumber].push(ep);
                      return acc;
                  },
                  {} as Record<number, typeof media.episodes>
              )
            : {};

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                    onClick={onClose}
                    aria-label="Close"
                >
                    ×
                </button>
                <div className="flex gap-6">
                    <img
                        src={media.image || '/placeholder.png'}
                        alt={media.title}
                        className="w-40 h-60 object-cover rounded bg-gray-100"
                    />
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-2">
                            {media.title}
                        </h2>
                        <div className="text-gray-600 mb-2">
                            {media.releaseDate?.slice(0, 4)} •{' '}
                            {media.genres.join(', ') || '—'}
                        </div>
                        <div className="mb-2 text-sm text-gray-500">
                            {media.description}
                        </div>
                        <div className="mb-2 text-xs text-yellow-600 font-bold">
                            IMDB: {media.imdbRating ?? '—'}
                        </div>
                        <div className="mb-2 text-xs">
                            {media.type === 'movie'
                                ? `Runtime: ${media.runtime || '—'} min`
                                : `Seasons: ${media.seasons || '—'}`}
                        </div>
                        <div className="mb-2 text-xs">
                            Languages: {media.languages.join(', ') || '—'}
                        </div>
                        <div className="mb-2 text-xs">
                            Creators: {media.creators.join(', ') || '—'}
                        </div>
                        <div className="mb-2 text-xs">
                            Writers: {media.writers.join(', ') || '—'}
                        </div>
                        {media.cast && media.cast.length > 0 && (
                            <div className="mb-2 text-xs">
                                <span className="font-semibold">Cast:</span>
                                <ul className="mt-1 ml-2 grid grid-cols-2 gap-x-2 gap-y-1">
                                    {media.cast.slice(0, 6).map((c) => (
                                        <li
                                            key={c.id}
                                            className="flex items-center gap-2"
                                        >
                                            {c.image && (
                                                <img
                                                    src={c.image}
                                                    alt={c.name}
                                                    className="w-6 h-6 rounded-full object-cover bg-gray-200"
                                                />
                                            )}
                                            <span>{c.name}</span>
                                            {c.character && (
                                                <span className="text-gray-400 text-xs">
                                                    as {c.character}
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Series: Season/Episode Tabs */}
                {media.type === 'series' &&
                    Array.isArray(media.episodes) &&
                    media.episodes.length > 0 && (
                        <div className="mt-6">
                            <div className="flex gap-2 mb-2">
                                {Object.keys(episodesBySeason).map((season) => (
                                    <button
                                        key={season}
                                        className={`px-3 py-1 rounded text-xs font-semibold border ${Number(season) === seasonTab ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
                                        onClick={() =>
                                            setSeasonTab(Number(season))
                                        }
                                    >
                                        Season {season}
                                    </button>
                                ))}
                            </div>
                            <div className="max-h-64 overflow-y-auto border rounded p-2 bg-gray-50">
                                {episodesBySeason[seasonTab]?.map((ep) => (
                                    <div
                                        key={ep.id}
                                        className="mb-3 pb-3 border-b last:border-b-0 last:mb-0 last:pb-0"
                                    >
                                        <div className="font-semibold text-sm mb-1">
                                            Episode {ep.episodeNumber}:{' '}
                                            {ep.title}
                                            {ep.imdbRating && (
                                                <span className="ml-2 text-yellow-600 font-bold text-xs">
                                                    IMDB: {ep.imdbRating}
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            {ep.summary ||
                                                'No summary available.'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}
