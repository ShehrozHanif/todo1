# Data Model: Todo App

**Date**: 2025-12-12
**Status**: Completed

This document defines the data structures for the Todo App MVP. The primary data entity is the `Todo` object.

## `Todo` Entity

The `Todo` object represents a single task.

### Schema

```typescript
interface Todo {
  id: string; // Unique identifier (e.g., UUID)
  title: string; // The task title
  description: string; // A more detailed description of the task
  dueDate: string | null; // The date the task is due, in 'YYYY-MM-DD' format
  priority: "low" | "medium" | "high"; // The priority level of the task
  tags: string[]; // An array of string tags associated with the task
  isCompleted: boolean; // Flag indicating if the task is completed
  createdAt: string; // ISO 8601 datetime string when the task was created
  updatedAt: string; // ISO 8601 datetime string when the task was last updated
  createdBy: string | null; // Placeholder for future multi-user support, always null in MVP
}
```

### Field Validation Rules

| Field         | Type                      | Required? | Constraints                                                              |
|---------------|---------------------------|-----------|--------------------------------------------------------------------------|
| `id`          | `string`                  | ✅ Yes    | Must be a unique string.                                                 |
| `title`       | `string`                  | ✅ Yes    | Max 80 characters. Cannot be empty or only whitespace.                   |
| `description` | `string`                  | ❌ No     | Max 500 characters.                                                      |
| `dueDate`     | `string` \| `null`        | ❌ No     | Must be a valid ISO date string (`YYYY-MM-DD`).                            |
| `priority`    | `"low"`\|`"medium"`\|`"high"` | ✅ Yes    | Must be one of the three allowed values. Default should be `medium`.     |
| `tags`        | `string[]`                | ❌ No     | An array of strings. Derived from comma-separated input.                 |
| `isCompleted` | `boolean`                 | ✅ Yes    | Defaults to `false` on creation.                                         |
| `createdAt`   | `string`                  | ✅ Yes    | Set at the time of creation. Should be an ISO datetime string.           |
| `updatedAt`   | `string`                  | ✅ Yes    | Updated every time the `Todo` object is modified. ISO datetime string.   |
| `createdBy`   | `string` \| `null`        | ✅ Yes    | Always `null` in the MVP.                                                |

### Derived Properties

The following properties are calculated at runtime and are not stored in the data model:

| Property      | Type      | Logic                                     |
|---------------|-----------|-------------------------------------------|
| `isOverdue`   | `boolean` | `dueDate < today && !isCompleted`         |

### State Transitions

- A `Todo` is created with `isCompleted: false`.
- A `Todo` can be marked as complete (`isCompleted: true`) or incomplete (`isCompleted: false`) at any time.
- The `updatedAt` timestamp is modified on any change to the `Todo`'s properties.
- Deleting a `Todo` removes it permanently from storage. There is no "soft delete" or "archived" state.
