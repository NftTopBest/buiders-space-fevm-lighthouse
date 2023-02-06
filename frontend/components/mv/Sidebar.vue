<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {
  XMarkIcon,
} from '@heroicons/vue/24/outline'

const { navigation, mobileMenuOpen } = $(appStore())

</script>
<template>
  <!-- Narrow sidebar -->
  <div class="bg-indigo-700 w-28 hidden overflow-y-auto md:block">
    <div class="flex flex-col w-full py-6 items-center">
      <div class="flex flex-shrink-0 items-center">
        <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=white" alt="MassVerse.Space">
      </div>
      <div class="space-y-1 flex-1 mt-6 w-full px-2">
        <router-link v-for="item in navigation" :key="item.name" :to="item.href" :href="item.href" :class="[item.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-800 hover:text-white', 'group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium']" :aria-current="item.current ? 'page' : undefined">
          <component :is="item.icon" :class="[item.current ? 'text-white' : 'text-indigo-300 group-hover:text-white', 'h-6 w-6']" aria-hidden="true" />
          <span class="mt-2">{{ item.name }}</span>
        </router-link>
      </div>
    </div>
  </div>

  <!-- Mobile menu -->
  <TransitionRoot as="template" :show="mobileMenuOpen">
    <Dialog as="div" class="z-40 relative md:hidden" @close="mobileMenuOpen = false">
      <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
        <div class="bg-gray-600 bg-opacity-75 inset-0 fixed" />
      </TransitionChild>

      <div class="flex inset-0 z-40 fixed">
        <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
          <DialogPanel class="flex flex-col max-w-xs bg-indigo-700 flex-1 w-full pt-5 pb-4 relative">
            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
              <div class="-mr-14 p-1 top-1 right-0 absolute">
                <button type="button" class="rounded-full flex h-12 w-12 items-center justify-center focus:outline-none focus:ring-white focus:ring-2" @click="mobileMenuOpen = false">
                  <XMarkIcon class="h-6 text-white w-6" aria-hidden="true" />
                  <span class="sr-only">Close sidebar</span>
                </button>
              </div>
            </TransitionChild>
            <div class="flex flex-shrink-0 px-4 items-center">
              <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=white" alt="Your Company">
            </div>
            <div class="flex-1 h-0 mt-5 px-2 overflow-y-auto">
              <nav class="flex flex-col h-full">
                <div class="space-y-1">
                  <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-800 hover:text-white', 'group py-2 px-3 rounded-md flex items-center text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">
                    <component :is="item.icon" :class="[item.current ? 'text-white' : 'text-indigo-300 group-hover:text-white', 'mr-3 h-6 w-6']" aria-hidden="true" />
                    <span>{{ item.name }}</span>
                  </a>
                </div>
              </nav>
            </div>
          </DialogPanel>
        </TransitionChild>
        <div class="flex-shrink-0 w-14" aria-hidden="true">
        <!-- Dummy element to force sidebar to shrink to fit close icon -->
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
