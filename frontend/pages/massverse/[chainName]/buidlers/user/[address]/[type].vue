<script setup lang="ts">

const route = useRoute()
const address = $computed(() => route.params.address)
const dataType = $computed(() => route.params.type || 'feed')
const { contractRead, getJson } = $(web3AuthStore())

let userData = $ref({})
provide('userData', $$(userData))

const { isUserItemsLoading, getUserItems, getUserOwned } = $(mvStore())
const { isItemsLoading: isFeedLoading, getPublications } = $(lensStore())
let items = $ref([])

watchEffect(async() => {
  if (!address) return
  const profileCid = await contractRead('BuidlerProtocol', 'getBuidler', address)
  if (profileCid) {
    userData = await getJson(profileCid)
  }
  else {
    userData = {
      walletAddress: address,
    }
  }

  if (dataType === 'feed') {
    items = await getPublications(address)
    return
  }
  if (dataType === 'owned') {
    items = await getUserOwned(address)
    return
  }
  items = await getUserItems(dataType, address)
})

const needFilterDataTypeArr = ['bid', 'ask']
const theItems = $computed(() => {
  if (!needFilterDataTypeArr.includes(dataType)) return items
  return items.filter(item => item.isListed)
})

const isLoading = $computed(() => isUserItemsLoading || isFeedLoading)
</script>

<template>
  <div class="flex flex-col">
    <MvBuidlerUserHead />
    <LoadingOrEmpty :is-loading="isLoading" :items="theItems">
      <MvBuidlerUserFeed v-if="dataType === 'feed'" :items="theItems" />
      <MvBuidlerUserItems v-else :items="theItems" :data-type="dataType" />
    </LoadingOrEmpty>
  </div>
</template>

<route lang="yaml">
meta:
  layout: bs
  isNoPadding: true
</route>
