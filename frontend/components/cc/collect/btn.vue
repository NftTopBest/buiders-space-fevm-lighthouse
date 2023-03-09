<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/20/solid'
interface Props {
  sbt?: Object
}
const {
  sbt,
} = defineProps<Props>()

const { walletAddress } = $(web3AuthStore())
const { doCollectEssenceGasless, doGetEssenceCollectors } = $(ccStore())
const metadataID = $computed(() => sbt.metadataID)
let isCollected = $ref(false)

const isLoading = $ref(false)
const submitCollectSBT = async() => {
  if (isLoading) return
  isLoading = true
  await doCollectEssenceGasless({
    ...sbt,
  })
  setItem(`cc_collect_status-${metadataID}`, true)
  isCollected = true
  isLoading = false
}

watchEffect(async() => {
  if (!walletAddress || !metadataID) return
  const rz = await doGetEssenceCollectors(metadataID)
  // console.log('====> rz :', rz)
  isCollected = getItem(`cc_collect_status-${metadataID}`, false)
})
</script>
<template>
  <div class="flex flex-1 justify-end items-center">
    <div class="flex -space-x-1 mr-2 isolate overflow-hidden">
      <img class="rounded-full h-6 ring-white ring-2 w-6 z-30 relative inline-block" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
      <img class="rounded-full h-6 ring-white ring-2 w-6 z-20 relative inline-block" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
      <img class="rounded-full h-6 ring-white ring-2 w-6 z-10 relative inline-block" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="">
      <img class="rounded-full h-6 ring-white ring-2 w-6 z-0 relative inline-block" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
    </div>
    <BtnGreen v-if="isCollected" class="cursor-not-allowed" :disabled="true">
      <CheckIcon class="h-5 mr-2 w-5" />
      Collected
    </BtnGreen>
    <BtnBlack v-else :is-loading="isLoading" @click="submitCollectSBT">
      Collect SBT
    </BtnBlack>
  </div>
</template>
