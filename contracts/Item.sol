// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibDiamond} from "../libraries/LibDiamond.sol";
import "../storage/facets/AppStorageFacet.sol";
import "../storage/facets/ERC1155StorageFacet.sol";

contract Item is AppStorageFacet, ERC1155StorageFacet {
    event AddItem(string itemType, uint tokenId, string cid, address createdBy);

    // function addItem(string memory itemType, uint tokenId, string memory cid, uint size) external payable {
    function addItem(string memory itemType, uint tokenId, string memory cid, bytes calldata cidRaw, uint size) external payable {
        require(bytes(cid).length > 0, "cid is empty");
        require(msg.value > size * 0.0001 ether, "payment not enough for the item storage");

        address createdBy = msg.sender;

        ERC1155FacetStorage storage ds = erc1155Storage();
        // TODO: maybe the token can have multiple owners or managers?
        require(createdBy == ds._tokenOwnerMap[tokenId], "you are not the token owner");

        ds._tokenItemsMap[tokenId].push(cid);
        ds._tokenItemsKeyByItemTypeMap[tokenId][itemType].push(cid);

        Deal memory newDeal = Deal({
            createdBy: msg.sender,
            cidraw: cidRaw,
            size: size,
            storageFees: 0,
            dealStartBlockStamp: 0,
            dealDurationInDays: 180,
            dealState: DealState.Created,
            client: 0
        });

        ds.deals[cidRaw] = newDeal;
        ds.storagePaymentBalanceMap[createdBy] += msg.value;

        emit AddItem(itemType, tokenId, cid, createdBy);
    }

    function getItems(uint tokenId, uint start, uint limit, string memory itemType) external view returns (string[] memory items) {
        ERC1155FacetStorage storage ds = erc1155Storage();

        string[] memory all = ds._tokenItemsMap[tokenId];
        if (bytes(itemType).length > 0) {
            all = ds._tokenItemsKeyByItemTypeMap[tokenId][itemType];
        }

        uint lens = all.length - start;
        if (lens < limit) {
            limit = lens;
        }
        items = new string[](limit);

        for (uint i = 0; i < limit; i++) {
            items[i] = all[start + i];
        }
    }
}
