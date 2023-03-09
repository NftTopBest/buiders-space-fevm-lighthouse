<script setup lang="ts">
const { getUserProfileLink } = $(mvStore())

const { contractRead, getJson } = $(web3AuthStore())

let items = $ref([])
let isLoading = $ref(false)
watchEffect(async() => {
  isLoading = true
  const rz = await contractRead('BuidlerProtocol', 'getBuidlerList', 0, 100)
  const cidArr = await Promise.all(rz.cidArr.map(cid => getJson(cid)))
  items = rz.addressArr.map((walletAddress, index) => {
    return {
      ...cidArr[index],
      walletAddress,
    }
  })
  // items = [
  //   ...items,
  //   ...items,
  //   ...items,
  //   ...items,
  // ]
  isLoading = false
})

</script>
<template>
  <div class="flex">
    <MvBuidlerKblHead />

    <div class="flex flex-col mx-auto flex-1 text-center max-w-7xl px-6 lg:px-8">
      <div v-if="false" class="mx-auto max-w-2xl">
        <h2 class="font-bold tracking-tight text-3xl text-gray-900 sm:text-4xl">
          Meet our team
        </h2>
        <p class="mt-4 text-lg text-gray-600 leading-8">
          We’re a dynamic group of individuals who are passionate about what we do.
        </p>
      </div>
      <div v-if="isLoading" class="flex flex-1 justify-center">
        <Loading />
      </div>
      <ul v-else role="list" class="mx-auto my-32 grid gap-x-16 gap-y-16 grid-cols-1 sm:grid-cols-2 lg:mx-0 lg:grid-cols-4">
        <li v-for="item in items" :key="item.walletAddress">
          <router-link :to="getUserProfileLink(item.walletAddress)" class="cursor-pointer hover:opacity-80">
            <IpfsImg class="rounded-full mx-auto object-cover h-56 w-56" :src="item.avatar" alt="" />
            <h3 class="font-semibold mt-6 text-base tracking-tight text-gray-900 leading-7">
              {{ item.name }}
            </h3>
            <p class="text-sm text-gray-600 leading-6">
              {{ item.description }}
            </p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: bs
  isNoPadding: true
</route>
