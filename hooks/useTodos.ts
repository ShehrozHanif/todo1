import { useState, useEffect } from "react";
import { Todo } from "../lib/todoModel";
import { loadTodos, saveTodos, createTodo, updateTodo, deleteTodo, seedDemoTodosIfEmpty } from "../lib/storage";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Load todos on initial mount
  useEffect(() => {
    seedDemoTodosIfEmpty();
    setTodos(loadTodos());
  }, []);

  const updateAndSave = (nextTodos: Todo[]) => {
    setTodos(nextTodos);
    saveTodos(nextTodos);
  };

  const add = (newTodo: Partial<Todo>) => {
    const todoToAdd = createTodo(newTodo);
    updateAndSave([...todos, todoToAdd]);
  };

  const update = (updatedTodo: Todo) => {
    const nextTodos = todos.map(t =>
      t.id === updatedTodo.id ? { ...updatedTodo, updatedAt: new Date().toISOString() } : t
    );
    updateAndSave(nextTodos);
  };

  const remove = (id: string) => {
    updateAndSave(todos.filter(t => t.id !== id));
  };

  // Function to re-seed demo data and update state
  const resetDemoData = () => {
    saveTodos([]); // Clear current todos
    seedDemoTodosIfEmpty(); // Re-seed
    setTodos(loadTodos()); // Reload into state
  };


  return {
    todos,
    add,
    updateTodo: update,
    remove,
    resetDemoData, // Expose reset function
  };
}
