"use client";

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { ChevronDown } from 'lucide-react';

export default function Navbar() {
  const { chain } = useAccount();
  const isWrongNetwork = chain && chain.id !== 1;

  return (
    <header className="border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Left side: Logo */}
        <div className="flex items-center">
          <a href="/">
            <img
              src="/images/Delphi Logo Full.png"
              alt="Delphi"
              className="h-10 w-auto object-contain cursor-pointer"
            />
          </a>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="/how-it-works" className="text-foreground/70 hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="/whitepaper" className="text-foreground/70 hover:text-foreground transition-colors">
            Whitepaper
          </a>
          <a href="/security" className="text-foreground/70 hover:text-foreground transition-colors">
            Security
          </a>
        </nav>

        {/* Right side: Network badge and Connect Wallet button */}
        <div className="flex items-center gap-4">
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
        </div>
      </div>
    </header>
  );
}
