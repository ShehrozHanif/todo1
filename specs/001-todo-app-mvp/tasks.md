# Tasks: Todo App MVP

**Input**: Design documents from `specs/001-todo-app-mvp/`
**Prerequisites**: `plan.md`, `spec.md`, `data-model.md`

**Organization**: Tasks are grouped by implementation phase, corresponding to expected Pull Requests.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel.
- Tasks are ordered sequentially for a smooth MVP development flow.

---

## Phase 1: Repository & Tooling Setup (PR 1)

**Purpose**: Initialize the repository with the correct tools and configuration.

- [x] T001 Initialize Next.js project with TypeScript.
- [x] T002 [P] Add and configure Tailwind CSS.
- [x] T003 [P] Add and configure ESLint and Prettier.
- [x] T004 [P] Add and configure Jest with React Testing Library.
- [x] T005 [P] Create `.gitignore` and `.editorconfig` files.
- [x] T006 [P] Create basic PR and issue templates in `.github/`.
- [x] T007 [P] Create a basic GitHub Actions workflow for CI (`lint`, `test`, `build`) in `.github/workflows/ci.yml`.
- [x] T008 Configure `package.json` scripts for `dev`, `build`, `start`, `lint`, `test`.
- [x] T009 Configure `tsconfig.json` with `strict: true`.

---

## Phase 2: Foundational - Storage & Models (PR 2)

**Purpose**: Create the core logic for data persistence before any UI is built.

**⚠️ CRITICAL**: This is a blocking prerequisite for all other features.

- [x] T010 Implement the storage adapter in `lib/storage.ts` with `loadTodos`, `saveTodos`, and seeding logic.
- [x] T011 Implement `createTodo`, `updateTodo`, `deleteTodo` functions in `lib/storage.ts`.
- [x] T012 Add a versioned key (`speckit_todos_v1`) and a migration stub to the storage adapter.
- [x] T013 Write unit tests for `lib/storage.ts` in `tests/unit/storage.test.ts`.

---

## Phase 3: Core UI Implementation (PRs 3-5)

**Purpose**: Build the main user interface for interacting with todos.

### Sub-phase 3.1: App Shell (PR 3)
- [x] T014 Create the main app layout in `pages/_app.tsx` and `pages/index.tsx`.
- [x] T015 Create the `Header.tsx` component with the app title.

### Sub-phase 3.2: Todo Creation (PR 4)
- [x] T016 Create the `TodoForm.tsx` component with all input fields.
- [x] T017 Add validation for title and description length.
- [x] T018 Wire the form submission to the `createTodo` function from the storage adapter.

### Sub-phase 3.3: Todo List Display & Interaction (PR 5)
- [x] T019 Create the `TodoList.tsx` component to render a list of todos.
- [x] T020 Create the `TodoItem.tsx` component for a single todo.
- [x] T021 [P] Implement the checkbox to toggle `isCompleted` status.
- [x] T022 [P] Implement the delete button.
- [x] T023 [P] Implement visual highlighting for overdue tasks.
- [x] T024 Implement inline editing for the todo title on double-click.
- [x] T025 Create the `TagBadge.tsx` component for displaying tags.

---

## Phase 4: Feature Implementation (PRs 6-8)

**Purpose**: Add advanced features like editing, filtering, and settings.

### Sub-phase 4.1: Full Editing (PR 6)
- [x] T026 Create the `EditModal.tsx` component with a form for all todo fields.
- [x] T027 Wire the `TodoItem.tsx` to open the `EditModal.tsx`.
- [x] T028 Implement the save functionality to update the todo and re-sort the list.

### Sub-phase 4.2: List Management (PR 7)
- [x] T029 Create a `FilterBar.tsx` component for filter and sort controls.
- [x] T030 Implement the filtering logic (All, Active, Completed, Tag).
- [x] T031 Implement the sorting logic (Newest, Due Date, Priority).
- [x] T032 Implement the search input and filtering logic.
- [x] T033 Persist filter and sort preferences to `localStorage`.

### Sub-phase 4.3: Settings & Theme (PR 8)
- [x] T034 Create the `SettingsPanel.tsx` component.
- [x] T035 Implement the dark mode toggle and persist the theme using a `useTheme` hook.
- [x] T036 Implement the "Reset demo data" button.
- [x] T037 Add a display for keyboard shortcuts in the settings panel.

---

## Phase 5: Polish & Deployment (PRs 9-12)

**Purpose**: Finalize the application with tests, polish, and deployment configuration.

### Sub-phase 5.1: Keyboard Shortcuts (PR 9)
- [x] T038 Create a `useShortcuts` hook to handle global keyboard events.
- [x] T039 Implement shortcuts for adding a todo, closing the modal, and focusing search.

### Sub-phase 5.2: Testing & Accessibility (PR 10)
- [x] T040 Add component tests for `TodoForm.tsx` and `TodoList.tsx`.
- [x] T041 Perform a basic accessibility check with `axe` and fix any critical violations.

### Sub-phase 5.3: UI Polish (PR 11)
- [x] T042 Review and polish UI spacing, focus states, and transitions.
- [x] T043 Test and refine the responsive design on mobile and desktop.
- [x] T044 Create a demo GIF and screenshots for the README.

### Sub-phase 5.4: Documentation & Deployment (PR 12)
- [x] T045 Create a comprehensive `README.md`.
- [x] T046 [P] Add a `LICENSE` file (MIT).
- [x] T047 [P] Add a `CONTRIBUTING.md` file.
- [x] T048 Finalize the GitHub Actions workflow for CI.
- [x] T049 Deploy the application to Vercel and confirm it builds and runs successfully.

---
## Dependencies & Execution Order

- **Phase 1 (Setup)** must be completed first.
- **Phase 2 (Foundational)** depends on Phase 1 and blocks all UI work.
- **Phase 3 (Core UI)** can begin after Phase 2. Sub-phases should be done in order.
- **Phase 4 (Features)** depends on Phase 3.
- **Phase 5 (Polish & Deployment)** is the final phase.

The tasks are ordered sequentially to ensure a stable, incremental build process.

## Implementation Strategy

The project will be built using an **MVP First** and **Incremental Delivery** strategy. Each PR corresponds to a logical feature slice that can be independently tested and reviewed.

1.  **PRs 1-2**: Complete project setup and foundational storage logic.
2.  **PRs 3-5**: Build the core CRUD and display functionality. At this point, the app is a usable MVP.
3.  **PRs 6-12**: Incrementally add features, polish, and prepare for final deployment.