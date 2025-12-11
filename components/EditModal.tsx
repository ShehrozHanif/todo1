import React, { useState, useEffect } from "react";
import { Todo, Priority } from "../lib/todoModel";

interface EditModalProps {
  todo: Todo | null;
  onClose: () => void;
  onSave: (todo: Todo) => void;
}

export default function EditModal({ todo, onClose, onSave }: EditModalProps) {
  const [editedTodo, setEditedTodo] = useState<Todo | null>(todo);

  useEffect(() => {
    setEditedTodo(todo);
  }, [todo]);

  if (!editedTodo) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedTodo(prev => {
      if (!prev) return null;
      if (name === "tags") {
        return { ...prev, tags: value.split(",").map(tag => tag.trim()).filter(tag => tag) };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSave = () => {
    if (editedTodo.title.trim().length === 0) {
      alert("Title cannot be empty!");
      return;
    }
    if (editedTodo.title.trim().length > 80) {
      alert("Title cannot exceed 80 characters!");
      return;
    }
    if (editedTodo.description && editedTodo.description.trim().length > 500) {
      alert("Description cannot exceed 500 characters!");
      return;
    }

    onSave(editedTodo);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 dark:bg-opacity-70 flex justify-center items-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md relative">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Edit Todo</h2>
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
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={editedTodo.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              maxLength={80}
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              id="description"
              name="description"
              value={editedTodo.description || ""}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              maxLength={500}
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Due Date</label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={editedTodo.dueDate || ""}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
              <select
                id="priority"
                name="priority"
                value={editedTodo.priority}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={editedTodo.tags.join(", ")}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
