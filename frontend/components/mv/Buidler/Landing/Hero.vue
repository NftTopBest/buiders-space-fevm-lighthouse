
<script setup lang="ts">
import fvmLogo from './imgs/fvmLogo.png'

const { chainName } = $(mvStore())
</script>

<template>
  <main>
    <div>
      <div class="pb- relative">
        <div class=" h-1/2 inset-x-0 bottom-0 absolute" />
        <div class="mx-auto max-w-7xl">
          <div class="shadow-xl relative sm:rounded-2xl sm:overflow-hidden">
            <div class="inset-0 absolute">
              <img class="h-full object-cover w-full opacity-60" src="/hero.jpg" alt="People working on laptops">
              <div class="bg-indigo-400 inset-0 absolute mix-blend-multiply" />
            </div>
            <div class="py-16 px-6 relative sm:py-24 lg:py-32 lg:px-8">
              <h1 class="font-bold text-center tracking-tight text-5xl sm:text-6xl lg:text-7xl">
                <span class="text-white block">Unleash the boundary <span class="font-extrabold text-yellow-200">of Web3</span></span>
              </h1>
              <p class="mx-auto max-w-lg mt-6 text-center text-2xl text-indigo-300 sm:max-w-3xl">
                An all-in-one platform to turn <span class="font-bold text-yellow-200"><Typing :strs="['ARTICLE', 'LIVING', 'ANYTHING']" /></span> into Web3 with <span class="font-bold text-yellow-200">NFT Gating</span>
              </p>
              <div class="mx-auto max-w-sm mt-10 sm:flex sm:max-w-none sm:justify-center">
                <div class="space-y-4 sm:mx-auto sm:space-y-0 sm:gap-5 sm:grid-cols-2 sm:inline-grid">
                  <router-link :to="`/${chainName}/buidlers/newNFT`" class="bg-white border border-transparent rounded-md flex font-medium shadow-sm text-base py-3 px-4 text-indigo-700 items-center justify-center sm:px-8 hover:bg-indigo-50">
                    Get started
                  </router-link>
                  <router-link :to="`/${chainName}/buidlers/membership`" class="border border-transparent rounded-md flex font-medium bg-indigo-500 bg-opacity-60 shadow-sm text-base text-white py-3 px-4 items-center justify-center sm:px-8 hover:bg-opacity-70">
                    Explore
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Logo cloud -->
      <div class="bg-gray-100 hidden">
        <div class="mx-auto max-w-7xl py-16 px-6 lg:px-8">
          <p class="font-semibold text-center text-base text-gray-500">
            Build by modern Technologies, totally decentralized
          </p>
          <div class="mt-6 grid gap-8 grid-cols-2 md:grid-cols-5 lg:grid-cols-4">
            <div class="flex text-2xl text-gray-400 col-span-1 justify-center items-center md:col-span-2 lg:col-span-1">
              <logos:vue class="h-12 mr-2 w-auto" />
              <span>Vue3</span>
            </div>
            <div class="flex text-2xl text-gray-400 col-span-1 justify-center items-center md:col-span-2 lg:col-span-1">
              <logos:vitejs class="h-12 mr-2 w-auto" />
              <span>Vite2</span>
            </div>
            <div class="flex text-2xl text-gray-400 col-span-1 justify-center items-center md:col-span-2 lg:col-span-1">
              <img class="h-12" :src="fvmLogo" alt="StaticKit">
              <span>FVM</span>
            </div>
            <div class="flex text-2xl text-gray-400 col-span-1 justify-center items-center md:col-span-2 lg:col-span-1">
              <simple-icons:ipfs class="h-12 mr-2 w-auto" />
              <span>IPFS</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- More main page content here... -->
  </main>
</template>
