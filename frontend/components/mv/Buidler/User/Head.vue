
<script setup lang="ts">
import { EnvelopeIcon } from '@heroicons/vue/20/solid'

const { isMyWalletAddress } = $(web3AuthStore())
const route = useRoute()
const address = $computed(() => route.params.address)
const showActionBtn = $computed(() => !isMyWalletAddress(address))

const { doGetPrimaryHandleProfileIdWithCache } = $(ccStore())

const userData = inject('userData')
const { chainName } = $(mvStore())
const msgLink = $computed(() => `/${chainName}/msg/user:54c791ec69ae97bdafd1cc3ee2d5479f9ce493e603745f16bef921ab`)

let handle = $ref('')
let profileId = $ref('')
watchEffect(async() => {
  if (!address) return
  const rz = await doGetPrimaryHandleProfileIdWithCache(address)
  handle = rz.handle
  profileId = rz.profileId
})
</script>
<template>
  <div class="">
    <IpfsImg :src="userData.banner || 'ipfs://bafybeierx4mdk6mlnwe4hrckogagabjqbl2mp4j7bn4m5w2uovlajbv7li'" class="object-cover h-90 w-full" alt="" />
    <div class="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
      <div class="-mt-12 sm:flex sm:space-x-5 sm:-mt-16 sm:items-end">
        <div class="flex">
          <IpfsImg class="rounded-full object-cover h-24 ring-white ring-4 w-24 sm:h-32 sm:w-32" :src="userData.avatar || '/pwa-192x192.png'" alt="" />
        </div>
        <div class="mt-6 sm:flex sm:space-x-6 sm:flex-1 sm:min-w-0 sm:pb-1 sm:items-center sm:justify-end">
          <div class="flex-1 mt-6 min-w-0 sm:hidden md:block">
            <h1 class="font-bold text-2xl text-gray-900 truncate">
              {{ userData.name }}
            </h1>
            <p class="text-gray-400">
              {{ userData.description }}
            </p>
          </div>
          <div v-if="showActionBtn" class="flex flex-col space-y-3 mt-6 justify-stretch sm:flex-row sm:space-y-0 sm:space-x-4">
            <!-- <router-link :to="msgLink" class="bg-white border rounded-md font-medium border-gray-300 shadow-sm text-sm py-2 px-4 text-gray-700 inline-flex justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
              <EnvelopeIcon class="h-5 mr-2 -ml-1 text-gray-400 w-5" aria-hidden="true" />
              <span>Message</span>
            </router-link> -->
            <CcSubscribeBtn v-if="address" :address="address" :profile-id="profileId" />
            <CcFollowBtn v-if="handle" :handle="handle" />
          </div>
        </div>
      </div>
    </div>
    <MvBuidlerUserTab />
  </div>
</template>
