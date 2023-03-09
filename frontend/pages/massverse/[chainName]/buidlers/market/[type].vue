<script setup lang="ts">
import {
  Bars4Icon,
  Squares2X2Icon as Squares2X2IconMini,
} from '@heroicons/vue/20/solid'

const { chainName } = $(mvStore())

const route = useRoute()
const marketType = $computed(() => route.params.type)

const { contractRead, getJson } = $(web3AuthStore())
const { doBuyOrSell, getBuidlerInfo, getUserProfileLink } = $(mvStore())

let items = $ref([])
let isLoading = $ref(false)
watchEffect(async() => {
  isLoading = true
  const rz = await contractRead('BuidlerProtocol', 'getMarketItemsByType', marketType, 0, 100)
  const tokenURIs = await Promise.all(rz.tokenURIs.map(cid => getJson(cid)))
  items = await Promise.all(rz.items.map(async(item, index) => {
    const userData = await getBuidlerInfo(item.createdBy)
    return {
      ...item,
      tokenInfo: tokenURIs[index],
      userData,
    }
  }))
  isLoading = false
})

</script>

<template>
  <div class="bg-white w-full p-10">
    <main class="flex flex-col flex-1">
      <div class="flex">
        <h1 class="font-bold flex-1 text-2xl text-gray-900">
          Market {{ marketType[0]?.toUpperCase() + marketType.substring(1) }}
        </h1>
        <div class="rounded-lg flex bg-gray-100 ml-6 p-0.5 items-center hidden">
          <button type="button" class="rounded-md p-1.5 text-gray-400 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-inset focus:ring-2 focus:ring-indigo-500">
            <Bars4Icon class="h-5 w-5" aria-hidden="true" />
            <span class="sr-only">Use list view</span>
          </button>
          <button type="button" class="bg-white rounded-md shadow-sm ml-0.5 p-1.5 text-gray-400 focus:outline-none focus:ring-inset focus:ring-2 focus:ring-indigo-500">
            <Squares2X2IconMini class="h-5 w-5" aria-hidden="true" />
            <span class="sr-only">Use grid view</span>
          </button>
        </div>
      </div>

      <div v-if="isLoading && items.length === 0" class="flex flex-1 justify-center items-center">
        <Loading />
      </div>
      <section v-else class="mt-8 pb-16" aria-labelledby="gallery-heading">
        <ul role="list" class="grid gap-x-4 gap-y-8 grid-cols-2 sm:gap-x-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:gap-x-8 xl:grid-cols-4">
          <li v-for="item in items" :key="item.itemId" class="relative" :class="item.isListed ? '' : 'hidden'">
            <router-link :to="`/${chainName}/buidlers/build/${item.tokenId}`" :class="[item.current ? 'ring-2 ring-offset-2 ring-indigo-500' : 'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500', 'group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden']">
              <IpfsImg :src="item.tokenInfo.image" :alt="item.tokenInfo.name" class="h-full object-cover object-center w-full group-hover:opacity-75" />

              <button type="button" class="inset-0 absolute focus:outline-none">
                <span class="sr-only">View details for {{ item.tokenInfo.name }}</span>
              </button>
            </router-link>
            <p class="font-medium my-2 text-sm text-gray-900 pointer-events-none block truncate">
              #{{ item.itemId }} {{ item.tokenInfo.name }}
            </p>
            <p class="flex font-medium text-sm mb-4 text-gray-500 items-center justify-between pointer-events-none block">
              <router-link :to="getUserProfileLink(item?.userData?.walletAddress)" class="flex-shrink-0">
                <IpfsImg class="rounded-full object-cover h-10 w-10" :src="item?.userData?.avatar" alt="" />
              </router-link>
              <span class="font-bold text-indigo-500">
                {{ formatEther(item.unitPrice) }} $BST x {{ item.amount }}
              </span>
            </p>
            <btn-indigo v-if="marketType === 'bid'" :is-loading="item.isLoading" class="w-full" @click="doBuyOrSell(item, 'sell')">
              Sell
            </btn-indigo>
            <btn-indigo v-else :is-loading="item.isLoading" class="w-full" @click="doBuyOrSell(item, 'buy')">
              Buy
            </btn-indigo>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<route lang="yaml">
meta:
  layout: bs
</route>
