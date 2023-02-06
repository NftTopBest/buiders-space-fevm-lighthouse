
<script setup lang="ts">
import { UseTimeAgo } from '@vueuse/components'

const { form, posts, product, showPostModal } = $(mvStore())
</script>

<template>
  <div class="bg-gray-50 px-6 pb-20 relative lg:px-8 lg:pt-0 lg:pb-28">
    <div class="inset-0 absolute">
      <div class="bg-white h-1/3 sm:h-2/3" />
    </div>
    <div class="mx-auto max-w-7xl relative">
      <div class="text-center">
        <h2 class="flex font-bold  tracking-tight text-3xl text-gray-900 items-center justify-center sm:text-4xl">
          Recent post by {{ product.name }}
          <btn-indigo class="ml-4 py-3" @click="form.isShow = true">
            Create new post
          </btn-indigo>
        </h2>
      </div>
      <div class="mx-auto max-w-lg mt-12 grid gap-5 lg:max-w-none lg:grid-cols-3">
        <div v-for="post in posts" :key="post.title" class="rounded-lg flex flex-col shadow-lg overflow-hidden">
          <div class="flex-shrink-0">
            <IpfsImg class="object-cover h-48 w-full" :src="post.image" alt="" />
          </div>
          <div class="bg-white flex flex-col flex-1 p-6 justify-between">
            <div class="flex-1">
              <div class="cursor-pointer mt-2 block" @click="showPostModal(post)">
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
                  <IpfsImg class="rounded-full h-10 w-10" :src="post.userData.avatar" alt="" />
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
        </div>
      </div>
    </div>
  </div>
</template>
