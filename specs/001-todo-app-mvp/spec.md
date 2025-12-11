# Specification — Todo App (Next.js + localStorage)

This document defines the functional requirements, constraints, and behaviors of the Todo App MVP according to the updated Constitution.

---

## 1. Functional Scope

The MVP delivers a fully client-side Todo application with the following core capabilities:

### **Core CRUD Features**
* Create new todos
* Read/display todos
* Update todos (modal edit + inline quick edit)
* Delete todos (no archiving)

### **UI Interactions**
* Inline editing for **title only** (no inline editing for description, dueDate, priority, or tags)
* Full edit modal for: title, description, due date, priority, tags
* Keyboard shortcuts
* Settings panel (theme toggle, shortcuts help, reset demo data)
* Dark mode (system-based + manual override)
* Mobile-responsive layout

### **List Management Features**
* Default filter: **All**
* Default sort: **Newest first (createdAt descending)**
- Filters: All, Active, Completed
- Sorting: Newest, Due Date, Priority
- Automatic re-sorting after edits
- Search: text-based search across **title, description, and tags**
- Optional tags (free text, comma-separated) — tags are **clickable filters**, and clicking a tag **replaces the current filter** (sorting still applies).

### **Visual Behavior**
* Completed tasks styled visibly (strike-through)
* Overdue tasks visually highlighted

### **Persistence**
* Todos stored in `localStorage`
* Demo data optionally seeded if no todos exist
* Theme preference stored in `localStorage`

---

## 2. Data Model

Each todo must conform to the following schema:
```
Todo {
  id: string,
  title: string (max 80 chars, required),
  description: string (max 500 chars, optional),
  dueDate: string | null (ISO date),
  priority: "low" | "medium" | "high",
  tags: string[] (free text),
  isCompleted: boolean,
  createdAt: string (ISO datetime),
  updatedAt: string (ISO datetime),
  createdBy: string | null (placeholder for future multi-user support)
}
```
Derived (not stored):
* **isOverdue**: boolean (dueDate < today && !isCompleted)

---

## 3. Inputs

### **User Input Fields**
* Title (text)
* Description (textarea)
* Due date (date picker)
* Priority (select menu: low/medium/high)
* Tags (comma-separated text)

### **User Actions**
* Add todo (title is trimmed; whitespace-only titles are rejected; duplicate titles allowed)
* Edit todo (modal or inline title edit only)
* Delete todo
* Mark complete/incomplete
* Search todos (search text does **not** persist after reload; search applies **inside the current filtered list**)
* Filter + sort todos (both **persist** after reload)
* Toggle dark mode
* Open settings panel
* Reset demo data (resets **todos only**, preserves theme and preferences)
* Use keyboard shortcuts

---

## 4. Outputs
* Rendered todo list updated reactively
* Search + filter + sort results
* Visual styling for completed and overdue todos
* Updated localStorage state
* Updated theme preference

---

## 5. Constraints
* No backend or external API
* All state persists via `localStorage`
* Must remain fully functional offline
* UI must be mobile-responsive
* Title and description length limits must be enforced

---

## 6. Success Criteria

The Todo App MVP is considered successful if:
1. All CRUD operations function reliably from the UI.
2. Full edit modal and inline edits work without breaking layout.
3. Search, filters, and sorting behave correctly and instantly.
4. Dark mode toggles and respects system preference.
5. Overdue tasks are visually identifiable.
6. Todos automatically re-sort after edits based on active sort mode.
7. The UI is fully responsive on mobile, tablet, and desktop.
8. All state persists after page reload using localStorage.
9. No backend errors occur since the system is fully client-side.
10. Deployment on Vercel renders correctly without build issues.

---

## 7. Out-of-Scope for MVP
* User authentication
* Multi-user sharing
* Backend synchronization
* Real-time updates
* Notifications or reminders
* File/image attachments
* Drag-and-drop reordering
* Bulk actions
* Analytics/tracking
