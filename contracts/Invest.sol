// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibDiamond} from "../libraries/LibDiamond.sol";
import "../storage/facets/AppStorageFacet.sol";
import "../storage/facets/ERC1155StorageFacet.sol";

contract Invest is AppStorageFacet, ERC1155StorageFacet {
    event AddInvest(uint amount, uint tokenId, address createdBy);

    function addInvest(uint tokenId, uint amount) external payable {
        require(amount > 0, "amount should not zero");

        address createdBy = msg.sender;

        ERC1155FacetStorage storage ds = erc1155Storage();

        if (ds.tokenInvestAmountMap[tokenId][createdBy] == 0) {
            ds.tokenInvesterAddressArr[tokenId].push(createdBy);
        }
        ds.tokenInvestAmount[tokenId] += amount;
        ds.tokenInvestAmountMap[tokenId][createdBy] += amount;

        emit AddInvest(amount, tokenId, createdBy);
    }

    function getInvestsAmount(uint tokenId) external view returns (uint amount) {
        ERC1155FacetStorage storage ds = erc1155Storage();

        amount = ds.tokenInvestAmount[tokenId];
    }

    function getInvestsDetailArr(
        uint tokenId,
        uint start,
        uint limit
    ) external view returns (address[] memory tokenInvesterAddressArr, uint[] memory amountArr) {
        ERC1155FacetStorage storage ds = erc1155Storage();

        address[] memory all = ds.tokenInvesterAddressArr[tokenId];
        uint lens = all.length - start;
        if (lens < limit) {
            limit = lens;
        }
        tokenInvesterAddressArr = new address[](limit);
        amountArr = new uint[](limit);

        for (uint i = 0; i < limit; i++) {
            tokenInvesterAddressArr[i] = all[start + i];
            amountArr[i] = ds.tokenInvestAmountMap[tokenId][tokenInvesterAddressArr[i]];
        }
    }
}
