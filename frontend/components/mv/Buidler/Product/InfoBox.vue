<script setup lang="ts">
import {
  CalendarIcon,
  TagIcon,
} from '@heroicons/vue/20/solid'

const { product, author, getUserProfileLink } = $(mvStore())
const tags = $computed(() => {
  const _tags = get(product, 'properties.tags', [])
  return Object.keys(_tags).filter(key => key !== 'type').map(key => `${key}/${_tags[key]}`)
})
const isShowModal = $ref(false)

</script>
<template>
  <div>
    <h2 class=" font-bold mb-1 text-2xl text-gray-900 leading-7  sm:tracking-tight sm:text-3xl sm:truncate">
      {{ product.name }}
    </h2>
    <div class="flex flex-col mt-1 sm:flex-row sm:flex-wrap sm:space-x-6 sm:mt-0">
      <router-link :to="getUserProfileLink(product?.tokenOwner, 'creation')" class="flex font-medium mt-2 text-sm text-gray-500 items-center hover:text-gray-700">
        <IpfsImg :src="author?.avatar" class="rounded-full object-cover h-10 mr-2 w-10" />
        {{ author?.name }}
      </router-link>
      <div class="flex mt-2 text-sm text-gray-500 items-center">
        <TagIcon class="flex-shrink-0 h-5 mr-1.5 text-gray-400 w-5" aria-hidden="true" />
        <span v-for="(tag, index) in tags" :key="tag" class="pr-1">
          {{ tag }} {{ index + 1 === tags.length ? '' : ',' }}
        </span>
      </div>
      <div class="flex mt-2 text-sm text-gray-500 items-center">
        <CalendarIcon class="flex-shrink-0 h-5 mr-1.5 text-gray-400 w-5" aria-hidden="true" />
        <IpfsCreatedAt v-model="product.tokenURI" />
      </div>
    </div>
    <div class=" my-4 text-gray-500">
      {{ product.description }}
      <div class="cursor-pointer font-bold text-gray-800" @click="isShowModal = true">
        See more >
      </div>
    </div>
    <dialog-wide :show="isShowModal" @close="isShowModal = false">
      <div class="max-w-5xl p-4">
        <h2 class="font-bold my-4 text-2xl text-gray-900 leading-7 sm:tracking-tight sm:text-3xl sm:truncate">
          {{ product.name }}
        </h2>
        <MdPreview :text="get(product, 'properties.projectDetail')" />
      </div>
    </dialog-wide>
  </div>
</template>
