"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Menu } from "lucide-react";

export default function Whitepaper() {
  const [activeSection, setActiveSection] = useState("abstract");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Intersection Observer for active section highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -80% 0px",
      }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setActiveSection(id);
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const tocItems = [
    { id: "abstract", label: "Abstract" },
    { id: "section-1", label: "1. Context and Problem Domain" },
    { id: "section-2", label: "2. Architectural Principles" },
    { id: "section-3", label: "3. High-Level System Components" },
    { id: "section-3-1", label: "3.1 Primary Components", indent: true },
    { id: "section-3-2", label: "3.2 Comparative Architecture Patterns", indent: true },
    { id: "section-4", label: "4. Vault Contracts" },
    { id: "section-4-1", label: "4.1 Vault State and Accounting Model", indent: true },
    { id: "section-4-2", label: "4.2 Deposit and Withdrawal Semantics", indent: true },
    { id: "section-5", label: "5. Strategy Modules" },
    { id: "section-5-1", label: "5.1 Strategy Abstraction", indent: true },
    { id: "section-5-2", label: "5.2 Strategy Lifecycle", indent: true },
    { id: "section-6", label: "6. Execution and Automation Model" },
    { id: "section-6-1", label: "6.1 Permissionless Execution", indent: true },
    { id: "section-6-2", label: "6.2 Execution Predicates", indent: true },
    { id: "section-7", label: "7. Protocol Adapter Layer" },
    { id: "section-7-1", label: "7.1 Adapter Design", indent: true },
    { id: "section-7-2", label: "7.2 Adapter Composability", indent: true },
    { id: "section-8", label: "8. Oracle Integration" },
    { id: "section-8-1", label: "8.1 Oracle Usage Model", indent: true },
    { id: "section-8-2", label: "8.2 Oracle Failure Handling", indent: true },
    { id: "section-9", label: "9. Automation Incentives" },
    { id: "section-10", label: "10. Security Architecture" },
    { id: "section-10-1", label: "10.1 Modular Isolation", indent: true },
    { id: "section-10-2", label: "10.2 Upgrade Controls", indent: true },
    { id: "section-10-3", label: "10.3 Verification and Auditing", indent: true },
    { id: "section-11", label: "11. Governance Framework" },
    { id: "section-12", label: "12. Economic Neutrality and Non-Assumptive Design" },
    { id: "section-13", label: "13. Regulatory-Oriented Design Posture" },
    { id: "section-14", label: "14. Roadmap (Indicative, Non-Binding)" },
    { id: "conclusion", label: "Conclusion" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-12">
          {/* Sticky TOC Sidebar - Desktop Only */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h3 className="text-sm font-semibold mb-4 text-muted-foreground">
                TABLE OF CONTENTS
              </h3>
              <nav className="space-y-1">
                {tocItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left text-sm py-1.5 px-3 rounded transition-colors ${
                      item.indent ? "pl-6" : ""
                    } ${
                      activeSection === item.id
                        ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Mobile TOC Dropdown */}
          <div className="lg:hidden fixed top-20 left-0 right-0 z-40 bg-background border-b border-border">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-full flex items-center justify-between px-6 py-3 text-sm font-medium"
            >
              <span>{tocItems.find((item) => item.id === activeSection)?.label || "Table of Contents"}</span>
              <Menu className="w-4 h-4" />
            </button>
            {mobileMenuOpen && (
              <nav className="max-h-96 overflow-y-auto border-t border-border bg-background">
                {tocItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left text-sm py-2 px-6 ${
                      item.indent ? "pl-10" : ""
                    } ${
                      activeSection === item.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            )}
          </div>

          {/* Main Content Column */}
          <main className="flex-1 max-w-3xl lg:mt-0 mt-16">
            {/* Document Header */}
            <header className="mb-16">
              <h1
                className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                DELPHI Staking
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                A Deterministic Vault-Oriented DeFi Automation Protocol
              </p>
              <hr className="mt-8 border-border" />
            </header>

            {/* Abstract */}
            <section id="abstract" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Abstract
              </h2>
              <div className="space-y-6 text-lg leading-relaxed border-l-4 border-primary pl-6 bg-muted/30 p-6 rounded-r">
                <p>
                  DELPHI Staking is a decentralized, non-custodial protocol architecture designed to coordinate automated interaction between user-deposited digital assets and heterogeneous on-chain financial primitives. The system is composed of modular vault contracts, execution strategy modules, protocol adapter interfaces, and auxiliary automation mechanisms that together enable programmable asset routing, state-based execution, and cross-protocol composability.
                </p>
                <p>
                  The protocol is explicitly agnostic to economic outcomes and does not encode assumptions regarding asset performance, return generation, or risk profiles. All system behavior is defined by deterministic smart contract logic, executed within the constraints of the underlying blockchain environment, and subject to transparent on-chain verification.
                </p>
              </div>
            </section>

            {/* Section 1 */}
            <section id="section-1" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6 mt-16" style={{ fontFamily: "var(--font-display)" }}>
                <span className="text-muted-foreground font-normal">1.</span> Context and Problem Domain
              </h2>
              <div className="space-y-6 text-base leading-relaxed">
                <p>
                  Decentralized financial systems expose a growing set of programmable primitives — automated exchanges, lending markets, liquidity pools, and oracle networks — each governed by independent state machines and economic rules. While these primitives are natively composable, their coordinated use often requires repeated state evaluation, conditional execution across protocols, asset routing and reallocation, and transaction batching and optimization.
                </p>
                <p>
                  Absent an automation layer, these operations impose significant operational overhead and introduce fragmentation at the user and integrator level.
                </p>
                <p>
                  DELPHI Staking addresses this domain by providing a vault-centric execution framework that abstracts repetitive on-chain operations into reusable, parameterized components.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="section-2" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6 mt-16" style={{ fontFamily: "var(--font-display)" }}>
                <span className="text-muted-foreground font-normal">2.</span> Architectural Principles
              </h2>
              <div className="space-y-6 text-base leading-relaxed">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border border-border rounded-lg p-6">
                    <h4 className="font-semibold mb-2">Vault-Centric Asset Accounting</h4>
                    <p className="text-muted-foreground text-sm">
                      User assets are pooled within vault contracts that maintain proportional accounting through internal share representations.
                    </p>
                  </div>
                  <div className="border border-border rounded-lg p-6">
                    <h4 className="font-semibold mb-2">Separation of Concerns</h4>
                    <p className="text-muted-foreground text-sm">
                      Asset custody, execution logic, and protocol-specific interactions are isolated into discrete modules.
                    </p>
                  </div>
                  <div className="border border-border rounded-lg p-6">
                    <h4 className="font-semibold mb-2">Deterministic Strategy Execution</h4>
                    <p className="text-muted-foreground text-sm">
                      Execution pathways are governed by predefined logic evaluated against on-chain state, rather than discretionary or off-chain decision-making.
                    </p>
                  </div>
                  <div className="border border-border rounded-lg p-6">
                    <h4 className="font-semibold mb-2">Composable Protocol Interfacing</h4>
                    <p className="text-muted-foreground text-sm">
                      External protocol interactions are mediated through adapter contracts that standardize call semantics.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="section-3" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6 mt-16" style={{ fontFamily: "var(--font-display)" }}>
                <span className="text-muted-foreground font-normal">3.</span> High-Level System Components
              </h2>

              {/* Section 3.1 */}
              <section id="section-3-1" className="mb-12 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-4 mt-8">
                  <span className="text-muted-foreground font-normal">3.1</span> Primary Components
                </h3>
                <div className="space-y-4 text-base leading-relaxed">
                  <ol className="space-y-3 list-decimal list-inside">
                    <li><strong>Vault Contracts</strong> — asset aggregation and accounting</li>
                    <li><strong>Strategy Modules</strong> — executable logic defining permissible actions</li>
                    <li><strong>Protocol Adapters</strong> — standardized interfaces to external contracts</li>
                    <li><strong>Automation Triggers</strong> — permissionless execution incentives</li>
                    <li><strong>Governance Controls</strong> — parameter and module lifecycle management</li>
                  </ol>
                  <p className="text-sm text-muted-foreground italic mt-4">
                    Each component is independently deployable, auditable, and upgradable subject to governance constraints.
                  </p>
                </div>
              </section>

              {/* Section 3.2 */}
              <section id="section-3-2" className="mb-12 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-4 mt-8">
                  <span className="text-muted-foreground font-normal">3.2</span> Comparative Architecture Patterns
                </h3>
                <Accordion type="single" collapsible className="w-full mb-6">
                  {/* Comparison A */}
                  <AccordionItem value="a">
                    <AccordionTrigger>Vault-Centric vs. Account-Centric Models</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold mb-2 text-sm">DELPHI Pattern</h5>
                          <p className="text-sm text-muted-foreground">
                            Assets aggregated into shared contract-level state machines. Users receive proportional accounting units. Execution operates on pooled liquidity. State transitions affect all participants proportionally.
                          </p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2 text-sm">Contrasting Pattern</h5>
                          <p className="text-sm text-muted-foreground">
                            Assets isolated per user account. Execution logic duplicated per account. Efficiency degrades with scale. Automation requires individualized triggers.
                          </p>
                        </div>
                      </div>
                      <div className="border-l-4 border-primary bg-muted/50 p-4 rounded-r text-sm">
                        <strong>Design Implication:</strong> Vault-centric systems favor composability, gas efficiency, and strategy reuse; account-centric systems prioritize isolation and customization.
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Comparison B */}
                  <AccordionItem value="b">
                    <AccordionTrigger>Strategy Abstraction vs. Monolithic Execution</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold mb-2 text-sm">DELPHI Pattern</h5>
                          <p className="text-sm text-muted-foreground">
                            Execution logic encapsulated in modular strategy contracts. Strategies swappable without redeploying vaults. Multiple strategies may coexist. Logic upgrades isolated from accounting.
                          </p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2 text-sm">Contrasting Pattern</h5>
                          <p className="text-sm text-muted-foreground">
                            Execution logic embedded directly in asset-holding contracts. Upgrades require full redeployment or migration. Increased coupling between asset state and execution behavior.
                          </p>
                        </div>
                      </div>
                      <div className="border-l-4 border-primary bg-muted/50 p-4 rounded-r text-sm">
                        <strong>Design Implication:</strong> Decoupling strategy logic reduces upgrade risk and enables iterative protocol evolution.
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Comparison C */}
                  <AccordionItem value="c">
                    <AccordionTrigger>Adapter-Based Integration vs. Native Coupling</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold mb-2 text-sm">DELPHI Pattern</h5>
                          <p className="text-sm text-muted-foreground">
                            External interactions mediated through standardized interfaces. Vault and strategy logic remain protocol-agnostic. Adapters encapsulate approval flows, call semantics, error handling. Protocol additions don't require core modification.
                          </p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2 text-sm">Contrasting Pattern</h5>
                          <p className="text-sm text-muted-foreground">
                            External calls hard-coded into execution logic. Protocol-specific assumptions permeate design. Expansion increases complexity and attack surface.
                          </p>
                        </div>
                      </div>
                      <div className="border-l-4 border-primary bg-muted/50 p-4 rounded-r text-sm">
                        <strong>Design Implication:</strong> Adapter layers improve extensibility and reduce systemic fragility.
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Comparison D */}
                  <AccordionItem value="d">
                    <AccordionTrigger>Permissionless Execution vs. Privileged Operators</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold mb-2 text-sm">DELPHI Pattern</h5>
                          <p className="text-sm text-muted-foreground">
                            Any actor may trigger eligible execution paths. Eligibility enforced entirely by on-chain predicates. No reliance on trusted keepers or centralized schedulers. Incentive mechanisms encourage participation.
                          </p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2 text-sm">Contrasting Pattern</h5>
                          <p className="text-sm text-muted-foreground">
                            Execution restricted to designated addresses or services. Requires off-chain coordination and trust assumptions. Introduces liveness and censorship risk.
                          </p>
                        </div>
                      </div>
                      <div className="border-l-4 border-primary bg-muted/50 p-4 rounded-r text-sm">
                        <strong>Design Implication:</strong> Permissionless execution maximizes decentralization and minimizes operational trust dependencies.
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Comparison E */}
                  <AccordionItem value="e">
                    <AccordionTrigger>Predicate-Gated Automation vs. Continuous Optimization</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold mb-2 text-sm">DELPHI Pattern</h5>
                          <p className="text-sm text-muted-foreground">
                            Execution conditional on explicit, deterministic state checks. No assumptions of optimality or outcome targeting. Emphasizes correctness and safety.
                          </p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2 text-sm">Contrasting Pattern</h5>
                          <p className="text-sm text-muted-foreground">
                            Implicitly aims to adjust toward perceived optimal configurations. Often requires subjective parameterization or off-chain logic. May embed economic assumptions.
                          </p>
                        </div>
                      </div>
                      <div className="border-l-4 border-primary bg-muted/50 p-4 rounded-r text-sm">
                        <strong>Design Implication:</strong> Predicate-gated systems favor predictability and auditability over adaptive complexity.
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Comparison F */}
                  <AccordionItem value="f">
                    <AccordionTrigger>Governance-Constrained Upgradability vs. Mutable Control</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold mb-2 text-sm">DELPHI Pattern</h5>
                          <p className="text-sm text-muted-foreground">
                            Upgrades subject to time delays and on-chain approval. Change scope explicitly defined. Historical state transitions remain verifiable.
                          </p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2 text-sm">Contrasting Pattern</h5>
                          <p className="text-sm text-muted-foreground">
                            Immediate or opaque upgrades possible. Increased risk of unexpected behavior changes. Reduced auditability.
                          </p>
                        </div>
                      </div>
                      <div className="border-l-4 border-primary bg-muted/50 p-4 rounded-r text-sm">
                        <strong>Design Implication:</strong> Governance-constrained upgrades balance flexibility with protocol integrity.
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Comparison G */}
                  <AccordionItem value="g">
                    <AccordionTrigger>Economic Neutrality vs. Outcome-Oriented Design</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold mb-2 text-sm">DELPHI Pattern</h5>
                          <p className="text-sm text-muted-foreground">
                            No encoded assumptions about returns, risk, or performance. Execution logic focuses on mechanical correctness. Economic behavior emerges externally.
                          </p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2 text-sm">Contrasting Pattern</h5>
                          <p className="text-sm text-muted-foreground">
                            Encodes assumptions about desirable economic states. Often includes implicit optimization targets. Increases regulatory and design complexity.
                          </p>
                        </div>
                      </div>
                      <div className="border-l-4 border-primary bg-muted/50 p-4 rounded-r text-sm">
                        <strong>Design Implication:</strong> Economic neutrality reduces systemic assumptions and regulatory surface area.
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <p className="text-base leading-relaxed mt-6">
                  The DELPHI Staking protocol intentionally aligns with architectural patterns that emphasize deterministic execution, modular abstraction, composability, permissionless participation, and governance-bounded evolution — while explicitly avoiding patterns that introduce discretionary control, economic targeting, or protocol-specific coupling.
                </p>
              </section>
            </section>

            {/* Section 4 */}
            <section id="section-4" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6 mt-16" style={{ fontFamily: "var(--font-display)" }}>
                <span className="text-muted-foreground font-normal">4.</span> Vault Contracts
              </h2>

              <section id="section-4-1" className="mb-8 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-4 mt-8">
                  <span className="text-muted-foreground font-normal">4.1</span> Vault State and Accounting Model
                </h3>
                <p className="text-base leading-relaxed">
                  Vaults are smart contracts responsible for accepting deposits of supported digital assets, issuing internal accounting units ("shares"), tracking total managed balances, and enforcing withdrawal and redemption rules. Shares represent proportional claims on vault-held assets and are updated deterministically as the vault state evolves.
                </p>
              </section>

              <section id="section-4-2" className="mb-8 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-4 mt-8">
                  <span className="text-muted-foreground font-normal">4.2</span> Deposit and Withdrawal Semantics
                </h3>
                <p className="text-base leading-relaxed">
                  Deposits increase the vault's asset balance and result in the minting of shares according to the vault's accounting logic. Withdrawals burn shares and return assets based on current vault state. Vaults do not guarantee asset equivalence or temporal predictability; all outcomes are strictly a function of executed contract logic.
                </p>
              </section>
            </section>

            {/* Section 5 */}
            <section id="section-5" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6 mt-16" style={{ fontFamily: "var(--font-display)" }}>
                <span className="text-muted-foreground font-normal">5.</span> Strategy Modules
              </h2>

              <section id="section-5-1" className="mb-8 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-4 mt-8">
                  <span className="text-muted-foreground font-normal">5.1</span> Strategy Abstraction
                </h3>
                <div className="space-y-6 text-base leading-relaxed">
                  <p>
                    Strategy modules are smart contracts that define how and when vault-held assets may be interacted with external protocols. Strategies do not custody assets directly; instead, they operate via delegated permissions from vault contracts.
                  </p>
                  <p>
                    Each strategy specifies: valid asset types, external protocol targets, execution conditions, and state transition constraints.
                  </p>
                </div>
              </section>

              <section id="section-5-2" className="mb-8 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-4 mt-8">
                  <span className="text-muted-foreground font-normal">5.2</span> Strategy Lifecycle
                </h3>
                <p className="text-base leading-relaxed">
                  Strategies may be activated, deactivated, or replaced according to governance-defined processes. Vaults may support one or more active strategies concurrently, subject to compatibility constraints.
                </p>
              </section>
            </section>

            {/* Section 6 */}
            <section id="section-6" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6 mt-16" style={{ fontFamily: "var(--font-display)" }}>
                <span className="text-muted-foreground font-normal">6.</span> Execution and Automation Model
              </h2>

              <section id="section-6-1" className="mb-8 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-4 mt-8">
                  <span className="text-muted-foreground font-normal">6.1</span> Permissionless Execution
                </h3>
                <p className="text-base leading-relaxed">
                  Execution of strategy actions is designed to be permissionless. Any externally owned account or contract may trigger eligible actions when execution predicates are satisfied. This model minimizes reliance on privileged actors and enables decentralized upkeep.
                </p>
              </section>

              <section id="section-6-2" className="mb-8 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-4 mt-8">
                  <span className="text-muted-foreground font-normal">6.2</span> Execution Predicates
                </h3>
                <p className="text-base leading-relaxed">
                  Strategy execution is gated by on-chain predicates, which may include asset balance thresholds, time-based intervals, external protocol state variables, and oracle-provided data inputs. If predicates are satisfied, execution paths are unlocked; otherwise, calls revert deterministically.
                </p>
              </section>
            </section>

            {/* Section 7 */}
            <section id="section-7" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6 mt-16" style={{ fontFamily: "var(--font-display)" }}>
                <span className="text-muted-foreground font-normal">7.</span> Protocol Adapter Layer
              </h2>

              <section id="section-7-1" className="mb-8 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-4 mt-8">
                  <span className="text-muted-foreground font-normal">7.1</span> Adapter Design
                </h3>
                <p className="text-base leading-relaxed">
                  Protocol adapters abstract the idiosyncrasies of external DeFi protocols by exposing standardized interfaces for asset deposits and withdrawals, liquidity position management, reward claim functions, and position unwinding. Adapters are intentionally narrow in scope to reduce attack surface.
                </p>
              </section>

              <section id="section-7-2" className="mb-8 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-4 mt-8">
                  <span className="text-muted-foreground font-normal">7.2</span> Adapter Composability
                </h3>
                <p className="text-base leading-relaxed">
                  Adapters may be reused across multiple strategies and vaults, provided interface compatibility is maintained. This enables composability without requiring vault-level awareness of protocol-specific logic.
                </p>
              </section>
            </section>

            {/* Section 8 */}
            <section id="section-8" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6 mt-16" style={{ fontFamily: "var(--font-display)" }}>
                <span className="text-muted-foreground font-normal">8.</span> Oracle Integration
              </h2>

              <section id="section-8-1" className="mb-8 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-4 mt-8">
                  <span className="text-muted-foreground font-normal">8.1</span> Oracle Usage Model
                </h3>
                <p className="text-base leading-relaxed">
                  Strategies may reference decentralized oracle feeds to obtain external data necessary for predicate evaluation or parameter computation. Oracle data is treated as input signals, not authoritative truth, and is always subject to bounds checking and sanity constraints.
                </p>
              </section>

              <section id="section-8-2" className="mb-8 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-4 mt-8">
                  <span className="text-muted-foreground font-normal">8.2</span> Oracle Failure Handling
                </h3>
                <p className="text-base leading-relaxed">
                  The protocol incorporates defensive patterns such as staleness detection, value bounds enforcement, and graceful execution degradation. No strategy assumes oracle availability or correctness as a prerequisite for safety.
                </p>
              </section>
            </section>

            {/* Section 9 */}
            <section id="section-9" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6 mt-16" style={{ fontFamily: "var(--font-display)" }}>
                <span className="text-muted-foreground font-normal">9.</span> Automation Incentives
              </h2>
              <p className="text-base leading-relaxed">
                To encourage timely execution of eligible actions, the protocol may incorporate incentive mechanisms that compensate callers for successful execution. Incentive parameters are defined at the strategy or vault level and are fully transparent on-chain. Automation incentives do not convey discretionary authority or managerial control.
              </p>
            </section>

            {/* Section 10 */}
            <section id="section-10" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6 mt-16" style={{ fontFamily: "var(--font-display)" }}>
                <span className="text-muted-foreground font-normal">10.</span> Security Architecture
              </h2>

              <section id="section-10-1" className="mb-8 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-4 mt-8">
                  <span className="text-muted-foreground font-normal">10.1</span> Modular Isolation
                </h3>
                <p className="text-base leading-relaxed">
                  By isolating vault accounting, strategy execution, and protocol adapters, the protocol reduces correlated failure risk. Compromise of one module does not imply compromise of the entire system.
                </p>
              </section>

              <section id="section-10-2" className="mb-8 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-4 mt-8">
                  <span className="text-muted-foreground font-normal">10.2</span> Upgrade Controls
                </h3>
                <p className="text-base leading-relaxed">
                  Upgradable components are subject to time-delayed governance actions, on-chain signaling, and publicly auditable change logs. Immutable deployments are preferred where practical.
                </p>
              </section>

              <section id="section-10-3" className="mb-8 scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-4 mt-8">
                  <span className="text-muted-foreground font-normal">10.3</span> Verification and Auditing
                </h3>
                <p className="text-base leading-relaxed">
                  Security assurance includes static analysis, differential testing, third-party audits, and continuous monitoring of deployed contracts. Audit artifacts are published alongside deployment metadata.
                </p>
              </section>
            </section>

            {/* Section 11 */}
            <section id="section-11" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6 mt-16" style={{ fontFamily: "var(--font-display)" }}>
                <span className="text-muted-foreground font-normal">11.</span> Governance Framework
              </h2>
              <p className="text-base leading-relaxed">
                Governance mechanisms, if enabled, are expected to control strategy approval and retirement, adapter whitelisting, parameter tuning, and upgrade authorization. Governance does not exercise discretionary control over individual user positions or execution timing.
              </p>
            </section>

            {/* Section 12 */}
            <section id="section-12" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6 mt-16" style={{ fontFamily: "var(--font-display)" }}>
                <span className="text-muted-foreground font-normal">12.</span> Economic Neutrality and Non-Assumptive Design
              </h2>
              <p className="text-base leading-relaxed">
                The protocol intentionally avoids encoding assumptions regarding asset valuation trajectories, market efficiency, risk reduction, or outcome predictability. All economic results arise solely from smart contract execution and external protocol behavior.
              </p>
            </section>

            {/* Section 13 */}
            <section id="section-13" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6 mt-16" style={{ fontFamily: "var(--font-display)" }}>
                <span className="text-muted-foreground font-normal">13.</span> Regulatory-Oriented Design Posture
              </h2>
              <p className="text-base leading-relaxed">
                DELPHI Staking is designed as a non-custodial smart contract system, an automation and execution framework, and an infrastructure-layer protocol. It does not function as an investment vehicle, advisory service, broker, or centralized intermediary.
              </p>
            </section>

            {/* Section 14 */}
            <section id="section-14" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6 mt-16" style={{ fontFamily: "var(--font-display)" }}>
                <span className="text-muted-foreground font-normal">14.</span> Roadmap (Indicative, Non-Binding)
              </h2>
              <p className="text-base leading-relaxed">
                Future work may include expanded strategy libraries, cross-chain vault abstractions, developer tooling and SDKs, and formal governance instantiation. All development is subject to security review and ecosystem readiness.
              </p>
            </section>

            {/* Conclusion */}
            <section id="conclusion" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6 mt-16" style={{ fontFamily: "var(--font-display)" }}>
                Conclusion
              </h2>
              <p className="text-base leading-relaxed">
                DELPHI Staking formalizes a vault-based automation paradigm for decentralized financial systems, emphasizing determinism, modularity, and composability. By separating asset accounting, execution logic, and protocol interfacing, the protocol aims to serve as a generalized coordination layer for on-chain financial activity without embedding economic assumptions or outcome-oriented guarantees.
              </p>
            </section>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
