---
id: 102
title: Create Implementation Plan for Todo App MVP
stage: plan
date: 2025-12-12
surface: agent
model: gemini
feature: 001-todo-app-mvp
branch: 001-todo-app-mvp
user: Haji
command: /sp.plan
labels: ["plan", "architecture"]
links:
  spec: specs/001-todo-app-mvp/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-todo-app-mvp/plan.md
  - specs/001-todo-app-mvp/research.md
  - specs/001-todo-app-mvp/data-model.md
  - specs/001-todo-app-mvp/quickstart.md
  - GEMINI.md
tests:
  []
---

## Prompt

/sp.plan 
# Plan — Todo App (Next.js + localStorage)

This document translates the Specification into a clear architectural and implementation plan. It defines how the MVP will be structured, how data will flow, and which components will work together.

---

## 1. Architecture Overview

The Todo App will be a **fully client-side Next.js application**, deployed on Vercel and styled with Tailwind CSS. The codebase will be written in **TypeScript** for stronger typing and developer ergonomics. We will use the **pages router** (default `pages/`) for simplicity and broad compatibility. All state persistence will use `localStorage`, accessed through a dedicated storage adapter to allow future backend migration.

### **Main Architectural Layers**

1. **UI Layer (React Components)**

   * Pages and components rendered by Next.js
   * Handles user input, presentation, responsive layout, dark mode

2. **State & Logic Layer**

   * React state (`useState`, `useEffect`) and Context for global concerns
   * Derived states: filtered list, sorted list, search results, overdue flags
   * Keyboard shortcut handlers implemented with lightweight, vanilla `keydown` handlers

3. **Storage Adapter Layer**

   * Single module: `lib/storage.ts` (TypeScript)
   * Responsible for all interactions with `localStorage`
   * Persists todos, filter/sort preferences, theme preference
   * Seeds demo data on first run (5 demo todos)
   * Uses a versioned storage key (e.g. `speckit_todos_v1`) and includes a small migration helper

4. **Utility Layer**

   * Date utilities (checking overdue status)
   * Tag parsing utilities (comma-separated input → array)
   * Sorting and filtering functions

---

## 2. Component Structure

The application will be written in TypeScript and use the `pages/` router.

The application will use the following components:

### **Page Components**

* `pages/index.tsx` — main app interface

### **UI Components**

* `TodoForm.tsx` — input form for creating todos
* `TodoList.tsx` — renders filtered/sorted todo list
* `TodoItem.tsx` — single todo item with inline editing and actions
* `EditModal.tsx` — modal for full todo editing
* `SettingsPanel.tsx` — theme toggle, reset demo button, shortcuts info
* `Header.tsx` — app title, search bar, theme toggle
* `TagBadge.tsx` — clickable tag filter badge

### **Context / Hooks (optional, but recommended for cleaner code)**

* `useTodos()` — manages todos and storage sync (React Context + hooks)
* `useTheme()` — manages dark mode settings
* `useFilters()` — manages filter, sort, and search state

---

## 3. Data Flow

1. **Startup/Initial Load**

   * Load todos from `localStorage` via storage adapter
   * Load theme preference
   * Load saved filter/sort state
   * If no todos exist → seed demo data (5 sample todos including demo users)

2. **User Interactions**

   * Create, edit, delete todos → update React state → persist to `localStorage`
   * Mark complete/incomplete → update state → persist
   * Edit modal submits → updates todo → re-sorts automatically
   * Inline edit updates only the title

3. **Filtering & Sorting**

   * Filter (All, Active, Completed, Tag)
   * Sort (Newest, Due Date, Priority)
   * Sequence: **Filter → Search → Sort** before rendering

4. **Search Flow**

   * Search inside the currently filtered results
   * Search input does **not** persist after reload

5. **Dark Mode**

   * Follows system preference by default
   * Manual toggle overrides & persists

6. **Reset Demo Data**

   * Clears todos only
   * Preserves theme and filter/sort preferences

---

## 4. MVP Boundary (What Is Included / Excluded)

### ✅ **Included in MVP**

* Full CRUD (modal + inline edit)
* LocalStorage persistence
* Free-text tags + clickable filters
* Sorting + filtering + search
* Automatic re-sorting after edits
* Dark mode toggle
* Responsive design
* Settings panel
* Overdue highlighting
* Keyboard shortcuts

### ❌ **Excluded from MVP**

* Bulk actions
* Drag-and-drop sorting
* File/image attachments
* Notifications
* Authentication
* Multi-user support
* Backend sync
* Analytics/tracking

---

## 5. High-Level Implementation Steps

1. Initialize Next.js project (TypeScript) & Tailwind setup
2. Create file structure for components and lib modules
3. Implement storage adapter (`lib/storage.ts`) with persistence, versioned key, and demo seeding
4. Build core UI: header, form, list, item
5. Implement modal + inline editing
6. Add filtering, sorting, and search logic
7. Add tag filtering + tag badges
8. Add overdue highlighting
9. Implement settings panel and theme toggle
10. Add keyboard shortcuts (vanilla `keydown` handlers)
11. Add basic unit tests for `lib/storage.ts` and critical utilities (Jest + React Testing Library)
12. Polish UI responsiveness & accessibility (basic axe checks)
13. Manual testing based on TDD cases
14. Deploy to Vercel (standard Next build)

---

## 6. Risks & Mitigation

| Risk                                  | Mitigation                                        |
| ------------------------------------- | ------------------------------------------------- |
| LocalStorage corruption               | Safe JSON parsing with fallback defaults          |
| Modal or inline edit conflicts        | Separate local edit state from global state       |
| Tag filter complexity                 | Tag filter replaces main filter to simplify logic |
| Search + filter interaction confusion | Clear rules: filter → search → sort               |
| Theme mismatch                        | Always sync state to DOM `class` and localStorage |

---

## 7. Validation Plan

The plan will be validated using:

* Manual testing per TDD test cases
* Verifying UI responsiveness
* Confirming sorting and filtering rules
* Ensuring persistence works after reload
* Confirming dark mode sync with system + manual override
* Testing keyboard shortcuts and settings panel

---

## 8. Operational Details & Defaults

* **Locale / date format:** Use locale-aware formatting with U.S. preference — display dates with `toLocaleDateString('en-US')` while internally handling ISO date strings for robustness.

* **Due date storage / timezone:** Store due dates as **date-only strings** in `YYYY-MM-DD` format (no time). This keeps UX simple and avoids timezone confusion for an MVP.

* **localStorage fallback behavior:** If `localStorage` is unavailable or throws, the app will fallback to **in-memory** storage for the session and show a non-blocking toast warning that changes will not persist.

* **Browser support baseline:** Target modern evergreen browsers (Chrome, Edge, Firefox, Safari). No legacy polyfills (IE11) are included in the MVP.

* **Repository configuration:** Include ESLint, Prettier, and basic `README.md`. Optionally include Husky pre-commit hooks for linting. Tests use Jest + React Testing Library.

* **Vercel build settings:** Use default Vercel Next.js build settings (no custom build command required).

* **Seed demo content:** Seed **5 demo todos** on first run. These will include sample users **Ted Menden** and **Chad CN** and will demonstrate titles, priorities, due dates, and tags.

* **License:** Add an `LICENSE` file with the MIT license by default.

* **Accessibility:** Provide a short a11y checklist (semantic HTML, focus order, keyboard navigation, aria labels) and run local axe checks during development. CI integration is optional and not included in the MVP.

## 9. Developer Tools & CI Defaults

* **TypeScript strictness:** `tsconfig.json` will enable `strict: true` for stronger type safety and earlier error detection during development.

* **ESLint / Prettier:** The repo will include `eslint` with `eslint:recommended` plus Prettier integration (no heavy opinionated presets) to keep code consistent.

* **CI workflow:** A minimal GitHub Actions workflow will be added to run `npm test`, `npm run lint`, and `npm run build` on push to `main`/`master`.

* **Package manager:** Use **npm** for scripts and package management.

* **Demo todos:** I will seed **5 demo todos** with sensible sample content (including `Ted Menden` and `Chad CN`). You can edit these later.

* **Vercel settings:** Use default Vercel settings. No custom redirects or environment variables needed for the MVP.

## Response snapshot

I have completed the planning phase for the "Todo App MVP" feature.

The following artifacts have been created or updated in `specs/001-todo-app-mvp/`:
- `plan.md`
- `research.md`
- `data-model.md`
- `quickstart.md`

The agent context has also been updated. The project is now ready for the task generation phase.

## Outcome

- ✅ Impact: Successfully generated the complete implementation plan and all associated design artifacts for the Todo App MVP.
- 🧪 Tests: No tests were run.
- 📁 Files: Created plan.md, research.md, data-model.md, and quickstart.md. Updated agent context.
- 🔁 Next prompts: `/sp.tasks` to break down the plan into implementable tasks.
- 🧠 Reflection: The user provided a very detailed plan, which made this stage straightforward. The process involved merging the user's input with the template structure.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
