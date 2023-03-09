<script setup lang="ts">
import { UseTimeAgo } from '@vueuse/components'
import { HeartIcon as LikeIcon, ChevronDoubleDownIcon as MoreIcon } from '@heroicons/vue/20/solid'
import { ChatBubbleLeftIcon as NoChatIcons, HeartIcon as UnLikeIcon } from '@heroicons/vue/24/outline'
import { ChatBubbleLeftIcon as ChatIcons } from '@heroicons/vue/24/solid'
import { getQl } from '~/gql/CyberConnect/gql_CC_post'

interface Props {
  item: Object
  isPost?: Boolean
  isOnlyComments?: Boolean
}

const emit = defineEmits(['update'])
const { item: content = {}, isPost = true, isOnlyComments = false } = defineProps<Props>()
const { contentID: contentId, authorHandle: handle } = $(content)

const { callCCApiMethod, userCCInfo, doGetUserCCInfo } = $(ccStore())
const { walletAddress: me } = $(web3AuthStore())
const route = useRoute()
const address = $computed(() => route.params.address)

let isLoading = $ref(false)
const body = $ref('')
const onSubmitComment = async(item) => {
  console.log('====> item :', item)
  if (!body || isLoading) return
  isLoading = true

  console.log('====> userCCInfo :', userCCInfo)
  await callCCApiMethod('createComment', item.contentID, { title: body, body, author: userCCInfo.handle })
  item.showComment = false
  body = ''
  isLoading = false
  loadData(true)
}

const onSubmitLike = async(item) => {
  const fun = item.likedStatus.liked ? 'dislike' : 'like'
  await callCCApiMethod(fun, item.contentID)
  item.likedStatus.liked ? item.likeCount-- : item.likeCount++
  item.likedStatus.liked = !item.likedStatus.liked
}

let item = $ref({
  authorHandle: '',
  body: '',
})
let handleInfo = $ref({
  avatar: '',
})
const isLoadingContent = $ref(true)
const loadData = async(showComments = false) => {
  const rz = await useMutation(getQl(isPost)).execute({ me, contentId, handle })
  item = get(rz.data, 'content', {})
  handleInfo = get(rz.data, 'profileByHandle', {})
  isLoadingContent = false
  if (showComments)
    item.showComments = true

  await doGetUserCCInfo(me)
}
watchEffect(async() => {
  if (!contentId || !handle) return

  await loadData()
})
</script>

<template>
  <div v-if="!isLoadingContent">
    <div v-if="!isOnlyComments" class="flex space-x-3">
      <div class="flex-shrink-0">
        <IpfsImg class="rounded-full object-cover h-10 ring-blue-200 ring-1 w-10" :src="handleInfo?.avatar || '/pwa-192x192.png'" alt="" />
      </div>
      <div>
        <div class="text-sm">
          <a href="#" class="font-medium text-gray-900">{{ item?.authorHandle }}</a>
        </div>
        <div class="mt-1 text-sm text-gray-700">
          <p>{{ item?.body }}</p>
        </div>

        <div class="flex font-medium space-x-2 mt-2 text-sm text-gray-500 items-center">
          <span class="font-medium text-gray-500">
            <UseTimeAgo v-slot="{ timeAgo }" :time="item?.updatedAt">
              {{ timeAgo }}
            </UseTimeAgo>
          </span>

          <span class="font-medium text-gray-500">&middot;</span>

          <button class="flex items-center" @click="onSubmitLike(item)">
            <!-- {{ item.likedStatus.liked }} -->
            <LikeIcon v-if="item?.likedStatus?.liked" class="w-5" />
            <UnLikeIcon v-else class="w-5" />
            {{ item?.likeCount }}
          </button>

          <button type="button" class="flex pl-4 items-center" @click="item.showComment = !item?.showComment">
            <ChatIcons v-if="item?.commentCount > 0" class="w-5" />
            <NoChatIcons v-else class="w-5" />
            <span class="font-medium ml-1 text-gray-500">{{ item?.commentCount }}</span>
          </button>

          <button v-if="item?.commentCount" @click="item.showComments = !item?.showComments">
            <MoreIcon class="w-5" />
          </button>
        </div>
      </div>
    </div>
    <div v-if="item?.showComment || isOnlyComments" class="bg-gray-50 py-6 px-4 sm:px-6">
      <div class="flex space-x-3">
        <div class="flex-shrink-0">
          <IpfsImg class="rounded-full object-cover h-10 ring-blue-200 ring-1 w-10" :src="handleInfo?.avatar || '/pwa-192x192.png'" alt="" />
        </div>
        <div class="flex-1 min-w-0">
          <div>
            <textarea id="comment" v-model="body" name="comment" rows="3" class="rounded-md border-gray-300 shadow-sm w-full p-3 block sm:text-sm focus:border-blue-500 focus:ring-blue-500" placeholder="what's going on?" />
          </div>
          <div class="flex mt-3 items-center justify-end">
            <BtnIndigo
              v-if="body"
              :is-loading="isLoading"
              @click="onSubmitComment(item)"
            >
              Comment
            </BtnIndigo>
          </div>
        </div>
      </div>
    </div>

    <div v-if="(item?.comments?.edges.length && item?.showComments) || isOnlyComments" class="font-medium w-full p-0 text-gray-500">
      <MvBuidlerUserPostList :items="item?.comments?.edges" :is-post="false" />
    </div>
  </div>
</template>
