import { createTodo, loadTodos, saveTodos, updateTodo, deleteTodo } from '../../lib/storage';
import { Todo } from '../../lib/todoModel';

// Mock localStorage for testing
const localStorageMock = (function () {
  let store: { [key: string]: string } = {};
  return {
    getItem(key: string) {
      return store[key];
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(global, 'localStorage', { value: localStorageMock });

describe('storage.ts', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  test('creates todo with defaults', () => {
    const todo = createTodo({ title: 'Test Todo' });
    expect(todo.id).toBeTruthy();
    expect(todo.title).toBe('Test Todo');
    expect(todo.priority).toBe('medium');
    expect(todo.isCompleted).toBe(false);
    expect(todo.createdAt).toBeTruthy();
    expect(todo.updatedAt).toBeTruthy();
  });

  test('loads and saves todos', () => {
    const todo1 = createTodo({ title: 'Todo 1' });
    const todo2 = createTodo({ title: 'Todo 2' });
    saveTodos([todo1, todo2]);

    const loadedTodos = loadTodos();
    expect(loadedTodos).toEqual([todo1, todo2]);
  });

  test('updates an existing todo', () => {
    const todo1 = createTodo({ title: 'Original Todo' });
    saveTodos([todo1]);

    const updatedTitle = 'Updated Todo';
    const updated: Todo = { ...todo1, title: updatedTitle, isCompleted: true };
    const todosAfterUpdate = updateTodo(loadTodos(), updated);
    saveTodos(todosAfterUpdate);

    const loadedTodos = loadTodos();
    expect(loadedTodos[0].title).toBe(updatedTitle);
    expect(loadedTodos[0].isCompleted).toBe(true);
    expect(loadedTodos[0].updatedAt).not.toBe(todo1.updatedAt); // updatedAt should change
  });

  test('deletes a todo', () => {
    const todo1 = createTodo({ title: 'Todo to delete' });
    const todo2 = createTodo({ title: 'Another Todo' });
    saveTodos([todo1, todo2]);

    const todosAfterDelete = deleteTodo(loadTodos(), todo1.id);
    saveTodos(todosAfterDelete);

    const loadedTodos = loadTodos();
    expect(loadedTodos).toEqual([todo2]);
    expect(loadedTodos.length).toBe(1);
  });

  test('handles empty storage gracefully', () => {
    const loadedTodos = loadTodos();
    expect(loadedTodos).toEqual([]);
  });

  test('handles malformed JSON in storage', () => {
    localStorageMock.setItem('speckit_todos_v1', 'invalid json');
    const loadedTodos = loadTodos();
    expect(loadedTodos).toEqual([]);
  });
});
