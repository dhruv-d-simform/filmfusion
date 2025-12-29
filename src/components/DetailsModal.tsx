import { useEffect, useState, useRef } from 'react';
import './DetailsModal.scrollbar.css';
import type { MovieOrSeries } from '../types/media';

interface DetailsModalProps {
    media: MovieOrSeries;
    onClose: () => void;
}

export function DetailsModal({ media, onClose }: DetailsModalProps) {
    const [descExpanded, setDescExpanded] = useState(false);
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') onClose();
        }
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    // Tab state: 0 = Overview, 1 = Cast, 2 = Episodes (if series)
    const [tab, setTab] = useState(0);
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

    // Ref for episode list scroll container
    const episodeListRef = useRef<HTMLDivElement | null>(null);
    // Scroll episode list to top when seasonTab changes
    useEffect(() => {
        if (episodeListRef.current) {
            episodeListRef.current.scrollTop = 0;
        }
    }, [seasonTab]);

    const tabs = [{ label: 'Overview' }, { label: 'Cast' }];
    if (
        media.type === 'series' &&
        media.episodes &&
        media.episodes.length > 0
    ) {
        tabs.push({ label: 'Episodes' });
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-card rounded-2xl shadow-2xl max-w-4xl w-full p-0 relative border border-border animate-fadeIn overflow-hidden"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                <button
                    className="absolute top-4 right-4 text-muted-foreground hover:text-primary text-3xl font-bold z-10 transition"
                    onClick={onClose}
                    aria-label="Close"
                >
                    ×
                </button>
                <div className="flex flex-col md:flex-row gap-0 md:gap-8">
                    <div className="md:w-2/5 w-full shrink-0 flex flex-col items-center bg-neutral-900 p-6 md:rounded-l-2xl">
                        <img
                            src={media.image || '/placeholder.png'}
                            alt={media.title}
                            className="w-48 h-72 object-cover rounded-xl bg-muted shadow-lg border border-border mb-4"
                        />
                        <div className="flex flex-wrap gap-2 justify-center mt-2">
                            {media.genres.map((g) => (
                                <span
                                    key={g}
                                    className="px-2 py-0.5 rounded bg-neutral-800 text-xs text-muted-foreground border border-border"
                                >
                                    {g}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 p-6 flex flex-col gap-2 min-h-96 max-h-[70vh]">
                        {/* Tabs */}
                        <div className="flex gap-2 mb-4 border-b border-border">
                            {tabs.map((t, i) => (
                                <button
                                    key={t.label}
                                    className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors duration-200 ${tab === i ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-primary/80'}`}
                                    onClick={() => setTab(i)}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content: absolute panels to prevent layout shift */}
                        <div className="relative flex-1 min-h-0">
                            {/* Overview Tab */}
                            <div
                                className={`absolute inset-0 transition-opacity duration-200 ${tab === 0 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} details-modal-scrollbar`}
                                style={{ overflowY: 'auto' }}
                            >
                                <h2 className="text-3xl font-extrabold mb-1 text-primary leading-tight">
                                    {media.title}
                                </h2>
                                <div className="flex items-center gap-3 text-muted-foreground text-sm mb-2">
                                    <span>
                                        {media.releaseDate?.slice(0, 4) || '—'}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-muted-foreground inline-block" />
                                    <span>
                                        {media.type === 'movie'
                                            ? `Runtime: ${media.runtime || '—'} min`
                                            : `Seasons: ${media.seasons || '—'}`}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-muted-foreground inline-block" />
                                    <span className="text-yellow-400 font-bold">
                                        IMDB: {media.imdbRating ?? '—'}
                                    </span>
                                </div>
                                <div className="mb-2 text-base text-foreground/90 leading-relaxed relative">
                                    <span
                                        className={
                                            descExpanded
                                                ? ''
                                                : 'line-clamp-4 pr-8 bg-linear-to-b from-transparent to-card/90'
                                        }
                                    >
                                        {media.description}
                                    </span>
                                    {media.description &&
                                        media.description.length > 200 && (
                                            <button
                                                className="absolute right-0 bottom-0 text-primary text-xs font-semibold bg-card px-2 py-1 rounded shadow cursor-pointer transition"
                                                style={{ marginTop: '-1.5rem' }}
                                                onClick={() =>
                                                    setDescExpanded((v) => !v)
                                                }
                                            >
                                                {descExpanded
                                                    ? 'Show Less'
                                                    : 'Show More'}
                                            </button>
                                        )}
                                </div>
                                <div className="flex flex-wrap gap-4 mt-2">
                                    <div className="text-xs">
                                        <span className="font-semibold text-muted-foreground">
                                            Languages:
                                        </span>{' '}
                                        {media.languages.join(', ') || '—'}
                                    </div>
                                    <div className="text-xs">
                                        <span className="font-semibold text-muted-foreground">
                                            Creators:
                                        </span>{' '}
                                        {media.creators.join(', ') || '—'}
                                    </div>
                                    <div className="text-xs">
                                        <span className="font-semibold text-muted-foreground">
                                            Writers:
                                        </span>{' '}
                                        {media.writers.join(', ') || '—'}
                                    </div>
                                </div>
                            </div>

                            {/* Cast Tab */}
                            <div
                                className={`absolute inset-0 transition-opacity duration-200 ${tab === 1 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} details-modal-scrollbar`}
                                style={{ overflowY: 'auto' }}
                            >
                                {media.cast && media.cast.length > 0 && (
                                    <div className="mt-2">
                                        <div className="font-semibold text-sm mb-3 text-muted-foreground">
                                            Cast
                                        </div>
                                        <ul className="grid grid-cols-3 gap-6 w-full">
                                            {media.cast.map((c) => (
                                                <li
                                                    key={c.id}
                                                    className="flex flex-col items-center bg-neutral-900 rounded-xl p-4 border border-border shadow-sm w-full"
                                                >
                                                    {c.image ? (
                                                        <img
                                                            src={c.image}
                                                            alt={c.name}
                                                            className="w-20 h-20 rounded-full object-cover bg-muted mb-3 border border-muted"
                                                        />
                                                    ) : (
                                                        <div className="w-20 h-20 rounded-full bg-muted mb-3 flex items-center justify-center text-2xl text-muted-foreground border border-muted">
                                                            ?
                                                        </div>
                                                    )}
                                                    <span className="text-base text-foreground font-semibold text-center">
                                                        {c.name}
                                                    </span>
                                                    {c.character && (
                                                        <span className="text-sm text-muted-foreground text-center mt-1">
                                                            {c.character}
                                                        </span>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Episodes Tab */}
                            <div
                                className={`absolute inset-0 transition-opacity duration-200 ${tab === 2 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                            >
                                {media.type === 'series' &&
                                    Array.isArray(media.episodes) &&
                                    media.episodes.length > 0 && (
                                        <div className="mt-2">
                                            <div className="flex gap-2 mb-4 overflow-x-auto whitespace-nowrap pr-2 details-modal-scrollbar hide-scrollbar">
                                                {Object.keys(
                                                    episodesBySeason
                                                ).map((season) => (
                                                    <button
                                                        key={season}
                                                        className={`px-3 py-1 rounded text-xs font-semibold border border-border transition-colors duration-200 ${Number(season) === seasonTab ? 'bg-neutral-800 text-white shadow' : 'bg-neutral-900 text-muted-foreground hover:bg-neutral-800/80'}`}
                                                        onClick={() =>
                                                            setSeasonTab(
                                                                Number(season)
                                                            )
                                                        }
                                                        style={{
                                                            minWidth: '90px',
                                                        }}
                                                    >
                                                        Season {season}
                                                    </button>
                                                ))}
                                            </div>
                                            <div
                                                className="max-h-56 overflow-y-auto border rounded p-2 bg-neutral-900 details-modal-scrollbar"
                                                ref={episodeListRef}
                                            >
                                                {episodesBySeason[
                                                    seasonTab
                                                ]?.map((ep) => (
                                                    <div
                                                        key={ep.id}
                                                        className="mb-3 pb-3 border-b border-border last:border-b-0 last:mb-0 last:pb-0"
                                                    >
                                                        <div className="font-semibold text-sm mb-1 text-foreground">
                                                            Episode{' '}
                                                            {ep.episodeNumber}:{' '}
                                                            {ep.title}
                                                            {ep.imdbRating && (
                                                                <span className="ml-2 text-yellow-400 font-bold text-xs">
                                                                    IMDB:{' '}
                                                                    {
                                                                        ep.imdbRating
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
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
                    </div>
                </div>
            </div>
        </div>
    );
}
