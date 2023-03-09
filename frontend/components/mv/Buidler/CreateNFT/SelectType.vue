<template>
  <div class="rounded-lg shadow-lg ring-black ring-1 ring-opacity-5 overflow-hidden">
    <div class="bg-white grid p-10 gap-6 relative sm:p-8 sm:gap-8 lg:grid-cols-2">
      <button
        v-for="item in typeList" :key="item.name" :to="item.href" class="rounded-lg flex -m-3 p-3 items-start hover:bg-gray-100" :class="[theType.name === item.name ? 'bg-gray-100': '']" @click="setTheType(item)"
      >
        <div class="rounded-md flex bg-indigo-500 flex-shrink-0 h-10 text-white w-10 items-center justify-center sm:h-12 sm:w-12">
          <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
        </div>
        <div class="ml-4">
          <p class="font-medium text-base text-left text-gray-900">
            {{ item.name }}
          </p>
          <p class="mt-1 text-sm text-gray-500">
            {{ item.description }}
          </p>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
const { typeList } = $(mvStore())
const { theType, setTheType } = $(createNFTStore())
</script>

<style>

</style>
