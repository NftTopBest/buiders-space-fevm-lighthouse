<script setup lang="ts">
import {
  CheckIcon,
  XMarkIcon,
} from '@heroicons/vue/20/solid'

interface Props {
  address?: string
  profileId?: string
}
const {
  address,
  profileId,
} = defineProps<Props>()
const isSubscribe = $ref(false)

let isLoading = $ref(false)
const { walletAddress } = $(web3AuthStore())
const { doSubscribeToProfileGasless, getSubscribersByAddress } = $(ccStore())
let isInit = $ref(false)

const querySubscribers = async() => {
  const rz = await getSubscribersByAddress(address, walletAddress)
  console.log('====> rz :', rz)
  // isSubscribe = rz.isSubscribedByMe
  // isSubscribe = true
}
const doSubscribe = async() => {
  isLoading = true
  const rz = await doSubscribeToProfileGasless(profileId)
  console.log('====> rz :', rz)
  isSubscribe = true
  // await querySubscribers()
  isLoading = false
}

watchEffect(async() => {
  if (!address) return
  if (!walletAddress) return

  // isLoading = true
  await querySubscribers()
  isInit = true
  isLoading = false
})
</script>
<template>
  <div v-if="isInit">
    <BtnPlain v-if="isSubscribe" :is-loading="isLoading" :disabled="true">
      <span class="flex "><CheckIcon class="h-5 mr-1.5 -ml-0.5 w-5" aria-hidden="true" /> Subscribed</span>
    </BtnPlain>
    <BtnIndigo v-else :is-loading="isLoading" @click="doSubscribe">
      Subscribe
    </BtnIndigo>
  </div>
  <div v-else>
    <Loading />
  </div>
</template>
