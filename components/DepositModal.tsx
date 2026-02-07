"use client";

import { useState, useEffect } from "react";
import { X, ArrowUpRight } from "lucide-react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { formatUnits, parseUnits } from "viem";
import ERC20_ABI from "@/abis/ERC20.json";
import ERC4626_ABI from "@/abis/ERC4626.json";
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
  vaultAddress,
  tokenAddress,
  tokenDecimals,
  onAddToast,
  onUpdateToast,
}: DepositModalProps) {
  const [amount, setAmount] = useState("");
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [lastTxHash, setLastTxHash] = useState<`0x${string}` | undefined>();
  const [txType, setTxType] = useState<'approve' | 'deposit' | null>(null);
  const [isPending, setIsPending] = useState(false);

  // Read token balance
  const { data: balanceData } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: isOpen && !!address },
  });

  // Read allowance
  const { data: allowanceData, refetch: refetchAllowance } = useReadContract({
    address: tokenAddress as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: address ? [address, vaultAddress as `0x${string}`] : undefined,
    query: { enabled: isOpen && !!address },
  });

  const balance = balanceData ? formatUnits(balanceData as bigint, tokenDecimals) : '0';
  const allowance = allowanceData ? formatUnits(allowanceData as bigint, tokenDecimals) : '0';

  // Monitor transaction
  const { isSuccess } = useWaitForTransactionReceipt({
    hash: lastTxHash,
  });

  useEffect(() => {
    if (isSuccess && lastTxHash && txType) {
      if (txType === 'approve') {
        onUpdateToast(lastTxHash, {
          status: "confirmed",
          message: "Approval confirmed!",
        });
        refetchAllowance();
      } else if (txType === 'deposit') {
        onUpdateToast(lastTxHash, {
          status: "confirmed",
          message: "Deposit confirmed!",
        });
        setAmount("");
        onClose();
      }
      setLastTxHash(undefined);
      setTxType(null);
      setIsPending(false);
    }
  }, [isSuccess, lastTxHash, txType, onUpdateToast, onClose, refetchAllowance]);

  const handleMaxClick = () => {
    if (!isConnected) {
      onAddToast({
        status: "failed",
        message: "Please connect your wallet first",
      });
      return;
    }
    setAmount(balance);
  };

  const handleApprove = async () => {
    if (!isConnected || !address || !amount || parseFloat(amount) <= 0) {
      return;
    }

    try {
      setIsPending(true);
      const amountInWei = parseUnits(amount, tokenDecimals);

      const txHash = await writeContractAsync({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [vaultAddress, amountInWei],
      });

      setLastTxHash(txHash);
      setTxType('approve');

      onAddToast({
        status: "pending",
        message: "Approval transaction pending...",
        txHash: txHash,
      });
    } catch (error: any) {
      console.error("Approval error:", error);
      setIsPending(false);
      onAddToast({
        status: "failed",
        message: error.message?.includes("rejected") || error.message?.includes("denied")
          ? "Transaction rejected by user"
          : "Approval failed. Please try again.",
      });
    }
  };

  const handleDeposit = async () => {
    // DEPOSIT FUNCTIONALITY DISABLED
    onAddToast({
      status: "failed",
      message: "Deposit Not Available",
    });
    return;

    /* COMMENTED OUT - Deposit execution disabled
    if (!isConnected || !address || !amount || parseFloat(amount) <= 0) {
      return;
    }

    try {
      setIsPending(true);
      const amountInWei = parseUnits(amount, tokenDecimals);

      const txHash = await writeContractAsync({
        address: vaultAddress as `0x${string}`,
        abi: ERC4626_ABI,
        functionName: 'deposit',
        args: [amountInWei, address],
      });

      setLastTxHash(txHash);
      setTxType('deposit');

      onAddToast({
        status: "pending",
        message: "Deposit transaction pending...",
        txHash: txHash,
      });
    } catch (error: any) {
      console.error("Deposit error:", error);
      setIsPending(false);
      onAddToast({
        status: "failed",
        message: error.message?.includes("rejected") || error.message?.includes("denied")
          ? "Transaction rejected by user"
          : "Deposit failed. Please try again.",
      });
    }
    */
  };

  const needsApproval = parseFloat(amount) > 0 && parseFloat(amount) > parseFloat(allowance);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card border border-border rounded-lg max-w-md w-full p-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
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

        {/* Amount input */}
        <div className="space-y-6">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              Amount
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 bg-background border border-input rounded-md px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                onClick={handleMaxClick}
                disabled={!isConnected || isPending}
                className="px-4 py-2 bg-muted text-foreground rounded-md hover:bg-muted/80 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Max
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {isConnected ? (
                <>Available: {parseFloat(balance).toFixed(4)} {vaultSymbol}</>
              ) : (
                "Connect wallet to see balance"
              )}
            </p>
          </div>

          <div className="flex justify-between text-sm py-4 border-t border-b border-border">
            <span className="text-muted-foreground">You receive</span>
            <span className="font-semibold">- shares</span>
          </div>

          <div className="space-y-3">
            {needsApproval && (
              <button
                onClick={handleApprove}
                disabled={isPending || !isConnected}
                className="w-full bg-secondary text-secondary-foreground py-3.5 rounded-md font-medium hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending && txType === 'approve' ? "Approving..." : `Approve ${vaultSymbol}`}
              </button>
            )}
            <button
              onClick={handleDeposit}
              disabled={needsApproval || !isConnected || isPending}
              className="w-full bg-primary text-primary-foreground py-3.5 rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending && txType === 'deposit' ? "Depositing..." : "Deposit"}
              {!(isPending && txType === 'deposit') && <ArrowUpRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
