"use client";

import { useState, useEffect, useCallback } from "react";

interface WalletState {
  address: string | null;
  chainId: number | null;
  isConnected: boolean;
  isMetaMaskInstalled: boolean;
}

export function useWallet() {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    chainId: null,
    isConnected: false,
    isMetaMaskInstalled: false,
  });

  // Check if MetaMask is installed
  useEffect(() => {
    const checkMetaMask = () => {
      const { ethereum } = window as any;
      setWalletState((prev) => ({
        ...prev,
        isMetaMaskInstalled: !!ethereum && ethereum.isMetaMask,
      }));
    };

    checkMetaMask();
  }, []);

  // Check if already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      const { ethereum } = window as any;
      if (!ethereum) return;

      try {
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          const chainId = await ethereum.request({ method: "eth_chainId" });
          setWalletState({
            address: accounts[0],
            chainId: parseInt(chainId, 16),
            isConnected: true,
            isMetaMaskInstalled: true,
          });
        }
      } catch (error) {
        console.error("Error checking connection:", error);
      }
    };

    checkConnection();
  }, []);

  // Listen for account changes
  useEffect(() => {
    const { ethereum } = window as any;
    if (!ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // Disconnected
        setWalletState((prev) => ({
          ...prev,
          address: null,
          isConnected: false,
        }));
      } else {
        // Account changed
        setWalletState((prev) => ({
          ...prev,
          address: accounts[0],
          isConnected: true,
        }));
      }
    };

    const handleChainChanged = (chainId: string) => {
      setWalletState((prev) => ({
        ...prev,
        chainId: parseInt(chainId, 16),
      }));
    };

    ethereum.on("accountsChanged", handleAccountsChanged);
    ethereum.on("chainChanged", handleChainChanged);

    return () => {
      ethereum.removeListener("accountsChanged", handleAccountsChanged);
      ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, []);

  // Connect wallet
  const connect = useCallback(async () => {
    const { ethereum } = window as any;

    if (!ethereum) {
      alert("MetaMask is not installed. Please install MetaMask to continue.");
      return;
    }

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const chainId = await ethereum.request({ method: "eth_chainId" });

      setWalletState({
        address: accounts[0],
        chainId: parseInt(chainId, 16),
        isConnected: true,
        isMetaMaskInstalled: true,
      });
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      if (error.code === 4001) {
        // User rejected the request
        alert("Connection request rejected. Please try again.");
      } else {
        alert("Failed to connect wallet. Please try again.");
      }
    }
  }, []);

  // Disconnect wallet
  const disconnect = useCallback(() => {
    setWalletState((prev) => ({
      ...prev,
      address: null,
      isConnected: false,
    }));
  }, []);

  return {
    address: walletState.address,
    chainId: walletState.chainId,
    isConnected: walletState.isConnected,
    isMetaMaskInstalled: walletState.isMetaMaskInstalled,
    connect,
    disconnect,
  };
}
