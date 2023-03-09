<script setup lang="ts">
const { form } = $(mvStore())
</script>

<template>
  <div class="mt-2 px-3 sm:mt-6">
    <div class="space-y-6 sm:space-y-5">
      <div>
        <h3 class="font-semibold text-base text-gray-900 leading-6">
          Creation SBT
        </h3>
        <p class="mt-1 text-sm max-w-2xl text-gray-500">
          Setup the new creation's Cyber Connect Essence NFT with soul bound feature. Your user can pay one time to collect the SBT to unlock your content.
        </p>
      </div>
      <div class="sm:border-t sm:border-gray-200 sm:grid sm:pt-5 sm:gap-4 sm:grid-cols-3 sm:items-start">
        <label for="nftImage" class="font-medium text-sm text-gray-900 leading-6 block sm:pt-1.5">NFT Image</label>
        <div class="mt-2 sm:mt-0 sm:col-span-2">
          <div class="rounded-md flex max-w-lg shadow-sm">
            <FileUploaderBanner v-model="form.image" class="object-cover max-h-70" />
          </div>
        </div>
      </div>
      <div class="sm:border-t sm:border-gray-200 sm:grid sm:pt-5 sm:gap-4 sm:grid-cols-3 sm:items-start">
        <label for="title" class="font-medium text-sm text-gray-900 leading-6 block sm:pt-1.5">NFT name</label>
        <div class="mt-2 sm:mt-0 sm:col-span-2">
          <div class="rounded-md flex max-w-lg shadow-sm">
            <input id="title" v-model="form.title" type="text" name="title" autocomplete="title" placeholder="" class="rounded-md border-gray-300 flex-1 w-full min-w-0 block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500">
          </div>
        </div>
      </div>
      <div class="sm:border-t sm:border-gray-200 sm:grid sm:pt-5 sm:gap-4 sm:grid-cols-3 sm:items-start">
        <label for="theSymbol" class="font-medium text-sm text-gray-900 leading-6 block sm:pt-1.5">NFT Symbol</label>
        <div class="mt-2 sm:mt-0 sm:col-span-2">
          <div class="rounded-md flex max-w-lg shadow-sm">
            <input id="theSymbol" v-model="form.theSymbol" type="text" name="symbol" autocomplete="symbol" class="rounded-md border-gray-300 flex-1 w-full min-w-0 block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500">
          </div>
        </div>
      </div>
      <div class="sm:border-t sm:border-gray-200 sm:grid sm:pt-5 sm:gap-4 sm:grid-cols-3 sm:items-start">
        <label for="price" class="font-medium text-sm text-gray-900 leading-6 block sm:pt-1.5">Price</label>
        <div class="mt-2 sm:mt-0 sm:col-span-2">
          <div class="rounded-md flex max-w-lg shadow-sm">
            <input id="price" v-model="form.price" type="text" name="price" class="rounded-none rounded-l-md border-gray-300 flex-1 w-full block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500">
            <span class="border rounded-r-md bg-gray-50 border-l-0 border-gray-300 text-sm px-3 text-gray-500 inline-flex items-center">$BST</span>
          </div>
        </div>
      </div>
      <div class="sm:border-t sm:border-gray-200 sm:grid sm:pt-5 sm:gap-4 sm:grid-cols-3 sm:items-start">
        <label for="totalSupply" class="font-medium text-sm text-gray-900 leading-6 block sm:pt-1.5">Total supply</label>
        <div class="mt-2 sm:mt-0 sm:col-span-2">
          <div class="rounded-md flex max-w-lg shadow-sm">
            <input id="totalSupply" v-model="form.totalSupply" type="text" name="totalSupply" autocomplete="totalSupply" class="rounded-md border-gray-300 flex-1  min-w-0 w-80 block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500">
          </div>
        </div>
      </div>
      <div class="sm:border-t sm:border-gray-200 sm:grid sm:pt-5 sm:gap-4 sm:grid-cols-3 sm:items-start">
        <label for="totalSupply" class="font-medium text-sm text-gray-900 leading-6 block sm:pt-1.5">NFT Description</label>
        <div class="mt-2 sm:mt-0 sm:col-span-2">
          <div class="rounded-md flex max-w-lg shadow-sm">
            <textarea id="about" v-model="form.excerpt" name="about" rows="3" class="rounded-md border-gray-300 shadow-sm mt-1 w-full p-2 block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
