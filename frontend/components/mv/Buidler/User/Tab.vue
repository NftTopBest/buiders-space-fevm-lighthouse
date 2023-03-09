<script setup lang="ts">

const route = useRoute()
const address = $computed(() => route.params.address)
const dataType = $computed(() => route.params.type || 'feed')
const { chainName } = $(mvStore())

const tabs = $computed(() => {
  return [
    { name: 'Feed', href: `/${chainName}/buidlers/user/${address}/feed`, current: dataType === 'feed' },
    { name: 'Essences', href: `/${chainName}/buidlers/user/${address}/essences`, current: dataType === 'essences' },
    { name: 'Creation', href: `/${chainName}/buidlers/user/${address}/creation`, current: dataType === 'creation' },
    { name: 'Owned', href: `/${chainName}/buidlers/user/${address}/owned`, current: dataType === 'owned' },
    { name: 'Ask', href: `/${chainName}/buidlers/user/${address}/ask`, current: dataType === 'ask' },
    { name: 'Bid', href: `/${chainName}/buidlers/user/${address}/bid`, current: dataType === 'bid' },
  ]
})
</script>
<template>
  <div>
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
      <select id="tabs" name="tabs" class="rounded-md border-gray-300 w-full block focus:border-indigo-500 focus:ring-indigo-500">
        <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">
          {{ tab.name }}
        </option>
      </select>
    </div>
    <div class="hidden sm:block">
      <div class="border-b border-gray-200">
        <div class="mx-auto w-2/3">
          <nav class="flex -mb-px" aria-label="Tabs">
            <router-link v-for="tab in tabs" :key="tab.name" :to="tab.href" :class="[tab.current ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm']" :aria-current="tab.current ? 'page' : undefined">
              {{ tab.name }}
            </router-link>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
