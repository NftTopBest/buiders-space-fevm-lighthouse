<script setup lang="ts">
import { BoltIcon, DevicePhoneMobileIcon, GlobeAltIcon, ScaleIcon } from '@heroicons/vue/24/outline'

const features = [
  {
    name: 'Competitive exchange rates',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: GlobeAltIcon,
  },
  {
    name: 'No hidden fees',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: ScaleIcon,
  },
  {
    name: 'Transfers are instant',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: BoltIcon,
  },
  {
    name: 'Mobile notifications',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: DevicePhoneMobileIcon,
  },
]
</script>
<template>
  <div class="bg-gray-50 py-24 sm:py-32 lg:py-40">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="sm:text-center">
        <p class="font-bold mt-2 tracking-tight text-3xl text-gray-900 sm:text-4xl">
          NFT Revolution
        </p>
        <p class="mx-auto mt-6 text-lg max-w-2xl text-gray-600 leading-8">
          We redefine what the NFT should be <br>
          To build a New Revolution for Buidlers' NFT Ecosystem
        </p>
      </div>

      <div class="max-w-lg mt-20 sm:mx-auto md:max-w-none">
        <div class="grid gap-y-16 grid-cols-1 md:gap-x-12 md:gap-y-16 md:grid-cols-2">
          <div v-for="feature in features" :key="feature.name" class="flex flex-col gap-6 relative sm:flex-row md:flex-col lg:flex-row">
            <div class="rounded-xl flex bg-indigo-500 h-12 text-white w-12 items-center justify-center sm:shrink-0">
              <component :is="feature.icon" class="h-8 w-8" aria-hidden="true" />
            </div>
            <div class="sm:flex-1 sm:min-w-0">
              <p class="font-semibold text-lg text-gray-900 leading-8">
                {{ feature.name }}
              </p>
              <p class="mt-2 text-base text-gray-600 leading-7">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
