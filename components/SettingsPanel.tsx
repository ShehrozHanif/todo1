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
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 dark:bg-opacity-70 flex justify-center items-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md relative">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Settings</h2>
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
            <label htmlFor="theme-toggle" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Theme</label>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Toggle Theme ({theme === "dark" ? "Dark" : "Light"})
              </button>
              {/* Future: Add more theme options like "System" */}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Keyboard Shortcuts</h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
              <li><span className="font-semibold">Enter</span>: Add new todo (when focused in title input)</li>
              <li><span className="font-semibold">Esc</span>: Close modal/popup</li>
              <li><span className="font-semibold">Cmd/Ctrl + K</span>: Focus search bar</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Data Management</h3>
            <button
              onClick={handleResetData}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Reset All Todo Data
            </button>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">This will clear all your todos and re-seed demo data.</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
