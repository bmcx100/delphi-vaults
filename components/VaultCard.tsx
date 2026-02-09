"use client";

import { ArrowUpRight, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface VaultCardProps {
  assetName: string;
  assetSymbol: string;
  apy: number;
  tvl: string;
  vaultAddress: string;
  tokenAddress: string;
  index?: number;
  onDeposit?: () => void;
}

export default function VaultCard({
  assetName,
  assetSymbol,
  apy,
  tvl,
  vaultAddress,
  tokenAddress,
  index = 0,
  onDeposit
}: VaultCardProps) {
  const router = useRouter();
  const [showTvlTooltip, setShowTvlTooltip] = useState(false);

  const handleCardClick = () => {
    router.push(`/vault/${vaultAddress}`);
  };

  const handleDepositClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDeposit) {
      onDeposit();
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group relative bg-card border border-border rounded-lg p-8 hover:shadow-xl hover:border-primary/30 transition-all duration-500 opacity-0 animate-fade-in-up animate-delay-${index * 100 + 300} cursor-pointer`}
    >
      {/* Subtle top accent */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* View Details indicator - appears on hover */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span>View Details</span>
        <ArrowUpRight className="w-3.5 h-3.5" />
      </div>

      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          {/* Asset icon */}
          <img
            src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${tokenAddress}/logo.png`}
            alt={assetSymbol}
            className="w-12 h-12 rounded-full"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center hidden">
            <span className="text-xl font-bold text-primary">{assetSymbol.charAt(0)}</span>
          </div>

          <div>
            <h3 className="text-2xl font-semibold tracking-tight">{assetName}</h3>
            <span className="text-sm font-medium text-muted-foreground">
              {assetSymbol}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <div className="text-sm text-muted-foreground mb-1 tracking-wide">APY</div>
          <div className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            {apy.toFixed(2)}%
          </div>
        </div>

        <div className="relative">
          <div
            className="text-sm text-muted-foreground mb-1 tracking-wide flex items-center gap-1.5 cursor-help"
            onMouseEnter={() => setShowTvlTooltip(true)}
            onMouseLeave={() => setShowTvlTooltip(false)}
          >
            TVL
            <Info className="w-3.5 h-3.5 opacity-50" />
          </div>
          <div className="text-xl font-semibold">{tvl}</div>

          {/* TVL Tooltip */}
          {showTvlTooltip && (
            <div className="absolute left-0 top-full mt-1 px-3 py-1.5 bg-popover text-popover-foreground text-xs rounded-md shadow-lg border border-border whitespace-nowrap z-10 animate-fade-in-up">
              Total Value Locked
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleDepositClick}
        className="w-full bg-primary text-primary-foreground py-3.5 rounded-md font-medium hover:bg-primary/90 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
      >
        Deposit
        <ArrowUpRight className="w-4 h-4 transition-transform hover:translate-x-0.5 hover:-translate-y-0.5" />
      </button>

      <p className="text-[11px] text-muted-foreground/50 text-center mt-3 tracking-wide">
        Select card for additional details
      </p>
    </div>
  );
}
