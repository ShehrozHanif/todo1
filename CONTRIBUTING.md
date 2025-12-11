# Contributing to Todo App MVP

We welcome contributions to the Todo App MVP! To ensure a smooth and effective collaboration, please follow these guidelines.

## How to Contribute

1.  **Fork the repository**: Start by forking the project to your GitHub account.
2.  **Create a feature branch**:
    *   For new features, use `feature/<short-description>` (e.g., `feature/add-dark-mode`).
    *   For bug fixes, use `fix/<short-description>` (e.g., `fix/login-bug`).
    *   Use a descriptive name that reflects the changes you are making.
3.  **Make your changes**: Implement your feature or bug fix.
4.  **Commit your changes**:
    *   Please follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. This helps us generate release notes and understand the purpose of each commit.
    *   Examples:
        *   `feat: add dark mode toggle`
        *   `fix: correct validation for todo titles`
        *   `docs: update README with new setup instructions`
        *   `chore: update dependencies`
5.  **Run tests**: Before submitting, ensure all existing tests pass and add new tests for your changes where applicable.
    ```bash
    npm test
    npm run lint
    ```
6.  **Update documentation**: If your changes affect the functionality or usage of the app, please update the `README.md` and any other relevant documentation.
7.  **Submit a Pull Request**:
    *   Push your branch to your forked repository.
    *   Open a pull request to the `main` or `master` branch of the upstream repository.
    *   Please fill out the pull request template provided (`.github/PULL_REQUEST_TEMPLATE.md`).
    *   Include a clear description of your changes, the problem it solves, and any relevant screenshots or GIFs for UI changes.

## Code Style

*   We use ESLint and Prettier for code formatting and style. Ensure your code adheres to these standards by running `npm run lint` and `npm run format` (if available, or `npm prettier --write .`).
*   Follow standard TypeScript and React best practices.

## Reporting Bugs

If you find a bug, please open an issue using the provided `.github/ISSUE_TEMPLATE.md`.

## Feature Requests

We'd love to hear your ideas for new features! Please open an issue to describe your feature request.

Thank you for contributing!
