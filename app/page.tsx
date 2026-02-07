"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import NetworkBanner from "@/components/NetworkBanner";
import VaultCard from "@/components/VaultCard";
import VaultCardSkeleton from "@/components/VaultCardSkeleton";
import DepositModal from "@/components/DepositModal";
import ToastContainer from "@/components/ToastContainer";
import Footer from "@/components/Footer";
import { fetchAllVaults, YDaemonVault } from "@/utils/yDaemon";
import { useToast } from "@/hooks/useToast";

// Vault addresses on Ethereum mainnet
const VAULT_ADDRESSES = [
  "0xa354F35829Ae975e850e23e9615b11Da1B3dC4DE", // USDC Vault
  "0xdA816459F1AB5631232FE5e97a05BBBb94970c95", // DAI Vault
  "0xa258C4606Ca8206D8aA700cE2143D7db854D168c", // WETH Vault
];

export default function Home() {
  const [vaults, setVaults] = useState<YDaemonVault[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVault, setSelectedVault] = useState<YDaemonVault | null>(null);
  const { toasts, addToast, updateToast, dismissToast } = useToast();

  const handleOpenModal = (vault: YDaemonVault) => {
    setSelectedVault(vault);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVault(null);
  };

  useEffect(() => {
    async function loadVaults() {
      try {
        setLoading(true);
        const data = await fetchAllVaults(VAULT_ADDRESSES);
        // Sort by TVL from largest to smallest
        const sortedData = data.sort(
          (a, b) => (b.tvl?.tvl || 0) - (a.tvl?.tvl || 0),
        );
        setVaults(sortedData);
        setError(null);
      } catch (err) {
        console.error("Error loading vaults:", err);
        setError("Failed to load vault data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadVaults();
  }, []);

  const formatTVL = (tvl: number) => {
    if (tvl >= 1_000_000) {
      return `$${(tvl / 1_000_000).toFixed(1)}M`;
    } else if (tvl >= 1_000) {
      return `$${(tvl / 1_000).toFixed(1)}K`;
    }
    return `$${tvl.toFixed(0)}`;
  };

  const cleanVaultName = (name: string) => {
    return name.replace(/\syVault$/i, " Delphi Vault").replace(/^yv/i, "");
  };

  const cleanSymbol = (symbol: string) => {
    return symbol.replace(/^yv/i, "");
  };
  return (
    <div className="min-h-screen">
      <Navbar />
      <NetworkBanner />

      {/* Hero Section with Vault Cards */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="max-w-3xl mb-16 opacity-0 animate-fade-in-up animate-delay-100">
          <h1
            className="text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Delphi Staking
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Connect. Deposit. Done.
          </p>
        </div>

        {/* Vault Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {loading ? (
            <>
              <VaultCardSkeleton />
              <VaultCardSkeleton />
              <VaultCardSkeleton />
            </>
          ) : error ? (
            <div className="col-span-3 bg-destructive/10 border border-destructive/20 rounded-lg p-8 text-center">
              <p className="text-destructive font-medium">{error}</p>
            </div>
          ) : (
            vaults.map((vault, index) => (
              <VaultCard
                key={vault.address}
                assetName={cleanVaultName(vault.name)}
                assetSymbol={cleanSymbol(vault.token.symbol)}
                apy={(vault.apr?.netAPR || 0) * 100}
                tvl={formatTVL(vault.tvl?.tvl || 0)}
                vaultAddress={vault.address}
                tokenAddress={vault.token.address}
                index={index}
                onDeposit={() => handleOpenModal(vault)}
              />
            ))
          )}
        </div>
      </section>

      {/* Deposit Modal */}
      {selectedVault && (
        <DepositModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          vaultName={cleanVaultName(selectedVault.name)}
          vaultSymbol={cleanSymbol(selectedVault.token.symbol)}
          vaultAddress={selectedVault.address}
          tokenAddress={selectedVault.token.address}
          tokenDecimals={selectedVault.token.decimals}
          onAddToast={addToast}
          onUpdateToast={updateToast}
        />
      )}

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* DeFi, Without the Headache */}
      <section className="border-y border-border/50 bg-muted/30 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-4xl font-bold tracking-tight mb-16 text-center"
            style={{ fontFamily: "var(--font-display)" }}
          >
            DeFi, Without the Headache
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Deposit
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Connect your wallet and deposit your assets in seconds. No
                complex protocols to navigate.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Automated Vaults
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Your assets work for you automatically. The smart contracts
                handle optimization and rebalancing.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Stay in Control
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Withdraw anytime. Your funds remain in your custody. We never
                hold your assets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why DELPHI */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-4xl font-bold tracking-tight mb-12"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Why DELPHI
          </h2>

          <div className="space-y-8 max-w-3xl">
            <div className="border-l-2 border-primary pl-6">
              <h3 className="text-xl font-semibold mb-2">
                One Platform, Multiple Strategies
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Access multiple yield-generating strategies through a single,
                unified interface. No need to learn different protocols or
                interfaces.
              </p>
            </div>

            <div className="border-l-2 border-primary pl-6">
              <h3 className="text-xl font-semibold mb-2">
                Transparent Performance
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Real-time APY tracking and performance metrics. See exactly how
                your assets are performing at any moment.
              </p>
            </div>

            <div className="border-l-2 border-primary pl-6">
              <h3 className="text-xl font-semibold mb-2">
                Automated Optimization
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Smart contracts automatically optimize your position for maximum
                yield. Set it and forget it.
              </p>
            </div>

            <div className="border-l-2 border-primary pl-6">
              <h3 className="text-xl font-semibold mb-2">Gas Efficient</h3>
              <p className="text-muted-foreground leading-relaxed">
                Optimized contracts minimize gas costs. More of your returns
                stay in your pocket.
              </p>
            </div>

            <div className="border-l-2 border-primary pl-6">
              <h3 className="text-xl font-semibold mb-2">Non-Custodial</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your keys, your crypto. We never hold your assets. Withdraw
                anytime without permission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security by Design */}
      <section className="border-t border-border/50 bg-muted/30 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-4xl font-bold tracking-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Security by Design
          </h2>
          <div className="max-w-3xl space-y-4 text-muted-foreground leading-relaxed">
            <p>
              All smart contracts are audited by leading security firms. We
              follow best practices for vault architecture and regularly monitor
              for potential vulnerabilities.
            </p>
            <p>
              Your assets are protected by battle-tested code and
              industry-standard security measures. We take the safety of your
              funds seriously.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
