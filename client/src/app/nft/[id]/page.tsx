"use client";

import Button, { ButtonPreset } from "@/components/common/Button/Button";
import Loading from "@/components/common/Loading/Loading";
import BackButton from "@/components/home/BackButton";
import { useWeb3Store } from "@/store/web3Store";
import { getMarketPlaceNFTbyId } from "@/utils/marketplaceUtil";
import { ethers } from "ethers";
import Head from "next/head";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

type Props = {};

export default function NftDetailPage({}: Props) {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { isInit, marketPlaceContract } = useWeb3Store();

  const { data: nftData, isValidating } = useSWR(
    isInit && ["getMarketplaceNFT", id],
    getMarketPlaceNFTbyId
  );

  const onBuyClicked = async () => {
    if (!nftData || !marketPlaceContract) {
      toast.error("NFT not found, please try again later");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    if (!signer) return;

    toast.promise(
      marketPlaceContract
        .connect(signer)
        .buyItem(parseInt(id as string), {
          value: ethers.utils.parseEther(nftData.price),
        })
        .then((res) => res.wait()),
      {
        loading: "Buying NFT...",
        success: () => {
          router.push(`/my-nft/${nftData.tokenId}`);

          return `NFT id ${nftData.tokenId} bought successfully`;
        },
        error: (e: any) => {
          return e.reason || e.message || "Error buying NFT";
        },
      }
    );
  };

  return (
    <>
      <Head>
        <title>{nftData?.name || "Loading..."}</title>
      </Head>
      <div className="sticky top-10 left-20 my-3">
        <BackButton />
      </div>
      {(nftData && (
        <div className="grid grid-cols-3 items-center">
          <div className="col-span-1 flex flex-col gap-2">
            <img src={nftData.image} alt="" className="border rounded px-10" />

            <div className="space-y-2 mt-2">
              <h1 className="text-xl font-bold">Description</h1>

              <p>{nftData.description}</p>
            </div>

            <div className="space-y-2">
              <h1 className="text-xl font-bold">Details</h1>

              {nftData.attributes.map((value: any, index: React.Key) => (
                <div className="flex justify-between" key={index}>
                  <span>{value.trait_type}</span>
                  <span>{value.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-2 flex flex-col mx-20 gap-2">
            <span className="text-3xl font-bold">{nftData.name}</span>

            <span className="text-gray-700 text-sm">Owner</span>
            <span className="text-sm font-semibold">{nftData.owner}</span>
            <span className="text-gray-700 text-sm">Price</span>
            <span className="text-2xl font-semibold">{nftData.price} BNB</span>

            <Button
              onClick={onBuyClicked}
              preset={
                nftData.isSold ? ButtonPreset.Disabled : ButtonPreset.Fill
              }
            >
              <span>{nftData.isSold ? "Sold" : "Buy"}</span>
            </Button>
          </div>
        </div>
      )) ||
        (isValidating && <Loading />) ||
        (!isValidating && !nftData && (
          <div className="text-center">NFT not found</div>
        ))}
    </>
  );
}
