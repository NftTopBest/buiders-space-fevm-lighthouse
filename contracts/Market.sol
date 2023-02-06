// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibDiamond} from "../libraries/LibDiamond.sol";
import "../storage/facets/AppStorageFacet.sol";
import "../storage/facets/ERC1155StorageFacet.sol";
import "../interfaces/IERC1155.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// import "hardhat/console.sol";

contract Market is AppStorageFacet, ERC1155StorageFacet, ReentrancyGuard {
    function bid(uint tokenId, uint amount, uint unitPrice, string memory cid) external nonReentrant {
        require(unitPrice > 0, "unitPrice must be at least 1 wei");
        require(amount > 0, "amount must be at least 1");

        ERC1155FacetStorage storage ds = erc1155Storage();

        uint payAmount = unitPrice * amount;
        address payTokenAddress = address(ds.payTokenAddress);
        uint userBalanceInMarket = ds.userMarketBalance[msg.sender][payTokenAddress];
        if (userBalanceInMarket < payAmount) {
            bool payRz = ds.payTokenAddress.transferFrom(msg.sender, address(this), payAmount - userBalanceInMarket);
            require(payRz, "insufficient funds for bid");
            ds.userMarketBalance[msg.sender][payTokenAddress] = 0;
        } else {
            ds.userMarketBalance[msg.sender][payTokenAddress] -= payAmount;
        }

        ds.bidMap[ds.bidCount] = MarketItem(ds.bidCount, tokenId, msg.sender, unitPrice, amount, true, payTokenAddress, cid);
        ds.bidTokenIdMapArr[tokenId].push(ds.bidCount);
        ds.bidCount++;
    }

    function closeBid(uint itemId) external nonReentrant {
        ERC1155FacetStorage storage ds = erc1155Storage();
        require(ds.bidMap[itemId].createdBy == msg.sender, "you are not the bid owner");
        require(ds.bidMap[itemId].isListed, "your bid already closed");

        address payTokenAddress = ds.bidMap[itemId].payTokenAddress;
        uint amount = ds.bidMap[itemId].amount;
        uint unitPrice = ds.bidMap[itemId].unitPrice;
        ds.bidMap[itemId].isListed = false;
        ds.userMarketBalance[msg.sender][payTokenAddress] += amount * unitPrice;
    }

    function getBids(uint tokenId, uint start, uint limit) external view returns (MarketItem[] memory items) {
        ERC1155FacetStorage storage ds = erc1155Storage();

        uint[] memory ids = ds.bidTokenIdMapArr[tokenId];
        uint lens = ids.length - start;
        if (lens < limit) {
            limit = lens;
        }
        items = new MarketItem[](limit);

        uint idx = 0 + start;
        uint i = 0;
        while (true) {
            if (i == limit) break;
            if (idx == lens) break;
            if (!ds.bidMap[ids[idx]].isListed) {
                idx++;
                continue;
            }

            items[i] = ds.bidMap[ids[idx]];
            i++;
            idx++;
        }
    }

    function isStrEqual(string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    function getMarketItemsByType(
        string memory marketType,
        uint start,
        uint limit
    ) external view returns (MarketItem[] memory items, string[] memory tokenURIs) {
        ERC1155FacetStorage storage ds = erc1155Storage();

        uint itemCount = ds.bidCount;
        if (isStrEqual(marketType, "ask")) {
            itemCount = ds.askCount;
        }

        uint lens = itemCount - start;
        if (lens < limit) {
            limit = lens;
        }
        items = new MarketItem[](limit);
        tokenURIs = new string[](limit);

        uint idx = 0 + start;
        uint i = 0;
        while (true) {
            if (i == limit) break;
            if (idx == lens) break;
            if (isStrEqual(marketType, "bid")) {
                if (!ds.bidMap[idx].isListed) {
                    idx++;
                    continue;
                }

                items[i] = ds.bidMap[idx];
            }
            if (isStrEqual(marketType, "ask")) {
                if (!ds.askMap[idx].isListed) {
                    idx++;
                    continue;
                }

                items[i] = ds.askMap[idx];
            }
            tokenURIs[i] = ds._tokenURIs[items[i].tokenId];
            i++;
            idx++;
        }
    }

    // user sell NFT to the bidder
    function sell(uint itemId) external nonReentrant {
        ERC1155FacetStorage storage ds = erc1155Storage();

        require(ds.bidMap[itemId].isListed, "The item is not listed");

        uint tokenId = ds.bidMap[itemId].tokenId;
        address createdBy = ds.bidMap[itemId].createdBy;
        uint amount = ds.bidMap[itemId].amount;
        uint unitPrice = ds.bidMap[itemId].unitPrice;
        address payTokenAddress = ds.bidMap[itemId].payTokenAddress;

        IERC1155(address(this)).safeTransferFrom(msg.sender, createdBy, tokenId, amount, "");
        ds.bidMap[itemId].isListed = false;

        uint totalAmount = amount * unitPrice;
        (address inviter, uint inviterBalanceDelta, uint platformCommissionDelta) = calcCommission(msg.sender, tokenId, totalAmount);

        if (inviter != address(0)) {
            ds._inviterBalanceMap[inviter][payTokenAddress] += inviterBalanceDelta;
        }
        ds.userMarketBalance[msg.sender][payTokenAddress] += totalAmount - (inviterBalanceDelta + platformCommissionDelta);
    }

    function onERC1155Received(address, address, uint256, uint256, bytes memory) external pure returns (bytes4) {
        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(address, address, uint256[] memory, uint256[] memory, bytes memory) external pure returns (bytes4) {
        return this.onERC1155BatchReceived.selector;
    }

    function ask(uint tokenId, uint amount, uint unitPrice, string memory cid) external nonReentrant {
        require(unitPrice > 0, "unitPrice must be at least 1 wei");
        require(amount > 0, "amount must be at least 1");

        ERC1155FacetStorage storage ds = erc1155Storage();

        IERC1155(address(this)).safeTransferFrom(msg.sender, address(this), tokenId, amount, "");

        ds.askMap[ds.askCount] = MarketItem(ds.askCount, tokenId, msg.sender, unitPrice, amount, true, address(ds.payTokenAddress), cid);
        ds.askTokenIdMapArr[tokenId].push(ds.askCount);
        ds.askCount++;
    }

    function closeAsk(uint itemId) external nonReentrant {
        ERC1155FacetStorage storage ds = erc1155Storage();
        require(ds.askMap[itemId].createdBy == msg.sender, "you are not the ask owner");
        require(ds.askMap[itemId].isListed, "your ask already closed");

        uint tokenId = ds.bidMap[itemId].tokenId;
        uint amount = ds.bidMap[itemId].amount;
        ds.bidMap[itemId].isListed = false;
        IERC1155(address(this)).safeTransferFrom(address(this), msg.sender, tokenId, amount, "");
    }

    function getAsks(uint tokenId, uint start, uint limit) external view returns (MarketItem[] memory items) {
        ERC1155FacetStorage storage ds = erc1155Storage();

        uint[] memory ids = ds.askTokenIdMapArr[tokenId];

        uint lens = ids.length - start;
        if (lens < limit) {
            limit = lens;
        }
        items = new MarketItem[](limit);

        uint idx = 0 + start;
        uint i = 0;
        while (true) {
            if (i == limit) break;
            if (idx == lens) break;
            if (!ds.askMap[ids[idx]].isListed) {
                idx++;
                continue;
            }
            items[i] = ds.askMap[ids[idx]];
            i++;
            idx++;
        }
    }

    // user buy the askMap marketItem
    function buy(uint itemId) external nonReentrant {
        ERC1155FacetStorage storage ds = erc1155Storage();
        require(ds.askMap[itemId].isListed, "The item is not listed");

        uint tokenId = ds.askMap[itemId].tokenId;
        address createdBy = ds.askMap[itemId].createdBy;
        uint amount = ds.askMap[itemId].amount;
        uint unitPrice = ds.askMap[itemId].unitPrice;
        address payTokenAddress = ds.askMap[itemId].payTokenAddress;

        uint totalAmount = amount * unitPrice;
        uint userBalanceInMarket = ds.userMarketBalance[msg.sender][payTokenAddress];
        if (userBalanceInMarket < totalAmount) {
            bool payRz = ds.payTokenAddress.transferFrom(msg.sender, address(this), totalAmount - userBalanceInMarket);
            require(payRz, "insufficient funds for buy");
            ds.userMarketBalance[msg.sender][payTokenAddress] = 0;
        } else {
            ds.userMarketBalance[msg.sender][payTokenAddress] -= totalAmount;
        }
        (address inviter, uint inviterBalanceDelta, uint platformCommissionDelta) = calcCommission(createdBy, tokenId, totalAmount);

        if (inviter != address(0)) {
            ds._inviterBalanceMap[inviter][payTokenAddress] += inviterBalanceDelta;
        }
        ds.userMarketBalance[createdBy][payTokenAddress] += totalAmount - (inviterBalanceDelta + platformCommissionDelta);

        IERC1155(address(this)).safeTransferFrom(address(this), msg.sender, tokenId, amount, "");
        ds.askMap[itemId].isListed = false;
    }
}
