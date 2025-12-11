import { Todo, Priority } from "./todoModel";

const STORAGE_KEY = "speckit_todos_v1";

let memoryFallback: Todo[] = [];

function getStorage() {
  try {
    // Check if localStorage is available
    const testKey = "__test__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return localStorage;
  } catch (e) {
    return null;
  }
}

const storage = getStorage();

export function loadTodos(): Todo[] {
  if (storage) {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error("Failed to parse todos from localStorage", e);
      return [];
    }
  }
  // Fallback to in-memory
  console.warn("localStorage unavailable — using memory fallback.");
  return memoryFallback;
}

export function saveTodos(todos: Todo[]): void {
  if (storage) {
    storage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } else {
    memoryFallback = todos;
  }
}

export function createTodo(input: Partial<Todo>): Todo {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    title: input.title?.trim() || "Untitled",
    description: input.description || "",
    dueDate: input.dueDate || null,
    priority: input.priority || "medium",
    tags: input.tags || [],
    isCompleted: false,
    createdAt: now,
    updatedAt: now,
    createdBy: null,
  };
}

export function updateTodo(todos: Todo[], updatedTodo: Todo): Todo[] {
    const now = new Date().toISOString();
    return todos.map(todo =>
        todo.id === updatedTodo.id ? { ...updatedTodo, updatedAt: now } : todo
    );
}

export function deleteTodo(todos: Todo[], id: string): Todo[] {
    return todos.filter(todo => todo.id !== id);
}


export function seedDemoTodosIfEmpty() {
  const todos = loadTodos();
  if (todos.length > 0) return;

  const demo = [
    createTodo({ title: "Welcome to the Todo App", tags: ["intro"], priority: "medium" }),
    createTodo({ title: "Review design mockups — Ted Menden", priority: "high", tags: ["design"] }),
    createTodo({ title: "Refactor list logic — Chad CN", priority: "low", tags: ["dev"] }),
    createTodo({ title: "Plan sprint goals", priority: "medium" }),
    createTodo({ title: "Test dark mode support", priority: "high", tags: ["qa"] }),
  ];

  saveTodos(demo);
}
