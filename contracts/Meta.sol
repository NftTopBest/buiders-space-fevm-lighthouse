// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibDiamond} from "../libraries/LibDiamond.sol";
import "../storage/facets/AppStorageFacet.sol";
import "../storage/facets/ERC1155StorageFacet.sol";

contract Meta is AppStorageFacet, ERC1155StorageFacet {
    function getMetas(uint tokenId, uint start, uint limit, string memory metaType) external view returns (string[] memory metas) {
        ERC1155FacetStorage storage ds = erc1155Storage();

        string[] memory all = ds._metasMap[tokenId];
        if (bytes(metaType).length > 0) {
            all = ds._metasKeyByMetaTypeMap[tokenId][metaType];
        }

        uint lens = all.length - start;
        if (lens < limit) {
            limit = lens;
        }
        metas = new string[](limit);

        for (uint i = 0; i < limit; i++) {
            metas[i] = all[start + i];
        }
    }
}
