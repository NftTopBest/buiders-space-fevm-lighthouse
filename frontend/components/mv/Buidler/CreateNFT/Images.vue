<template>
  <div class="rounded-lg shadow-lg ring-black p-10 ring-1  ring-opacity-5 overflow-hidden">
    <div>
      <label for="image" class="font-medium text-sm text-gray-700 block">NFT Thumbnail</label>
      <div class="mt-1">
        <FileUploaderBanner id="image" v-model="image" class="h-full" />
      </div>
    </div>

    <div class="py-10">
      <label for="projectDetail" class="font-medium text-sm text-gray-700 block">Project Gallery</label>
      <div class="mt-1">
        <FileUploaderGallery v-model="gallery" title="" class="sm:col-span-6" />
      </div>
    </div>
  </div>
</template>

<script setup>
const { image, gallery } = $(createNFTStore())
</script>

<style>

</style>
