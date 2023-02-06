<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: '',
  meta: [
    { name: 'description', content: '' },
  ],
})

const { saveRefUserWhileMounted } = $(inviteStore())

onMounted(() => saveRefUserWhileMounted())

const route = useRoute()
const chainName = route.params.chainName
provide('chainName', $$(chainName))
</script>

<template>
  <router-view />
</template>
