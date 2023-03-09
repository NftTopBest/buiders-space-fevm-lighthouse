
<script setup lang="ts">
import {
  ChevronDownIcon,
  ChevronRightIcon,
  PencilIcon,
} from '@heroicons/vue/20/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

const { isMyWalletAddress } = $(web3AuthStore())
const { product, theType, theTypeLink, ccProfileHandle } = $(mvStore())

</script>

<template>
  <div class="pb-10 lg:flex lg:items-center lg:justify-between">
    <div class="flex-1 min-w-0">
      <nav class="flex" aria-label="Breadcrumb">
        <ol role="list" class="flex space-x-4 items-center">
          <li>
            <div class="flex">
              <router-link to="/" class="font-medium text-sm text-gray-500 hover:text-gray-700">
                Home
              </router-link>
            </div>
          </li>
          <li v-if="theTypeLink">
            <div class="flex items-center">
              <ChevronRightIcon class="flex-shrink-0 h-5 text-gray-400 w-5" aria-hidden="true" />
              <router-link :to="theTypeLink" class="flex font-medium text-sm ml-4 text-gray-500 items-center hover:text-gray-700">
                {{ theType }}
              </router-link>
            </div>
          </li>
        </ol>
      </nav>
    </div>
    <div class="flex mt-5  lg:mt-0 lg:ml-4">
      <!-- <span v-if="isMyWalletAddress(product?.tokenOwner) && false" class="hidden sm:block">
        <button type="button" class="bg-white rounded-md font-semibold shadow-sm ring-inset text-sm py-2 px-3 ring-1 ring-gray-300 text-gray-900 inline-flex items-center hover:bg-gray-50">
          <PencilIcon class="h-5 mr-1.5 -ml-0.5 text-gray-400 w-5" aria-hidden="true" />
          Edit
        </button>
      </span> -->

      <span class="sm:ml-3">
        <CcFollowBtn v-if="ccProfileHandle" :handle="ccProfileHandle" />
      </span>

      <Menu as="div" class="ml-3 relative sm:hidden">
        <MenuButton class="bg-white rounded-md font-semibold shadow-sm ring-inset text-sm py-2 px-3 ring-1 ring-gray-300 text-gray-900 inline-flex items-center hover:ring-gray-400">
          More
          <ChevronDownIcon class="h-5 -mr-1 ml-1.5 text-gray-400 w-5" aria-hidden="true" />
        </MenuButton>

        <transition enter-active-class="transition ease-out duration-200" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
          <MenuItems class="bg-white rounded-md shadow-lg ring-black mt-2 -mr-1 py-1 origin-top-right right-0 ring-1 ring-opacity-5 w-48 z-10 absolute focus:outline-none">
            <MenuItem v-slot="{ active }">
              <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Edit</a>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">View</a>
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </div>
</template>
