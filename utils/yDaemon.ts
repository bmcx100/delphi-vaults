export interface YDaemonVault {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  apr: {
    netAPR: number;
    fees: {
      performance: number;
      management: number;
    };
  };
  tvl: {
    totalAssets: string;
    tvl: number;
  };
  pricePerShare: string;
  strategies: Array<{
    address: string;
    name: string;
    description: string;
  }>;
  token: {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
  };
}

export async function fetchVaultData(vaultAddress: string): Promise<YDaemonVault> {
  const response = await fetch(
    `https://ydaemon.yearn.fi/1/vaults/${vaultAddress}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch vault data: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

export async function fetchAllVaults(vaultAddresses: string[]): Promise<YDaemonVault[]> {
  const promises = vaultAddresses.map((address) => fetchVaultData(address));
  return Promise.all(promises);
}
