
<script setup lang="ts">
import { UseTimeAgo } from '@vueuse/components'

const { posts, product, postModal, chainName } = $(mvStore())
const { isMyWalletAddress } = $(web3AuthStore())

const isOwner = $computed(() => isMyWalletAddress(product.tokenOwner))

const router = useRouter()
const route = useRoute()
const maybeShowForm = () => {
  if (!isOwner) return

  // form.isShow = true
  router.push(`/${chainName}/buidlers/build/${route.params.id}/new`)
}

</script>

<template>
  <div class="py-20 px-6 relative lg:py-14 lg:px-8">
    <div class="inset-0 absolute">
      <div class="bg-white h-1/3 sm:h-2/3" />
    </div>
    <div class="mx-auto max-w-7xl relative">
      <div class="text-center">
        <h2 class="flex font-bold tracking-tight  w-full text-3xl text-gray-900 items-center justify-between sm:text-4xl">
          Recent post from {{ product.name }}
          <button v-if="isOwner" class="text-base ml-4 py-3 text-blue-600" @click="maybeShowForm">
            Create New
          </button>
        </h2>
      </div>
      <div v-if="posts.length" class="mx-auto max-w-lg mt-12 grid gap-5 lg:max-w-none lg:grid-cols-3">
        <RouterLink v-for="(post, index) in posts" :key="post.title" :to="`/${chainName}/buidlers/build/${route.params.id}/${index}`" class="rounded-lg flex flex-col shadow-lg overflow-hidden" @click="postModal.post = post">
          <div class="flex-shrink-0">
            <IpfsImg class="object-cover h-48 w-full" :src="post.image" alt="" />
          </div>
          <div class="bg-white flex flex-col flex-1 p-6 justify-between">
            <div class="flex-1">
              <div class="cursor-pointer mt-2 block">
                <p class="font-semibold text-xl text-gray-900">
                  {{ post.title }}
                </p>
                <p class="mt-3 text-base text-gray-500">
                  {{ post.excerpt }}
                </p>
              </div>
            </div>
            <div class="flex mt-6 items-center">
              <div class="flex-shrink-0">
                <a href="#">
                  <span class="sr-only">{{ post.userData.name }}</span>
                  <IpfsImg class="rounded-full object-cover h-10 w-10" :src="post.userData.avatar" alt="" />
                </a>
              </div>
              <div class="ml-3">
                <p class="font-medium text-sm text-gray-900">
                  <a href="#" class="hover:underline">{{ post.userData.name }}</a>
                </p>
                <div class="flex space-x-1 text-sm text-gray-500">
                  <UseTimeAgo v-if="post.created" v-slot="{ timeAgo }" :time="post.created">
                    {{ timeAgo }}
                  </UseTimeAgo>
                  <eos-icons:loading v-else class="h-6 text-black w-6" />
                </div>
              </div>
              <div class="flex-1 text-right">
                Access by {{ post.content.itemAccessNFTCount }} NFT
              </div>
            </div>
          </div>
        </RouterLink>
      </div>
      <Empty v-else :show-create-new="isOwner" @newBtnClick="maybeShowForm">
        Add
      </Empty>
    </div>
  </div>
</template>
