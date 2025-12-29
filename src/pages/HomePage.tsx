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
        <div className="min-h-screen bg-gray-50">
            <header className="py-6 bg-primary text-white text-center text-2xl font-bold shadow">
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
                    <div className="text-center py-16 text-gray-400 text-lg">
                        Start by searching for a movie or series above.
                    </div>
                )}
                <Outlet />
            </main>
        </div>
    );
}
