<script setup lang="ts">
const { postModal, doDecryptPostInModal } = $(mvStore())
</script>
<template>
  <DialogWide :show="postModal.isShow" @close="postModal.isShow = false">
    <div>
      <div class="p-3">
        <div class="mt-3 text-center sm:mt-5">
          <DialogTitle as="h3" class="font-medium text-3xl text-gray-900 leading-6">
            {{ postModal.post.title }}
          </DialogTitle>
        </div>
      </div>
      <div class="mt-2 px-3 sm:mt-6">
        <div class="rounded-lg mb-6">
          <IpfsImg :src="postModal.post.image" class="h-70 lg:min-w-160" />
        </div>
        <Loading v-if="postModal.isLoading" class="p-10" :text="postModal.statusText" />
        <div v-else class="flex flex-col h-full sm:col-span-8 lg:col-span-7">
          <div v-if="postModal.post.decrypted">
            {{ postModal.post.decrypted }}
          </div>
          <div v-else-if="postModal.statusText" class="text-center text-2xl">
            {{ postModal.statusText }}
          </div>
          <div v-else>
            <p class="text-center text-2xl">
              The content require you to own {{ postModal.post.content.itemAccessNFTCount }} NFT to get access!
            </p>
            <btn-indigo class="mt-4 w-full" @click="doDecryptPostInModal">
              Get access via Light House SDK
            </btn-indigo>
          </div>
        </div>
      </div>
    </div>
  </DialogWide>
</template>
