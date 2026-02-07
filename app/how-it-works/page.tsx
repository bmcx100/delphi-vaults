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
                  Vault architecture
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Each vault is a non-custodial smart contract system designed to deploy user capital across multiple yield-generating strategies while minimizing manual intervention and operational risk. Vaults do not rely on a single protocol or position. Instead, they dynamically manage capital across a set of predefined strategies.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* 3b: Capital Allocation */}
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-xl font-semibold">
                  Capital allocation
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Funds are pooled inside the vault contract. Capital is allocated across integrated protocols based on predefined strategy logic. Allocation weights adjust over time as conditions change.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Lending markets</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Liquidity pools</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Fee-generating automated market maker positions</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* 3c: Automation & Rebalancing */}
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-xl font-semibold">
                  Automation & rebalancing
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Vaults continuously perform:
                  </p>
                  <ul className="space-y-2 text-muted-foreground mb-4">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Rebalancing positions to maintain target exposure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Adjusting liquidity ranges where applicable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Migrating capital between strategies when risk or yield profiles change</span>
                    </li>
                  </ul>
                  <p className="text-sm italic text-muted-foreground">
                    All actions are executed automatically via smart contracts.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* 3d: Compounding & Gas Optimization */}
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-xl font-semibold">
                  Compounding & gas optimization
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-muted-foreground mb-4">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Rewards are periodically harvested</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Returns are reinvested back into the vault</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Actions are batched to reduce gas costs per user</span>
                    </li>
                  </ul>
                  <p className="text-sm italic text-muted-foreground">
                    This allows vaults to compound yield efficiently without requiring manual claims.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* 3e: Risk Controls */}
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-xl font-semibold">
                  Risk controls
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Each vault operates within defined constraints:
                  </p>
                  <ul className="space-y-2 text-muted-foreground mb-4">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Strategy allocation limits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Exposure caps per protocol</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Automated guards to prevent undesired states</span>
                    </li>
                  </ul>
                  <p className="text-sm italic text-muted-foreground">
                    Vault parameters can be updated as protocols or market conditions evolve.
                  </p>
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
