<script setup lang="ts">
const tabs = $ref([
  'Mint',
  'Bid',
  'Ask',
  // 'Invest',
])

const currentTab = $ref('Mint')

const onChange = (e) => {
  console.log('====> val :', e.target.value)
}

</script>
<template>
  <div class="rounded-xl flex flex-col border-1 mt-4">
    <div>
      <div class="sm:hidden">
        <label for="tabs" class="sr-only">Select a tab</label>
        <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
        <select id="tabs" name="tabs" class="rounded-md border-gray-300 w-full block focus:border-indigo-500 focus:ring-indigo-500" @change="onChange">
          <option v-for="tab in tabs" :key="tab" :selected="currentTab === tab">
            {{ tab }}
          </option>
        </select>
      </div>
      <div class="hidden sm:block">
        <div class="border-b border-gray-200">
          <nav class="flex -mb-px justify-around" aria-label="Tabs">
            <button v-for="tab in tabs" :key="tab" :class="[currentTab === tab ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'w-full py-4 px-1 text-center border-b-2 font-medium text-sm']" :aria-current="currentTab === tab ? 'page' : undefined" @click="currentTab = tab">
              {{ tab }}
            </button>
          </nav>
        </div>
      </div>
    </div>
    <div class="flex-1 p-4">
      <MvBuidlerProductTradeWidgetMint v-show="currentTab === 'Mint'" />
      <MvBuidlerProductTradeWidgetBid v-show="currentTab === 'Bid'" />
      <MvBuidlerProductTradeWidgetAsk v-show="currentTab === 'Ask'" />
    </div>
  </div>
</template>
