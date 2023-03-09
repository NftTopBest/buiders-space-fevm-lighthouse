<script setup lang="ts">
import { UseTimeAgo } from '@vueuse/components'

const items = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    department: 'Optimization',
    email: 'lindsay.walton@example.com',
    role: 'Member',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More people...
]

const { contractRead } = $(web3AuthStore())
const { getJson, getStatus } = $(useNFTStorage())
const { getUserProfileLink, getBuidlerInfo } = $(mvStore())

let jsonItems = $ref([])
const tokenId = inject('tokenId')
let isLoadingMore = $ref(false)

const loadMintData = async(tokenId) => {
  let jsonItems = []
  const action = 'mint'
  const items = await contractRead('BuidlerProtocol', 'getMetas', tokenId, 0, 100, action?.toLowerCase())
  jsonItems = await Promise.all(items.map(async(cid) => {
    const data = await getJson(cid)
    data.cid = cid
    data.userData = await getBuidlerInfo(data.createdBy)

    return data
  }))
  const status = await Promise.all(items.map(cid => getStatus(cid)))
  if (status.length > 0) {
    jsonItems = jsonItems.map((item, index) => {
      return {
        ...item,
        created: status[index].created,
        action,
      }
    })
  }
  return jsonItems
}

const loadMarketData = async(tokenId, marketItemMethodName) => {
  const action = marketItemMethodName === 'getAsks' ? 'ask' : 'bid'
  const startIdx = 0
  const items = await contractRead('BuidlerProtocol', marketItemMethodName, tokenId, startIdx, 100)
  return Promise.all(items.map(async(item, index) => {
    if (!item.cid) {
      return {
        userData: {},
        ...item,
      }
    }
    // console.log('====> index, startIdx :', index, startIdx)
    const data = await getJson(item.cid)
    const status = await getStatus(item.cid)
    data.userData = await getBuidlerInfo(data.createdBy)
    return {
      ...data,
      ...item,
      action,
      created: status.created,
    }
  }))
}

let isLoading = $ref(false)
watchEffect(async() => {
  if (!tokenId) return
  isLoading = true
  const [itemsMint, itemsAsk, itemsBid] = await Promise.all([loadMintData(tokenId), loadMarketData(tokenId, 'getAsks'), loadMarketData(tokenId, 'getBids')])

  jsonItems = reverse(sortBy([
    ...itemsMint, ...itemsAsk, ...itemsBid,
  ], 'created'))
  isLoading = false
})

const thePrice = (item) => {
  return item.basicPrice || formatEther(item.unitPrice)
}

let count = $ref(1)
const jsonItemsToShow = $computed(() => take(jsonItems, count * 5))
const noMore = $computed(() => jsonItemsToShow.length === jsonItems.length)
const doLoadMore = () => {
  isLoadingMore = true
  setTimeout(() => {
    isLoadingMore = false
    count++
  }, 500)
}
</script>
<template>
  <div class="rounded-xl border-1 my-4 px-4 sm:px-6 lg:px-8">
    <div class="mt-4 flow-root">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="min-w-full py-2 inline-block align-middle sm:px-6 lg:px-8">
          <LoadingOrEmpty :is-loading="isLoading" :items="jsonItemsToShow">
            <table class="divide-y min-w-full divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" class="font-semibold text-left text-sm py-3.5  text-gray-900 ">
                    User
                  </th>
                  <th scope="col" class="font-semibold text-left text-sm py-3.5 px-3 text-gray-900">
                    Amount ($BST)
                  </th>
                  <th scope="col" class="font-semibold text-left text-sm py-3.5 px-3 text-gray-900">
                    Action
                  </th>
                  <th scope="col" class="font-semibold text-left text-sm py-3.5 px-3 text-gray-900">
                    comment
                  </th>
                  <th scope="col" class="font-semibold text-left text-sm py-3.5 px-3 text-gray-900">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y bg-white divide-gray-200">
                <tr v-for="item in jsonItemsToShow" :key="item.email">
                  <td class=" text-sm py-4 pl-4 whitespace-nowrap sm:pl-0">
                    <router-link :to="getUserProfileLink(item?.userData?.walletAddress)" class="flex items-center hover:opacity-80">
                      <div class=" h-10 w-10">
                        <IpfsImg class="rounded-full object-cover h-10 w-10" :src="item.userData.avatar" alt="" />
                      </div>
                      <div class="ml-4">
                        <div class="font-medium text-gray-900">
                          {{ item.userData.name }}
                        </div>
                        <div class="text-gray-500">
                          {{ shortAddress(item?.userData?.walletAddress) }}
                        </div>
                      </div>
                    </router-link>
                  </td>
                  <td class="text-sm py-4 px-3 text-gray-500 whitespace-nowrap">
                    <div class="font-bold text-gray-900">
                      {{ thePrice(item) * item.amount }}
                    </div>
                    <div class="text-gray-500">
                      {{ thePrice(item) }} $BST x {{ item.amount }}
                    </div>
                  </td>
                  <td class="text-sm py-4 px-3 text-gray-500 whitespace-nowrap">
                    <span class="rounded-full font-semibold  text-xs px-2 leading-5 inline-flex" :class="{ 'text-green-800 bg-green-100': item.action === 'mint', 'text-red-800 bg-red-100': item.action === 'bid', 'text-purple-800 bg-purple-100': item.action === 'ask' }">{{ item.action }}</span>
                  </td>
                  <td :class="{ 'cursor-pointer': item.content, 'truncate': !item.showFull }" class=" text-sm max-w-40 py-4 px-3 text-gray-500" @click="item.showFull = !item.showFull">
                    {{ item.content || '' }}
                  </td>
                  <td class="text-sm py-4 px-3 text-gray-500 whitespace-nowrap">
                    <UseTimeAgo v-if="item.created" v-slot="{ timeAgo }" :time="item.created">
                      {{ timeAgo }}
                    </UseTimeAgo>
                  </td>
                </tr>
              </tbody>
            </table>
          </LoadingOrEmpty>
        </div>
      </div>
    </div>
    <div v-if="!noMore" class="flex py-4 justify-center">
      <BtnPlain class="rounded-full" :is-loading="isLoadingMore" @click="doLoadMore">
        Load  more
      </BtnPlain>
    </div>
  </div>
</template>
