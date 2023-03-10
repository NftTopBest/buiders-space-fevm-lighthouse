
<script setup lang="ts">
import {
  CalendarIcon,
  ChevronRightIcon,
} from '@heroicons/vue/20/solid'

const { doDecryptPost, getTokenPost, theType, getUserProfileLink, author, theTypeLink, chainName, ccProfileHandle, product, getTokenDataFromChain } = $(mvStore())
const { isMyWalletAddress } = $(web3AuthStore())

const route = useRoute()
const tokenId = route.params.id
const articleId = route.params.articleId

let post = $ref({})
let isLoading = $ref(false)
const desc = $ref('')

const ccSBT = $computed(() => post?.ccSBT || {})
onMounted(async () => {
  isLoading = true
  await getTokenDataFromChain(tokenId)
  post = await getTokenPost(tokenId, articleId)

  isLoading = false
})

const submitDecrypt = async () => {
  desc = await doDecryptPost(post.content)
}

const commentPost = $computed(() => {
  const contentID = get(post, 'ccPost.contentID', '')
  const authorHandle = get(product, 'properties.ccProfileHandle', '')
  return {
    contentID,
    authorHandle,
  }
})
</script>
<template>
  <div class="bg-transparent p-0 w-4xl">
    <nav class="flex mb-10" aria-label="Breadcrumb">
      <ol role="list" class="flex space-x-4 items-center">
        <li>
          <div class="flex">
            <router-link to="/" class="font-medium text-sm text-gray-500 hover:text-gray-700">
              Home
            </router-link>
          </div>
        </li>
        <li v-if="theTypeLink">
          <div class="flex items-center">
            <ChevronRightIcon class="flex-shrink-0 h-5 text-gray-400 w-5" aria-hidden="true" />
            <router-link :to="theTypeLink" class="flex font-medium text-sm ml-4 text-gray-500 items-center hover:text-gray-700">
              {{ theType }}
            </router-link>
          </div>
        </li>
        <li v-if="product.name">
          <div class="flex items-center">
            <ChevronRightIcon class="flex-shrink-0 h-5 text-gray-400 w-5" aria-hidden="true" />
            <router-link :to="`/${chainName}/buidlers/build/${tokenId}/`" class="flex font-medium text-sm ml-4 text-gray-500 items-center hover:text-gray-700">
              {{ product.name }}
            </router-link>
          </div>
        </li>
      </ol>
    </nav>
    <div class="bg-white rounded-lg mb-10 pb-10">
      <div class="rounded-lg flex h-80 mb-6 justify-center relative isolate items-center">
        <IpfsImg :src="post.image" class="rounded-t-xl object-cover h-80 w-full inset-0 -z-1 absolute" :has-modal="true" />
      </div>
      <div class="mx-auto text-center w-full">
        <h2 class="font-bold tracking-tight text-gray-900 text-2xl sm:text-4xl">
          {{ post.title }}
        </h2>
      </div>
      <div class="px-6">
        <div class="flex my-2">
          <router-link :to="getUserProfileLink(product?.tokenOwner, 'creation')" class="flex font-medium mt-2 text-sm text-gray-500 items-center hover:text-gray-700">
            <IpfsImg :src="author?.avatar" class="rounded-full object-cover h-10 mr-2 w-10" />
            {{ author?.name }}
          </router-link>
          <div class="flex mt-2 text-sm pl-2 text-gray-500 items-center">
            <CalendarIcon class="flex-shrink-0 h-5 mr-1.5 text-gray-400 w-5" aria-hidden="true" />
            <IpfsCreatedAt v-model="product.tokenURI" />
          </div>
          <CcCollectBtn :sbt="ccSBT" />
        </div>

        <p class="mt-20 text-lg text-gray-800 leading-8">
          {{ post.excerpt }}
        </p>
        <Loading v-if="isLoading" class="p-10" text="loading..." />
        <div v-else class="flex flex-col py-5 items-center">
          <div v-if="post?.content?.itemAccessNFTCount && !desc">
            <p class="text-center text-2xl">
              The content require you to own {{ post?.content?.itemAccessNFTCount }} NFT to get access!
            </p>
            <btn-indigo class="mt-4 w-full" @click="submitDecrypt">
              Unlock the content
            </btn-indigo>
          </div>
          <div v-else-if="post.type === 'liveroom' && desc">
            <MvBuidlerProductLivepeerClient :playback-id="desc" />
            <br>
            <br>
            <br>
            <div class="sm:border-t sm:border-gray-200 sm:grid sm:pt-5 sm:gap-4 sm:grid-cols-3 sm:items-start">
              <label for="pkpPublicKey" class="font-medium text-sm text-gray-900 leading-6 block sm:pt-1.5">Twitter Link</label>
              <div class="mt-2 sm:mt-0 sm:col-span-2">
                <div class="rounded-md flex max-w-lg shadow-sm">
                  <input id="pkpPublicKey" v-model="twitterLink" type="text" name="pkpPublicKey" autocomplete="pkpPublicKey" class="rounded-md border-gray-300 flex-1 mr-2 min-w-0 w-80 block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500">
                </div>
              </div>
            </div>
            <div class="sm:border-t sm:border-gray-200 sm:grid sm:pt-5 sm:gap-4 sm:grid-cols-3 sm:items-start">
              <label for="pkpEthAddress" class="font-medium text-sm text-gray-900 leading-6 block sm:pt-1.5">Reward wallet address</label>
              <div class="mt-2 sm:mt-0 sm:col-span-2">
                <div class="rounded-md flex max-w-lg shadow-sm">
                  <input id="pkpEthAddress" v-model="walletAddress" type="text" name="pkpEthAddress" autocomplete="pkpEthAddress" class="rounded-md border-gray-300 flex-1 mr-2 min-w-0 w-80 block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500">
                </div>
              </div>
            </div>
            <btn-indigo class="mt-4 w-full">
              claim reward
            </btn-indigo>
            <br>
            <br>
            <br>
          </div>
          <div v-else>
            {{ desc }}
          </div>
        </div>
        <div v-if="isMyWalletAddress(product?.tokenOwner) && post.streamKey">
          Your streamKey is: <span class="text-blue-600"> {{ post.streamKey }} </span> . see <a href="https://docs.livepeer.org/guides/developing/stream-via-obs" target="_blank" class="text-blue-600">here</a> and push your stream.
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg pb-10">
      <MvBuidlerUserPostItem v-if="commentPost.contentID" :item="commentPost" :is-only-comments="true" />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: bs
</route>
