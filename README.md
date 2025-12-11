# Todo App MVP (Next.js + localStorage)

This is a Minimum Viable Product (MVP) of a client-side Todo application built with **Next.js**, styled using **Tailwind CSS**, and deployed on **Vercel**. It demonstrates full CRUD operations, advanced list management features (search, filter, sort), dark mode, and persistent storage via `localStorage`.

---

## ✨ Features

*   **Full CRUD**: Create, Read, Update (modal & inline), Delete todos.
*   **LocalStorage Persistence**: All data and preferences are saved in your browser's local storage.
*   **Advanced List Management**:
    *   Search across title, description, and tags.
    *   Filter by All, Active, Completed, or Tags.
    *   Sort by Newest, Due Date, or Priority.
    *   Automatic re-sorting after edits.
*   **Intuitive UI**:
    *   Dark mode (system preference + manual toggle).
    *   Mobile-responsive design.
    *   Visual highlights for completed and overdue tasks.
    *   Keyboard shortcuts for common actions.
*   **Future-Ready Architecture**: Designed for easy migration to a backend solution (e.g., Supabase) with minimal refactoring.

---

## 🚀 Quick Start

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Make sure you have the following installed:
*   [Node.js](https://nodejs.org/en/download/) (LTS version recommended, e.g., 18.x or 20.x)
*   [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (comes with Node.js)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/todo-app-mvp.git # Replace with your repo URL
    cd todo-app-mvp
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

### Running the Development Server

1.  **Start the server**:
    ```bash
    npm run dev
    ```
    This will start the Next.js development server on `http://localhost:3000`.

2.  **Open in browser**:
    Open your web browser and navigate to [http://localhost:3000](http://localhost:3000). The app will automatically reload if you change any source files.

---

## 🧪 Running Tests

To run the unit tests:
```bash
npm test
```

To run the linter:
```bash
npm run lint
```

---

## 🛠 Project Structure

```
.
├── app/                  # Next.js App Router (root layout and pages)
├── components/           # Reusable React components (TodoForm, TodoList, Header, etc.)
├── hooks/                # Custom React hooks (useTodos, useTheme, useFilters, useShortcuts)
├── lib/                  # Utility functions and storage adapter (storage.ts, todoModel.ts)
├── public/               # Static assets
├── styles/               # Global CSS styles (Tailwind CSS imports)
├── __tests__/            # Unit and component tests
├── .github/              # GitHub Actions workflows and issue/PR templates
├── package.json          # Project dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
├── next.config.mjs       # Next.js configuration
├── postcss.config.js     # PostCSS configuration
├── jest.config.js        # Jest test runner configuration
├── jest.setup.js         # Jest setup file
├── .prettierrc.json      # Prettier configuration
├── .prettierignore       # Prettier ignore file
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1.  Fork the repository.
2.  Create a new feature branch (`git checkout -b feature/your-feature-name`).
3.  Commit your changes following [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
4.  Push to your fork and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
