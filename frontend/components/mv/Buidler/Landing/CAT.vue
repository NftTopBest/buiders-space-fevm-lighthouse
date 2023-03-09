<script setup lang="ts">
const { chainName } = $(mvStore())
</script>

<template>
  <div class="bg-indigo-50 opacity-90">
    <div class="mx-auto max-w-7xl py-12 px-6 lg:flex lg:py-24 lg:px-8 lg:items-center lg:justify-between">
      <h2 class="font-bold tracking-tight text-3xl text-gray-900 md:text-4xl">
        <span class="block">Ready to dive in?</span>
        <span class="text-indigo-600 block">Start your first NFT Gating DAO today.</span>
      </h2>
      <div class="flex mt-8 lg:flex-shrink-0 lg:mt-0">
        <div class="rounded-md shadow inline-flex">
          <router-link :to="`/${chainName}/buidlers/newNFT`" class="border border-transparent rounded-md font-medium bg-indigo-600 text-base text-white py-3 px-5 inline-flex items-center justify-center hover:bg-indigo-700">
            Create NFT
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
