<template>
  <div class="mb-10">
    <div>
      <nav class="sm:hidden" aria-label="Back">
        <a href="#" class="flex font-medium text-sm text-gray-500 items-center hover:text-gray-700">
          <ChevronLeftIcon class="flex-shrink-0 h-5 mr-1 -ml-1 text-gray-400 w-5" aria-hidden="true" />
          Back
        </a>
      </nav>
      <nav class="hidden sm:flex" aria-label="Breadcrumb">
        <ol role="list" class="flex space-x-4 items-center">
          <li>
            <div class="flex">
              <a href="#" class="font-medium text-sm text-gray-500 hover:text-gray-700">Jobs</a>
            </div>
          </li>
          <li>
            <div class="flex items-center">
              <ChevronRightIcon class="flex-shrink-0 h-5 text-gray-400 w-5" aria-hidden="true" />
              <a href="#" class="font-medium text-sm ml-4 text-gray-500 hover:text-gray-700">Engineering</a>
            </div>
          </li>
          <li>
            <div class="flex items-center">
              <ChevronRightIcon class="flex-shrink-0 h-5 text-gray-400 w-5" aria-hidden="true" />
              <a href="#" aria-current="page" class="font-medium text-sm ml-4 text-gray-500 hover:text-gray-700">Back End Developer</a>
            </div>
          </li>
        </ol>
      </nav>
    </div>
    <div class="mt-2  md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <h2 class="font-bold text-2xl text-gray-900 leading-7 sm:tracking-tight sm:text-3xl sm:truncate">
          Back End Developer
        </h2>
      </div>
      <div v-if="false" class="flex flex-shrink-0 mt-4 md:mt-0 md:ml-4">
        <button type="button" class="bg-white border rounded-md font-medium border-gray-300 shadow-sm text-sm py-2 px-4 text-gray-700 inline-flex items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Edit
        </button>
        <button type="button" class="border border-transparent rounded-md font-medium bg-indigo-600 shadow-sm text-sm text-white ml-3 py-2 px-4 inline-flex items-center hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Publish
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
</script>
