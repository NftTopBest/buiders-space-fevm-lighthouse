<script setup lang="ts">
const tabs = $ref([
  'Mint',
  'Bid',
  'Ask',
  'Invest',
])

const currentTab = $ref('Mint')

const onChange = (e) => {
  console.log('====> val :', e.target.value)
}

</script>
<template>
  <div class="mt-4 lg:mt-0 lg:row-span-3">
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
          <nav class="flex -mb-px" aria-label="Tabs">
            <button v-for="tab in tabs" :key="tab" :class="[currentTab === tab ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm']" :aria-current="currentTab === tab ? 'page' : undefined" @click="currentTab = tab">
              {{ tab }}
            </button>
          </nav>
        </div>
      </div>
    </div>

    <div v-show="currentTab === 'Mint'">
      <MvBuidlerProductTradeWidgetMint />
      <MvBuidlerProductTradeWidgetMetaList comment-type="Mint" />
    </div>

    <div v-show="currentTab === 'Bid'">
      <MvBuidlerProductTradeWidgetBid />
      <MvBuidlerProductTradeWidgetMarketItemList market-type="Bid" />
    </div>
    <div v-show="currentTab === 'Ask'">
      <MvBuidlerProductTradeWidgetAsk />
      <MvBuidlerProductTradeWidgetMarketItemList market-type="Ask" />
    </div>
    <div v-show="currentTab === 'Invest'">
      <MvBuidlerProductTradeWidgetInvest />
      <!-- <MvBuidlerProductTradeWidgetMetaList comment-type="Invest" /> -->
    </div>
  </div>
</template>
