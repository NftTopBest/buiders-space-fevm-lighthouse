<template>
  <div class=" bg-gray-900 p-12 relative isolate overflow-hidden sm:p-12">
    <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply" alt="" class="h-full object-cover object-right w-full inset-0 -z-10 absolute md:object-center">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="font-bold text-white tracking-tight text-4xl sm:text-6xl">
          Key Buidler Leader
        </h2>
        <p class="mt-6 text-lg text-gray-300 leading-8">
          Buidler leaders play an important role in Buidlers.Space, because we tend to seek the best creation from buidlers in the web3 verse.
        </p>
      </div>
      <div class="mx-auto mt-10 max-w-2xl lg:max-w-none lg:mx-0">
        <dl class="mt-16 grid gap-8 grid-cols-1 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="stat in stats" :key="stat.name" class="flex flex-col-reverse">
            <dt class="text-base text-gray-300 leading-7">
              {{ stat.name }}
            </dt>
            <dd class="font-bold text-white tracking-tight text-2xl leading-9">
              {{ stat.value }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const stats = [
  { name: 'Buidlers Types', value: '12' },
  { name: 'Creation Tags', value: '300+' },
  { name: 'NFT Mint', value: '40K+' },
  { name: '$BST Invest', value: '100B+' },
]
</script>
