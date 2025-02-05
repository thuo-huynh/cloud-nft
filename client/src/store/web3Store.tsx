"use client";

import addresses from "@/contracts/contract-address.json";
import {
  CloudNFT,
  CloudNFT__factory,
  NFTMarketPlace,
  NFTMarketPlace__factory,
} from "@/typechain-types";
import { ethers } from "ethers";
import React, { useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const CHAIN_ID = "0x539";
export const CHAIN_NAME = "Localnet";

interface Web3ModelStore {
  isConnected: boolean;
  setIsConnected: (isConnect: boolean) => void;
  nftContract: CloudNFT | null;
  marketPlaceContract: NFTMarketPlace | null;
  walletAddress: string | null;
  isInit: boolean;
  keepDisconnect: boolean;
  connect: () => void;
  disconnect: () => void;
  init: () => void;
}

export const useWeb3Store = create<Web3ModelStore>()(
  persist(
    (set, get) => ({
      isInit: false,
      isConnected: false,
      keepDisconnect: false,
      nftContract: null,
      marketPlaceContract: null,
      walletAddress: null,
      setIsConnected: (isConnected: boolean) => set({ isConnected }),
      connect: async () => {
        // TODO: handle if user hasn't installed metamask
        // check if window.ethereum exists
        if (!window.ethereum) {
          console.log("MetaMask is not installed");
          return;
        }
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const walletAddress = await signer.getAddress();
        console.log("🚀 ~ connect: ~ walletAddress:", walletAddress);
        set({
          isConnected: true,
          keepDisconnect: false,
          walletAddress,
        });
      },
      disconnect: () => {
        set({
          isConnected: false,
          walletAddress: "",
          keepDisconnect: true,
        });
      },
      init: async () => {
        // TODO: handle if user hasn't installed metamask
        // check if window.ethereum exists
        if (!window?.ethereum) {
          console.log("return because of no window.ethereum");
          return;
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const { provider: ethereum } = provider;

        //@ts-ignore
        ethereum.on("accountsChanged", async (accounts: string[]) => {
          console.log("🚀 ~ ethereum.on ~ accounts:", accounts);
          if (accounts?.length > 0) {
            set({
              isConnected: true,
              walletAddress: accounts[0],
            });
          } else {
            set({
              isConnected: false,
              walletAddress: null,
            });
          }
        });

        const accounts = await provider.listAccounts();
        if (accounts?.length > 0 && get().keepDisconnect === false) {
          set({
            isConnected: true,
            walletAddress: accounts[0],
          });
        }

        //@ts-ignore
        ethereum.on("chainChanged", () => window.location.reload());

        set({
          nftContract: CloudNFT__factory.connect(
            addresses.nftAddress,
            provider
          ),
          marketPlaceContract: NFTMarketPlace__factory.connect(
            addresses.marketplaceAddress,
            provider
          ),
          isInit: true,
        });
      },
    }),
    {
      name: "web3-store",
      partialize: (state) => {
        return {
          keepDisconnect: state.keepDisconnect,
        };
      },
    }
  )
);

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const { init, isInit } = useWeb3Store();

  useEffect(() => {
    if (!window.ethereum || isInit) {
      return;
    }
    init();
  }, [ethers]);

  return <>{children}</>;
};
