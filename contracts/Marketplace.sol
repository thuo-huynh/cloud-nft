//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTMarketPlace is Ownable, ReentrancyGuard {

    using Counters for Counters.Counter;
    Counters.Counter private _listingIds;
    Counters.Counter private _itemsSold;

    uint256 public listingPrice;

    constructor(uint256 _listingPrice){
        listingPrice = _listingPrice;
    }

    struct ListingItem {
        uint256 tokenId;
        address tokenAddress;
        address payable seller;
        uint256 price;
        bool isSold;
    }

    event ListingItemCreated (
        uint256 indexed id,
        uint256 indexed tokenId,
        address indexed tokenAddress,
        address seller, 
        uint256 price
    );

    mapping(uint256 => ListingItem) public listingItems;


    function listItem(address tokenAddress, uint256 tokenId, uint256 price) public payable nonReentrant returns (uint256) {
        require(price > 0, "Price must be greater than 0");
        require(msg.value > 0, "Listing fee must be greater than 0");

        IERC721(tokenAddress).transferFrom(msg.sender, address(this), tokenId);

        uint256 currentId = _listingIds.current();
        listingItems[currentId] = ListingItem(tokenId, tokenAddress, payable(msg.sender), price, false);

        console.log("Listing item with id %s", currentId);
        emit ListingItemCreated(currentId, tokenId, tokenAddress, msg.sender, price);

        _listingIds.increment();
        return currentId;
    }

    function buyItem(uint256 listingId) public payable nonReentrant {
        ListingItem storage item = listingItems[listingId];
        require(item.isSold == false, "Item is already sold");
        require(item.price == msg.value, "Price is not correct");
        item.seller.transfer(msg.value);
        IERC721(item.tokenAddress).transferFrom(
            address(this),
            msg.sender,
            item.tokenId
        );
        item.isSold = true;
        _itemsSold.increment();
        console.log("Item with id %s sold to %s", listingId, msg.sender);
    }

    function cancelListing(uint256 listingId) public nonReentrant {
        ListingItem storage item = listingItems[listingId];
        require(msg.sender == item.seller, "Only seller can cancel listing");
        require(!item.isSold, "Item is already sold");

        IERC721(item.tokenAddress).transferFrom(address(this), msg.sender, item.tokenId);
        delete listingItems[listingId];
        
        console.log("Listing with id %s is cancelled", listingId);
    }
    
    function getTotalUnsoldItems() public view returns (uint256) {
        return _listingIds.current() - _itemsSold.current();
    }

    function getTotalItems() public view returns (uint256) {
        return _listingIds.current();
    }
    
    function getItemPrice(uint256 listingId)public view returns (uint256) {
        return listingItems[listingId].price;
    }

    function getTotalListingItems() public view returns (uint256) {
        return _listingIds.current();
    }

    function getUnsoldItems(uint256 offset, uint256 limit) public view returns (ListingItem[] memory, uint256[] memory) {
        require(offset >= 0, "offset must be greater than 0");
        require(limit > 0, "limit must be greater than 0");

        ListingItem[] memory items = new ListingItem[](limit);
        uint256[] memory ids = new uint256[](limit);

        // At the offset, get limit items that are not sold
        uint256 j = 0;
        for (uint256 i = offset; i < _listingIds.current() && j < limit; i++) {
            if (!listingItems[i].isSold) {
                items[j] = listingItems[i];
                ids[j] = i;
                j++;
            }
        }

        return (items, ids);
    }

    function getListingItems(uint256 offset, uint256 limit) public view returns (ListingItem[] memory){
        require(offset >= 0, "offset must be greater than 0");
        require(limit > 0, "limit must be greater than 0");

        ListingItem[] memory items = new ListingItem[](limit);

        // At the offset, get limit items that are not sold
        uint256 j = 0;
        for (uint256 i = offset; i < _listingIds.current() && j < limit; i++) {
            items[j] = listingItems[i];
            j++;
        }

        return items;
    }

}