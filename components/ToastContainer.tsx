"use client";

import TransactionToast, { ToastData } from "./TransactionToast";

interface ToastContainerProps {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
}

export default function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <TransactionToast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}
