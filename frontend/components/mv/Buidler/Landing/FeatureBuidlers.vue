<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl py-8 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="font-bold mb-6 tracking-tight text-2xl text-gray-900">
        Feature Buidlers
      </h2>

      <ul role="list" class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <li v-for="person in people" :key="person.email" class="divide-y bg-white rounded-lg flex flex-col divide-gray-200 shadow text-center col-span-1">
          <div class="flex flex-col flex-1 p-8">
            <img class="rounded-full mx-auto flex-shrink-0 h-32 w-32" :src="person.imageUrl" alt="">
            <h3 class="font-medium mt-6 text-sm text-gray-900">
              {{ person.name }}
            </h3>
            <dl class="flex flex-grow flex-col mt-1 justify-between">
              <dt class="sr-only">
                Title
              </dt>
              <dd class="text-sm text-gray-500">
                {{ person.title }}
              </dd>
              <dt class="sr-only">
                Role
              </dt>
              <dd class="mt-3">
                <span class="rounded-full font-medium bg-green-100 text-xs py-1 px-2 text-green-800">{{ person.role }}</span>
              </dd>
            </dl>
          </div>
          <div>
            <div class="divide-x flex -mt-px divide-gray-200">
              <div class="flex flex-1 w-0">
                <a :href="`mailto:${person.email}`" class="border border-transparent rounded-bl-lg font-medium -mr-px flex-1 text-sm py-4 text-gray-700 w-0 relative inline-flex items-center justify-center hover:text-gray-500">
                  <EnvelopeIcon class="h-5 text-gray-400 w-5" aria-hidden="true" />
                  <span class="ml-3">Email</span>
                </a>
              </div>
              <div class="flex -ml-px flex-1 w-0">
                <a :href="`tel:${person.telephone}`" class="border border-transparent rounded-br-lg font-medium flex-1 text-sm py-4 text-gray-700 w-0 relative inline-flex items-center justify-center hover:text-gray-500">
                  <PhoneIcon class="h-5 text-gray-400 w-5" aria-hidden="true" />
                  <span class="ml-3">Call</span>
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { EnvelopeIcon, PhoneIcon } from '@heroicons/vue/20/solid'

const people = [
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  // More people...
]
</script>
