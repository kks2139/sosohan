import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type Theme = "light" | "dark";

interface ToastInfo {
  message: string;
  duration: number;
  id: number;
}

interface ViewStore {
  toasts: ToastInfo[];
  addToastMessage: (message: string, duration?: number) => void;
  removeToastMessage: (id: number) => void;
  reduceToastDuration: (id: number) => void;
  theme?: Theme;
  setTheme: (theme: Theme) => void;
  getIsDarkMode: () => boolean;
}

export const viewStore = create<ViewStore>()(
  immer((set, get) => ({
    theme: "light",
    setTheme(theme) {
      set({ theme });
    },
    getIsDarkMode() {
      return get().theme === "dark";
    },
    toasts: [],
    addToastMessage: (message, duration = 3000) => {
      const { toasts } = get();

      if (toasts.length > 9) {
        return;
      }

      toasts.unshift({ message, duration, id: Date.now() });

      set({
        toasts,
      });
    },
    removeToastMessage: (id) => {
      const { toasts } = get();

      set({
        toasts: toasts.filter((t) => t.id !== id),
      });
    },
    reduceToastDuration: (id) => {
      const { toasts } = get();
      const target = toasts.find((t) => t.id === id);

      if (target) {
        target.duration--;
      }

      set({
        toasts,
      });
    },
  }))
);
