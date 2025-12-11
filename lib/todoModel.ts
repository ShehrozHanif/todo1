export type Priority = "low" | "medium" | "high";

export interface Todo {
  id: string;
  title: string;
  description?: string;
  dueDate: string | null;
  priority: Priority;
  tags: string[];
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
}
