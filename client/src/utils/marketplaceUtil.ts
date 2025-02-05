import axios from "axios";
import { useWeb3Store } from "@/store/web3Store";
import { ERC721__factory } from "@/typechain-types";
import { ethers } from "ethers";

const proxyUrl = "https://thingproxy.freeboard.io/fetch/";

export interface BaseListReturn {
  items: any[];
  meta?: {
    totalItem: number;
    totalPage: number;
  };
}

export const getMarketplaceNFTs = async ([_url, offset, limit]: [
  string,
  number,
  number
]): Promise<BaseListReturn> => {
  console.log("🚀 ~ offset:", offset);
  console.log("🚀 ~ _url:", _url);
  const { marketPlaceContract } = useWeb3Store.getState();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const nfts = await marketPlaceContract!.getListingItems(offset, limit);
  console.log("🚀 ~ nfts:", nfts);
  const totalItem = await marketPlaceContract!.getTotalItems();

  return {
    items: await Promise.all(
      nfts.map(async (nft, index) => {
        const contract = ERC721__factory.connect(nft.tokenAddress, provider);
        const tokenURI = await contract.tokenURI(nft.tokenId);
        const { data } = await axios.get(proxyUrl + tokenURI);

        return {
          ...data,
          price: ethers.utils.formatEther(nft.price),
          tokenId: nft.tokenId,
          tokenAddress: nft.tokenAddress,
          marketplaceItemIndex: index + offset,
          isSold: nft.isSold,
        };
      })
    ),
    meta: {
      totalItem: totalItem.toNumber(),
      totalPage: Math.ceil(totalItem.toNumber() / limit),
    },
  };
};

export const getUnsoldItems = async ([_url, offset, limit]: [
  string,
  number,
  number
]): Promise<BaseListReturn> => {
  const { marketPlaceContract } = useWeb3Store.getState();

  if (!marketPlaceContract)
    return {
      items: [],
    };

  const [items, totalItem] = await Promise.all([
    marketPlaceContract.getUnsoldItems(offset, limit).then(([items, ids]) =>
      Promise.all(
        items.map(async (item, index) => {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const nftContract = ERC721__factory.connect(
            item.tokenAddress,
            provider
          );

          const tokenId = item.tokenId;

          if (item.tokenId.toNumber() === 0) {
            return null;
          }

          const [tokenURI, owner, getApproved] = await Promise.all([
            nftContract.tokenURI(tokenId),
            nftContract.ownerOf(tokenId),
            nftContract.getApproved(tokenId),
          ]);

          return {
            ...(await axios.get(proxyUrl + tokenURI)).data,
            tokenId,
            owner,
            getApproved,
            price: ethers.utils.formatEther(item.price),
            isSold: item.isSold,
            marketplaceItemIndex: ids[index].toNumber(),
          };
        })
      )
    ),
    marketPlaceContract.getTotalUnsoldItems(),
  ]);

  return {
    items,
    meta: {
      totalItem: totalItem.toNumber(),
      totalPage: Math.ceil(totalItem.toNumber() / limit),
    },
  };
};

export const getMarketPlaceNFTbyId = async ([_url, itemId]: [
  string,
  number
]) => {
  const { marketPlaceContract } = useWeb3Store.getState();
  if (!marketPlaceContract) return null;

  const item = await marketPlaceContract!.listingItems(itemId);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const nftContract = ERC721__factory.connect(item.tokenAddress, provider);
  const tokenId = item.tokenId;

  const [tokenURI, owner, getApproved] = await Promise.all([
    nftContract.tokenURI(tokenId),
    nftContract.ownerOf(tokenId),
    nftContract.getApproved(tokenId),
  ]);

  return {
    ...(await axios.get(proxyUrl + tokenURI)).data,
    tokenId,
    owner,
    getApproved,
    price: ethers.utils.formatEther(item.price),
    marketplaceItemId: itemId,
    isSold: item.isSold,
  };
};
