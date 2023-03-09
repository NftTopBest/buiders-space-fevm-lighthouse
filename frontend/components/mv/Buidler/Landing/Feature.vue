<script setup lang="ts">
import { BoltIcon, DevicePhoneMobileIcon, GlobeAltIcon, ScaleIcon } from '@heroicons/vue/24/outline'

const features = [
  {
    name: 'No Code DAO Creation',
    description:
      'Get ready to launch your Buidlers DAO in minutes! No technical coding skill is required. All you need is a few clicks and passion to create a community of like-minded people.',
    icon: GlobeAltIcon,
  },
  {
    name: 'Build Tokenized Community',
    description:
      'Turn your community members into entrepreneurs, create a network of projects, products, companies, and sub-communities that are working toward propagating a common mission.',
    icon: ScaleIcon,
  },
  {
    name: 'Create shared prosperity',
    description:
      'Raise funds from within your community and create shared prosperity. Our platform enables you to use membership NFT as the catalyst for web3 fundraising in a secure, decentralized and transparent way.',
    icon: BoltIcon,
  },
  {
    name: 'Create Web3 Experiences',
    description:
      'Your community is much more than a consumer network. Learn how to make them your greatest collaborators. Work collaboratively to build games, movies, music, real estate, fitness, sports, and more.',
    icon: DevicePhoneMobileIcon,
  },
]
</script>
<template>
  <div class="py-12 sm:py-16 lg:py-20">
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
