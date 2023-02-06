// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibDiamond} from "../libraries/LibDiamond.sol";
import "../storage/facets/AppStorageFacet.sol";
import "../storage/facets/ERC1155StorageFacet.sol";
import "../interfaces/IERC1155.sol";

contract Buidler is AppStorageFacet, ERC1155StorageFacet {
    event NewBuidler(address inviterId, string cid, address createdBy, uint index);
    event UpdateBuidler(address inviterId, string cid, address createdBy);

    function updateBuidler(address inviter, string memory cid) external {
        require(bytes(cid).length > 0, "cid is empty");
        address createdBy = msg.sender;

        ERC1155FacetStorage storage ds = erc1155Storage();

        if (bytes(ds._profileMap[createdBy]).length == 0) {
            ds._inviteByMap[createdBy] = inviter;
            ds._buiderList.push(createdBy);
            emit NewBuidler(inviter, cid, createdBy, ds._buiderList.length);
        }
        ds._profileMap[createdBy] = cid;

        emit UpdateBuidler(inviter, cid, createdBy);
    }

    function getBuidler(address buidler) external view returns (string memory profile) {
        ERC1155FacetStorage storage ds = erc1155Storage();

        profile = ds._profileMap[buidler];
    }

    function getBuidlerList(uint start, uint limit) external view returns (string[] memory cidArr, address[] memory addressArr) {
        ERC1155FacetStorage storage ds = erc1155Storage();

        uint lens = ds._buiderList.length - start;
        if (lens < limit) {
            limit = lens;
        }
        cidArr = new string[](limit);
        addressArr = new address[](limit);

        for (uint i = 0; i < limit; i++) {
            addressArr[i] = ds._buiderList[start + i];
            cidArr[i] = ds._profileMap[addressArr[i]];
        }
    }
}
