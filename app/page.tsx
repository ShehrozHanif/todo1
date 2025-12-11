"use client";

import { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import FilterBar from "../components/FilterBar";
import SettingsPanel from "../components/SettingsPanel";
import { useTodos } from "../hooks/useTodos";
import { useFilters } from "../hooks/useFilters";
import { useTheme } from "../hooks/useTheme";
import { Todo } from "../lib/todoModel"; // Import Todo model

export default function Home() {
  const { todos, add, updateTodo, remove, seedDemoTodosIfEmpty } = useTodos();
  const { filter, setFilter, sort, setSort, search, setSearch, applyFilters } = useFilters();
  const { theme, toggleTheme } = useTheme();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0); // Key to force re-render after reset

  // Apply filters and sort to the todos
  const displayedTodos = applyFilters(todos);

  const handleTagClick = useCallback((tag: string) => {
    setFilter(tag);
  }, [setFilter]);

  const handleReset = useCallback(() => {
    setResetKey(prev => prev + 1); // Increment key to force re-render
  }, []);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`} key={resetKey}>
      <Header search={search} setSearch={setSearch} />
      <FilterBar onTagClick={handleTagClick} />
      <TodoForm onAdd={(newTodo: Todo) => add(newTodo)} />
      <TodoList
        todos={displayedTodos}
        onUpdate={(updatedTodo: Todo) => updateTodo(updatedTodo)}
        onRemove={(id: string) => remove(id)}
        onTagClick={handleTagClick} // Pass onTagClick to TodoItem -> TagBadge
      />

      <div className="p-4 flex justify-end">
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Settings
        </button>
      </div>

      {isSettingsOpen && (
        <SettingsPanel onClose={() => setIsSettingsOpen(false)} onReset={handleReset} />
      )}
    </div>
  );
}
