import { useState, useEffect } from "react";
import { Todo } from "../lib/todoModel";
import { loadTodos, saveTodos } from "../lib/storage"; // Assuming load/save for persistence

// Define types for filter and sort options
export type FilterOption = "all" | "active" | "completed" | string; // String for tag filters
export type SortOption = "newest" | "dueDate" | "priority";

const FILTER_STORAGE_KEY = "speckit_filter";
const SORT_STORAGE_KEY = "speckit_sort";

export function useFilters() {
  const [filter, setFilter] = useState<FilterOption>(() => {
    // Initialize from localStorage or default to "all"
    if (typeof window !== "undefined") {
      return localStorage.getItem(FILTER_STORAGE_KEY) || "all";
    }
    return "all";
  });
  const [sort, setSort] = useState<SortOption>(() => {
    // Initialize from localStorage or default to "newest"
    if (typeof window !== "undefined") {
      return (localStorage.getItem(SORT_STORAGE_KEY) as SortOption) || "newest";
    }
    return "newest";
  });
  const [search, setSearch] = useState("");

  // Persist filter and sort changes to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(FILTER_STORAGE_KEY, filter);
    }
  }, [filter]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(SORT_STORAGE_KEY, sort);
    }
  }, [sort]);

  const applyFilters = (todos: Todo[]): Todo[] => {
    let filteredTodos = todos;

    // 1. Filter
    if (filter === "active") {
      filteredTodos = filteredTodos.filter(todo => !todo.isCompleted);
    } else if (filter === "completed") {
      filteredTodos = filteredTodos.filter(todo => todo.isCompleted);
    } else if (filter !== "all") {
      // Tag filter
      filteredTodos = filteredTodos.filter(todo => todo.tags.includes(filter));
    }

    // 2. Search
    if (search.trim()) {
      const lowerCaseSearch = search.toLowerCase();
      filteredTodos = filteredTodos.filter(
        todo =>
          todo.title.toLowerCase().includes(lowerCaseSearch) ||
          todo.description?.toLowerCase().includes(lowerCaseSearch) ||
          todo.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearch))
      );
    }

    // 3. Sort
    filteredTodos.sort((a, b) => {
      if (sort === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sort === "dueDate") {
        // Handle null due dates: nulls come last
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else if (sort === "priority") {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return 0;
    });

    return filteredTodos;
  };

  return {
    filter,
    setFilter,
    sort,
    setSort,
    search,
    setSearch,
    applyFilters,
  };
}
