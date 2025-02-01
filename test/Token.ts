import { ethers } from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import exp from "constants";

describe("Token contract", function () {
  async function deployTokenFixture() {
    const Token = await ethers.getContractFactory("CloudNFT");
    const Marketplace = await ethers.getContractFactory("NFTMarketPlace");

    const [owner, addr1, addr2] = await ethers.getSigners();
    const marketplace = await Marketplace.deploy(
      ethers.utils.parseEther("0.1")
    );

    const cloudNFT = await Token.deploy(marketplace.address);

    await marketplace.deployed();
    await cloudNFT.deployed();

    return {
      Marketplace,
      marketplace,
      Token,
      hardhatToken: cloudNFT,
      owner,
      addr1,
      addr2,
    };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { hardhatToken, owner, addr1 } = await loadFixture(
        deployTokenFixture
      );
      await hardhatToken.giveAway(addr1.address);
    });
  });

  describe("NFT", function () {
    it("Should list NFT", async function () {
      const { hardhatToken, marketplace, addr1 } = await loadFixture(
        deployTokenFixture
      );

      await hardhatToken.giveAway(addr1.address);
      expect(await hardhatToken.balanceOf(addr1.address)).to.equal(1);

      const listingPrice = await marketplace.listingPrice();
      console.log("Listing Price: ", listingPrice.toString());

      // List NFT
      await hardhatToken.connect(addr1).approve(marketplace.address, 0);
      await marketplace
        .connect(addr1)
        .listItem(hardhatToken.address, 0, ethers.utils.parseEther("0.1"), {
          value: listingPrice,
        });

      expect(await hardhatToken.ownerOf(0)).to.equal(marketplace.address);
    });

    it("Should not list NFT", async function () {
      const { hardhatToken, marketplace, addr1 } = await loadFixture(
        deployTokenFixture
      );

      await hardhatToken.giveAway(addr1.address);
      expect(await hardhatToken.balanceOf(addr1.address)).to.equal(1);

      const listingPrice = await marketplace.listingPrice();
      console.log("Listing Price: ", listingPrice.toString());

      // List NFT
      await hardhatToken.connect(addr1).approve(marketplace.address, 0);
      await marketplace
        .connect(addr1)
        .listItem(hardhatToken.address, 0, ethers.utils.parseEther("0.1"), {
          value: listingPrice,
        });

      expect(await hardhatToken.ownerOf(0)).to.equal(marketplace.address);

      // Cancel NFT listing
      await marketplace.connect(addr1).cancelListing(0);
      expect(await hardhatToken.ownerOf(0)).to.equal(addr1.address);
    });

    it("Buy NFT", async function () {
      const { hardhatToken, marketplace, addr1, addr2 } = await loadFixture(
        deployTokenFixture
      );

      await hardhatToken.giveAway(addr1.address);
      expect(await hardhatToken.balanceOf(addr1.address)).to.equal(1);

      const listingPrice = await marketplace.listingPrice();
      console.log("Listing Price: ", listingPrice.toString());

      // List NFT
      await hardhatToken.connect(addr1).approve(marketplace.address, 0);
      await marketplace
        .connect(addr1)
        .listItem(hardhatToken.address, 0, ethers.utils.parseEther("0.1"), {
          value: listingPrice,
        });

      expect(await hardhatToken.ownerOf(0)).to.equal(marketplace.address);

      // Buy NFT
      await marketplace.connect(addr2).buyItem(0, {
        value: ethers.utils.parseEther("0.1"),
      });

      expect(await hardhatToken.ownerOf(0)).to.equal(addr2.address);
    });

    it("Get unsold NFT", async function () {
      const { hardhatToken, marketplace, addr1, addr2 } = await loadFixture(
        deployTokenFixture
      );

      await hardhatToken.giveAway(addr1.address);
      await hardhatToken.giveAway(addr1.address);
      const balanceOf = await hardhatToken.balanceOf(addr1.address);
      console.log("Balance of: ", balanceOf.toString());
      expect(await hardhatToken.balanceOf(addr1.address)).to.equal(2);

      const listingPrice = await marketplace.listingPrice();

      // List NFT
      await hardhatToken.connect(addr1).approve(marketplace.address, 0);
      await marketplace
        .connect(addr1)
        .listItem(hardhatToken.address, 0, ethers.utils.parseEther("0.1"), {
          value: listingPrice,
        });

      await hardhatToken.connect(addr1).approve(marketplace.address, 1);
      await marketplace
        .connect(addr1)
        .listItem(hardhatToken.address, 1, ethers.utils.parseEther("0.3"), {
          value: listingPrice,
        });

      // Buy NFT
      await marketplace.connect(addr2).buyItem(0, {
        value: ethers.utils.parseEther("0.1"),
      });

      // Get Unsold NFT
      const data = await marketplace.connect(addr1).getUnsoldItems(0, 1);
      console.log("🚀 ~ data:", data);
      expect(await hardhatToken.ownerOf(0)).to.equal(addr2.address);
      expect(await hardhatToken.ownerOf(1)).to.equal(marketplace.address);
    });

    it("Get Listing NFT", async function () {
      const { hardhatToken, marketplace, addr1 } = await loadFixture(
        deployTokenFixture
      );

      await hardhatToken.giveAway(addr1.address);
      await hardhatToken.giveAway(addr1.address);
      expect(await hardhatToken.balanceOf(addr1.address)).to.equal(2);

      const listingPrice = await marketplace.listingPrice();

      // List NFTs
      await hardhatToken.connect(addr1).approve(marketplace.address, 0);
      await marketplace
        .connect(addr1)
        .listItem(hardhatToken.address, 0, ethers.utils.parseEther("0.1"), {
          value: listingPrice,
        });

      await hardhatToken.connect(addr1).approve(marketplace.address, 1);
      await marketplace
        .connect(addr1)
        .listItem(hardhatToken.address, 1, ethers.utils.parseEther("0.3"), {
          value: listingPrice,
        });

      // Get all listed NFTs
      const listedItems = await marketplace
        .connect(addr1)
        .getListingItems(0, 2);
      console.log("🚀 ~ listedItems:", listedItems);

      expect(listedItems.length).to.equal(2);
      expect(listedItems[0].tokenId).to.equal(0);
      expect(listedItems[1].tokenId).to.equal(1);
    });
  });
});
