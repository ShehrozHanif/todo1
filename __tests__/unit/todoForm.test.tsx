import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoForm from '../../components/TodoForm';
import { createTodo } from '../../lib/storage'; // Mock this if needed

// Mock crypto.randomUUID for consistent test IDs
Object.defineProperty(global.crypto, 'randomUUID', {
  value: () => 'test-uuid-123',
});

// Mock createTodo if you want to test TodoForm in isolation without actual storage interaction
jest.mock('../../lib/storage', () => ({
  createTodo: jest.fn((input) => ({
    id: 'mock-id-' + Math.random().toString(36).substring(7), // Generate unique mock IDs
    title: input.title,
    description: input.description,
    dueDate: input.dueDate || null,
    priority: input.priority || 'medium',
    tags: input.tags || [],
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: null,
  })),
}));

describe('TodoForm', () => {
  const mockOnAdd = jest.fn();

  beforeEach(() => {
    mockOnAdd.mockClear();
    (createTodo as jest.Mock).mockClear();
  });

  test('renders input fields and add button', () => {
    render(<TodoForm onAdd={mockOnAdd} />);

    expect(screen.getByPlaceholderText(/Add new todo title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Due Date/i)).toBeInTheDocument(); // Input type="date"
    expect(screen.getByRole('combobox', { name: /Priority/i })).toBeInTheDocument(); // Select for priority
    expect(screen.getByPlaceholderText(/Tags/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Todo/i })).toBeInTheDocument();
  });

  test('calls onAdd with new todo when form is submitted', () => {
    render(<TodoForm onAdd={mockOnAdd} />);

    const titleInput = screen.getByPlaceholderText(/Add new todo title/i);
    const addButton = screen.getByRole('button', { name: /Add Todo/i });

    fireEvent.change(titleInput, { target: { value: 'New Test Todo' } });
    fireEvent.click(addButton);

    expect(mockOnAdd).toHaveBeenCalledTimes(1);
    expect(createTodo).toHaveBeenCalledWith(expect.objectContaining({ title: 'New Test Todo' }));
    expect(titleInput).toHaveValue(''); // Input should be cleared
  });

  test('does not call onAdd if title is empty', () => {
    render(<TodoForm onAdd={mockOnAdd} />);

    const addButton = screen.getByRole('button', { name: /Add Todo/i });
    fireEvent.click(addButton);

    expect(mockOnAdd).not.toHaveBeenCalled();
    expect(createTodo).not.toHaveBeenCalled();
  });

  test('shows alert for title exceeding 80 characters', () => {
    const originalAlert = window.alert;
    window.alert = jest.fn(); // Mock alert

    render(<TodoForm onAdd={mockOnAdd} />);
    const titleInput = screen.getByPlaceholderText(/Add new todo title/i);
    fireEvent.change(titleInput, { target: { value: 'a'.repeat(81) } });
    fireEvent.click(screen.getByRole('button', { name: /Add Todo/i }));

    expect(window.alert).toHaveBeenCalledWith('Title cannot exceed 80 characters!');
    expect(mockOnAdd).not.toHaveBeenCalled();
    window.alert = originalAlert; // Restore original alert
  });

  test('shows alert for description exceeding 500 characters', () => {
    const originalAlert = window.alert;
    window.alert = jest.fn(); // Mock alert

    render(<TodoForm onAdd={mockOnAdd} />);
    const descriptionInput = screen.getByPlaceholderText(/Description/i);
    fireEvent.change(descriptionInput, { target: { value: 'a'.repeat(501) } });
    fireEvent.change(screen.getByPlaceholderText(/Add new todo title/i), { target: { value: 'Valid Title' } }); // Need a valid title to submit

    fireEvent.click(screen.getByRole('button', { name: /Add Todo/i }));

    expect(window.alert).toHaveBeenCalledWith('Description cannot exceed 500 characters!');
    expect(mockOnAdd).not.toHaveBeenCalled();
    window.alert = originalAlert; // Restore original alert
  });

  test('clears form fields after successful submission', () => {
    render(<TodoForm onAdd={mockOnAdd} />);

    const titleInput = screen.getByPlaceholderText(/Add new todo title/i);
    const descriptionInput = screen.getByPlaceholderText(/Description/i);
    const dueDateInput = screen.getByLabelText(/Due Date/i);
    const prioritySelect = screen.getByRole('combobox', { name: /Priority/i });
    const tagsInput = screen.getByPlaceholderText(/Tags/i);
    const addButton = screen.getByRole('button', { name: /Add Todo/i });

    fireEvent.change(titleInput, { target: { value: 'New Test Todo' } });
    fireEvent.change(descriptionInput, { target: { value: 'Some description' } });
    fireEvent.change(dueDateInput, { target: { value: '2025-12-31' } });
    fireEvent.change(prioritySelect, { target: { value: 'high' } });
    fireEvent.change(tagsInput, { target: { value: 'tag1, tag2' } });
    fireEvent.click(addButton);

    expect(mockOnAdd).toHaveBeenCalledTimes(1);
    expect(titleInput).toHaveValue('');
    expect(descriptionInput).toHaveValue('');
    expect(dueDateInput).toHaveValue('');
    expect(prioritySelect).toHaveValue('medium'); // Resets to default
    expect(tagsInput).toHaveValue('');
  });
});
