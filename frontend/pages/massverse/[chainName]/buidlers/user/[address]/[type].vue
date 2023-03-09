<script setup lang="ts">
const route = useRoute()
const address = $computed(() => route.params.address)
const dataType = $computed(() => route.params.type || 'feed')
const { contractRead, getJson } = $(web3AuthStore())
const { doGetUserCCInfo, isLoadingCCPostItems, doQueryPostItems } = $(ccStore())

let userData = $ref({})
provide('userData', $$(userData))

const { isUserItemsLoading, getUserItems, getUserOwned } = $(mvStore())
const { isItemsLoading: isFeedLoading, getPublications } = $(lensStore())
let items = $ref([])

const updatePageData = async() => {
  await doGetUserCCInfo(address)
  const profileCid = await contractRead('BuidlerProtocol', 'getBuidler', address)
  if (profileCid) {
    userData = await getJson(profileCid)
  }
  else {
    userData = {
      walletAddress: address,
    }
  }

  if (dataType === 'lensfeed') {
    items = await getPublications(address)
    return
  }

  if (dataType === 'feed') {
    items = await doQueryPostItems(address)
    return
  }
  if (dataType === 'owned') {
    items = await getUserOwned(address)
    return
  }
  // creation
  items = await getUserItems(dataType, address)
  console.log('====> items, isLoading :', items, isLoading)
}

watchEffect(async() => {
  if (!address || !dataType) return
  await updatePageData()
})
watch($$(dataType), async() => {
  await updatePageData()
})

const needFilterDataTypeArr = ['bid', 'ask']
const theItems = $computed(() => {
  if (!needFilterDataTypeArr.includes(dataType)) return items
  return items.filter(item => item.isListed)
})

const isLoading = $computed(() => isUserItemsLoading || isFeedLoading || isLoadingCCPostItems)
</script>

<template>
  <div class="flex flex-col">
    <MvBuidlerUserHead />
    <MvBuidlerUserCCFeed v-if="dataType === 'feed'" />
    <MvBuidlerUserCCEssence v-else-if="dataType === 'essences'" />
    <LoadingOrEmpty v-else :is-loading="isLoading" :items="theItems">
      <MvBuidlerUserItems :items="theItems" :data-type="dataType" />
    </LoadingOrEmpty>
  </div>
</template>

<route lang="yaml">
meta:
  layout: bs
  isNoPadding: true
</route>
