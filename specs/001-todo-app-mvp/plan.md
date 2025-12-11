# Implementation Plan: Todo App MVP

**Branch**: `001-todo-app-mvp` | **Date**: 2025-12-12 | **Spec**: [./spec.md](./spec.md)
**Input**: Feature specification from `specs/001-todo-app-mvp/spec.md`

## 1. Architecture Overview (Summary)

The Todo App will be a **fully client-side Next.js application**, deployed on Vercel and styled with Tailwind CSS. The codebase will be written in **TypeScript** for stronger typing and developer ergonomics. We will use the **pages router** (`pages/`) for simplicity. All state persistence will use `localStorage`, accessed through a dedicated storage adapter to allow future backend migration.

### **Main Architectural Layers**

1. **UI Layer (React Components)**: Handles user input, presentation, responsive layout, and dark mode.
2. **State & Logic Layer**: Uses React state (`useState`, `useEffect`) and Context for global concerns. Manages derived state like filtered/sorted lists.
3. **Storage Adapter Layer**: A single module (`lib/storage.ts`) responsible for all `localStorage` interactions, including persistence and demo data seeding.
4. **Utility Layer**: Provides helper functions for dates, tag parsing, sorting, and filtering.

---

## 2. Technical Context

*   **Language/Version**: TypeScript (with Next.js Pages Router)
*   **Primary Dependencies**: Next.js, React, Tailwind CSS
*   **Storage**: `localStorage`
*   **Testing**: Jest, React Testing Library
*   **Target Platform**: Modern evergreen web browsers
*   **Project Type**: Web Application
*   **Performance Goals**: N/A (Responsive UI is the primary goal)
*   **Constraints**: Client-side only, No backend, Must function offline
*   **Scale/Scope**: MVP for a single user, as defined in the spec.

---

## 3. Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Client-side only (no backend)?** - Yes, the plan uses only `localStorage`.
- [x] **Uses Next.js, Tailwind CSS?** - Yes, these are the chosen frameworks.
- [x] **Persistence via localStorage?** - Yes, this is the core storage mechanism.
- [x] **Simple deletion only (no archiving)?** - Yes, the spec and plan confirm this.
- [x] **Bulk actions excluded?** - Yes, this is out-of-scope.
- [x] **Drag-and-drop reordering excluded?** - Yes, this is out-of-scope.
- [x] **Analytics and instrumentation excluded?** - Yes, this is out-of-scope.

**Result**: All gates passed. The plan is in full compliance with the project constitution.

---

## 4. Project Structure

### Documentation (this feature)

```text
specs/001-todo-app-mvp/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (empty for this feature)
└── tasks.md             # Phase 2 output (/sp.tasks)
```

### Source Code (repository root)

The project will follow a standard Next.js `pages` router structure.

```text
/
├── components/
│   ├── TodoForm.tsx
│   ├── TodoList.tsx
│   ├── TodoItem.tsx
│   ├── EditModal.tsx
│   ├── SettingsPanel.tsx
│   ├── Header.tsx
│   └── TagBadge.tsx
├── lib/
│   ├── storage.ts
│   ├── hooks.ts        # For useTodos, useTheme, useFilters
│   └── utils.ts        # For date, tag, and sorting logic
├── pages/
│   ├── _app.tsx
│   └── index.tsx
├── public/
├── styles/
│   └── globals.css
├── tests/
│   ├── unit/
│   │   └── storage.test.ts
│   └── integration/
├── .eslintrc.json
├── next.config.js
├── package.json
└── tsconfig.json
```

**Structure Decision**: A single-project Next.js structure is chosen for its simplicity and direct alignment with the client-side-only nature of the MVP.

---
## 5. Data Flow

1.  **Startup/Initial Load**: Load todos, theme, and filter/sort state from `localStorage`. Seed demo data if none exists.
2.  **User Interactions**: All state changes are persisted to `localStorage` via the storage adapter.
3.  **Filtering & Sorting**: Logic is applied in the sequence: **Filter → Search → Sort** before rendering.
4.  **Search Flow**: Search applies to the currently filtered list and does not persist on reload.
5.  **Dark Mode**: Follows system preference by default, with a manual override that persists.
6.  **Reset Demo Data**: Clears todos only, preserving theme and preferences.

---

## 6. High-Level Implementation Steps

1. Initialize Next.js project (TypeScript) & Tailwind setup.
2. Create file structure for components and lib modules.
3. Implement storage adapter (`lib/storage.ts`).
4. Build core UI components.
5. Implement modal and inline editing.
6. Add filtering, sorting, and search logic.
7. Implement settings panel and theme toggle.
8. Add keyboard shortcuts.
9. Add basic unit tests for the storage adapter.
10. Polish UI and deploy to Vercel.

---

## 7. Risks & Mitigation

| Risk                                  | Mitigation                                        |
| ------------------------------------- | ------------------------------------------------- |
| LocalStorage corruption               | Safe JSON parsing with fallback defaults          |
| Modal or inline edit conflicts        | Separate local edit state from global state       |
| Tag filter complexity                 | Tag filter replaces main filter to simplify logic |
| Search + filter interaction confusion | Clear rules: filter → search → sort               |
| Theme mismatch                        | Always sync state to DOM `class` and localStorage |

---
## 8. Operational Details & Defaults

*   **Locale / date format:** Use `toLocaleDateString('en-US')` for display.
*   **Due date storage / timezone:** Store as `YYYY-MM-DD` strings.
*   **localStorage fallback behavior:** Fallback to in-memory storage with a non-blocking toast warning.
*   **Browser support baseline:** Target modern evergreen browsers.
*   **Repository configuration:** Include ESLint, Prettier, `README.md`, and an MIT `LICENSE` file.
*   **Vercel build settings:** Use default Vercel Next.js build settings.
*   **Seed demo content:** Seed **5 demo todos** on first run.

---
## 9. Developer Tools & CI Defaults

*   **TypeScript strictness:** `strict: true` in `tsconfig.json`.
*   **ESLint / Prettier:** Basic recommended configurations.
*   **CI workflow:** A minimal GitHub Actions workflow to run `npm test`, `npm run lint`, and `npm run build`.
*   **Package manager:** Use **npm**.

---

## 10. Complexity Tracking

No violations of the constitution were required. This section is not applicable.