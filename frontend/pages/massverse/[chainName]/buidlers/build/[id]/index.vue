<script setup lang="ts">
const { product } = $(mvStore())
const gallery = $computed(() => {
  return [
    product.image,
    ...get(product, 'properties.gallery', []),
  ]
})

const route = useRoute()
const tokenId = route.params.id

provide('tokenId', $$(tokenId))

const { userData } = $(web3AuthStore())
const { getTokenDataFromChain, updateTokenPosts } = $(mvStore())
const { activeChannel } = $(web3MQStore())

watchEffect(async() => {
  await getTokenDataFromChain(tokenId)
  await updateTokenPosts(tokenId)
  const groupId = get(product, 'properties.web3MQChannelId', '')
  await activeChannel(groupId)
})

const tabs = ['Activity', 'Comment']
const currentTab = $ref(tabs[0])

const commentPost = $computed(() => {
  const contentID = get(product, 'properties.ccPost.contentID', '')
  const authorHandle = get(product, 'properties.ccProfileHandle', '')
  // return {
  //   contentID:
  // }
  return {
    contentID,
    authorHandle,
  }
})
</script>
<template>
  <div>
    <MvBuidlerProductHeader />
    <div class="flex h-150 mb-10">
      <MvBuidlerProductSlider v-model="gallery" class="w-1/2" />
      <div class="flex flex-col pl-8 w-1/2">
        <MvBuidlerProductInfoBox />
        <MvBuidlerProductTradeWidget class="flex-1" />
      </div>
    </div>
    <div>
      <div class="sm:hidden">
        <label for="tabs" class="sr-only">Select a tab</label>
        <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
        <select id="tabs" name="tabs" class="rounded-md border-gray-300 text-base w-full py-2 pr-10 pl-3 block sm:text-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500">
          <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">
            {{ tab.name }}
          </option>
        </select>
      </div>
      <div class="hidden sm:block">
        <div class="border-b border-gray-200">
          <nav class="flex -mb-px space-x-8" aria-label="Tabs">
            <button v-for="tab in tabs" :key="tab" :class="[currentTab == tab ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium']" :aria-current="currentTab == tab ? 'page' : undefined" @click="currentTab = tab">
              {{ tab }}
            </button>
          </nav>
        </div>
      </div>
    </div>

    <div class="pb-10">
      <MvBuidlerProductActivity v-if="currentTab === 'Activity'" />
      <MvBuidlerUserPostItem v-if="currentTab === 'Comment'" :item="commentPost" :is-only-comments="true" />
    </div>
    <MvBuidlerProductPosts />

    <!-- <MvBuidlerProductModalCreateItem />
    <MvBuidlerProductModalPost /> -->
  </div>
</template>

<route lang="yaml">
meta:
  layout: bs
</route>
