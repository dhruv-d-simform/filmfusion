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
                className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring"
                placeholder="Search for movies or series..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                aria-label="Search movies or series"
            />
            <button
                type="submit"
                className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/90"
                disabled={!value.trim()}
            >
                Search
            </button>
        </form>
    );
}
