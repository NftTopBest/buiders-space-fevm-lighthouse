<script setup lang="ts">

const {
  userData,
} = $(web3AuthStore())

</script>

<template>
  <div>
    <header class="w-full">
      <MvBuidlerHeader />
    </header>

    <div class="mx-auto max-w-4xl px-4 pt-4 lg:px-0">
      <MvBuidlerNewNFT />
      <ProfileForceUpdateModal v-if="!userData.avatar">
        You need update your profile before create new NFT
      </ProfileForceUpdateModal>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: massverse
</route>
