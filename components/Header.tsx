import React from "react";

interface HeaderProps {
  search: string;
  setSearch: (search: string) => void;
}

export default function Header({ search, setSearch }: HeaderProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent any default form submission behavior
    }
  };

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">Todo App</h1>
      <input
        className="w-full sm:w-auto sm:min-w-[200px] border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </header>
  );
}
