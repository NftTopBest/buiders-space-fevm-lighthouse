
<script setup lang="ts">
import fvmLogo from './fvmLogo.png'
// const route = useRoute()
// const chainName = route.params.chainName

const chainName = inject('chainName')

</script>

<template>
  <div class="bg-white">
    <main>
      <div>
        <div class="relative">
          <div class="bg-gray-100 h-1/2 inset-x-0 bottom-0 absolute" />
          <div class="mx-auto max-w-7xl sm:px-6 ">
            <div class="shadow-xl relative sm:rounded-2xl sm:overflow-hidden">
              <div class="inset-0 absolute">
                <img class="h-full object-cover w-full" src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100" alt="People working on laptops">
                <div class="bg-indigo-700 inset-0 absolute mix-blend-multiply" />
              </div>
              <div class="py-16 px-6 relative sm:py-24 lg:py-32 lg:px-8">
                <h1 class="font-bold text-center tracking-tight text-4xl sm:text-5xl lg:text-6xl">
                  <span class="text-white block">BuidlerNFT</span>
                </h1>
                <p class="mx-auto max-w-lg mt-6 text-center text-xl text-indigo-200 sm:max-w-3xl">
                  Born by Buidlers, Growth by Buidlers
                </p>
                <div class="mx-auto max-w-sm mt-10 sm:flex sm:max-w-none sm:justify-center">
                  <div class="space-y-4 sm:mx-auto sm:space-y-0 sm:gap-5 sm:grid-cols-2 sm:inline-grid">
                    <router-link :to="`/${chainName}/buidlers/newNFT`" class="bg-white border border-transparent rounded-md flex font-medium shadow-sm text-base py-3 px-4 text-indigo-700 items-center justify-center sm:px-8 hover:bg-indigo-50">
                      Create NFT Now
                    </router-link>
                    <router-link :to="`/${chainName}/buidlers/newest`" class="border border-transparent rounded-md flex font-medium bg-indigo-500 bg-opacity-60 shadow-sm text-base text-white py-3 px-4 items-center justify-center sm:px-8 hover:bg-opacity-70">
                      Explore
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Logo cloud -->
        <div class="bg-gray-100">
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
  </div>
</template>
