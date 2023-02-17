
<script setup lang="ts">
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/vue/20/solid'

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
let subCategories = [
  { name: 'Totes', href: '#' },
  { name: 'Backpacks', href: '#' },
  { name: 'Travel Bags', href: '#' },
  { name: 'Hip Bags', href: '#' },
  { name: 'Laptop Sleeves', href: '#' },
]
subCategories = []

const { currentType, tagsKeyByType } = $(mvStore())
const mobileFiltersOpen = $ref(false)

const filters = $computed(() => {
  return tagsKeyByType[currentType.name]
})

const isChecked = (key, opt) => {
  return false
}
</script>

<template>
  <main>
    <div class="border-b flex border-gray-200 pb-5 items-baseline justify-between">
      <h1 class="font-bold tracking-tight text-4xl text-gray-900">
        {{ currentType?.name }}
      </h1>

      <div class="flex items-center">
        <Menu as="div" class="text-left relative inline-block">
          <div>
            <MenuButton class="font-medium text-sm text-gray-700 group inline-flex justify-center hover:text-gray-900">
              Sort
              <ChevronDownIcon class="flex-shrink-0 h-5 -mr-1 ml-1 text-gray-400 w-5 group-hover:text-gray-500" aria-hidden="true" />
            </MenuButton>
          </div>

          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems class="bg-white rounded-md ring-black mt-2 origin-top-right right-0 shadow-2xl ring-1 ring-opacity-5 w-40 z-10 absolute focus:outline-none">
              <div class="py-1">
                <MenuItem v-for="option in sortOptions" :key="option.name" v-slot="{ active }">
                  <a :href="option.href" :class="[option.current ? 'font-medium text-gray-900' : 'text-gray-500', active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm']">{{ option.name }}</a>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>

        <button type="button" class="-m-2 ml-5 p-2 text-gray-400 sm:ml-7 hover:text-gray-500">
          <span class="sr-only">View grid</span>
          <Squares2X2Icon class="h-5 w-5" aria-hidden="true" />
        </button>
        <button type="button" class="-m-2 ml-4 p-2 text-gray-400 sm:ml-6 lg:hidden hover:text-gray-500" @click="mobileFiltersOpen = true">
          <span class="sr-only">Filters</span>
          <FunnelIcon class="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>

    <section aria-labelledby="products-heading" class="py-10">
      <h2 id="products-heading" class="sr-only">
        Products
      </h2>

      <div class=" grid gap-x-8 gap-y-10 grid-cols-1 lg:grid-cols-6">
        <!-- Filters -->
        <form class="hidden lg:block">
          <h3 class="sr-only">
            Categories
          </h3>
          <ul v-if="subCategories.length > 0" role="list" class="border-b font-medium space-y-4 border-gray-200 text-sm pb-6 text-gray-900">
            <li v-for="category in subCategories" :key="category.name">
              <a :href="category.href">{{ category.name }}</a>
            </li>
          </ul>

          <Disclosure v-for="(opts, key) in filters" :key="key" v-slot="{ open }" as="div" class="border-b border-gray-200 py-6">
            <h3 class="-my-3 flow-root">
              <DisclosureButton class="bg-white flex text-sm w-full py-3 text-gray-400 items-center justify-between hover:text-gray-500">
                <span class="font-medium text-gray-900">{{ key }}</span>
                <span class="flex ml-6 items-center">
                  <PlusIcon v-if="!open" class="h-5 w-5" aria-hidden="true" />
                  <MinusIcon v-else class="h-5 w-5" aria-hidden="true" />
                </span>
              </DisclosureButton>
            </h3>
            <DisclosurePanel class="pt-6">
              <div class="space-y-4">
                <div v-for="opt in opts" :key="opt" class="flex items-center">
                  <input :id="`filter-${key}-${opt}`" :name="`${key}[]`" :value="opt" type="checkbox" :checked="isChecked(key, opt)" class="rounded border-gray-300 h-4 text-indigo-600 w-4 focus:ring-indigo-500">
                  <label :for="`filter-${key}-${opt}`" class="text-sm ml-3 text-gray-600">{{ opt }}</label>
                </div>
              </div>
            </DisclosurePanel>
          </Disclosure>
        </form>

        <!-- Product grid -->
        <div class="lg:col-span-5">
          <MvBuidlerProductItems />
        </div>
      </div>
    </section>
  </main>
</template>

<route lang="yaml">
meta:
  layout: bs
</route>
