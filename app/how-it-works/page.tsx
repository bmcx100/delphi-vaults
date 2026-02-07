"use client";

import { ArrowRight, Wallet, RefreshCw, TrendingUp, Lock, Eye } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function HowItWorks() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Step 2: Hero / Simple Overview Section */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-12">
        <div className="max-w-3xl mb-12 opacity-0 animate-fade-in-up animate-delay-100">
          <h1
            className="text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            How It Works
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Earn through automated vaults
          </p>
        </div>

        {/* 3-Step Flow Diagram */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Step 1 */}
          <div className="opacity-0 animate-fade-in-up animate-delay-200">
            <div className="bg-card border border-border rounded-lg p-8 h-full">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
              <div className="text-xl font-semibold mb-3">Deposit</div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Deposit supported tokens into a DELPHI vault. No strategy selection. No protocol management.
              </p>
              <p className="text-sm font-medium text-primary">Deposit tokens</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="opacity-0 animate-fade-in-up animate-delay-300">
            <div className="bg-card border border-border rounded-lg p-8 h-full">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <RefreshCw className="w-6 h-6 text-primary" />
              </div>
              <div className="text-xl font-semibold mb-3">Vault Automation</div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The vault automatically allocates capital across integrated DeFi protocols, managing positions in real time.
              </p>
              <p className="text-sm font-medium text-primary">Auto-allocate & rebalance</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="opacity-0 animate-fade-in-up animate-delay-400">
            <div className="bg-card border border-border rounded-lg p-8 h-full">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div className="text-xl font-semibold mb-3">Earn & Withdraw</div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Rewards are compounded automatically. Withdraw your funds at any time — no lockups.
              </p>
              <p className="text-sm font-medium text-primary">Compound + exit</p>
            </div>
          </div>
        </div>
      </section>

      {/* Step 3: How the Vaults Work (Technical) Section */}
      <section className="border-y border-border/50 bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-4xl font-bold tracking-tight mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            How the Vaults Work (Technical)
          </h2>

          <div className="max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {/* 3a: Vault Architecture */}
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl font-semibold">
                  Vault Architecture
                </AccordionTrigger>
                <AccordionContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Each vault is a non-custodial smart contract system designed to deploy user capital across multiple yield-generating strategies while minimizing manual intervention and operational risk. Vaults do not rely on a single protocol or position. Instead, they dynamically manage capital across a set of predefined strategies.
                  </p>

                  <div className="border-l-4 border-primary bg-muted/50 p-6 rounded-r-md space-y-4">
                    <h4 className="font-semibold text-lg mb-3">Technical Deep-Dive</h4>

                    <div>
                      <h5 className="font-semibold mb-2">ERC-4626 Tokenized Vault Standard</h5>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        DELPHI vaults implement the ERC-4626 standard — Ethereum's standardized interface for tokenized yield-bearing vaults. This is what makes composability and automation possible.
                      </p>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        When a user deposits an ERC-20 token (e.g., USDC, WETH, DAI), the vault mints a corresponding vault share token back to the user. This share token is itself an ERC-20, meaning it is transferable, composable, and can be integrated into other DeFi protocols.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        The share token represents a proportional claim on the vault's total assets. As the vault earns yield, the value of each share increases — users don't need to claim rewards manually.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-semibold mb-2">Key contract methods</h5>
                      <div className="space-y-2 font-mono text-sm bg-card p-4 rounded border border-border">
                        <div><span className="text-primary">deposit</span>(assets, receiver)</div>
                        <div><span className="text-primary">withdraw</span>(assets, receiver, owner)</div>
                        <div><span className="text-primary">totalAssets</span>()</div>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-semibold mb-2">Why ERC-4626 matters</h5>
                      <ul className="space-y-2 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Standardized interface means wallets, dashboards, and other protocols can read vault state without custom integrations.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Share tokens are fully on-chain ERC-20s — users always retain custody via their wallet.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Composability: vault shares can potentially be used as collateral or liquidity in other protocols.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* 3b: Capital Allocation */}
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-xl font-semibold">
                  Capital Allocation
                </AccordionTrigger>
                <AccordionContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    When assets are deposited, funds are pooled inside the vault contract. Capital is then allocated across integrated protocols based on predefined strategy logic, and allocation weights adjust over time as conditions change. Protocols may include lending markets, liquidity pools, and fee-generating automated market maker positions.
                  </p>

                  <div className="border-l-4 border-primary bg-muted/50 p-6 rounded-r-md space-y-4">
                    <h4 className="font-semibold text-lg mb-3">Technical Deep-Dive</h4>

                    <div>
                      <h5 className="font-semibold mb-2">Strategy contracts & delegatecall pattern</h5>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        The vault delegates capital deployment to individual Strategy contracts — isolated Solidity contracts each responsible for interacting with one external protocol (e.g., Aave, Compound, Uniswap V3).
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        This modular architecture means new strategies can be added or deprecated without redeploying the core vault contract.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-semibold mb-2">On-chain allocation weights</h5>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        Each strategy has an allocation weight stored on-chain (e.g., 40% lending, 35% LP, 25% AMM fees).
                      </p>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        When totalAssets() is called, the vault queries each strategy's balanceOf() to aggregate the true on-chain value across all positions.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-semibold mb-2">Token flow example</h5>
                      <ol className="space-y-2 text-muted-foreground text-sm list-decimal list-inside">
                        <li>User calls deposit(1000 USDC, user) on the vault</li>
                        <li>Vault mints share tokens to user</li>
                        <li>Vault routes: 400 USDC → Lending Strategy, 350 USDC → LP Strategy, 250 USDC → AMM Strategy</li>
                      </ol>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* 3c: Automation & Rebalancing */}
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-xl font-semibold">
                  Automation & Rebalancing
                </AccordionTrigger>
                <AccordionContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Vaults continuously rebalance positions to maintain target exposure, adjust liquidity ranges where applicable, and migrate capital between strategies when risk or yield profiles change. All actions are executed automatically via smart contracts.
                  </p>

                  <div className="border-l-4 border-primary bg-muted/50 p-6 rounded-r-md space-y-4">
                    <h4 className="font-semibold text-lg mb-3">Technical Deep-Dive</h4>

                    <div>
                      <h5 className="font-semibold mb-2">Keeper network & off-chain triggers</h5>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        Rebalancing transactions are submitted by keeper bots — automated off-chain agents that monitor on-chain conditions and call vault functions when thresholds are met.
                      </p>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        The vault contract itself enforces all validation on-chain — keepers can only trigger predefined actions, never move funds to arbitrary addresses.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-semibold mb-2">Rebalancing logic</h5>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        The vault compares current allocation percentages against target weights. When drift exceeds a configurable threshold (e.g., ±5%), a rebalance is triggered.
                      </p>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        For concentrated liquidity positions (e.g., Uniswap V3), the vault's strategy contract can adjust tick ranges as price moves.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-semibold mb-2">MEV protection</h5>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Swaps executed during rebalancing can be routed through DEX aggregators or private mempools to minimize front-running and sandwich attacks. Slippage limits are enforced at the contract level.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* 3d: Compounding & Gas Optimization */}
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-xl font-semibold">
                  Compounding & Gas Optimization
                </AccordionTrigger>
                <AccordionContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Rewards are periodically harvested and reinvested back into the vault. Actions are batched to reduce gas costs per user. This allows vaults to compound yield efficiently without requiring manual claims.
                  </p>

                  <div className="border-l-4 border-primary bg-muted/50 p-6 rounded-r-md space-y-4">
                    <h4 className="font-semibold text-lg mb-3">Technical Deep-Dive</h4>

                    <div>
                      <h5 className="font-semibold mb-2">Harvest & reinvest cycle</h5>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        Strategy contracts call claim() or getReward() on the underlying protocol to collect accrued rewards (e.g., COMP tokens from Compound, AAVE tokens from Aave, trading fees from Uniswap positions).
                      </p>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Reward tokens are swapped back to the vault's base asset via on-chain DEX routes. The converted assets are redeposited into strategies, increasing totalAssets() — compounding happens at the vault level, not per-user.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-semibold mb-2">Gas socialization</h5>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        Harvesting and compounding are executed as single transactions that benefit all depositors. The gas cost is effectively shared across all vault participants.
                      </p>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        For a vault with 500 depositors, one harvest transaction replaces 500 individual transactions — reducing total gas consumption by orders of magnitude.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-semibold mb-2">EIP-1559 & gas estimation</h5>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Keeper bots use EIP-1559 fee parameters to submit transactions with predictable costs. The vault's infrastructure monitors base fees and delays non-urgent harvests to periods of lower gas prices.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* 3e: Risk Controls */}
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-xl font-semibold">
                  Risk Controls
                </AccordionTrigger>
                <AccordionContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Each vault operates within defined constraints: strategy allocation limits, exposure caps per protocol, and automated guards to prevent undesired states. Vault parameters can be updated as protocols or market conditions evolve.
                  </p>

                  <div className="border-l-4 border-primary bg-muted/50 p-6 rounded-r-md space-y-4">
                    <h4 className="font-semibold text-lg mb-3">Technical Deep-Dive</h4>

                    <div>
                      <h5 className="font-semibold mb-2">On-chain guardrails</h5>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        Each strategy has a hard allocation cap stored in the vault contract (e.g., no single strategy can hold more than 50% of total vault assets).
                      </p>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        These limits are enforced by require() checks in Solidity — they cannot be bypassed, even by the vault owner or keepers.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-semibold mb-2">Circuit breakers & emergency functions</h5>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        Vaults implement a pause mechanism. When paused, deposits and strategy deployments halt, but user withdrawals remain active.
                      </p>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Pause authority is held by a multisig or timelock contract — no single private key can halt or alter the vault unilaterally.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-semibold mb-2">Audit & verification</h5>
                      <ul className="space-y-2 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Contracts are verified on Etherscan so users can read the source code</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Role-based permissions with scoped powers for each role</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Chainlink price feeds with staleness checks to prevent outdated data usage</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Step 4: User Control Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl">
            {/* 4a: Non-custodial by design */}
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold">Non-custodial by design</h3>
              <ul className="space-y-3 text-muted-foreground leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Users retain ownership of their assets at all times.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Vaults cannot withdraw user funds without user interaction.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Withdrawals are permissionless and available at any time.</span>
                </li>
              </ul>
            </div>

            {/* 4b: Transparency */}
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold">Transparency</h3>
              <ul className="space-y-3 text-muted-foreground leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Vault positions are fully on-chain.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Performance and allocations can be tracked in real time.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>No hidden leverage or off-chain activity.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Step 5: Summary & CTA */}
      <section className="border-t border-border/50 bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2
            className="text-4xl font-bold tracking-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            One deposit. Fully automated yield.
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
            DELPHI vaults abstract away protocol complexity while preserving transparency, control, and flexibility.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-lg font-medium rounded-md hover:bg-primary/90 transition-all duration-300 hover:shadow-lg"
          >
            View Vaults
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
