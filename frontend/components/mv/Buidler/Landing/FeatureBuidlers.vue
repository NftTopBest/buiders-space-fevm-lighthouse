<script setup lang="ts">
import { EnvelopeIcon, PhoneIcon } from '@heroicons/vue/20/solid'

const people = [
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  // More people...
]

const { getUserProfileLink } = $(mvStore())

const { contractRead, getJson } = $(web3AuthStore())

let items = $ref([])
let isLoading = $ref(false)
watchEffect(async() => {
  isLoading = true
  const rz = await contractRead('BuidlerProtocol', 'getBuidlerList', 0, 8)
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
  <div>
    <div class="mx-auto max-w-2xl py-8 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="font-bold mb-6 tracking-tight text-2xl text-gray-900">
        Feature Buidlers
      </h2>
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
