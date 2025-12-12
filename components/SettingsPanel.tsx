import React from "react";
import { useTheme } from "../hooks/useTheme";
import { seedDemoTodosIfEmpty, saveTodos } from "../lib/storage";

interface SettingsPanelProps {
  onClose: () => void;
  onReset: () => void; // Callback to trigger a re-render in parent after reset
}

export default function SettingsPanel({ onClose, onReset }: SettingsPanelProps) {
  const { theme, toggleTheme } = useTheme();

  const handleResetData = () => {
    if (window.confirm("Are you sure you want to reset all todo data? This cannot be undone.")) {
      saveTodos([]); // Clear all todos
      seedDemoTodosIfEmpty(); // Re-seed demo data
      onReset(); // Trigger re-render in parent component
      alert("Todo data has been reset to demo content!");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 dark:bg-opacity-70 flex justify-center items-center p-2 sm:p-4 z-50 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-md relative my-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 dark:text-white pr-8">Settings</h2>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="space-y-4">
          <div>
            <label htmlFor="theme-toggle" className="block text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Theme</label>
            <button
              onClick={toggleTheme}
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Toggle Theme ({theme === "dark" ? "Dark" : "Light"})
            </button>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Keyboard Shortcuts</h3>
            <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 dark:text-gray-400 space-y-1">
              <li><span className="font-semibold">Enter</span>: Add new todo</li>
              <li><span className="font-semibold">Esc</span>: Close modal/popup</li>
              <li><span className="font-semibold">Cmd/Ctrl + K</span>: Focus search</li>
            </ul>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Data Management</h3>
            <button
              onClick={handleResetData}
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Reset All Todo Data
            </button>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">This will clear all your todos and re-seed demo data.</p>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
