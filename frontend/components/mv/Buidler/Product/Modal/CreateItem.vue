<script setup lang="ts">
const { doSubmitCreateItem, form } = $(mvStore())
form.tokenId = inject('tokenId')
</script>
<template>
  <DialogWide :show="form.isShow" @close="form.isShow = false">
    <Loading v-if="form.isLoading" class="p-10" :text="form.statusText"/>
    <div v-else>
      <div class="p-3">
        <div class="mt-3 text-center sm:mt-5">
          <DialogTitle as="h3" class="font-medium text-lg text-gray-900 leading-6">
            Create new build Item For your NFT
          </DialogTitle>
          <p class="text-gray-400">
            This is what you can add build for your NFT's value
          </p>
        </div>
      </div>
      <div class="mt-2 px-3 sm:mt-6">
        <div class="rounded-lg mb-6">
          <FileUploaderBanner v-model="form.image" class="h-70 lg:min-w-160" />
        </div>
        <div class="flex flex-col h-full sm:col-span-8 lg:col-span-7">
          <h2 class="font-bold text-2xl text-gray-900">
            <input id="title" v-model="form.title" type="text" name="title" autocomplete="title" placeholder="item title" class="rounded-md border-gray-300 flex-1 w-full min-w-0 block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500">
          </h2>
          <p class="flex mt-2 text-2xl text-gray-900">
            <input id="itemAccessNFTCount" v-model="form.itemAccessNFTCount" type="text" name="itemAccessNFTCount" autocomplete="itemAccessNFTCount" placeholder="item access nft count" class="rounded-md border-gray-300 flex-1 mr-2 min-w-0 w-80 block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500">
          </p>
          <p class="flex mt-2 text-2xl text-gray-900">
            <textarea id="about" v-model="form.excerpt" name="about" rows="3" class="rounded-md border-gray-300 shadow-sm mt-1 w-full p-2 block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="Brief description for the item" />
          </p>
          <p class="flex mt-2 text-2xl text-gray-900">
            <EditorDefault v-model="form.description" height="324px" placeholder="The content that keep secrect(entryption and access controall by lighthouse.storage)" />
          </p>
        </div>
        <btn-indigo class="mt-4 w-full" @click="doSubmitCreateItem">
          Submit
        </btn-indigo>
      </div>
    </div>
  </DialogWide>
</template>
