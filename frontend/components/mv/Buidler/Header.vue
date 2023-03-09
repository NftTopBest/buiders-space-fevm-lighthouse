<script setup lang="ts">
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/vue'
import {
  Bars3Icon,
  CursorArrowRaysIcon,
  EnvelopeIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/vue/20/solid'

const { typeList, chainName, getUserProfileLink } = $(mvStore())

const marketList = [
  { name: 'Ask', description: 'Learn how to maximize our platform to get the most out of it.', href: `/${chainName}/buidlers/market/ask`, icon: CursorArrowRaysIcon },
  { name: 'Bid', description: 'See what meet-ups and other events we might be planning near you.', href: `/${chainName}/buidlers/market/bid`, icon: CursorArrowRaysIcon },
]

const user = {
  name: 'Whitney Francis',
  email: 'whitney@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
}

const {
  walletAddress,
  initWeb3,
  removeWeb3EventListener,
} = $(web3AuthStore())

const userNavigation = $computed(() => {
  return [
    { name: 'My Feed', href: getUserProfileLink(walletAddress, 'feed') },
    { name: 'My Essences NFT', href: getUserProfileLink(walletAddress, 'essences') },
    { name: 'My Creation', href: getUserProfileLink(walletAddress, 'creation') },
    { name: 'My Owned', href: getUserProfileLink(walletAddress, 'owned') },
    { name: 'My Ask', href: getUserProfileLink(walletAddress, 'ask') },
    { name: 'My Bid', href: getUserProfileLink(walletAddress, 'bid') },
    { name: 'My Profile', href: `/${chainName}/buidlers/settings` },
    { name: 'Sign out', action: 'doLogout' },
  ]
})

const brandName = $ref('Buidlers')

onMounted(initWeb3)
onUnmounted(removeWeb3EventListener)

const { msgLink } = $(web3MQStore())

</script>
<template>
  <Popover class="z-11 relative">
    <div class="flex mx-auto max-w-7xl py-6 px-4 items-center justify-between md:space-x-10 md:justify-start lg:px-6">
      <div>
        <router-link to="/" class="flex">
          <span class="sr-only">{{ brandName }}</span>
          <img class="h-8 w-auto sm:h-10" src="/logo-light.png" alt="">
        </router-link>
      </div>
      <div class="flex flex-1 -my-2 -mr-2 md:hidden">
        <div class="flex-1 ml-4">
          <label for="search" class="sr-only">Search</label>
          <div class="relative">
            <div class="flex pl-3 inset-y-0 left-0 pointer-events-none absolute items-center">
              <MagnifyingGlassIcon class="h-5 text-gray-400 w-5" aria-hidden="true" />
            </div>
            <input id="search" name="search" class=" border rounded-md border-gray-300 shadow-sm w-full py-2 pr-3 pl-10 placeholder-gray-500 leading-5 block sm:text-sm focus:outline-none focus:border-blue-600 focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-600" placeholder="Search" type="search">
          </div>
        </div>
        <PopoverButton class="rounded-md p-2 text-gray-400 inline-flex items-center justify-center hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-inset focus:ring-2 focus:ring-indigo-500">
          <span class="sr-only">Open menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </PopoverButton>
      </div>
      <div class="hidden md:flex md:flex-1 md:items-center md:justify-between">
        <PopoverGroup as="nav" class="flex space-x-10 items-center">
          <!-- <router-link :to="`/${chainName}/buidlers/discovery`" active-class="!text-gray-900" class="font-medium text-base text-gray-500 hover:text-gray-900">
            Discovery
          </router-link> -->
          <router-link :to="`/${chainName}/buidlers/kbl`" active-class="!text-gray-900" title="Key Buidler Leader" class="font-medium text-base text-gray-500 hover:text-gray-900">
            KBL
          </router-link>
          <Popover v-slot="{ open }" class="relative">
            <PopoverButton :class="[open || $route.name === 'chainName-buidlers-type' ? 'text-gray-900' : 'text-gray-500', 'group inline-flex items-center rounded-md  text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2']">
              <span>Browser</span>
              <ChevronDownIcon :class="[open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500']" aria-hidden="true" />
            </PopoverButton>

            <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
              <PopoverPanel class="max-w-md mt-3 -ml-4 w-screen transform z-10 absolute lg:max-w-3xl">
                <div class="rounded-lg shadow-lg ring-black ring-1 ring-opacity-5 overflow-hidden">
                  <div class="bg-white grid py-6 px-5 gap-6 relative sm:p-8 sm:gap-8 lg:grid-cols-2">
                    <router-link v-for="item in typeList" :key="item.name" :to="item.href" class="rounded-lg flex -m-3 p-3 items-start hover:bg-gray-100" active-class="bg-gray-100">
                      <div class="rounded-md flex bg-indigo-500 flex-shrink-0 h-10 text-white w-10 items-center justify-center sm:h-12 sm:w-12">
                        <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div class="ml-4">
                        <p class="font-medium text-base text-gray-900">
                          {{ item.name }}
                        </p>
                        <p class="mt-1 text-sm text-gray-500">
                          {{ item.description }}
                        </p>
                      </div>
                    </router-link>
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
          <Popover v-slot="{ open }" class="relative">
            <PopoverButton :class="[open || $route.name === 'chainName-buidlers-market-type' ? 'text-gray-900' : 'text-gray-500', 'group inline-flex items-center rounded-md text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2']">
              <span>Market</span>
              <ChevronDownIcon :class="[open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500']" aria-hidden="true" />
            </PopoverButton>

            <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
              <PopoverPanel class="max-w-md mt-3 -ml-4 w-screen transform z-10 absolute lg:max-w-3xl">
                <div class="rounded-lg shadow-lg ring-black ring-1 ring-opacity-5 overflow-hidden">
                  <div class="bg-white grid py-6 px-5 gap-6 relative sm:p-8 sm:gap-8 lg:grid-cols-2">
                    <router-link v-for="item in marketList" :key="item.name" :to="item.href" class="rounded-lg flex -m-3 p-3 items-start hover:bg-gray-100" active-class="bg-gray-100">
                      <div class="rounded-md flex bg-indigo-500 flex-shrink-0 h-10 text-white w-10 items-center justify-center sm:h-12 sm:w-12">
                        <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div class="ml-4">
                        <p class="font-medium text-base text-gray-900">
                          {{ item.name }}
                        </p>
                        <p class="mt-1 text-sm text-gray-500">
                          {{ item.description }}
                        </p>
                      </div>
                    </router-link>
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
          <router-link :to="`/${chainName}/buidlers/faucet`" active-class="!text-gray-900" class="font-medium text-base text-gray-500 hover:text-gray-900">
            $BST Faucet
          </router-link>
          <router-link v-if="walletAddress" :to="`/${chainName}/buidlers/newNFT`" class="border border-transparent rounded-md font-medium bg-indigo-600 shadow-sm text-base text-white ml-8 py-2 px-4 inline-flex items-center justify-center hover:bg-indigo-700">
            <PlusIcon class="h-6 mr-2 w-6" aria-hidden="true" />
            Create NFT
          </router-link>
        </PopoverGroup>

        <div class="flex  flex-1 justify-end items-center">
          <!-- <div class="flex flex-1 px-2 items-center justify-center lg:ml-6 lg:justify-end">
            <div class="max-w-lg w-full lg:max-w-xs">
              <label for="search" class="sr-only">Search</label>
              <div class="relative">
                <div class="flex pl-3 inset-y-0 left-0 pointer-events-none absolute items-center">
                  <MagnifyingGlassIcon class="h-5 text-gray-400 w-5" aria-hidden="true" />
                </div>
                <input id="search" name="search" class="bg-white border rounded-md border-gray-300 shadow-sm w-full py-2 pr-3 pl-10 placeholder-gray-500 leading-5 block sm:text-sm focus:outline-none focus:border-blue-600 focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-600" placeholder="Search" type="search">
              </div>
            </div>
          </div> -->
          <!-- <ChainSwitchMenu /> -->
        </div>

        <div v-if="walletAddress" class="hidden lg:flex lg:ml-4 lg:items-center">
          <router-link :to="msgLink" class="bg-white rounded-full flex-shrink-0 opacity-90 p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <span class="sr-only">View notifications</span>
            <EnvelopeIcon class="h-6 w-6" aria-hidden="true" />
          </router-link>
          <ProfileDropdown :user-navigation="userNavigation" />
        </div>
        <div v-else class="flex pl-1 items-center">
          <Web3LoginBtn>
            Connect Wallet
          </Web3LoginBtn>
        </div>
      </div>
    </div>

    <transition enter-active-class="duration-200 ease-out" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="duration-100 ease-in" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
      <PopoverPanel focus class="p-2 transform origin-top-right inset-x-0 transition top-0 absolute md:hidden">
        <div class="bg-white rounded-lg divide-y-2 divide-gray-50 shadow-lg ring-black ring-1 ring-opacity-5">
          <div class="px-5 pt-5 pb-6">
            <div class="flex items-center justify-between">
              <div>
                <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
              </div>
              <div class="-mr-2">
                <PopoverButton class="bg-white rounded-md p-2 text-gray-400 inline-flex items-center justify-center hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-inset focus:ring-2 focus:ring-indigo-500">
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </PopoverButton>
              </div>
            </div>
            <div class="mt-6">
              <nav class="grid gap-6">
                <router-link v-for="item in typeList" :key="item.name" :to="item.href" class="rounded-lg flex -m-3 p-3 items-center hover:bg-gray-50">
                  <div class="rounded-md flex bg-indigo-500 flex-shrink-0 h-10 text-white w-10 items-center justify-center">
                    <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div class="font-medium text-base ml-4 text-gray-900">
                    {{ item.name }}
                  </div>
                </router-link>
              </nav>
            </div>
          </div>
          <div class="px-5 pt-5 pb-6">
            <nav class="grid gap-6">
              <router-link v-for="item in marketList" :key="item.name" :to="item.href" class="rounded-lg flex -m-3 p-3 items-center hover:bg-gray-50">
                <div class="rounded-md flex bg-indigo-500 flex-shrink-0 h-10 text-white w-10 items-center justify-center">
                  <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
                </div>
                <div class="font-medium text-base ml-4 text-gray-900">
                  {{ item.name }}
                </div>
              </router-link>
            </nav>
          </div>
          <div class="px-5 pt-5 pb-6">
            <nav class="grid gap-6">
              <router-link :to="`/${chainName}/buidlers/newNFT`" class="rounded-lg flex -m-3 p-3 items-center hover:bg-gray-50">
                <div class="rounded-md flex bg-indigo-500 flex-shrink-0 h-10 text-white w-10 items-center justify-center">
                  <PlusIcon class="h-6 w-6" aria-hidden="true" />
                </div>
                <div class="font-medium text-base ml-4 text-gray-900">
                  Create NFT
                </div>
              </router-link>
            </nav>
          </div>
          <div class="pt-4 pb-2">
            <div class="flex px-5 items-center">
              <div class="flex-shrink-0">
                <img class="rounded-full h-10 w-10" :src="user.imageUrl" alt="">
              </div>
              <div class="ml-3">
                <div class="font-medium text-base text-gray-800">
                  {{ user.name }}
                </div>
                <div class="font-medium text-sm text-gray-500">
                  {{ user.email }}
                </div>
              </div>
              <router-link :to="`/${chainName}/msg`" class="bg-white rounded-full ml-auto flex-shrink-0 p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <span class="sr-only">View notifications</span>
                <EnvelopeIcon class="h-6 w-6" aria-hidden="true" />
              </router-link>
            </div>
            <div class="space-y-1 mt-3 px-2">
              <a v-for="item in userNavigation" :key="item.name" :href="item.href" class="rounded-md font-medium text-base py-2 px-3 text-gray-900 block hover:bg-gray-100 hover:text-gray-800">{{ item.name }}</a>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>
