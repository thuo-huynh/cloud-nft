"use client";

import Button, { ButtonPreset } from "@/components/common/Button/Button";
import Loading from "@/components/common/Loading/Loading";
import BackButton from "@/components/home/BackButton";
import Input from "@/components/Input/Input";
import { useWeb3Store } from "@/store/web3Store";
import { getNFTById } from "@/utils/nftUtil";
import { ethers } from "ethers";
import Head from "next/head";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

type Props = {};
export default function NftDetailPage({}: Props) {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { isInit, marketPlaceContract, nftContract } = useWeb3Store();

  const {
    data: nftData,
    mutate,
    isValidating,
  } = useSWR(isInit && ["getNFT", id], getNFTById);
  console.log("1", nftData?.owner);
  console.log("2", nftData?.getApproved);
  console.log("3", marketPlaceContract?.address);
  const onApproveClick = async () => {
    if (!nftContract || !id || !marketPlaceContract) return;

    const signerProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signerSigner = signerProvider.getSigner();
    const nftWithSigner = nftContract.connect(signerSigner);

    toast.promise(
      nftWithSigner
        .approve(marketPlaceContract.address, id as string)
        .then((tx) => tx.wait()),
      {
        loading: "Approving item...",
        success: () => {
          mutate();

          return "Item approved successfully";
        },
        error: (err: any) => err.reason || err.message,
      },
      {
        duration: 5000,
      }
    );
  };

  const onSellPressed = async () => {
    if (!marketPlaceContract || !nftContract || !id) return;

    const price = priceRef.current?.value;

    if (!price) {
      toast.error("Please enter a price");
      return;
    }

    if (Number(price) <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    const priceInWei = ethers.utils.parseEther(price);
    const listingPrice = await marketPlaceContract?.listingPrice();
    const signerProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signerSigner = signerProvider.getSigner();
    const marketplaceWithSigner = marketPlaceContract?.connect(signerSigner);

    toast.promise(
      marketplaceWithSigner
        .listItem(nftContract?.address, id as string, priceInWei, {
          value: listingPrice,
        })
        .then((tx) => tx.wait()),
      {
        loading: "Listing item...",
        success: (val: any) => {
          mutate();

          //"ListingItemCreated"
          const event = val.events?.find(
            (event: any) => event.event === "ListingItemCreated"
          );

          if (event) {
            const listingId = event!.args![0]!.toString();

            router.push(`/nft/${listingId}`);
          }

          return "Item listed successfully. Item sell at " + price + " ETH";
        },
        error: (err: any) => err.reason,
      }
    );
  };

  const priceRef = React.useRef<HTMLInputElement>(null);
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

            {nftData.owner === marketPlaceContract?.address ? (
              <Button preset={ButtonPreset.Disabled}>Listed</Button>
            ) : (
              <>
                {(nftData.getApproved !== marketPlaceContract?.address && (
                  <Button
                    preset={
                      nftData.getApproved === marketPlaceContract?.address
                        ? ButtonPreset.Disabled
                        : ButtonPreset.Fill
                    }
                    onClick={onApproveClick}
                  >
                    <span>Approve</span>
                  </Button>
                )) || (
                  <>
                    <span className="text-gray-700 text-sm">Price</span>
                    <Input innerRef={priceRef} rightLabel="BNB" />
                    <Button onClick={onSellPressed}>
                      <span>Sell</span>
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )) ||
        (!isValidating && (
          <div className="flex flex-col items-center justify-center h-full">
            <Image src="/images/404.jpg" alt="404" width={500} height={500} />
            <span className="text-2xl font-bold">Item not found</span>

            <Button
              preset={ButtonPreset.Fill}
              onClick={() => router.push("/")}
              className="mt-5"
            >
              <span>Go to home</span>
            </Button>
          </div>
        )) || <Loading />}
    </>
  );
}
