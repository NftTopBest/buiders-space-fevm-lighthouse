<script setup lang="ts">
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { Bars3CenterLeftIcon, Bars4Icon, ClockIcon, HomeIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { ChevronRightIcon, ChevronUpDownIcon, EllipsisVerticalIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import avatarSrc from './avatar.jpg'

const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: true },
  { name: 'My tasks', href: '#', icon: Bars4Icon, current: false },
  { name: 'Recent', href: '#', icon: ClockIcon, current: false },
]
const teams = [
  { name: 'Engineering', href: '#', bgColorClass: 'bg-indigo-500' },
  { name: 'Human Resources', href: '#', bgColorClass: 'bg-green-500' },
  { name: 'Customer Success', href: '#', bgColorClass: 'bg-yellow-500' },
]
const projects = [
  {
    id: 1,
    title: 'GraphQL API',
    initials: 'GA',
    team: 'Engineering',
    members: [
      {
        name: 'Dries Vincent',
        handle: 'driesvincent',
        imageUrl:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Lindsay Walton',
        handle: 'lindsaywalton',
        imageUrl:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Courtney Henry',
        handle: 'courtneyhenry',
        imageUrl:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Tom Cook',
        handle: 'tomcook',
        imageUrl:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    ],
    totalMembers: 12,
    lastUpdated: 'March 17, 2020',
    pinned: true,
    bgColorClass: 'bg-pink-600',
  },
  // More projects...
]
const pinnedProjects = projects.filter(project => project.pinned)

const sidebarOpen = ref(false)
</script>
<template>
  <div class="min-h-full">
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="z-40 relative lg:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="bg-gray-600 bg-opacity-75 inset-0 fixed" />
        </TransitionChild>

        <div class="flex inset-0 z-40 fixed">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="bg-white flex flex-col max-w-xs flex-1 w-full pt-5 pb-4 relative">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="-mr-12 pt-2 top-0 right-0 absolute">
                  <button type="button" class="rounded-full flex h-10 ml-1 w-10 items-center justify-center focus:outline-none focus:ring-inset focus:ring-white focus:ring-2" @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 text-white w-6" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="flex flex-shrink-0 px-4 items-center">
                <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=purple&shade=500" alt="Your Company">
              </div>
              <div class="flex-1 h-0 mt-5 overflow-y-auto">
                <nav class="px-2">
                  <div class="space-y-1">
                    <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50', 'group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md']" :aria-current="item.current ? 'page' : undefined">
                      <component :is="item.icon" :class="[item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500', 'mr-3 flex-shrink-0 h-6 w-6']" aria-hidden="true" />
                      {{ item.name }}
                    </a>
                  </div>
                  <div class="mt-8">
                    <h3 id="mobile-teams-headline" class="font-medium text-sm px-3 text-gray-500">
                      Teams
                    </h3>
                    <div class="space-y-1 mt-1" role="group" aria-labelledby="mobile-teams-headline">
                      <a v-for="team in teams" :key="team.name" :href="team.href" class="rounded-md flex font-medium text-base py-2 px-3 text-gray-600 leading-5 group items-center hover:bg-gray-50 hover:text-gray-900">
                        <span :class="[team.bgColorClass, 'w-2.5 h-2.5 mr-4 rounded-full']" aria-hidden="true" />
                        <span class="truncate">{{ team.name }}</span>
                      </a>
                    </div>
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

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:border-r lg:flex lg:flex-col lg:bg-gray-100 lg:border-gray-200 lg:pt-5 lg:pb-4 lg:inset-y-0 lg:w-64 lg:fixed">
      <div class="flex flex-shrink-0 px-6 items-center">
        <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=purple&shade=500" alt="Your Company">
      </div>
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex flex-col flex-1 h-0 mt-5 pt-1 overflow-y-auto">
        <!-- User account dropdown -->
        <Menu as="div" class="text-left px-3 relative inline-block">
          <div>
            <MenuButton class="rounded-md font-medium bg-gray-100 text-left text-sm w-full py-2 px-3.5 text-gray-700 group hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-100">
              <span class="flex w-full items-center justify-between">
                <span class="flex space-x-3 min-w-0 items-center justify-between">
                  <img class="rounded-full bg-gray-300 flex-shrink-0 h-10 w-10" :src="avatarSrc" alt="">
                  <span class="flex flex-col flex-1 min-w-0">
                    <span class="font-medium text-sm text-gray-900 truncate">Aladino</span>
                    <span class="text-sm text-gray-500 truncate">@Aladino</span>
                  </span>
                </span>
                <ChevronUpDownIcon class="flex-shrink-0 h-5 text-gray-400 w-5 group-hover:text-gray-500" aria-hidden="true" />
              </span>
            </MenuButton>
          </div>
          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems class="divide-y bg-white rounded-md divide-gray-200 shadow-lg ring-black mx-3 mt-1 origin-top right-0 left-0 ring-1 ring-opacity-5 z-10 absolute focus:outline-none">
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">View profile</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Settings</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Notifications</a>
                </MenuItem>
              </div>
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Get desktop app</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Support</a>
                </MenuItem>
              </div>
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Logout</a>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
        <!-- Sidebar Search -->
        <div class="mt-5 px-3">
          <label for="search" class="sr-only">Search</label>
          <div class="rounded-md shadow-sm mt-1 relative">
            <div class="flex pl-3 inset-y-0 left-0 pointer-events-none absolute items-center" aria-hidden="true">
              <MagnifyingGlassIcon class="h-4 mr-3 text-gray-400 w-4" aria-hidden="true" />
            </div>
            <input id="search" type="text" name="search" class="rounded-md border-gray-300 w-full pl-9 block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="Search">
          </div>
        </div>
        <!-- Navigation -->
        <nav class="mt-6 px-3">
          <div class="space-y-1">
            <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md']" :aria-current="item.current ? 'page' : undefined">
              <component :is="item.icon" :class="[item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500', 'mr-3 flex-shrink-0 h-6 w-6']" aria-hidden="true" />
              {{ item.name }}
            </a>
          </div>
          <div class="mt-8">
            <!-- Secondary navigation -->
            <h3 id="desktop-teams-headline" class="font-medium text-sm px-3 text-gray-500">
              Teams
            </h3>
            <div class="space-y-1 mt-1" role="group" aria-labelledby="desktop-teams-headline">
              <a v-for="team in teams" :key="team.name" :href="team.href" class="rounded-md flex font-medium text-sm py-2 px-3 text-gray-700 group items-center hover:bg-gray-50 hover:text-gray-900">
                <span :class="[team.bgColorClass, 'w-2.5 h-2.5 mr-4 rounded-full']" aria-hidden="true" />
                <span class="truncate">{{ team.name }}</span>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <!-- Main column -->
    <div class="flex flex-col lg:pl-64">
      <!-- Search header -->
      <div class="bg-white border-b flex border-gray-200 flex-shrink-0 h-16 top-0 z-10 sticky lg:hidden">
        <button type="button" class="border-r border-gray-200 px-4 text-gray-500 lg:hidden focus:outline-none focus:ring-inset focus:ring-2 focus:ring-purple-500" @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <Bars3CenterLeftIcon class="h-6 w-6" aria-hidden="true" />
        </button>
        <div class="flex flex-1 px-4 justify-between sm:px-6 lg:px-8">
          <div class="flex flex-1">
            <form class="flex w-full md:ml-0" action="#" method="GET">
              <label for="search-field" class="sr-only">Search</label>
              <div class="w-full text-gray-400 relative focus-within:text-gray-600">
                <div class="flex inset-y-0 left-0 pointer-events-none absolute items-center">
                  <MagnifyingGlassIcon class="h-5 w-5" aria-hidden="true" />
                </div>
                <input id="search-field" name="search-field" class="border-transparent h-full w-full py-2 pr-3 pl-8 placeholder-gray-500 text-gray-900 block sm:text-sm focus:border-transparent focus:outline-none focus:placeholder-gray-400 focus:ring-0" placeholder="Search" type="search">
              </div>
            </form>
          </div>
          <div class="flex items-center">
            <!-- Profile dropdown -->
            <Menu as="div" class="ml-3 relative">
              <div>
                <MenuButton class="bg-white rounded-full flex max-w-xs text-sm items-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                  <span class="sr-only">Open user menu</span>
                  <img class="rounded-full h-8 w-8" src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                </MenuButton>
              </div>
              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="divide-y bg-white rounded-md divide-gray-200 shadow-lg ring-black mt-2 origin-top-right right-0 ring-1 ring-opacity-5 w-48 z-10 absolute focus:outline-none">
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">View profile</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Settings</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Notifications</a>
                    </MenuItem>
                  </div>
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Get desktop app</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Support</a>
                    </MenuItem>
                  </div>
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Logout</a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
      <main class="flex-1">
        <!-- Page title & actions -->
        <div class="border-b border-gray-200 py-4 px-4 sm:flex sm:px-6 sm:items-center sm:justify-between lg:px-8">
          <div class="flex-1 min-w-0">
            <h1 class="font-medium text-lg text-gray-900 leading-6 sm:truncate">
              Home
            </h1>
          </div>
          <div class="flex mt-4 sm:mt-0 sm:ml-4">
            <button type="button" class="bg-white border rounded-md font-medium border-gray-300 order-1 shadow-sm text-sm ml-3 py-2 px-4 text-gray-700 inline-flex items-center sm:order-0 sm:ml-0 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              Share
            </button>
            <button type="button" class="border border-transparent rounded-md font-medium bg-purple-600 order-0 shadow-sm text-sm text-white py-2 px-4 inline-flex items-center sm:order-1 sm:ml-3 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              Create
            </button>
          </div>
        </div>
        <!-- Pinned projects -->
        <div class="mt-6 px-4 sm:px-6 lg:px-8">
          <h2 class="font-medium text-sm text-gray-900">
            Pinned Projects
          </h2>
          <ul role="list" class="mt-3 grid gap-4 grid-cols-1 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <li v-for="project in pinnedProjects" :key="project.id" class="rounded-md flex shadow-sm col-span-1 relative">
              <div :class="[project.bgColorClass, 'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md']">
                {{ project.initials }}
              </div>
              <div class="bg-white border-t border-r border-b rounded-r-md flex border-gray-200 flex-1 items-center justify-between truncate">
                <div class="flex-1 text-sm py-2 px-4 truncate">
                  <a href="#" class="font-medium text-gray-900 hover:text-gray-600">{{ project.title }}</a>
                  <p class="text-gray-500">
                    {{ project.totalMembers }} Members
                  </p>
                </div>
                <Menu as="div" class="flex-shrink-0 pr-2">
                  <MenuButton class="bg-white rounded-full h-8 text-gray-400 w-8 inline-flex items-center justify-center hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                    <span class="sr-only">Open options</span>
                    <EllipsisVerticalIcon class="h-5 w-5" aria-hidden="true" />
                  </MenuButton>
                  <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <MenuItems class="divide-y bg-white rounded-md divide-gray-200 shadow-lg ring-black mx-3 mt-1 origin-top-right top-3 right-10 ring-1 ring-opacity-5 w-48 z-10 absolute focus:outline-none">
                      <div class="py-1">
                        <MenuItem v-slot="{ active }">
                          <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">View</a>
                        </MenuItem>
                      </div>
                      <div class="py-1">
                        <MenuItem v-slot="{ active }">
                          <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Removed from pinned</a>
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                          <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Share</a>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </li>
          </ul>
        </div>

        <!-- Projects list (only on smallest breakpoint) -->
        <div class="mt-10 sm:hidden">
          <div class="px-4 sm:px-6">
            <h2 class="font-medium text-sm text-gray-900">
              Projects
            </h2>
          </div>
          <ul role="list" class="divide-y border-t divide-gray-100 border-gray-200 mt-3">
            <li v-for="project in projects" :key="project.id">
              <a href="#" class="flex py-4 px-4 group items-center justify-between sm:px-6 hover:bg-gray-50">
                <span class="flex space-x-3 items-center truncate">
                  <span :class="[project.bgColorClass, 'w-2.5 h-2.5 flex-shrink-0 rounded-full']" aria-hidden="true" />
                  <span class="font-medium text-sm leading-6 truncate">
                    {{ project.title }}
                    {{ ' ' }}
                    <span class="font-normal text-gray-500 truncate">in {{ project.team }}</span>
                  </span>
                </span>
                <ChevronRightIcon class="h-5 ml-4 text-gray-400 w-5 group-hover:text-gray-500" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        <!-- Projects table (small breakpoint and up) -->
        <div class="mt-8 hidden sm:block">
          <div class="border-b min-w-full border-gray-200 inline-block align-middle">
            <table class="min-w-full">
              <thead>
                <tr class="border-t border-gray-200">
                  <th class="border-b font-semibold bg-gray-50 border-gray-200 text-left text-sm py-3 px-6 text-gray-900" scope="col">
                    <span class="lg:pl-2">Project</span>
                  </th>
                  <th class="border-b font-semibold bg-gray-50 border-gray-200 text-left text-sm py-3 px-6 text-gray-900" scope="col">
                    Members
                  </th>
                  <th class="border-b font-semibold bg-gray-50 border-gray-200 text-right text-sm py-3 px-6 text-gray-900 hidden md:table-cell" scope="col">
                    Last updated
                  </th>
                  <th class="border-b font-semibold bg-gray-50 border-gray-200 text-right text-sm py-3 pr-6 text-gray-900" scope="col" />
                </tr>
              </thead>
              <tbody class="divide-y bg-white divide-gray-100">
                <tr v-for="project in projects" :key="project.id">
                  <td class="font-medium text-sm w-full max-w-0 py-3 px-6 text-gray-900 whitespace-nowrap">
                    <div class="flex space-x-3 items-center lg:pl-2">
                      <div :class="[project.bgColorClass, 'flex-shrink-0 w-2.5 h-2.5 rounded-full']" aria-hidden="true" />
                      <a href="#" class="truncate hover:text-gray-600">
                        <span>
                          {{ project.title }}
                          {{ ' ' }}
                          <span class="font-normal text-gray-500">in {{ project.team }}</span>
                        </span>
                      </a>
                    </div>
                  </td>
                  <td class="font-medium text-sm py-3 px-6 text-gray-500">
                    <div class="flex space-x-2 items-center">
                      <div class="flex -space-x-1 flex-shrink-0">
                        <img v-for="member in project.members" :key="member.handle" class="rounded-full max-w-none h-6 ring-white ring-2 w-6" :src="member.imageUrl" :alt="member.name">
                      </div>
                      <span v-if="project.totalMembers > project.members.length" class="font-medium flex-shrink-0 text-xs leading-5">+{{ project.totalMembers - project.members.length }}</span>
                    </div>
                  </td>
                  <td class="text-right text-sm py-3 px-6 text-gray-500 hidden whitespace-nowrap md:table-cell">
                    {{ project.lastUpdated }}
                  </td>
                  <td class="font-medium text-right text-sm py-3 px-6 whitespace-nowrap">
                    <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: massverse
</route>
