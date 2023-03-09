<template>
  <div>
    <video ref="video" width="720" controls autoplay muted :src="videoSrc" />

    <!-- <div class="mt-4">
      <input v-model="playbackId" type="text" placeholder="playbackId">
      <button class="ml-4 border border-transparent rounded-md font-medium bg-green-400 shadow-sm text-sm text-white ml-5 py-2 px-4 inline-flex justify-center hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" @click="submit">
        submit
      </button>
    </div> -->
  </div>
</template>

<script setup lang="ts">

import { playMedia } from '~/composables/useLivepeer'

interface Props {
  playbackId?: string
}

const { playbackId = 'f5eese9wwl88k4g8' } = defineProps<Props>()

let media
const video = $ref(null)
const videoSrc = $ref('')

onMounted(async() => {
  media = await playMedia({ playbackId, video, videoSrc })
})

// const submit = async() => {
//   media?.destroy && media?.destroy()
//   media = await playMedia({ playbackId, video, videoSrc })
// }
</script>

<style>

</style>
