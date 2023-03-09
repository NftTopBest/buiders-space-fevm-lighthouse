<script setup lang="ts">
const { form, doSubmitCreateItem, getTokenDataFromChain, updateTokenPosts } = $(mvStore())
const route = useRoute()
const tokenId = $computed(() => route.params.id)
form.tokenId = tokenId

watchEffect(async() => {
  await getTokenDataFromChain(tokenId)
  await updateTokenPosts(tokenId)
})
</script>

<template>
  <MvBuidlerStep>
    <template #default="{currentStepIndex}">
      <Loading v-if="form.isLoading" class="p-10" />
      <template v-else>
        <MvBuidlerPostCreateCcSBT v-if="currentStepIndex == 0" />
        <MvBuidlerPostType v-if="currentStepIndex == 1" />
        <template v-if="currentStepIndex == 2">
          <MvBuidlerPostCreateArticle v-if="form.type == 'article'" />
          <MvBuidlerPostCreateLive v-if="form.type == 'liveroom'" />
        </template>
      </template>
    </template>

    <template #submit>
      <btn-indigo :is-loading="form.isLoading" class="w-full" @click="doSubmitCreateItem">
        Submit
      </btn-indigo>
    </template>
  </MvBuidlerStep>
</template>

<route lang="yaml">
meta:
  layout: bs
</route>
