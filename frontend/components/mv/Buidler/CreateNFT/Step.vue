<template>
  <nav aria-label="Progress">
    <ol role="list" class="divide-y border rounded-md divide-gray-300 border-gray-300 md:flex md:divide-y-0">
      <li v-for="(step, stepIdx) in steps" :key="step.name" class="relative md:flex md:flex-1">
        <button v-if="step.status === 'complete'" class="flex w-full group items-center">
          <span class="flex font-medium text-sm py-4 px-6 items-center">
            <span class="rounded-full flex bg-indigo-600 flex-shrink-0 h-10 w-10 items-center justify-center group-hover:bg-indigo-800">
              <CheckIcon class="h-6 text-white w-6" aria-hidden="true" />
            </span>
            <span class="font-medium text-sm ml-4 text-gray-900">{{ step.name }}</span>
          </span>
        </button>
        <button v-else-if="step.status === 'current'" class="flex font-medium text-sm py-4 px-6 items-center" aria-current="step">
          <span class="rounded-full flex border-2 border-indigo-600 flex-shrink-0 h-10 w-10 items-center justify-center">
            <span class="text-indigo-600">{{ step.id }}</span>
          </span>
          <span class="font-medium text-sm ml-4 text-indigo-600">{{ step.name }}</span>
        </button>
        <button v-else class="flex group items-center">
          <span class="flex font-medium text-sm py-4 px-6 items-center">
            <span class="rounded-full flex border-2 border-gray-300 flex-shrink-0 h-10 w-10 items-center justify-center group-hover:border-gray-400">
              <span class="text-gray-500 group-hover:text-gray-900">{{ step.id }}</span>
            </span>
            <span class="font-medium text-sm ml-4 text-gray-500 group-hover:text-gray-900">{{ step.name }}</span>
          </span>
        </button>
        <template v-if="stepIdx !== steps.length - 1">
          <!-- Arrow separator for lg screens and up -->
          <div class="h-full top-0 right-0 w-5 absolute hidden md:block" aria-hidden="true">
            <svg class="h-full w-full text-gray-300" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
              <path d="M0 -2L20 40L0 82" vector-effect="non-scaling-stroke" stroke="currentcolor" stroke-linejoin="round" />
            </svg>
          </div>
        </template>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/24/solid'

const { steps, initSteps } = $(createNFTStore())

watchEffect(async() => {
  initSteps()
})
</script>

<style>

</style>
