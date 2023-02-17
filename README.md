# buiders-space-fevm-lighthouse

A nft space that can create/trade/buy/bid/ask NFT stuff! A web3 way of creater space that like a web3 amazon!

<img src="./screenshot.png" />

## Links

* [Online demo](https://www.buidlers.space)
* [All screenshots](./screenshot/)

## Application Tech Stack

* [x] ERC1155
* [x] EIP2535
* [x] IPFS
* [x] Hardhat
* [x] Vercel
* [x] TailwindCSS
* [x] Vue3
* [x] Pinia (state store)
* [x] PWA
* [x] Vue-i18n
* [x] Vite2

## SDK we use

### [Web3MQ](https://github.com/NftTopBest/buiders-space-fevm-lighthouse/blob/main/frontend/stores/web3MQStore.ts)

## Problem

NFT should be have value on it not just PFP. We create the super great Smart Contract BuidlerProtocol that treat it as the central of the Builders! Every builders can create many build for themself for any project(every project is an NFT).

Builder will continue add new build on the NFT, so their users(buyer) can mint NFT(buy it with $NST), then can sell it or make an Ask order, and the guy do not mint the NFT can buy NFT from the de-market or just make a new Bid for the NFT.

While builder add new build for his/her NFT projects, they need to add the cidRaw and size, so later the SP can call activateDealBySP to activate the deal, then call the withdrawReward with cidRaw to get the reward.

## How it's Made

### FEVM DataDAO

we use the FEVM Actor API in our smart contract to pay storage fee while builder add new item for their NFT build, and SP can activateDealBySP and withdrawReward. It depends the HyperActor from the @zondax/filecoin-solidity

addItem and pay $FIL to store deal: <https://github.com/NftTopBest/buiders-space-fevm-lighthouse/blob/main/contracts/Item.sol#L12>
DataDAO: <https://github.com/NftTopBest/buiders-space-fevm-lighthouse/blob/main/contracts/DataDAO.sol>

### lighthouse SDK

encrypted content with access conditions: <https://github.com/NftTopBest/buiders-space-fevm-lighthouse/blob/main/frontend/stores/mvStore.ts#L248>
decrypted content: <https://github.com/NftTopBest/buiders-space-fevm-lighthouse/blob/main/frontend/stores/mvStore.ts#L224>

### EIP2535 to build large contract <https://eips.ethereum.org/EIPS/eip-2535>

Our contract is large, so we use the Diamond Tech to build our smart contract: use the diamond cut func to deploy more facts: <https://github.com/NftTopBest/buiders-space-fevm-lighthouse/blob/main/contracts/DiamondCutFacet.sol>

## Deploy result

* online demo: <https://www.buidlers.space/fevm/buidlers>
* BuidlerProtocol contract(EIP2535): <https://hyperspace.filfox.info/en/address/0x9Fe9b4E2C0107546c6421fe88847332B53C06359>
* Negentropy contract: <https://hyperspace.filfox.info/en/address/0xBb0658eCB49e0d09756E0cA879492B8553E6DcB8>
