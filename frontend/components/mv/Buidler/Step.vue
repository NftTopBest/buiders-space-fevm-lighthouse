<template>
  <div>
    <nav aria-label="Progress">
      <ol role="list" class="divide-y border rounded-md divide-gray-300 border-gray-300 md:flex md:divide-y-0">
        <li v-for="(step, stepIdx) in steps" :key="step.name" class="relative md:flex md:flex-1">
          <a v-if="step.status === 'complete'" :href="step.href" class="flex w-full group items-center">
            <span class="flex font-medium text-sm py-4 px-6 items-center">
              <span class="rounded-full flex bg-indigo-600 flex-shrink-0 h-10 w-10 items-center justify-center group-hover:bg-indigo-800">
                <CheckIcon class="h-6 text-white w-6" aria-hidden="true" />
              </span>
              <span class="font-medium text-sm ml-4 text-gray-900">{{ step.name }}</span>
            </span>
          </a>
          <a v-else-if="step.status === 'current'" :href="step.href" class="flex font-medium text-sm py-4 px-6 items-center" aria-current="step">
            <span class="rounded-full flex border-2 border-indigo-600 flex-shrink-0 h-10 w-10 items-center justify-center">
              <span class="text-indigo-600">{{ step.id }}</span>
            </span>
            <span class="font-medium text-sm ml-4 text-indigo-600">{{ step.name }}</span>
          </a>
          <a v-else :href="step.href" class="flex group items-center">
            <span class="flex font-medium text-sm py-4 px-6 items-center">
              <span class="rounded-full flex border-2 border-gray-300 flex-shrink-0 h-10 w-10 items-center justify-center group-hover:border-gray-400">
                <span class="text-gray-500 group-hover:text-gray-900">{{ step.id }}</span>
              </span>
              <span class="font-medium text-sm ml-4 text-gray-500 group-hover:text-gray-900">{{ step.name }}</span>
            </span>
          </a>
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

    <div class="mt-5">
      <slot :current-step-index="currentStepIndex" />
    </div>

    <div class="border-t flex border-gray-200 my-10 mx-3 py-5 justify-between">
      <btn-indigo v-if="currentStepIndex != 0" @click="doPreStep">
        Pre
      </btn-indigo>

      <span v-else />
      <btn-indigo v-if="currentStepIndex != stepLen -1" @click="doNextStep">
        Next
      </btn-indigo>

      <div v-else>
        <slot name="submit">
          <btn-indigo :is-loading="false" @click="doSubmit">
            Submit
          </btn-indigo>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/24/solid'

// complete  current  upcoming
const steps = $ref([
  { id: '01', name: 'Set ccSBT info', href: '#', status: 'current' },
  { id: '02', name: 'Select Creation type', href: '#', status: 'upcoming' },
  { id: '03', name: 'Fill Secret', href: '#', status: 'upcoming' },
])

const currentStepIndex = $computed(() => steps.findIndex(i => i.status === 'current'))
const stepLen = $computed(() => steps.length)

const doNextStep = () => {
  if (currentStepIndex + 1 === stepLen) return
  steps[currentStepIndex + 1].status = 'current'
  steps[currentStepIndex].status = 'complete'
}

const doPreStep = () => {
  if (currentStepIndex === 0) return
  steps[currentStepIndex - 1].status = 'current'
  steps[currentStepIndex + 1].status = 'upcoming'
}

const doSubmit = () => {
  console.log('xxxx')
}
</script>

<style>

</style>
