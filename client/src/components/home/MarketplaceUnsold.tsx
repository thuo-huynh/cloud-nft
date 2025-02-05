import axios from "axios";
import { ethers } from "ethers";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import useSWR from "swr";
import Card from "../common/Card/Card";
import { useWeb3Store } from "@/store/web3Store";
import { getUnsoldItems } from "@/utils/marketplaceUtil";

export const MarketplaceUnsold = () => {
  const { isInit } = useWeb3Store();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(8);
  const { data: marketplaceData, isValidating } = useSWR(
    isInit && ["getMarketplaceUnsold", offset, limit],
    getUnsoldItems
  );
  const { data: ethPrice } = useSWR(isInit && ["getEthPrice"], () =>
    axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      )
      .then((res) => res.data.ethereum.usd)
  );
  const handlePageClick = ({ selected }: { selected: number }) => {
    setOffset(Math.ceil(selected * limit));
  };

  return (
    <section>
      <h2 className="text-2xl font-bold my-3">Unsold</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {marketplaceData &&
          marketplaceData.items
            .filter((item: any) => item)
            .map((value: any, index: number) => (
              <Card
                key={index}
                imageUrl={value.image}
                url={`/nft/${value.marketplaceItemIndex}`}
                name={value.name}
                price={value.price}
                ethPrice={ethPrice}
                isSold={value.isSold}
              />
            ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={marketplaceData?.meta?.totalPage || 0}
        previousLabel="< previous"
        containerClassName="flex justify-center items-center space-x-2 mt-4"
        activeClassName="bg-gray-900 text-white p-2 rounded"
        pageClassName="bg-gray-200 p-2 aspect-square w-10 text-center rounded"
        previousClassName="bg-gray-200 p-2 text-center rounded"
        nextClassName="bg-gray-200 p-2 text-center rounded"
        pageLinkClassName="block"
      />
      <div className="h-12"></div>
    </section>
  );
};
