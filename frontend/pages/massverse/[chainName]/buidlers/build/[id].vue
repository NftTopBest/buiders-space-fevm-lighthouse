<script setup lang="ts">

const route = useRoute()
const tokenId = route.params.id

provide('tokenId', $$(tokenId))

const { getTokenDataFromChain, updateTokenPosts } = $(mvStore())

watchEffect(async() => {
  await getTokenDataFromChain(tokenId)
  await updateTokenPosts(tokenId)
})
</script>

<template>
  <div>
    <header class="w-full">
      <MvBuidlerHeader />
    </header>

    <MvBuidlerProductDetail />
    <MvBuidlerProductModalCreateItem />
    <MvBuidlerProductModalPost />
  </div>
</template>

<route lang="yaml">
meta:
  layout: massverse
</route>
