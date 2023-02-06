// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibDiamond} from "../libraries/LibDiamond.sol";
import "../interfaces/IERC20.sol";
import "../storage/facets/AppStorageFacet.sol";
import "../storage/facets/ERC1155StorageFacet.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract App is AppStorageFacet, ERC1155StorageFacet, ReentrancyGuard {
    function getAppConfig() external view returns (IERC20 payTokenAddress, uint createTokenCost, string memory baseURI, uint platformCommission) {
        ERC1155FacetStorage storage ds = erc1155Storage();

        baseURI = ds.baseURI;
        payTokenAddress = ds.payTokenAddress;
        createTokenCost = ds.createTokenCost;
        platformCommission = ds.platformCommission;
    }

    function updatePayment(IERC20 payTokenAddress, uint createTokenCost) external {
        LibDiamond.enforceIsContractOwner();
        ERC1155FacetStorage storage ds = erc1155Storage();

        ds.payTokenAddress = payTokenAddress;
        ds.createTokenCost = createTokenCost;
    }

    function updateMisc(string memory baseURI, uint platformCommission) external {
        LibDiamond.enforceIsContractOwner();
        ERC1155FacetStorage storage ds = erc1155Storage();

        ds.baseURI = baseURI;
        ds.platformCommission = platformCommission;
    }

    function getTokenBalance(uint tokenId, address tokenAddress) external view returns (uint balance) {
        ERC1155FacetStorage storage ds = erc1155Storage();

        balance = ds._tokenVaultMap[tokenId][tokenAddress];
    }

    function withdrawTokenVault(uint tokenId, address tokenAddress) external nonReentrant {
        ERC1155FacetStorage storage ds = erc1155Storage();

        require(ds._tokenOwnerMap[tokenId] == msg.sender, "you are not the token owner");

        uint amount = ds._tokenVaultMap[tokenId][tokenAddress];
        require(amount > 0, "no balance");

        ds._tokenVaultMap[tokenId][tokenAddress] = 0;
        IERC20(tokenAddress).transfer(msg.sender, amount);
    }

    function withdrawInviterBalance(address tokenAddress) external nonReentrant {
        ERC1155FacetStorage storage ds = erc1155Storage();

        uint amount = ds._inviterBalanceMap[msg.sender][tokenAddress];
        require(amount > 0, "no balance");

        ds._inviterBalanceMap[msg.sender][tokenAddress] = 0;
        IERC20(tokenAddress).transfer(msg.sender, amount);
    }

    function withdrawMarketBalance(address tokenAddress) external nonReentrant {
        ERC1155FacetStorage storage ds = erc1155Storage();

        uint amount = ds.userMarketBalance[msg.sender][tokenAddress];
        require(amount > 0, "no balance");

        ds.userMarketBalance[msg.sender][tokenAddress] = 0;
        IERC20(tokenAddress).transfer(msg.sender, amount);
    }

    function withdrawAdmin(IERC20 _token, uint amount) external {
        LibDiamond.enforceIsContractOwner();
        _token.transfer(msg.sender, amount);
    }
}
