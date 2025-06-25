import type { ToastProps } from '@/components/ui/toast';
import { useCallback, useState } from 'react';

type ToastOptions = Omit<ToastProps, 'id' | 'onClose'>;

let id = 0;
function generateId() {
  return (++id).toString();
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = useCallback((options: ToastOptions) => {
    const id = generateId();
    const newToast = { id, ...options };

    setToasts((prev) => [...prev, newToast]);

    return id;
  }, []);

  const dismiss = useCallback((toastId?: string) => {
    if (toastId) {
      setToasts((prev) => prev.filter((toast) => toast.id !== toastId));
    } else {
      setToasts([]);
    }
  }, []);

  return {
    toasts,
    toast,
    dismiss,
  };
}

// Create a singleton instance for direct usage
let toastState: ToastProps[] = [];
const listeners: Array<(toasts: ToastProps[]) => void> = [];

function updateToasts(toasts: ToastProps[]) {
  toastState = toasts;
  listeners.forEach((listener) => listener(toastState));
}

export const toast = (options: ToastOptions) => {
  const id = generateId();
  const newToast = { id, ...options };

  updateToasts([...toastState, newToast]);

  return id;
};
