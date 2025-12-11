import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../../components/TodoList';
import { Todo } from '../../lib/todoModel';

const mockTodos: Todo[] = [
  {
    id: '1',
    title: 'Test Todo 1',
    description: 'Description 1',
    dueDate: null,
    priority: 'medium',
    tags: ['tag1'],
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: null,
  },
  {
    id: '2',
    title: 'Test Todo 2',
    description: 'Description 2',
    dueDate: '2023-01-01',
    priority: 'high',
    tags: ['tag2', 'tag3'],
    isCompleted: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: null,
  },
];

describe('TodoList', () => {
  const mockOnUpdate = jest.fn();
  const mockOnRemove = jest.fn();
  const mockOnTagClick = jest.fn();

  beforeEach(() => {
    mockOnUpdate.mockClear();
    mockOnRemove.mockClear();
    mockOnTagClick.mockClear();
  });

  test('renders a list of todos', () => {
    render(
      <TodoList
        todos={mockTodos}
        onUpdate={mockOnUpdate}
        onRemove={mockOnRemove}
        onTagClick={mockOnTagClick}
      />
    );

    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(mockTodos.length);
  });

  test('displays message when no todos are present', () => {
    render(
      <TodoList todos={[]} onUpdate={mockOnUpdate} onRemove={mockOnRemove} onTagClick={mockOnTagClick} />
    );

    expect(screen.getByText('No todos yet! Add one above.')).toBeInTheDocument();
  });

  test('passes onUpdate and onRemove props to TodoItem', () => {
    render(
      <TodoList
        todos={mockTodos}
        onUpdate={mockOnUpdate}
        onRemove={mockOnRemove}
        onTagClick={mockOnTagClick}
      />
    );

    // This is more of an integration test with TodoItem
    // We can simulate interactions and check if parent callbacks are fired
    const firstTodoItem = screen.getByText('Test Todo 1').closest('li');
    expect(firstTodoItem).toBeInTheDocument();

    const checkbox = firstTodoItem?.querySelector('input[type="checkbox"]');
    expect(checkbox).toBeInTheDocument();
    fireEvent.click(checkbox!);
    expect(mockOnUpdate).toHaveBeenCalledWith(expect.objectContaining({ id: '1', isCompleted: true }));

    const deleteButton = firstTodoItem?.querySelector('button[aria-label="Delete todo"]');
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton!);
    expect(mockOnRemove).toHaveBeenCalledWith('1');
  });

  test('passes onTagClick prop to TodoItem -> TagBadge', () => {
    render(
      <TodoList
        todos={mockTodos}
        onUpdate={mockOnUpdate}
        onRemove={mockOnRemove}
        onTagClick={mockOnTagClick}
      />
    );

    const tagBadge = screen.getByText('tag1');
    fireEvent.click(tagBadge);
    expect(mockOnTagClick).toHaveBeenCalledWith('tag1');
  });
});
