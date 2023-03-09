<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/20/solid'
const { typeList } = $(mvStore())

</script>

<template>
  <div class=" py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl grid gap-x-8 gap-y-16 grid-cols-1 sm:gap-y-20 lg:max-w-none lg:mx-0 lg:grid-cols-3">
        <div>
          <h2 class="font-semibold text-lg tracking-tight text-indigo-600 leading-8">
            Everything you need
          </h2>
          <p class="font-bold mt-2 tracking-tight text-3xl text-gray-900 sm:text-4xl">
            All-in-one platform
          </p>
          <p class="mt-6 text-base text-gray-600 leading-7">
            Give your elite members investment and membership benefits when they join your community. Sell community membership using NFT passes and offer holders numerous utilities and perks.
          </p>
        </div>
        <dl class="text-base grid text-gray-600 leading-7 gap-x-8 gap-y-6 grid-cols-1 col-span-2 sm:grid-cols-2 lg:gap-y-10">
          <div v-for="item in typeList" :key="item.name" class="pl-9 relative">
            <dt class="flex font-semibold text-gray-900 items-center">
              <div class="rounded-md flex bg-indigo-500 flex-shrink-0 h-10 mr-5 text-white w-10 items-center justify-center sm:h-12 sm:w-12">
                <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
              </div>
              <router-link :to="item.href">
                {{ item.name }}
              </router-link>
            </dt>
            <dd class="mt-2 pl-17">
              {{ item.description }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>
