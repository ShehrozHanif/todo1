import React, { useState } from "react";
import { createTodo } from "../lib/storage"; // Assuming createTodo is from storage

interface TodoFormProps {
  onAdd: (todo: any) => void; // Will use Todo type later
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // Assuming description field will be added
  const [dueDate, setDueDate] = useState(""); // Assuming dueDate field will be added
  const [priority, setPriority] = useState("medium"); // Assuming priority field will be added
  const [tags, setTags] = useState(""); // Assuming tags field will be added

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("Title cannot be empty!");
      return;
    }
    if (title.trim().length > 80) {
      alert("Title cannot exceed 80 characters!");
      return;
    }
    if (description.trim().length > 500) {
      alert("Description cannot exceed 500 characters!");
      return;
    }

    const newTodo = createTodo({
      title: title.trim(),
      description: description.trim() || undefined,
      dueDate: dueDate || null,
      priority: priority as any, // Cast to any for now, will use Priority type
      tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag),
    });
    onAdd(newTodo);
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("medium");
    setTags("");
  };

  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <input
        className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Add new todo title..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        maxLength={80}
      />
      {/* Additional fields for description, dueDate, priority, tags will be added here */}
      <textarea
        className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Description (optional)"
        value={description}
        onChange={e => setDescription(e.target.value)}
        maxLength={500}
      />
      <div className="grid grid-cols-2 gap-2 mb-2">
        <input
          type="date"
          className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
        <select
          className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={priority}
          onChange={e => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <input
        className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={e => setTags(e.target.value)}
      />
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={handleSubmit}
      >
        Add Todo
      </button>
    </div>
  );
}
