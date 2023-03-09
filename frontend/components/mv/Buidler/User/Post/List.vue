<script setup lang="ts">

interface Props {
  items: Array
  isPost?: Boolean
}

const { items, isNeedLoadPost, isPost = true } = defineProps<Props>()
</script>

<template>
  <ul role="list" class="space-y-8" :class="[isPost ? '' : 'px-15 py-3']">
    <li v-for="({node: item}, index) in items" :key="index" class="w-full">
      <MvBuidlerUserPostItem :item="item" :is-post="isPost" />
    </li>
  </ul>
</template>
