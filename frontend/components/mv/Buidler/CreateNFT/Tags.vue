<template>
  <div class="rounded-lg shadow-lg ring-black ring-1 ring-opacity-5 overflow-hidden  p-10">
    <section aria-labelledby="properties-heading" class="col-span-12">
      <label for="location" class="font-medium text-sm text-gray-700 block">Tags</label>
      <div v-for="(item, index) in tags" :key="index" class="flex pb-2">
        <input v-model="item.label" type="text" class="rounded-md max-w-sm max-w-xs border-gray-300 shadow-sm mr-2 sm:text-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="tag name">
        <div class="flex w-full">
          <input v-model="item.value" type="text" class="rounded-md border-gray-300 shadow-sm w-full block  sm:text-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="tag value">
          <div class="p-2" :class="tags.length > 1 ? 'cursor-pointer' : 'cursor-not-allowed text-gray-400'" @click="removeItem(index)">
            <MinusCircleIcon class="h-6  w-6" />
          </div>
        </div>
      </div>
      <div class="flex justify-end items-center ">
        <div class="cursor-pointer p-2" @click="addItem">
          <PlusCircleIcon class="h-6 w-6" />
        </div>
      </div>
    </section>

    <div>
      <label for="projectDetail" class="font-medium text-sm text-gray-700 block">Project Detail</label>
      <div class="mt-1">
        <EditorDefault v-model="projectDetail" height="324px" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MinusCircleIcon } from '@heroicons/vue/24/outline'
import { PlusCircleIcon } from '@heroicons/vue/24/solid'

const { tags, removeItem, addItem, projectDetail } = $(createNFTStore())
</script>

<style>

</style>
