"use client";

import { useEffect } from "react";
import { X, CheckCircle, AlertCircle, Loader2, ExternalLink } from "lucide-react";

export interface ToastData {
  id: string;
  status: "pending" | "confirmed" | "failed";
  message: string;
  txHash?: string;
}

interface TransactionToastProps {
  toast: ToastData;
  onDismiss: (id: string) => void;
}

export default function TransactionToast({ toast, onDismiss }: TransactionToastProps) {
  useEffect(() => {
    if (toast.status === "confirmed") {
      const timer = setTimeout(() => {
        onDismiss(toast.id);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.status, toast.id, onDismiss]);

  const getIcon = () => {
    switch (toast.status) {
      case "pending":
        return <Loader2 className="w-5 h-5 text-primary animate-spin" />;
      case "confirmed":
        return <CheckCircle className="w-5 h-5 text-primary" />;
      case "failed":
        return <AlertCircle className="w-5 h-5 text-destructive" />;
    }
  };

  const getBgColor = () => {
    switch (toast.status) {
      case "pending":
        return "bg-card border-primary/20";
      case "confirmed":
        return "bg-card border-primary/20";
      case "failed":
        return "bg-card border-destructive/20";
    }
  };

  return (
    <div className={`${getBgColor()} border rounded-lg p-4 shadow-lg min-w-[320px] max-w-md animate-fade-in-up`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium mb-1">{toast.message}</p>

          {toast.txHash && (
            <a
              href={`https://etherscan.io/tx/${toast.txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              View on Etherscan
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        <button
          onClick={() => onDismiss(toast.id)}
          className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
