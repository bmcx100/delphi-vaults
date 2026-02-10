"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { ChevronDown, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { chain } = useAccount();
  const isWrongNetwork = chain && chain.id !== 1;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Left side: Logo */}
        <div className="flex items-center">
          <Link href="/">
            <img
              src="/images/Delphi Logo Full.png"
              alt="Delphi"
              className="h-10 w-auto object-contain cursor-pointer"
            />
          </Link>
        </div>

        {/* Center: Navigation Links (desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/how-it-works" className="text-foreground/70 hover:text-foreground transition-colors">
            How It Works
          </Link>
          <Link href="/whitepaper" className="text-foreground/70 hover:text-foreground transition-colors">
            Whitepaper
          </Link>
          <Link href="/security" className="text-foreground/70 hover:text-foreground transition-colors">
            Security
          </Link>
        </nav>

        {/* Right side: Theme toggle, Network badge, Connect Wallet, and Mobile menu button */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {chain && (
            <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium ${
              isWrongNetwork ? "bg-destructive/10 text-destructive" : "bg-muted"
            }`}>
              <div className={`w-2 h-2 rounded-full ${isWrongNetwork ? "bg-destructive" : "bg-primary"}`}></div>
              <span>{chain.name}</span>
            </div>
          )}

          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              const ready = mounted && authenticationStatus !== 'loading';
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === 'authenticated');

              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    'style': {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <button
                          onClick={openConnectModal}
                          className="px-4 md:px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors"
                        >
                          <span className="hidden sm:inline">Connect Wallet</span>
                          <span className="sm:hidden">Connect</span>
                        </button>
                      );
                    }

                    return (
                      <button
                        onClick={openAccountModal}
                        className="px-4 md:px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
                      >
                        <span>{account.displayName}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground/70 hover:text-foreground transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col items-end gap-4">
            <Link
              href="/how-it-works"
              className="text-foreground/70 hover:text-foreground transition-colors text-sm font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/whitepaper"
              className="text-foreground/70 hover:text-foreground transition-colors text-sm font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Whitepaper
            </Link>
            <Link
              href="/security"
              className="text-foreground/70 hover:text-foreground transition-colors text-sm font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Security
            </Link>
            {chain && (
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium w-fit ${
                isWrongNetwork ? "bg-destructive/10 text-destructive" : "bg-muted"
              }`}>
                <div className={`w-2 h-2 rounded-full ${isWrongNetwork ? "bg-destructive" : "bg-primary"}`}></div>
                <span>{chain.name}</span>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
