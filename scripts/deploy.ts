import { Contract } from "ethers";
import path from "path";
import { network, artifacts, ethers } from "hardhat";
import fs from "fs";
import { CloudNFT } from "../typechain-types";

async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("CloudNFT");
  const NFTMarketPlace = await ethers.getContractFactory("NFTMarketPlace");
  const marketplaceContract = await NFTMarketPlace.deploy(
    ethers.utils.parseEther("0.1")
  );
  await marketplaceContract.deployed();

  const nft = await Token.deploy(marketplaceContract.address);
  await nft.deployed();

  console.log("Token address:", nft.address);
  console.log("Marketplace address:", marketplaceContract.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles({
    marketplaceContract,
    marketplaceName: "NFTMarketPlace",
    nftContract: nft,
    nftName: "CloudNFT",
  });

  const targetAddress = "0x7B4378B70c94599eB4F64Bc763D57E306BB574F1";
  await deployer.sendTransaction({
    to: targetAddress,
    value: ethers.utils.parseEther("200.0"),
  });

  console.log("Faucet to " + targetAddress);

  // giveaway
  const count = 10;
  await mintNft(targetAddress, count, nft);
  console.log("[DEBUG] Minted " + count + " NFTs");
}

const mintNft = async (address: string, count: number, nft: CloudNFT) => {
  await Promise.all(
    new Array(count)
      .fill(0)
      .map((_, i) => nft.giveAway(address).then((val) => val.wait()))
  );
};

function saveFrontendFiles({
  nftContract,
  marketplaceContract,
  nftName,
  marketplaceName,
}: {
  nftContract: Contract;
  marketplaceContract: Contract;
  nftName: string;
  marketplaceName: string;
}) {
  const contractsDir = path.join(__dirname, "..", "client", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify(
      {
        nftAddress: nftContract.address,
        marketplaceAddress: marketplaceContract.address,
      },
      undefined,
      2
    )
  );

  const TokenArtifact = artifacts.readArtifactSync(nftName);
  const MarketplaceArtifact = artifacts.readArtifactSync(marketplaceName);

  fs.writeFileSync(
    path.join(contractsDir, nftName + ".json"),
    JSON.stringify(TokenArtifact, null, 2)
  );
  fs.writeFileSync(
    path.join(contractsDir, marketplaceName + ".json"),
    JSON.stringify(MarketplaceArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
