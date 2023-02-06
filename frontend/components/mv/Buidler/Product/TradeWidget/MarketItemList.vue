<script setup lang="ts">
import { UseTimeAgo } from '@vueuse/components'

interface Props {
  marketType?: string
}
const {
  marketType,
} = defineProps<Props>()

const tokenId = inject('tokenId')
const { contractRead } = $(web3AuthStore())
const { getJson, getStatus } = $(useNFTStorage())
const { doBuyOrSell } = $(mvStore())

const marketItemMethodName = $computed(() => {
  if (marketType === 'Bid')
    return 'getBids'

  return 'getAsks'
})
let jsonItems = $ref([])
watchEffect(async() => {
  const startIdx = 0
  const items = await contractRead('BuidlerProtocol', marketItemMethodName, tokenId, startIdx, 100)
  // console.log('====> marketType, items :', marketType, items)
  // items = items.filter(item => item.isListed)
  jsonItems = await Promise.all(items.map(async(item, index) => {
    if (!item.cid) {
      return {
        userData: {},
        ...item,
      }
    }
    // console.log('====> index, startIdx :', index, startIdx)
    const data = await getJson(item.cid)
    const status = await getStatus(item.cid)
    return {
      ...data,
      ...item,
      created: status.created,
    }
  }))
})

</script>
<template>
  <section aria-labelledby="notes-title">
    <div class="bg-white  mt-8 sm:rounded-lg sm:overflow-hidden">
      <div class="divide-y divide-gray-200">
        <div class="py-6 px-4 sm:px-0">
          <ul role="list" class="space-y-8 ">
            <template v-for="item in jsonItems" :key="item.cid">
              <li v-show="item.isListed">
                <div class="flex space-x-3 items-center">
                  <div class="flex-shrink-0">
                    <IpfsImg class="rounded-full h-10 w-10" :src="item.userData.avatar" alt="" />
                  </div>
                  <div class="flex flex-1 justify-between">
                    <div class="flex flex-col text-sm justify-between">
                      <a href="#" class="text-gray-500">{{ item.userData.name }}</a>
                      <span class="font-medium text-gray-900">
                        <UseTimeAgo v-if="item.created" v-slot="{ timeAgo }" :time="item.created">
                          {{ formatEther(item.unitPrice) }} $NST x {{ item.amount }}
                        </UseTimeAgo>
                        <eos-icons:loading v-else class="h-6 text-black w-6" />
                      </span>
                    </div>
                    <div class="pr-1">
                      <btn-indigo v-if="marketType === 'Bid'" :is-loading="item.isLoading" @click="doBuyOrSell(item, 'sell')">
                        Sell
                      </btn-indigo>
                      <btn-indigo v-else :is-loading="item.isLoading" @click="doBuyOrSell(item, 'buy')">
                        Buy
                      </btn-indigo>
                    </div>
                  </div>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
