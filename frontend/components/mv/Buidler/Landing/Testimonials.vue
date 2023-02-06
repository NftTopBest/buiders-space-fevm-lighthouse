<script setup lang="ts">
import avatar from './aladino-avatar.jpg'
</script>
<template>
  <div class="bg-white pt-16 lg:(py-24 pb-36) ">
    <div class="bg-indigo-600 pb-16 lg:pb-0 lg:z-10 lg:relative">
      <div class="lg:mx-auto lg:max-w-7xl lg:grid lg:px-8 lg:gap-8 lg:grid-cols-3">
        <div class="relative lg:-my-8">
          <div aria-hidden="true" class="bg-white h-1/2 inset-x-0 top-0 absolute lg:hidden" />
          <div class="mx-auto max-w-md px-6 sm:max-w-3xl lg:h-full lg:p-0">
            <div class="rounded-xl shadow-xl overflow-hidden aspect-w-10 aspect-h-6 sm:aspect-w-16 sm:aspect-h-7 lg:h-full lg:aspect-none">
              <img class="object-cover lg:h-full lg:w-full" :src="avatar" alt="">
            </div>
          </div>
        </div>
        <div class="mt-12 lg:m-0 lg:pl-8 lg:col-span-2">
          <div class="mx-auto max-w-md px-6 sm:max-w-2xl lg:max-w-none lg:py-20 lg:px-0">
            <blockquote>
              <div>
                <svg class="h-12 text-white opacity-25 w-12" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p class="font-medium mt-6 text-white text-2xl">
                  We host our AIGC QiPao Design Global Competition on the BuidlerNFT platform as it create a brand new NFT logic that really make the creators get more income and create a huge revolution for the current NFT ecosystem.
                </p>
              </div>
              <footer class="mt-6">
                <p class="font-medium text-base text-white">
                  Aladino
                </p>
                <p class="font-medium text-base text-indigo-100">
                  CEO at CDGC
                </p>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
