<script setup lang="ts">
import { UseTimeAgo } from '@vueuse/components'

interface Props {
  commentType?: string
}
const {
  commentType,
} = defineProps<Props>()

const tokenId = inject('tokenId')
const { contractRead } = $(web3AuthStore())
const { getJson, getStatus } = $(useNFTStorage())

let jsonItems = $ref([])
watchEffect(async() => {
  const items = await contractRead('BuidlerProtocol', 'getMetas', tokenId, 0, 100, commentType?.toLowerCase())
  jsonItems = await Promise.all(items.map(async(cid) => {
    const data = await getJson(cid)
    data.cid = cid

    return data
  }))
  const status = await Promise.all(items.map(cid => getStatus(cid)))
  if (status.length > 0) {
    jsonItems = jsonItems.map((item, index) => {
      return {
        ...item,
        created: status[index].created,
      }
    })
  }
})
</script>
<template>
  <section aria-labelledby="notes-title">
    <div class="bg-white  mt-8 sm:rounded-lg sm:overflow-hidden">
      <div class="divide-y divide-gray-200">
        <div class="py-6 px-4 sm:px-0">
          <ul role="list" class="space-y-8 ">
            <li v-for="item in jsonItems" :key="item.cid">
              <div class="flex space-x-3">
                <div class="flex-shrink-0">
                  <IpfsImg class="rounded-full h-10 w-10" :src="item.userData.avatar" alt="" />
                </div>
                <div class="flex-1">
                  <div class="flex text-sm justify-between">
                    <a href="#" class="font-medium text-gray-900">{{ item.userData.name }}</a>
                    <span class="font-medium text-gray-500">
                      <UseTimeAgo v-if="item.created" v-slot="{ timeAgo }" :time="item.created">
                        {{ timeAgo }} {{ commentType }} x {{ item.amount }}
                      </UseTimeAgo>
                      <eos-icons:loading v-else class="h-6 text-black w-6" />
                    </span>
                  </div>
                  <div class="mt-1 text-sm text-gray-700">
                    <p>{{ item.content }}</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
