<script setup lang="ts">
const { contractRead, getJson } = $(web3AuthStore())
const { isMyWalletAddress, addSuccess } = $(web3AuthStore())
const { ccPostItems, doCreatePost, doUpdatePrimaryProfile, doGetUserCCInfo, doQueryPostItems } = $(ccStore())

const route = useRoute()
const address = $computed(() => route.params.address)
const showPublish = $computed(() => isMyWalletAddress(address))
const userData = inject('userData')
let isLoading = $ref(false)
const body = $ref('')
const onSubmit = async() => {
  if (!body || isLoading) return
  isLoading = true
  await doCreatePost(body, address)
  body = ''
  addSuccess('Publish success!')
  isLoading = false
  doQueryPostItems()
}

</script>
<template>
  <div class="h-full mx-auto w-full max-w-7xl">
    <section aria-labelledby="notes-title">
      <div class="">
        <!-- <BtnIndigo @click="doUpdatePrimaryProfile(727)">
          doUpdatePrimaryProfile
        </BtnIndigo> -->
        <div v-if="showPublish" class="bg-gray-50 py-6 px-4 sm:px-6">
          <div class="flex space-x-3">
            <div class="flex-shrink-0">
              <IpfsImg class="rounded-full object-cover h-10 ring-blue-200 ring-1 w-10" :src="userData.avatar || '/pwa-192x192.png'" alt="" />
            </div>
            <div class="flex-1 min-w-0">
              <div>
                <label for="comment" class="sr-only">About</label>
                <textarea id="comment" v-model="body" name="comment" rows="3" class="rounded-md border-gray-300 shadow-sm w-full p-3 block sm:text-sm focus:border-blue-500 focus:ring-blue-500" placeholder="what's going on?" />
              </div>
              <div class="flex mt-3 items-center justify-end">
                <BtnBlack :is-loading="isLoading" @click="onSubmit">
                  Publish
                </BtnBlack>
              </div>
            </div>
          </div>
        </div>
        <div class="divide-y divide-gray-200">
          <div class="py-6 px-4 sm:px-6">
            <MvBuidlerUserPostList :items="ccPostItems" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
