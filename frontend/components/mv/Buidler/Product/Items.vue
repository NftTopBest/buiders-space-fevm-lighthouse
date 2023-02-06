<script setup lang="ts">
const chainName = inject('chainName')
const { currentTypeItems } = $(mvStore())
</script>
<template>
  <div class="bg-white">
    <div class="mx-auto py-4 px-4 sm:(py-12 px-6) lg:(p-0) ">
      <h2 class="sr-only">
        Products
      </h2>
      <Empty v-if="currentTypeItems.length === 0" @new-btn-click="$router.push(`/${chainName}/buidlers/newNFT`)">
        Create New NFT
      </Empty>
      <div v-else class="grid gap-y-10 gap-x-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 xl:grid-cols-4">
        <router-link v-for="item in currentTypeItems" :key="item.tokenId" :to="`/${chainName}/buidlers/build/${item.tokenId}`" class="group">
          <div class="rounded-lg bg-gray-200 w-full overflow-hidden aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8">
            <IpfsImg :src="item.image" :alt="item.name" class="h-full object-cover object-center w-full group-hover:opacity-75" />
          </div>
          <h3 class="mt-4 text-sm text-gray-700">
            {{ item.name }}
          </h3>
          <p class="flex font-medium mt-1 text-lg text-gray-900 justify-between">
            <span>#{{ item.tokenId }}</span>
            <span>
              {{ get(item, 'properties.basicPrice') }} $NST
            </span>
          </p>
        </router-link>
      </div>
    </div>
  </div>
</template>
