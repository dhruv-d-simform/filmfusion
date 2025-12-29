import { useState } from 'react';

type SearchBarProps = {
    onSearch: (query: string) => void;
    initialValue?: string;
};

export function SearchBar({ onSearch, initialValue = '' }: SearchBarProps) {
    const [value, setValue] = useState(initialValue);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSearch(value.trim());
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex gap-2 w-full max-w-xl mx-auto"
        >
            <input
                type="text"
                className="flex-1 px-4 py-2 rounded-lg border border-border bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/60 shadow-sm transition"
                placeholder="Search for movies or series..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                aria-label="Search movies or series"
            />
            <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 transition disabled:opacity-60"
                disabled={!value.trim()}
            >
                <span className="inline-block align-middle">🔍</span>
                <span className="sr-only">Search</span>
            </button>
        </form>
    );
}
