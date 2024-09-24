import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ToastInfo {
  message: string;
  duration: number;
  id: number;
}

interface ToastMessages {
  toasts: ToastInfo[];
}

interface ToastMessageAction {
  addToastMessage: (message: string, duration?: number) => void;
  removeToastMessage: (id: number) => void;
  reduceToastDuration: (id: number) => void;
}

export const toastStore = create<ToastMessages & ToastMessageAction>()(
  immer((set, get) => ({
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
  })),
);
