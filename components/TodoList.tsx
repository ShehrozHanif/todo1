import React from "react";
import TodoItem from "./TodoItem";
import { Todo } from "../lib/todoModel"; // Assuming Todo model is available

export interface TodoListProps {
  todos: Todo[];
  onUpdate: (todo: Todo) => void;
  onRemove: (id: string) => void;
  onTagClick?: (tag: string) => void;
}

export default function TodoList({ todos, onUpdate, onRemove, onTagClick }: TodoListProps) {
  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {todos.length === 0 ? (
        <p className="p-4 text-center text-gray-500 dark:text-gray-400">No todos yet! Add one above.</p>
      ) : (
        todos.map(t => (
          <TodoItem key={t.id} todo={t} onUpdate={onUpdate} onRemove={onRemove} onTagClick={onTagClick} />
        ))
      )}
    </ul>
  );
}
