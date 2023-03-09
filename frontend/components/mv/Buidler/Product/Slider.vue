<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])
interface Props {
  modelValue?: string[]
}
const {
  modelValue,
} = defineProps<Props>()

let active = $ref(0)
let currentIndex = $ref(0)

let timer = null
onMounted(() => {
  timer = setInterval(() => {
    if (currentIndex > modelValue.length - 1)
      currentIndex = 0

    active = currentIndex
    currentIndex++
  }, 3000)
})
onUnmounted(() => {
  timer = null
})

const updateCurrent = (index) => {
  active = index
  currentIndex++
}
const isShowModal = $ref(false)
const theSrc = $computed(() => {
  return modelValue[active].replace('ipfs://', 'https://nftstorage.link/ipfs/')
})
</script>
<template>
  <div class="rounded-lg cursor-pointer h-full relative slide overflow-hidden">
    <div class="flex h-24 w-full bottom-0 carousel-indicators absolute justify-center items-center">
      <ol class="flex w-4/12 z-1 justify-center">
        <li v-for="(img, i) in modelValue" :key="i" class="rounded-full cursor-pointer  mx-2 md:h-4 md:w-4" :class="active === i ? 'bg-white' : 'bg-gray-600'" @click="updateCurrent(i)" />
      </ol>
    </div>
    <div class="w-full carousel-inner relative overflow-hidden">
      <div v-for="(img, i) in modelValue" :id="`slide-${i}`" :key="i" :class="`${active === i ? 'active' : 'left-full'}`" class="w-full transform inset-0 transition-all ease-in-out duration-500 carousel-item relative">
        <IpfsImg class="object-cover h-200  w-full block" :src="img" @click="isShowModal = true" />
      </div>
    </div>
    <dialog-wide :show="isShowModal" @close="isShowModal = false">
      <a :href="theSrc" target="_blank"><img :src="theSrc" class="h-200 w-auto"></a>
      <div class="flex h-24 w-full bottom-0 carousel-indicators absolute justify-center items-center">
        <ol class="flex w-4/12 z-1 justify-center">
          <li v-for="(img, i) in modelValue" :key="i" class="rounded-full cursor-pointer  mx-2 md:h-4 md:w-4" :class="active === i ? 'bg-white' : 'bg-gray-600'" @click="updateCurrent(i)" />
        </ol>
      </div>
    </dialog-wide>
  </div>
</template>
<style lang="stylus" scoped>
.left-full {
  left: -100%;
}

.carousel-item {
  float: left;
  position: relative;
  display: block;
  width: 100%;
  margin-right: -100%;
  backface-visibility: hidden;
}

.carousel-item.active {
  left: 0;
}
</style>
