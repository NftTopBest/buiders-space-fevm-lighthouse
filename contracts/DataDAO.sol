// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibDiamond} from "../libraries/LibDiamond.sol";
import "../storage/facets/AppStorageFacet.sol";
import "../storage/facets/ERC1155StorageFacet.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// FEVM Actor API
import {MarketAPI} from "@zondax/filecoin-solidity/contracts/v0.8/MarketAPI.sol";
import {CommonTypes} from "@zondax/filecoin-solidity/contracts/v0.8/types/CommonTypes.sol";
import {MarketTypes} from "@zondax/filecoin-solidity/contracts/v0.8/types/MarketTypes.sol";
import {BigInt} from "@zondax/filecoin-solidity/contracts/v0.8/cbor/BigIntCbor.sol";
import {Misc} from "@zondax/filecoin-solidity/contracts/v0.8/utils/Misc.sol";

address constant CALL_ACTOR_ID = 0xfe00000000000000000000000000000000000005;
uint64 constant DEFAULT_FLAG = 0x00000000;
uint64 constant METHOD_SEND = 0;

library HyperActor {
    address constant CALL_ACTOR_ADDRESS = 0xfe00000000000000000000000000000000000003;

    function convert(uint256 _a) internal pure returns (uint64) {
        return uint64(_a);
    }

    function call_actor_id(
        uint64 method,
        uint256 value,
        uint64 flags,
        uint64 codec,
        bytes memory params,
        uint64 id
    ) internal returns (bool, int256, uint64, bytes memory) {
        (bool success, bytes memory data) = address(CALL_ACTOR_ID).delegatecall(abi.encode(method, value, flags, codec, params, id));
        (int256 exit, uint64 return_codec, bytes memory return_value) = abi.decode(data, (int256, uint64, bytes));
        return (success, exit, return_codec, return_value);
    }

    function call_actor_address(
        uint64 method,
        uint256 value,
        uint64 flags,
        uint64 codec,
        bytes memory params,
        bytes memory filAddress
    ) internal returns (bool, int256, uint64, bytes memory) {
        (bool success, bytes memory data) = address(CALL_ACTOR_ADDRESS).delegatecall(abi.encode(method, value, flags, codec, params, filAddress));
        (int256 exit, uint64 return_codec, bytes memory return_value) = abi.decode(data, (int256, uint64, bytes));
        return (success, exit, return_codec, return_value);
    }

    function call(uint method, bytes memory filAddress, bytes memory params, uint64 codec) internal returns (bytes memory) {
        return call_inner(convert(method), filAddress, params, codec, msg.value);
    }

    function call_inner(uint method, bytes memory filAddress, bytes memory params, uint64 codec, uint amount) internal returns (bytes memory) {
        (bool _success, int256 exit_code, uint64 _return_codec, bytes memory return_value) = call_actor_address(
            convert(method),
            amount,
            DEFAULT_FLAG,
            codec,
            params,
            filAddress
        );
        require(exit_code == 0, string.concat("actor error code ", Strings.toString(uint256(exit_code))));
        return return_value;
    }
}

contract DataDAO is AppStorageFacet, ERC1155StorageFacet {
    function activateDealBySP(uint64 dealId) external {
        MarketTypes.GetDealDataCommitmentReturn memory commitmentRet = MarketAPI.getDealDataCommitment(dealId);

        bytes memory cidRaw = commitmentRet.data;

        ERC1155FacetStorage storage ds = erc1155Storage();
        require(ds.deals[cidRaw].dealState == DealState.Created, "deal not in created state");
        require(ds.deals[cidRaw].size == commitmentRet.size, "data size must match expected");

        MarketTypes.GetDealClientReturn memory clientRet = MarketAPI.getDealClient(dealId);
        // Activate the deal
        ds.deals[cidRaw].dealState = DealState.Active;
        ds.deals[cidRaw].dealStartBlockStamp = block.timestamp;
        ds.deals[cidRaw].client = clientRet.client;
    }

    function withdrawReward(bytes memory cidRaw) external {
        ERC1155FacetStorage storage ds = erc1155Storage();

        require(
            (ds.deals[cidRaw].dealState == DealState.Active &&
                SafeMath.div(SafeMath.sub(block.timestamp, ds.deals[cidRaw].dealStartBlockStamp), 1 days) >= ds.deals[cidRaw].dealDurationInDays),
            "store not exipred yet"
        );

        bytes memory emptyParams = "";
        delete emptyParams;

        require(ds.storagePaymentBalanceMap[ds.deals[cidRaw].createdBy] >= ds.deals[cidRaw].storageFees, "creator do not have enough balance");

        ds.storagePaymentBalanceMap[ds.deals[cidRaw].createdBy] -= ds.deals[cidRaw].storageFees;
        HyperActor.call_actor_id(METHOD_SEND, ds.deals[cidRaw].storageFees, DEFAULT_FLAG, Misc.NONE_CODEC, emptyParams, ds.deals[cidRaw].client);
    }

    /// @dev makes a call to actoir ID and transfer FIL
    /// @param method: Id of the cred.
    /// @param value: Depth of the tree.
    /// @param flags: Zero value of the tree.
    /// @param codec: Admin of the cred.
    /// @param params: URI for the cred.
    /// @param id: actor ID
    function call_actor_id(
        uint64 method,
        uint256 value,
        uint64 flags,
        uint64 codec,
        bytes memory params,
        uint64 id
    ) internal returns (bool, int256, uint64, bytes memory) {
        (bool success, bytes memory data) = address(CALL_ACTOR_ID).delegatecall(abi.encode(method, value, flags, codec, params, id));
        (int256 exit, uint64 return_codec, bytes memory return_value) = abi.decode(data, (int256, uint64, bytes));
        return (success, exit, return_codec, return_value);
    }
}
