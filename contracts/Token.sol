// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibDiamond} from "../libraries/LibDiamond.sol";
import "../storage/facets/AppStorageFacet.sol";
import "../storage/facets/ERC1155StorageFacet.sol";

contract Token is AppStorageFacet, ERC1155StorageFacet {
    event AddToken(
        string tokenType,
        uint basicPrice,
        uint inviteCommission,
        uint maxSupply,
        string metadataCID,
        uint tokenId,
        address createdBy,
        uint createTokenPrice
    );

    function addToken(
        string memory tokenType,
        uint basicPrice,
        uint inviteCommission,
        uint maxSupply,
        string memory cid
    ) external returns (uint tokenId) {
        require(bytes(cid).length > 0, "cid is empty");
        require(inviteCommission <= 1000, "inviteCommission must smaller than 10%");

        ERC1155FacetStorage storage ds = erc1155Storage();

        bool payRz = ds.payTokenAddress.transferFrom(msg.sender, address(this), ds.createTokenCost);
        require(payRz, "insufficient funds for addToken");

        address createdBy = msg.sender;

        tokenId = ds._idx;
        ds._idx++;

        ds._tokenTypeMap[tokenType].push(tokenId);
        ds._tokenURIs[tokenId] = cid;
        ds._tokenOwnerMap[tokenId] = createdBy;
        ds._basicPriceMap[tokenId] = basicPrice;
        ds._inviteCommissionMap[tokenId] = inviteCommission;
        ds._maxSupplyMap[tokenId] = maxSupply;
        ds._tokenOwnByMap[createdBy].push(tokenId);

        emit AddToken(tokenType, basicPrice, inviteCommission, maxSupply, cid, tokenId, createdBy, ds.createTokenCost);
    }

    function getToken(
        uint tokenId,
        string memory itemType,
        string memory metaType
    )
        public
        view
        returns (string memory tokenURI, address tokenOwner, uint totalSupply, uint maxSupply, string[] memory items, string[] memory metas)
    {
        ERC1155FacetStorage storage ds = erc1155Storage();
        tokenURI = ds._tokenURIs[tokenId];
        tokenOwner = ds._tokenOwnerMap[tokenId];
        totalSupply = ds._totalSupply[tokenId];
        maxSupply = ds._maxSupplyMap[tokenId];
        items = ds._tokenItemsMap[tokenId];
        if (bytes(itemType).length > 0) {
            items = ds._tokenItemsKeyByItemTypeMap[tokenId][itemType];
        }
        metas = ds._metasMap[tokenId];
        if (bytes(metaType).length > 0) {
            metas = ds._metasKeyByMetaTypeMap[tokenId][metaType];
        }
    }

    event UpdateToken(uint tokenId, uint basicPrice, uint inviteCommission, uint maxSupply, string metadataCID, address createdBy);

    function updateToken(uint tokenId, uint basicPrice, uint inviteCommission, uint maxSupply, string memory cid) external {
        address createdBy = msg.sender;
        require(inviteCommission <= 1000, "inviteCommission must smaller than 10%");
        require(bytes(cid).length > 0, "cid is empty");

        ERC1155FacetStorage storage ds = erc1155Storage();

        require(ds._totalSupply[tokenId] <= maxSupply, "new maxSupply must >= totalSupply");
        require(ds._tokenOwnerMap[tokenId] == createdBy, "you are not the token creator");

        ds._tokenURIs[tokenId] = cid;
        ds._basicPriceMap[tokenId] = basicPrice;
        ds._inviteCommissionMap[tokenId] = inviteCommission;
        ds._maxSupplyMap[tokenId] = maxSupply;

        emit UpdateToken(tokenId, basicPrice, inviteCommission, maxSupply, cid, createdBy);
    }

    function getTokenList(
        uint start,
        uint limit
    )
        public
        view
        returns (
            string[] memory tokenURIArr,
            uint[] memory totalSupplyArr,
            uint[] memory maxSupplyArr,
            uint[] memory itemsCountArr,
            uint[] memory metaCountArr
        )
    {
        ERC1155FacetStorage storage ds = erc1155Storage();

        uint lens = uint(ds._idx - start);
        if (lens < limit) {
            limit = lens;
        }

        tokenURIArr = new string[](limit);
        totalSupplyArr = new uint[](limit);
        maxSupplyArr = new uint[](limit);
        itemsCountArr = new uint[](limit);
        metaCountArr = new uint[](limit);

        for (uint i = 0; i < limit; i++) {
            tokenURIArr[i] = ds._tokenURIs[start + i];
            totalSupplyArr[i] = ds._totalSupply[start + i];
            maxSupplyArr[i] = ds._maxSupplyMap[start + i];
            itemsCountArr[i] = ds._tokenItemsMap[start + i].length;
            metaCountArr[i] = ds._metasMap[start + i].length;
        }
    }
}
