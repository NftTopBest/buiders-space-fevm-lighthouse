<template>
  <div class="rounded-lg shadow-lg ring-black ring-1 ring-opacity-5 overflow-hidden">
    <div class="bg-white grid p-10 gap-6 relative sm:p-8 sm:gap-8 lg:grid-cols-1">
      <div>
        <h1 class="font-medium text-lg text-gray-900 leading-6">
          Create NFT
        </h1>
        <p class="mt-1 text-sm text-gray-500">
          Let’s get started by filling in the information below to create your new Fancy NFT.
        </p>
      </div>

      <div>
        <label for="name" class="font-medium text-sm text-gray-700 block">NFT Name</label>
        <div class="mt-1">
          <input id="name" v-model="name" type="text" name="name" class="rounded-md border-gray-300 shadow-sm w-full block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500">
        </div>
      </div>

      <div>
        <label for="description" class="font-medium text-sm text-gray-700 block">Description</label>
        <div class="mt-1">
          <textarea id="description" v-model="description" name="description" rows="3" class="rounded-md border-gray-300 shadow-sm w-full p-2 block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
      </div>

      <div>
        <label for="unit-price" class="font-medium text-sm text-gray-700 block">Unit Price</label>
        <div class="rounded-md flex shadow-sm mt-1">
          <input id="unit-price" v-model="basicPrice" type="text" name="unit-price" class="rounded-none rounded-l-md border-gray-300 flex-1 w-full block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="">
          <span class="border rounded-r-md bg-gray-50 border-l-0 border-gray-300 text-sm px-3 text-gray-500 inline-flex items-center">$BST</span>
        </div>
      </div>
      <div>
        <label for="maxSupply" class="font-medium text-sm text-gray-700 block">Max Supply</label>
        <div class="mt-1">
          <input id="maxSupply" v-model="maxSupply" type="text" name="maxSupply" class="rounded-md border-gray-300 shadow-sm w-full block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500">
        </div>
      </div>
      <div>
        <label for="invite-commission" class="font-medium text-sm text-gray-700 block">Invite commission</label>
        <div class="rounded-md flex shadow-sm mt-1">
          <input id="invite-commission" v-model="inviteCommission" type="text" name="invite-commission" class="rounded-none rounded-l-md border-gray-300 flex-1 w-full block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="">
          <span class="border rounded-r-md bg-gray-50 border-l-0 border-gray-300 text-sm px-3 text-gray-500 inline-flex items-center">%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { name, description, basicPrice, maxSupply, inviteCommission } = $(createNFTStore())
</script>

<style>

</style>
