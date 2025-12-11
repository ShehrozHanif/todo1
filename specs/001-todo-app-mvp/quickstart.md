# Quickstart: Todo App MVP

**Date**: 2025-12-12
**Status**: Draft

This document provides instructions on how to set up, run, and test the Todo App MVP locally.

## Prerequisites

*   Node.js (LTS version recommended, e.g., 18.x or 20.x)
*   npm (comes with Node.js)
*   A modern web browser (Chrome, Firefox, Edge, Safari)

## Local Setup

1.  **Clone the repository**:
    ```bash
    # This step is already done if you are reading this file in the repo.
    # git clone <repository-url>
    # cd <repository-directory>
    ```

2.  **Install dependencies**:
    This command will install Next.js, React, Tailwind CSS, and all other required development and testing libraries.

    ```bash
    npm install
    ```

## Running the Development Server

1.  **Start the server**:
    This command starts the Next.js development server, usually on `http://localhost:3000`.

    ```bash
    npm run dev
    ```

2.  **Open in browser**:
    Open [http://localhost:3000](http://localhost:3000) in your web browser to see the application. The page will auto-update as you make changes to the code.

## Running Tests and Linter

The project is configured with Jest and React Testing Library for unit tests, and ESLint for code quality.

1.  **Run Unit Tests**:
    This command will execute all unit tests located in the `tests/` directory.

    ```bash
    npm test
    ```

2.  **Run Linter**:
    This command will check the entire codebase for linting errors according to the rules in `.eslintrc.json`.

    ```bash
    npm run lint
    ```

## Building for Production

To create a production-ready build of the application, run the following command. The output will be placed in the `.next/` directory.

```bash
npm run build
```

This is the same command that Vercel will use to build the application for deployment.
