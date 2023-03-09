<script setup lang="ts">
import { gql_CC_essences as ql } from '~/gql/CyberConnect/gql_CC_essences'

const route = useRoute()
const address = $computed(() => route.params.address)
const { getJson } = $(useNFTStorage())
let items = $ref([])
let isLoading = $ref(false)
watchEffect(async() => {
  isLoading = true
  const rz = await useMutation(ql).execute({ address })
  const essences = get(rz.data, 'address.wallet.collectedEssences.edges', [])
  items = await Promise.all(essences.map(async(i) => {
    const tokenMetaData = await getJson(get(i, 'node.essence.tokenURI'))
    const image = get(tokenMetaData, 'image')
    return {
      tokenId: get(i, 'node.tokenID', ''),
      address: get(i, 'node.essence.contractAddress'),
      name: get(i, 'node.essence.name', ''),
      image,
      description: get(i, 'node.essence.desc', ''),
    }
  }))
  isLoading = false
})
</script>
<template>
  <div v-if="!isLoading" class="mx-auto max-w-7xl p-6 lg:p-8">
    <ul role="list" class="mx-auto max-w-2xl grid gap-x-8 gap-y-8 grid-cols-1 sm:grid-cols-2 lg:max-w-none lg:mx-0 lg:grid-cols-3">
      <li v-for="(item, index) in items" :key="index">
        <a :href="`https://opensea.io/assets/bsc-testnet/${item.address}/${item.tokenId}`" class="w-full block aspect-[3/2]" target="blank">
          <IpfsImg class="h-full object-cover rounded-2xl w-full" :src="item?.image" alt="" />
          <h3 class="flex font-semibold mt-6 text-lg tracking-tight text-gray-900 leading-8 justify-between">
            <span>#{{ item?.tokenId }} {{ item?.name }} </span>
          </h3>
          <p class="text-base text-gray-600 leading-7">
            {{ item?.description }}
          </p>
        </a>
        <!-- <BtnIndigo v-if="dataType === 'bid'" :is-loading="item.isLoading" class="mt-2 w-full" @click="doBuyOrSell(item, 'sell')">
          Sell
        </BtnIndigo>
        <BtnIndigo v-if="dataType === 'ask'" :is-loading="item.isLoading" class="mt-2 w-full" @click="doBuyOrSell(item, 'buy')">
          Buy
        </BtnIndigo> -->
      </li>
    </ul>
  </div>
</template>
