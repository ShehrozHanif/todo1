import React, { useState } from "react";
import { Todo } from "../lib/todoModel";
import TagBadge from "./TagBadge";
import EditModal from "./EditModal"; // Import EditModal

interface TodoItemProps {
  todo: Todo;
  onUpdate: (todo: Todo) => void;
  onRemove: (id: string) => void;
  onTagClick?: (tag: string) => void;
}

export default function TodoItem({ todo, onUpdate, onRemove, onTagClick }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const handleToggleComplete = () => {
    onUpdate({ ...todo, isCompleted: !todo.isCompleted });
  };

  const handleTitleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    if (editedTitle.trim() !== todo.title) {
      if (editedTitle.trim().length > 0) {
        onUpdate({ ...todo, title: editedTitle.trim() });
      } else {
        setEditedTitle(todo.title); // Revert if empty
      }
    }
    setIsEditing(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleTitleBlur();
    } else if (e.key === "Escape") {
      setEditedTitle(todo.title); // Revert on escape
      setIsEditing(false);
    }
  };

  const isOverdue = todo.dueDate && !todo.isCompleted && new Date(todo.dueDate) < new Date();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveModal = (updatedTodo: Todo) => {
    onUpdate(updatedTodo); // The onUpdate function already handles updating and saving
    setIsModalOpen(false);
  };

  return (
    <li className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
      <div className="flex items-center flex-grow">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={handleToggleComplete}
          className="form-checkbox h-5 w-5 text-blue-600 dark:text-blue-500 rounded focus:ring-blue-500 dark:focus:ring-blue-400 border-gray-300 dark:border-gray-600 mr-3"
        />
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onKeyDown={handleTitleKeyDown}
            className="flex-grow border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoFocus
          />
        ) : (
          <span
            onDoubleClick={handleTitleDoubleClick}
            className={`flex-grow text-lg font-medium ${
              todo.isCompleted
                ? "line-through text-gray-500 dark:text-gray-400"
                : "text-gray-900 dark:text-white"
            } ${isOverdue ? "text-red-600 dark:text-red-400" : ""}`}
          >
            {todo.title}
          </span>
        )}
        <div className="ml-4 flex items-center space-x-2">
          {todo.priority === "high" && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
              High
            </span>
          )}
          {todo.priority === "medium" && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              Medium
            </span>
          )}
          {todo.priority === "low" && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Low
            </span>
          )}
          {todo.dueDate && (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                isOverdue
                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                : "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-100"
            }`}>
              Due: {todo.dueDate}
            </span>
          )}
          {todo.tags.map(tag => (
            <TagBadge key={tag} tag={tag} onClick={onTagClick} />
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={handleOpenModal}
          className="p-2 rounded-full text-gray-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          aria-label="Edit todo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.38-2.828-2.829z" />
          </svg>
        </button>
        <button
          onClick={() => onRemove(todo.id)}
          className="p-2 rounded-full text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          aria-label="Delete todo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 01-2 0v6a1 1 0 112 0V8z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isModalOpen && (
        <EditModal
          todo={todo}
          onClose={handleCloseModal}
          onSave={handleSaveModal}
        />
      )}
    </li>
  );
}
