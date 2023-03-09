<script setup lang="ts">
import { UseTimeAgo } from '@vueuse/components'

interface Props {
  items?: Array
}
const { items } = defineProps<Props>()

const { isMyWalletAddress } = $(web3AuthStore())
const route = useRoute()
const address = $computed(() => route.params.address)
const showPublish = $computed(() => isMyWalletAddress(address))

const { createPostTypeData } = $(lensStore())

const userData = inject('userData')

watchEffect(async() => {
})

const onSubmit = async() => {
  const contentURI = ''
  const collectModule = {
    freeCollectModule: {
      followerOnly: true,
    },
  }
  const referenceModule = {
    followerOnlyReferenceModule: false,
  }
  createPostTypeData(contentURI, collectModule, referenceModule)
}

</script>
<template>
  <div class="h-full mx-auto w-full max-w-7xl">
    <section aria-labelledby="notes-title">
      <div class="">
        <div v-if="showPublish" class="bg-gray-50 py-6 px-4 sm:px-6">
          <div class="flex space-x-3">
            <div class="flex-shrink-0">
              <IpfsImg class="rounded-full object-cover h-10 ring-blue-200 ring-1 w-10" :src="userData.avatar || '/pwa-192x192.png'" alt="" />
            </div>
            <div class="flex-1 min-w-0">
              <div>
                <label for="comment" class="sr-only">About</label>
                <textarea id="comment" name="comment" rows="3" class="rounded-md border-gray-300 shadow-sm w-full p-3 block sm:text-sm focus:border-blue-500 focus:ring-blue-500" placeholder="what's going on?" />
              </div>
              <div class="flex mt-3 items-center justify-end">
                <button
                  class="border border-transparent rounded-md font-medium bg-blue-600 shadow-sm text-sm text-white py-2 px-4 inline-flex items-center justify-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  @click="onSubmit"
                >
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="divide-y divide-gray-200">
          <div class="py-6 px-4 sm:px-6">
            <ul role="list" class="space-y-8">
              <li v-for="item in items" :key="item.id">
                <div class="flex space-x-3">
                  <div class="flex-shrink-0">
                    <IpfsImg class="rounded-full object-cover h-10 ring-blue-200 ring-1 w-10" :src="userData.avatar || '/pwa-192x192.png'" alt="" />
                  </div>
                  <div>
                    <div class="text-sm">
                      <a href="#" class="font-medium text-gray-900">{{ userData.name }}</a>
                    </div>
                    <div class="mt-1 text-sm text-gray-700">
                      <p>{{ item.content }}</p>
                    </div>
                    <div class="mt-2 w-full grid gap-1 grid-cols-4">
                      <IpfsImg v-for="(media, i) of item.medias" :key="i" class="object-cover h-30 w-full" :src="media.original.url || '/pwa-192x192.png'" alt="" />
                    </div>
                    <div class="space-x-2 mt-2 text-sm">
                      <span class="font-medium text-gray-500">
                        <UseTimeAgo v-slot="{ timeAgo }" :time="item.createdAt">
                          {{ timeAgo }}
                        </UseTimeAgo>
                      </span>

                      <!-- <span class="font-medium text-gray-500">&middot;</span>

                      <button type="button" class="font-medium text-gray-900">
                        Reply
                      </button> -->
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
