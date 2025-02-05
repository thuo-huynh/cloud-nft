"use client";

import MarketplaceNFTs from "@/components/home/MarketplaceNFTs";
import { MarketplaceUnsold } from "@/components/home/MarketplaceUnsold";
import MyNFT from "@/components/home/MyNFT";
import { useWeb3Store } from "@/store/web3Store";

export default function Home() {
  const { isConnected } = useWeb3Store();
  return (
    <main>
      {isConnected && <MyNFT />}
      <MarketplaceNFTs />
      <MarketplaceUnsold />
    </main>
  );
}
