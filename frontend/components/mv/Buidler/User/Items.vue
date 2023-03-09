<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])
interface Props {
  // name, tokenId, description
  // owned: tokenBalance
  // ask: unitPrice, amount, itemId
  // bid:
  // created
  items?: Array
  dataType: String
}
const {
  items,
  dataType,
} = defineProps<Props>()

const { chainName, doBuyOrSell } = $(mvStore())

const getKey = (item) => {
  if (dataType === 'owned') return item.name
  if (dataType === 'ask') return item.itemId
}
const getLink = (item) => {
  return `/${chainName}/buidlers/build/${item.tokenId}`
}

</script>
<template>
  <div class="mx-auto max-w-7xl p-6 lg:p-8">
    <ul role="list" class="mx-auto max-w-2xl grid gap-x-8 gap-y-8 grid-cols-1 sm:grid-cols-2 lg:max-w-none lg:mx-0 lg:grid-cols-3">
      <li v-for="item in items" :key="getKey(item)">
        <router-link :to="getLink(item)" class="block">
          <IpfsImg class="object-cover rounded-2xl w-full aspect-[3/2]" :src="item.image" alt="" />
          <h3 class="flex font-semibold mt-6 text-lg tracking-tight text-gray-900 leading-8 justify-between">
            <span>#{{ item.tokenId }} {{ item.name }} </span>
            <span v-if="dataType === 'ask' || dataType ==='bid'"> {{ formatEther(item.unitPrice) }} $BST x {{ item.amount }}</span>
            <span v-if="dataType === 'owned'"> x {{ item.tokenBalance }}</span>
            <span v-if="dataType === 'creation'"> {{ item.totalSupply }} / {{ item.maxSupply }} </span>
          </h3>
          <p class="text-base text-gray-600 leading-7">
            {{ item.description }}
          </p>
        </router-link>
        <BtnIndigo v-if="dataType === 'bid'" :is-loading="item.isLoading" class="mt-2 w-full" @click="doBuyOrSell(item, 'sell')">
          Sell
        </BtnIndigo>
        <BtnIndigo v-if="dataType === 'ask'" :is-loading="item.isLoading" class="mt-2 w-full" @click="doBuyOrSell(item, 'buy')">
          Buy
        </BtnIndigo>
      </li>
    </ul>
  </div>
</template>
