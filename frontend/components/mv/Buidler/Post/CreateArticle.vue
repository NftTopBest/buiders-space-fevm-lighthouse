<template>
  <div class="mt-2 px-3 sm:mt-6">
    <div class="space-y-6 sm:space-y-5">
      <div>
        <h3 class="font-semibold text-base text-gray-900 leading-6">
          Creation Secret Content
        </h3>
        <p class="mt-1 text-sm max-w-2xl text-gray-500">
          Here you can add your secret content that your reader is required to paid by SBT or get your project NFT to unlock.
        </p>
      </div>
      <div class="sm:border-t sm:border-gray-200 sm:grid sm:pt-5 sm:gap-4 sm:grid-cols-3 sm:items-start">
        <label for="itemAccessNFTCount" class="font-medium text-sm text-gray-900 leading-6 block sm:pt-1.5">Item unlock NFT number</label>
        <div class="mt-2 sm:mt-0 sm:col-span-2">
          <div class="rounded-md flex max-w-lg shadow-sm">
            <input id="itemAccessNFTCount" v-model="form.itemAccessNFTCount" type="text" name="itemAccessNFTCount" autocomplete="itemAccessNFTCount" class="rounded-md border-gray-300 flex-1 mr-2 min-w-0 w-80 block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500">
          </div>
        </div>
      </div>
      <div class="sm:border-t sm:border-gray-200 sm:grid sm:pt-5 sm:gap-4 sm:grid-cols-3 sm:items-start">
        <label for="description" class="font-medium text-sm text-gray-900 leading-6 block sm:pt-1.5">Your Secret content</label>
        <div class="mt-2 sm:mt-0 sm:col-span-2">
          <div class="rounded-md flex shadow-sm w-full">
            <EditorDefault v-model="form.description" height="324px" name="description" placeholder="The content that keep secrect on Chain" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { form } = $(mvStore())
</script>
