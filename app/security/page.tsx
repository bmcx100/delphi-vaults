"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Shield, Settings, Unlock, Key, Grid3x3, FileCheck, BarChart3, Power, Radio, ArrowRight } from "lucide-react";

export default function Security() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Step 2: Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-12">
        <div className="max-w-3xl mb-12 opacity-0 animate-fade-in-up animate-delay-100">
          <h1
            className="text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Security
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            How DELPHI protects your assets at every layer
          </p>
          <div className="space-y-6 text-base leading-relaxed">
            <p>
              Security isn't a feature we added on top — it's the foundation everything else is built on. From the moment you deposit to the moment you withdraw, every interaction is governed by audited smart contracts, transparent on-chain logic, and layered safeguards designed to minimize risk at every level.
            </p>
            <p>
              No protocol can eliminate risk entirely — DeFi operates on public blockchains with real economic exposure, and that comes with inherent uncertainty. What we can do is build with discipline: reduce attack surface, enforce constraints in code, and make everything transparent enough that you can evaluate the risks for yourself.
            </p>
          </div>
        </div>
      </section>

      {/* Step 3: Security at Every Step */}
      <section className="border-y border-border/50 bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 - Deposit */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Secure Deposits</h3>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  When you deposit tokens into a DELPHI vault, your assets are held by a non-custodial smart contract — not a company, not a team, not a centralized server. The vault contract has been audited and verified on-chain, meaning anyone can inspect exactly how it handles funds. No human intermediary ever touches your assets.
                </p>
                <p>
                  That said, smart contracts carry their own risks. Bugs, unforeseen edge cases, or vulnerabilities in the Ethereum ecosystem itself can affect any protocol. Audits and verification reduce this risk significantly, but they do not eliminate it — which is why we layer multiple safeguards on top of each other.
                </p>
              </div>
            </div>

            {/* Card 2 - Vault Operations */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Protected Automation</h3>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  While your assets are working inside the vault, every action — rebalancing, compounding, moving capital between strategies — is executed by smart contracts operating within strict predefined rules. No one can redirect funds to an unauthorized address. Automation triggers are permissionless but gated by on-chain conditions, so actions only execute when the correct criteria are met.
                </p>
                <p>
                  Because vaults interact with external DeFi protocols (lending markets, liquidity pools, AMMs), your assets are also exposed to the risks of those protocols. A vulnerability or failure in an integrated protocol can affect vault positions. DELPHI mitigates this through allocation caps and the ability to withdraw from compromised strategies, but external protocol risk can never be fully controlled.
                </p>
              </div>
            </div>

            {/* Card 3 - Withdrawal */}
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Unlock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Withdraw Anytime</h3>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  Your ability to withdraw is never restricted. There are no lockups, no approval queues, and no dependency on a third party to release your funds. Withdrawals are processed directly by the vault contract — you send the transaction, you receive your assets. This is enforced at the contract level and cannot be overridden.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 4: How We Protect You */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-4xl font-bold tracking-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            How We Protect You
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-12 max-w-3xl">
            DeFi is powerful, but it's not without risk. Smart contract vulnerabilities, volatile markets, oracle failures, and external protocol exploits are real possibilities in any decentralized system. We don't pretend otherwise. Instead, we build with the assumption that things can go wrong — and design every layer to limit the damage when they do.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Block 1 - Non-Custodial Architecture */}
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Key className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Your keys, your assets</h3>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  DELPHI is non-custodial by design. That means we never hold, manage, or have access to your private keys or funds. Your assets live in smart contracts that only you can withdraw from.
                </p>
                <p>
                  Unlike centralized platforms where a company controls the treasury, DELPHI vaults are autonomous contracts on the Ethereum blockchain. There is no back door, no admin override for withdrawals, and no scenario in which the team can move user funds.
                </p>
              </div>
            </div>

            {/* Block 2 - Modular Isolation */}
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Grid3x3 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Isolated by design</h3>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  The protocol is built as a set of independent modules — vault contracts handle accounting, strategy contracts handle deployment logic, and adapter contracts handle communication with external protocols. Each module is a separate smart contract with its own scope and permissions.
                </p>
                <p>
                  This means a vulnerability in one strategy doesn't automatically compromise the vault or other strategies. Risk is contained by architecture, not just by hope.
                </p>
              </div>
            </div>

            {/* Block 3 - Audits & Verification */}
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <FileCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Audited and verified</h3>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  All core contracts undergo third-party security audits before deployment. Audit reports are published publicly so anyone can review the findings.
                </p>
                <p>
                  Beyond audits, the protocol uses static analysis tools, differential testing, and continuous monitoring of deployed contracts to catch issues before and after launch. Every contract is verified on Etherscan, making the source code fully readable and inspectable by anyone.
                </p>
                <p>
                  It's important to understand that audits are not guarantees. They significantly reduce the likelihood of vulnerabilities, but no audit can certify that a smart contract is perfectly safe. This is true across all of DeFi — which is why we treat audits as one layer in a broader security strategy, not the only one.
                </p>
              </div>
            </div>

            {/* Block 4 - On-Chain Guardrails */}
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Built-in limits and safeguards</h3>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  Vaults enforce hard limits at the contract level. Each strategy has an allocation cap — a maximum percentage of the vault's total assets it can hold. Exposure to any single external protocol is also bounded, preventing dangerous over-concentration.
                </p>
                <p>
                  These guardrails are enforced by the smart contract code itself. They can't be bypassed by keepers, bots, or even governance — they're hardcoded rules that every transaction must satisfy.
                </p>
              </div>
            </div>

            {/* Block 5 - Circuit Breakers */}
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Power className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Emergency safeguards</h3>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  If something unexpected happens — a vulnerability in an external protocol, unusual market conditions, or a detected anomaly — the vault can be paused. When paused, new deposits and strategy deployments halt immediately, but withdrawals remain fully active. You can always get your assets out.
                </p>
                <p>
                  Emergency actions like pausing or removing a compromised strategy require multi-signature authorization through a Gnosis Safe multisig. No single person or key can trigger these actions alone, preventing both accidents and abuse.
                </p>
              </div>
            </div>

            {/* Block 6 - Oracle Safety */}
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Radio className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Trusted data, verified twice</h3>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  When vaults need external data — such as token prices for rebalancing decisions — they rely on decentralized oracle networks like Chainlink. But the protocol never trusts data blindly.
                </p>
                <p>
                  Every oracle input passes through staleness checks (is this data recent enough?) and bounds enforcement (is this value within a reasonable range?). If an oracle feed goes stale or returns suspicious data, the vault pauses affected operations rather than acting on bad information.
                </p>
                <p>
                  Oracle manipulation and data feed failures are among the most common attack vectors in DeFi. While these safeguards dramatically reduce exposure, the reliance on any external data source introduces a degree of risk that cannot be fully eliminated — only managed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 5: Governance & Upgrades */}
      <section className="border-y border-border/50 bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-4xl font-bold tracking-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Governance & Upgrades
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-12 max-w-3xl">
            Protocols evolve. New strategies get added, parameters get tuned, and external conditions change. But upgrades to DELPHI are never instant or unilateral — they're governed by a transparent, constrained process.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
            {/* Block A */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Time-locked and transparent</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Any upgrade to the protocol — adding a new strategy, adjusting allocation caps, whitelisting a new protocol adapter — goes through a time-delayed governance process. Changes are proposed on-chain, visible to everyone, and subject to a waiting period before they take effect.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                This gives users and the community time to review proposed changes and react before anything goes live. There are no silent updates or surprise modifications.
              </p>
            </div>

            {/* Block B */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">No single point of control</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                The protocol uses role-based access control to separate permissions. Keepers can trigger rebalancing actions but can't move funds. Allocators can adjust strategy weights but can't deploy new contracts. Guardians can pause the system in an emergency but can't withdraw assets.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                No single role has full control. And the most sensitive actions — like upgrading core contracts — require multi-signature approval with enforced time delays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Step 6: Transparency */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-4xl font-bold tracking-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Full Transparency
          </h2>
          <div className="max-w-3xl space-y-4 text-base leading-relaxed">
            <p>
              Every vault position, every strategy allocation, and every transaction is recorded on the Ethereum blockchain. There is no off-chain activity, no hidden leverage, and no opaque decision-making. You can verify the state of your assets at any time using any block explorer.
            </p>
            <p>
              DELPHI doesn't ask you to trust us. It's built so you don't have to.
            </p>
          </div>
        </div>
      </section>

      {/* Step 7: Understanding the Risks */}
      <section className="border-t border-border/50 bg-muted/50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto border border-border bg-card rounded-lg p-8">
            <h2
              className="text-3xl font-bold tracking-tight mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Understanding the Risks
            </h2>
            <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
              <p>
                DELPHI is built to minimize risk — but no DeFi protocol can eliminate it. Using any decentralized application involves inherent risks that every user should understand before depositing funds.
              </p>
              <p>
                <strong>Smart contract risk.</strong> Despite audits, testing, and formal verification, smart contracts may contain undiscovered vulnerabilities. This applies to DELPHI's own contracts as well as every external protocol the vaults interact with.
              </p>
              <p>
                <strong>Market risk.</strong> The value of digital assets is volatile. Token prices can move sharply and unpredictably. DELPHI vaults do not protect against market downturns — if the underlying assets lose value, your position loses value too.
              </p>
              <p>
                <strong>Protocol and composability risk.</strong> Vaults deploy capital into third-party DeFi protocols. If one of those protocols suffers an exploit, a governance attack, or an economic failure, assets deployed to that protocol may be affected. Modular isolation and allocation caps reduce this exposure, but they cannot prevent it entirely.
              </p>
              <p>
                <strong>Blockchain and network risk.</strong> DELPHI operates on the Ethereum blockchain. Network congestion, high gas costs, consensus bugs, or changes to the Ethereum protocol itself could affect the availability or cost of interacting with the vaults.
              </p>
              <p>
                <strong>Regulatory risk.</strong> The regulatory landscape for decentralized finance is evolving. Changes in law or enforcement actions in any jurisdiction could affect the protocol, its availability, or the assets it supports.
              </p>
              <p className="text-base font-medium">
                We build with every safeguard we can. But the honest truth is that DeFi is still an emerging space, and using it means accepting a level of risk that does not exist in traditional finance. Only deposit what you can afford to lose, and take the time to understand how the protocol works before committing capital.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Step 8: CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2
            className="text-4xl font-bold tracking-tight mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ready to get started?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-lg font-medium rounded-md hover:bg-primary/90 transition-all duration-300 hover:shadow-lg"
            >
              View Vaults
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="/whitepaper"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-border text-foreground text-lg font-medium rounded-md hover:bg-muted transition-all duration-300"
            >
              Read the Whitepaper
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
