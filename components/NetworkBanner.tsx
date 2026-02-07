"use client";

import { useAccount } from "wagmi";
import { AlertCircle } from "lucide-react";

export default function NetworkBanner() {
  const { isConnected, chain } = useAccount();

  const isWrongNetwork = isConnected && chain?.id !== 1;

  if (!isWrongNetwork) return null;

  return (
    <div className="bg-destructive/10 border-b border-destructive/20">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-3 text-destructive">
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
        <p className="text-sm font-medium">
          Wrong network detected. Please switch to Ethereum Mainnet in your wallet.
        </p>
      </div>
    </div>
  );
}
