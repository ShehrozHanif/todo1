import { useEffect } from "react";

interface UseShortcutsOptions {
  onSearchFocus?: () => void;
  onModalClose?: () => void;
  onAddTodo?: () => void;
}

export function useShortcuts({ onSearchFocus, onModalClose, onAddTodo }: UseShortcutsOptions) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Escape to close modal
      if (e.key === "Escape") {
        onModalClose?.();
      }

      // Cmd/Ctrl + K to focus search
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onSearchFocus?.();
      }

      // Enter to add todo (handled directly in TodoForm for now)
      // This hook would be for global Enter handling, but for now it's form-specific.
      // If a global "Add Todo" shortcut is desired outside the form, it would be implemented here.
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onSearchFocus, onModalClose, onAddTodo]);
}
