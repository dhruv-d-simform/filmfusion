// ...existing code...
import { SearchBar } from '../components/SearchBar';
import { ResultsGrid } from '../components/ResultsGrid';
import { useSearch } from '../hooks/useSearch';
import { Outlet } from 'react-router';

export function HomePage() {
    const { query, results, loading, error, search } = useSearch();
    // ...existing code...

    function handleSearch(q: string) {
        search(q);
    }

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <header className="py-6 bg-neutral-900 text-white text-center text-3xl font-extrabold shadow-lg tracking-tight rounded-b-xl border-b border-border">
                <span className="inline-block align-middle animate-pulse">
                    🎬
                </span>{' '}
                FilmFusion
            </header>
            <main className="max-w-5xl mx-auto px-4">
                <div className="py-8">
                    <SearchBar onSearch={handleSearch} initialValue={query} />
                </div>
                <ResultsGrid
                    results={results}
                    loading={loading}
                    error={error}
                />
                {!loading && !error && !results.length && (
                    <div className="text-center py-16 text-muted-foreground text-lg select-none">
                        <span className="text-5xl block mb-4 opacity-60">
                            🎬
                        </span>
                        <span className="font-semibold tracking-tight">
                            Start by searching for a TV Show.
                        </span>
                    </div>
                )}
                <Outlet />
            </main>
        </div>
    );
}
