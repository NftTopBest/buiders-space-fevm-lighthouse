<script setup lang="ts">
const { product, getUserProfileLink } = $(mvStore())
const gallery = $computed(() => {
  return get(product, 'properties.gallery', [])
})

const route = useRoute()
const tokenId = route.params.id

provide('tokenId', $$(tokenId))

const { getTokenDataFromChain, updateTokenPosts } = $(mvStore())
const { activeChannel } = $(web3MQStore())

watchEffect(async() => {
  await getTokenDataFromChain(tokenId)
  await updateTokenPosts(tokenId)
  const groupId = get(product, 'properties.web3MQChannelId', '')
  await activeChannel(groupId)
})

const author = $computed(() => get(product, 'author', {}))
const tags = $computed(() => get(product, 'properties.tags', []))
</script>
<template>
  <div>
    <div class="sm:px-6 lg:grid lg:px-0 lg:gap-x-8 lg:grid-cols-3">
      <div class="rounded-lg hidden overflow-hidden aspect-w-3 aspect-h-4 lg:block">
        <IpfsImg :has-modal="true" :src="gallery[0]" class="h-full object-cover object-center w-full" />
      </div>
      <div class="hidden lg:grid lg:gap-y-8 lg:grid-cols-1">
        <div class="rounded-lg overflow-hidden aspect-w-3 aspect-h-2">
          <IpfsImg :has-modal="true" :src="gallery[1]" class="h-full object-cover object-center w-full" />
        </div>
        <div class="rounded-lg overflow-hidden aspect-w-3 aspect-h-2">
          <IpfsImg :has-modal="true" :src="gallery[2]" class="h-full object-cover object-center w-full" />
        </div>
      </div>
      <div class="sm:rounded-lg aspect-w-4 aspect-h-5 sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
        <IpfsImg :has-modal="true" :src="gallery[3]" class="h-full object-cover object-center w-full" />
      </div>
    </div>

    <div class="px-4 pt-10 pb-16 sm:px-6 lg:grid lg:px-0 lg:pt-16 lg:gap-x-8 lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr]">
      <div class="lg:border-r lg:border-gray-200 lg:pr-8 lg:col-span-2">
        <h1 class="font-bold tracking-tight text-2xl text-gray-900 sm:text-3xl">
          {{ product.name }}
        </h1>
        <div class="flex pt-4 text-gray-500">
          <router-link :to="getUserProfileLink(product?.tokenOwner)" class="flex bg-gray-100 rounded-2xl mr-2 py-2 px-4 items-center">
            <IpfsImg :src="author?.avatar" class="rounded-full h-10 mr-2 w-10" />
            <span>{{ author?.name }}</span>
          </router-link>
          <div class="flex bg-gray-100 rounded-2xl py-2 px-4 items-center">
            <IpfsCreatedAt v-model="product.tokenURI" />
          </div>
          <div v-for="item in tags" :key="item" class="flex bg-gray-100 rounded-2xl ml-2 py-2 px-4 items-center">
            {{ item }}
          </div>
        </div>
      </div>

      <MvBuidlerProductTradeWidget />

      <div class="py-10 text-gray-400 lg:border-r lg:border-gray-200 lg:pt-12 lg:pr-8 lg:pb-16 lg:col-span-2 lg:col-start-1">
        <div class="mt-10">
          <div class="space-y-6 mt-4 text-sm text-gray-500 leading-10">
            <MdPreview :text="get(product, 'properties.projectDetail')" />
          </div>
        </div>
        <div class="mt-10">
          <!-- <MvBuidlerProductTimeline /> -->
        </div>
      </div>
    </div>
    <MvBuidlerProductPosts />

    <MvBuidlerProductModalCreateItem />
    <MvBuidlerProductModalPost />
  </div>
</template>

<route lang="yaml">
meta:
  layout: bs
</route>
