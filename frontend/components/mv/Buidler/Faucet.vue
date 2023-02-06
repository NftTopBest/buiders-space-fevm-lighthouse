<script setup lang="ts">
import { shortAddress } from '~/helpers/web3'
const { addSuccess, walletAddress, rawProvider, initContract } = $(web3AuthStore())
const { payTokenAddress } = $(appStore())

let balance = $ref('0')
let isLoading = $ref(false)
let faucetWalletAddress = $ref('')

const queryBalance = async() => {
  const contractReader = await initContract('Negentropy')
  balance = await contractReader.balanceOf(faucetWalletAddress)
  console.log('====> balance :', balance)
}

const doSubmit = async() => {
  if (isLoading) return
  isLoading = true

  const contractWriter = await initContract('Negentropy', true)
  const amount = parseEther('10000')
  const tx = await contractWriter.faucetMint(faucetWalletAddress, amount)
  const rz = await tx.wait()
  console.log('====> rz :', rz)
  await queryBalance()
  addSuccess('Request faucet success')
  isLoading = false
}

const doAddTokenToWallet = async() => {
  const tokenAddress = payTokenAddress
  const tokenSymbol = '$NST'
  const tokenDecimals = 18
  const tokenImage = 'https://ethereum.org/static/a183661dd70e0e5c70689a0ec95ef0ba/81d9f/eth-diamond-purple.webp'

  try {
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    const wasAdded = await rawProvider.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20', // Initially only supports ERC20, but eventually more!
        options: {
          address: tokenAddress, // The address that the token is at.
          symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
          decimals: tokenDecimals, // The number of decimals in the token
          image: tokenImage, // A string url of the token logo
        },
      },
    })

    if (wasAdded)
      console.log('Thanks for your interest!')

    else
      console.log('Your loss!')
  }
  catch (error) {
    console.log(error)
  }
}

watchEffect(async() => {
  if (walletAddress) {
    faucetWalletAddress = walletAddress
    await queryBalance()
  }
})
</script>
<template>
  <div class="bg-indigo-600 rounded-2xl shadow-xl py-10 px-6 relative overflow-hidden sm:py-20 sm:px-12">
    <div aria-hidden="true" class="-mt-72 inset-0 absolute sm:-mt-32 md:mt-0">
      <svg class="h-full w-full inset-0 absolute" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 1463 360">
        <path class="text-indigo-500 text-opacity-40" fill="currentColor" d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z" />
        <path class="text-indigo-700 text-opacity-40" fill="currentColor" d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z" />
      </svg>
    </div>
    <div class="relative">
      <div class="sm:text-center">
        <h2 class="font-bold text-white tracking-tight text-3xl sm:text-4xl">
          Negentropy Token($NST) Faucet
        </h2>
        <p class="mx-auto mt-6 text-lg max-w-2xl text-indigo-200">
          The whole Buidlers Platform require Negentropy ERC20 Token to pay as fee.
        </p>
      </div>
      <div class="mt-12 sm:flex sm:mx-auto sm:max-w-lg">
        <div class="flex-1 min-w-0">
          <label for="wallet-address" class="sr-only">Wallet address</label>
          <input id="wallet-address" v-model="faucetWalletAddress" :disabled="isLoading" class="border border-transparent rounded-md shadow-sm text-base w-full py-3 px-5 placeholder-gray-500 text-gray-900 block focus:border-transparent focus:outline-none focus:ring-white focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600" placeholder="Enter your wallet address">
        </div>
        <div class="flex mt-4 sm:mt-0 sm:ml-3">
          <btn-indigo class="border-transparent font-medium bg-indigo-500 px-5" :is-loading="isLoading" @click="doSubmit">
            Send Me $NST
          </btn-indigo>
        </div>
      </div>
      <div v-if="faucetWalletAddress" class="mt-12 sm:text-center">
        <h2 class="font-bold text-white tracking-tight text-3xl sm:text-4xl">
          {{ shortAddress(faucetWalletAddress) }} have {{ humanFormatEther(balance) }} $NST
        </h2>
        <btn-indigo class="mt-10" @click="doAddTokenToWallet">
          Add $NST to wallet
        </btn-indigo>
      </div>
    </div>
  </div>
</template>
