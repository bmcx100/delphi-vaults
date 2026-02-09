"use client";

import { useState } from "react";
import { X, ArrowUpRight, AlertCircle } from "lucide-react";
import { ToastData } from "./TransactionToast";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  vaultName: string;
  vaultSymbol: string;
  vaultAddress: string;
  tokenAddress: string;
  tokenDecimals: number;
  onAddToast: (toast: Omit<ToastData, "id">) => string;
  onUpdateToast: (id: string, updates: Partial<ToastData>) => void;
}

export default function DepositModal({
  isOpen,
  onClose,
  vaultName,
  vaultSymbol,
  tokenAddress,
}: DepositModalProps) {
  const [showNotice, setShowNotice] = useState(false);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      if (showNotice) {
        setShowNotice(false);
      } else {
        onClose();
      }
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {showNotice ? (
        <div className="bg-card border border-border rounded-lg max-w-sm w-full p-8 relative text-center">
          <button
            onClick={() => setShowNotice(false)}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex justify-center mb-5">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-primary" />
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            Deposits are currently unavailable as we review regulatory requirements.
            <br /><br />
            We will provide updates as appropriate.
          </p>

          <button
            onClick={() => setShowNotice(false)}
            className="w-full bg-muted text-foreground py-3 rounded-md font-medium hover:bg-muted/80 transition-colors"
          >
            Close
          </button>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg max-w-md w-full p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${tokenAddress}/logo.png`}
                alt={vaultSymbol}
                className="w-12 h-12 rounded-full"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center hidden">
                <span className="text-xl font-bold text-primary">{vaultSymbol.charAt(0)}</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                  Deposit
                </h2>
                <p className="text-sm text-muted-foreground">{vaultName}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Amount
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="0.00"
                  disabled
                  className="flex-1 bg-background border border-input rounded-md px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  disabled
                  className="px-4 py-2 bg-muted text-foreground rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Max
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowNotice(true)}
              className="w-full bg-primary text-primary-foreground py-3.5 rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              Deposit
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
