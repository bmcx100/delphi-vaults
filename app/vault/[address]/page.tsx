"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink, AlertCircle, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import NetworkBanner from "@/components/NetworkBanner";
import Footer from "@/components/Footer";
import { fetchVaultData, YDaemonVault } from "@/utils/yDaemon";
import { useWallet } from "@/hooks/useWallet";
import { BrowserProvider, Contract, formatUnits, parseUnits } from "ethers";
import ERC4626_ABI from "@/abis/ERC4626.json";
import ERC20_ABI from "@/abis/ERC20.json";
import ToastContainer from "@/components/ToastContainer";
import { useToast } from "@/hooks/useToast";

export default function VaultDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit");
  const [amount, setAmount] = useState("");
  const [vaultData, setVaultData] = useState<YDaemonVault | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userShares, setUserShares] = useState<string>("0");
  const [userAssets, setUserAssets] = useState<string>("0");
  const [loadingPosition, setLoadingPosition] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isDepositing, setIsDepositing] = useState(false);
  const [tokenBalance, setTokenBalance] = useState<string>("0");
  const [allowance, setAllowance] = useState<string>("0");
  const [showDepositNotice, setShowDepositNotice] = useState(false);
  const { address, isConnected } = useWallet();
  const { toasts, addToast, updateToast, dismissToast } = useToast();

  useEffect(() => {
    async function loadVault() {
      try {
        setLoading(true);
        const data = await fetchVaultData(params.address as string);
        setVaultData(data);
        setError(null);
      } catch (err) {
        console.error("Error loading vault:", err);
        setError("Failed to load vault data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    if (params.address) {
      loadVault();
    }
  }, [params.address]);

  useEffect(() => {
    async function fetchUserPosition() {
      if (!isConnected || !address || !vaultData || !params.address) {
        setUserShares("0");
        setUserAssets("0");
        return;
      }

      try {
        setLoadingPosition(true);
        const { ethereum } = window as any;
        const provider = new BrowserProvider(ethereum);
        const vaultContract = new Contract(params.address as string, ERC4626_ABI, provider);

        const shares = await vaultContract.balanceOf(address);
        const assets = await vaultContract.convertToAssets(shares);

        setUserShares(formatUnits(shares, vaultData.decimals));
        setUserAssets(formatUnits(assets, vaultData.token.decimals));
      } catch (error) {
        console.error("Error fetching user position:", error);
        setUserShares("0");
        setUserAssets("0");
      } finally {
        setLoadingPosition(false);
      }
    }

    fetchUserPosition();
  }, [isConnected, address, vaultData, params.address]);

  useEffect(() => {
    async function fetchBalanceAndAllowance() {
      if (!isConnected || !address || !vaultData || activeTab !== "deposit") {
        setTokenBalance("0");
        setAllowance("0");
        return;
      }

      try {
        const { ethereum } = window as any;
        const provider = new BrowserProvider(ethereum);
        const tokenContract = new Contract(vaultData.token.address, ERC20_ABI, provider);

        const [bal, allow] = await Promise.all([
          tokenContract.balanceOf(address),
          tokenContract.allowance(address, params.address as string)
        ]);

        setTokenBalance(formatUnits(bal, vaultData.token.decimals));
        setAllowance(formatUnits(allow, vaultData.token.decimals));
      } catch (error) {
        console.error("Error fetching balance:", error);
        setTokenBalance("0");
        setAllowance("0");
      }
    }

    fetchBalanceAndAllowance();
  }, [isConnected, address, vaultData, activeTab, params.address]);

  const formatTVL = (tvl: number) => {
    if (tvl >= 1_000_000) {
      return `$${(tvl / 1_000_000).toFixed(1)}M`;
    } else if (tvl >= 1_000) {
      return `$${(tvl / 1_000).toFixed(1)}K`;
    }
    return `$${tvl.toFixed(0)}`;
  };

  const formatPricePerShare = (pps: string, decimals: number) => {
    const value = parseFloat(pps) / Math.pow(10, decimals);
    return value.toFixed(6);
  };

  const cleanVaultName = (name: string) => {
    return name.replace(/\syVault$/i, ' Delphi Vault').replace(/^yv/i, '');
  };

  const cleanSymbol = (symbol: string) => {
    return symbol.replace(/^yv/i, '');
  };

  const refreshPosition = async () => {
    if (!isConnected || !address || !vaultData || !params.address) {
      return;
    }

    try {
      const { ethereum } = window as any;
      const provider = new BrowserProvider(ethereum);
      const vaultContract = new Contract(params.address as string, ERC4626_ABI, provider);

      const shares = await vaultContract.balanceOf(address);
      const assets = await vaultContract.convertToAssets(shares);

      setUserShares(formatUnits(shares, vaultData.decimals));
      setUserAssets(formatUnits(assets, vaultData.token.decimals));
    } catch (error) {
      console.error("Error refreshing position:", error);
    }
  };

  const handleMaxClick = () => {
    if (activeTab === "withdraw") {
      setAmount(userShares);
    } else if (activeTab === "deposit") {
      setAmount(tokenBalance);
    }
  };

  const handleApprove = async () => {
    if (!isConnected || !address || !amount || parseFloat(amount) <= 0 || !vaultData) {
      return;
    }

    let toastId: string | null = null;

    try {
      setIsApproving(true);
      const { ethereum } = window as any;
      const provider = new BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const tokenContract = new Contract(vaultData.token.address, ERC20_ABI, signer);

      const amountInWei = parseUnits(amount, vaultData.token.decimals);
      const tx = await tokenContract.approve(params.address as string, amountInWei);

      toastId = addToast({
        status: "pending",
        message: "Approval transaction pending...",
        txHash: tx.hash,
      });

      await tx.wait();

      updateToast(toastId, {
        status: "confirmed",
        message: "Approval confirmed!",
      });

      // Update allowance
      const newAllowance = await tokenContract.allowance(address, params.address as string);
      setAllowance(formatUnits(newAllowance, vaultData.token.decimals));
    } catch (error: any) {
      console.error("Approval error:", error);
      if (toastId) {
        updateToast(toastId, {
          status: "failed",
          message: error.code === 4001 ? "Transaction rejected by user" : "Approval failed",
        });
      } else if (error.code === 4001) {
        addToast({
          status: "failed",
          message: "Transaction rejected by user",
        });
      } else {
        addToast({
          status: "failed",
          message: "Approval failed. Please try again.",
        });
      }
    } finally {
      setIsApproving(false);
    }
  };

  const handleDeposit = () => {
    setShowDepositNotice(true);
  };

  const handleWithdraw = async () => {
    if (!isConnected || !address || !amount || parseFloat(amount) <= 0 || !vaultData) {
      return;
    }

    let toastId: string | null = null;

    try {
      setIsWithdrawing(true);
      const { ethereum } = window as any;
      const provider = new BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const vaultContract = new Contract(params.address as string, ERC4626_ABI, signer);

      const sharesInWei = parseUnits(amount, vaultData.decimals);

      // Check maxRedeem
      const maxRedeem = await vaultContract.maxRedeem(address);
      if (sharesInWei > maxRedeem) {
        addToast({
          status: "failed",
          message: `Amount exceeds maximum redemption limit of ${formatUnits(maxRedeem, vaultData.decimals)} shares`,
        });
        return;
      }

      // Execute redeem
      const tx = await vaultContract.redeem(sharesInWei, address, address);

      toastId = addToast({
        status: "pending",
        message: "Withdrawal transaction pending...",
        txHash: tx.hash,
      });

      await tx.wait();

      updateToast(toastId, {
        status: "confirmed",
        message: "Withdrawal confirmed!",
      });

      // Refresh position and reset
      setAmount("");
      await refreshPosition();
    } catch (error: any) {
      console.error("Withdraw error:", error);
      if (toastId) {
        updateToast(toastId, {
          status: "failed",
          message: error.code === 4001 ? "Transaction rejected by user" : "Withdrawal failed",
        });
      } else if (error.code === 4001) {
        addToast({
          status: "failed",
          message: "Transaction rejected by user",
        });
      } else {
        addToast({
          status: "failed",
          message: "Withdrawal failed. Please try again.",
        });
      }
    } finally {
      setIsWithdrawing(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <NetworkBanner />

      <div className="max-w-7xl mx-auto px-6 py-6 md:py-12">
        {/* Back button */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Vaults</span>
        </button>

        {/* Vault Header */}
        <div className="mb-6 md:mb-12">
          {loading ? (
            <div className="flex items-center gap-4 mb-4 animate-pulse">
              <div className="w-16 h-16 rounded-full bg-muted"></div>
              <div>
                <div className="h-10 w-48 bg-muted rounded mb-2"></div>
                <div className="h-4 w-32 bg-muted rounded"></div>
              </div>
            </div>
          ) : error ? (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-8 mb-8">
              <p className="text-destructive font-medium">{error}</p>
            </div>
          ) : vaultData ? (
            <div className="flex items-center gap-4 mb-4">
              <img
                src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${vaultData.token.address}/logo.png`}
                alt={vaultData.token.symbol}
                className="w-16 h-16 rounded-full"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center hidden">
                <span className="text-3xl font-bold text-primary">{vaultData.symbol.charAt(0)}</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                  {cleanVaultName(vaultData.name)}
                </h1>
                <a
                  href={`https://etherscan.io/address/${vaultData.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 mt-1"
                >
                  {vaultData.address.slice(0, 6)}...{vaultData.address.slice(-4)}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ) : null}
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-12">
          {loading ? (
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-4 md:p-6 animate-pulse">
                  <div className="h-4 w-16 bg-muted rounded md:mb-2"></div>
                  <div className="h-8 w-20 bg-muted rounded"></div>
                </div>
              ))}
            </>
          ) : vaultData ? (
            <>
              <div className="bg-card border border-border rounded-lg p-4 md:p-6 flex items-center justify-between md:block">
                <div className="text-2xl font-bold md:text-sm md:font-normal text-muted-foreground md:mb-2">APY</div>
                <div className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                  {((vaultData.apr?.netAPR || 0) * 100).toFixed(2)}%
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4 md:p-6 flex items-center justify-between md:block">
                <div className="text-xl font-bold md:text-sm md:font-normal text-muted-foreground md:mb-2">TVL</div>
                <div className="text-xl md:text-2xl font-semibold">{formatTVL(vaultData.tvl?.tvl || 0)}</div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4 md:p-6 flex items-center justify-between md:block">
                <div className="text-xl font-bold md:text-sm md:font-normal text-muted-foreground md:mb-2">Price Per Share</div>
                <div className="text-xl md:text-2xl font-semibold">
                  {formatPricePerShare(vaultData.pricePerShare, vaultData.decimals)}
                </div>
              </div>

            </>
          ) : null}
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-6 md:mb-12">
          {/* Your Position Panel */}
          <div className="bg-card border border-border rounded-lg p-8 order-2 md:order-1">
            <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Your Position
            </h2>

            {!isConnected ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>Connect wallet to view your position</p>
              </div>
            ) : loadingPosition ? (
              <div className="space-y-4 animate-pulse">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Deposited</span>
                  <div className="h-5 w-24 bg-muted rounded"></div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shares</span>
                  <div className="h-5 w-24 bg-muted rounded"></div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Earnings</span>
                  <div className="h-5 w-24 bg-muted rounded"></div>
                </div>
              </div>
            ) : parseFloat(userShares) === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No active position</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Deposited</span>
                  <span className="font-semibold">
                    {parseFloat(userAssets).toFixed(4)} {cleanSymbol(vaultData?.token.symbol || '')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shares</span>
                  <span className="font-semibold">{parseFloat(userShares).toFixed(4)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Earnings</span>
                  <span className="font-semibold text-primary">
                    {(parseFloat(userAssets) * (vaultData?.apr?.netAPR || 0)).toFixed(4)} {cleanSymbol(vaultData?.token.symbol || '')}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Action Panel */}
          <div className="bg-card border border-border rounded-lg p-8 order-1 md:order-2">
            <div className="flex gap-4 mb-6 border-b border-border">
              <button
                onClick={() => setActiveTab("deposit")}
                className={`pb-3 px-2 font-medium transition-colors ${
                  activeTab === "deposit"
                    ? "text-foreground border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Deposit
              </button>
              <button
                onClick={() => setActiveTab("withdraw")}
                className={`pb-3 px-2 font-medium transition-colors ${
                  activeTab === "withdraw"
                    ? "text-foreground border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Withdraw
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  {activeTab === "deposit" ? "Amount" : "Shares to Withdraw"}
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
                    disabled={
                      !isConnected ||
                      (activeTab === "withdraw" && parseFloat(userShares) === 0) ||
                      (activeTab === "deposit" && parseFloat(tokenBalance) === 0)
                    }
                    className="px-4 py-2 bg-muted text-foreground rounded-md hover:bg-muted/80 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Max
                  </button>
                </div>
                {activeTab === "withdraw" && isConnected && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Available: {parseFloat(userShares).toFixed(4)} shares
                  </p>
                )}
                {activeTab === "deposit" && isConnected && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Available: {parseFloat(tokenBalance).toFixed(4)} {cleanSymbol(vaultData?.token.symbol || '')}
                  </p>
                )}
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">You receive</span>
                <span className="font-semibold">
                  {activeTab === "deposit" ? "- shares" : `- ${cleanSymbol(vaultData?.token.symbol || '')}`}
                </span>
              </div>

              <div className="space-y-3">
                {activeTab === "deposit" ? (
                  <div className="relative group">
                    <button
                      onClick={handleDeposit}
                      className="w-full bg-primary text-primary-foreground py-3.5 rounded-md font-medium hover:bg-primary/90 transition-colors"
                    >
                      Deposit
                    </button>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-card border border-border rounded-lg p-3 text-xs text-muted-foreground text-center shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-10">
                      Deposits are currently unavailable as we review regulatory requirements.
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleWithdraw}
                    disabled={
                      !isConnected ||
                      !amount ||
                      parseFloat(amount) <= 0 ||
                      isWithdrawing ||
                      parseFloat(amount) > parseFloat(userShares)
                    }
                    className="w-full bg-primary text-primary-foreground py-3.5 rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isWithdrawing ? "Withdrawing..." : "Withdraw"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Strategy Info */}
        {loading ? (
          <div className="bg-card border border-border rounded-lg p-8 mb-8 animate-pulse">
            <div className="h-6 w-32 bg-muted rounded mb-4"></div>
            <div className="h-5 w-48 bg-muted rounded mb-3"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-muted rounded"></div>
              <div className="h-4 w-full bg-muted rounded"></div>
              <div className="h-4 w-3/4 bg-muted rounded"></div>
            </div>
          </div>
        ) : vaultData && vaultData.strategies && vaultData.strategies.length > 0 ? (
          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Strategy
            </h2>
            <h3 className="text-lg font-semibold mb-3">{vaultData.strategies[0].name}</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {vaultData.strategies[0].description || "This vault employs automated yield strategies to optimize returns on your deposited assets."}
            </p>

            <div className="pt-6 border-t border-border/50">
              <p className="text-sm text-muted-foreground italic">
                You interact with one platform. The contracts handle the rest.
              </p>
            </div>
          </div>
        ) : null}
      </div>

      <Footer />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Deposit Unavailable Notice */}
      {showDepositNotice && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowDepositNotice(false); }}
        >
          <div className="bg-card border border-border rounded-lg max-w-sm w-full p-8 relative text-center">
            <button
              onClick={() => setShowDepositNotice(false)}
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
              onClick={() => setShowDepositNotice(false)}
              className="w-full bg-muted text-foreground py-3 rounded-md font-medium hover:bg-muted/80 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
