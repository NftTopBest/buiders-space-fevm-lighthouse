<script setup lang="ts">
import {
  CheckIcon,
  XMarkIcon,
} from '@heroicons/vue/20/solid'

interface Props {
  handle?: string
}
const {
  handle,
} = defineProps<Props>()
let isFollow = $ref(false)

let isLoading = $ref(false)
const { walletAddress } = $(web3AuthStore())
const { callCCApiMethod, getFollowersByHandle } = $(ccStore())
let isInit = $ref(false)

const queryFollowers = async() => {
  const rz = await getFollowersByHandle(handle)
  isFollow = rz.isFollowedByMe
}
const toggleFollow = async(handle, isDoFollow, cb) => {
  isLoading = true
  await callCCApiMethod(isDoFollow ? 'follow' : 'unfollow', handle)
  await queryFollowers()
  isLoading = false
}

watchEffect(async() => {
  if (!handle) return
  if (!walletAddress) return

  isLoading = true
  await queryFollowers()
  isInit = true
  isLoading = false
})
</script>
<template>
  <div v-if="isInit">
    <BtnPlain v-if="isFollow" :is-loading="isLoading" class="group" @click="toggleFollow(handle, false)">
      <span class="flex group-hover:hidden"><CheckIcon class="h-5 mr-1.5 -ml-0.5 w-5" aria-hidden="true" /> Followed</span>
      <span class="hidden group-hover:flex"><XMarkIcon class="h-5 mr-1.5 -ml-0.5 w-5" aria-hidden="true" /> Unfollow</span>
    </BtnPlain>
    <BtnBlack v-else :is-loading="isLoading" @click="toggleFollow(handle, true)">
      Follow
    </BtnBlack>
  </div>
  <div v-else>
    <Loading />
  </div>
</template>
