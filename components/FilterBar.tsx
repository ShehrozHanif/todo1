import React from "react";
import { FilterOption, SortOption } from "../hooks/useFilters";

interface FilterBarProps {
  onTagClick: (tag: string) => void;
  filter: FilterOption;
  setFilter: (filter: FilterOption) => void;
  sort: SortOption;
  setSort: (sort: SortOption) => void;
  search: string;
  setSearch: (search: string) => void;
}

export default function FilterBar({ onTagClick, filter, setFilter, sort, setSort, search, setSearch }: FilterBarProps) {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as FilterOption);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value as SortOption);
  };

  return (
    <div className="p-3 sm:p-4 flex flex-col gap-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <input
        type="text"
        placeholder="Search todos..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <select
          value={filter}
          onChange={handleFilterChange}
          className="flex-1 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={sort}
          onChange={handleSortChange}
          className="flex-1 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="newest">Newest</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    </div>
  );
}
