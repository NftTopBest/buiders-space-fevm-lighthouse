
<script setup lang="ts">
import { MinusCircleIcon } from '@heroicons/vue/24/outline'
import { PlusCircleIcon } from '@heroicons/vue/24/solid'
const { isUserExist, isInited, isLogin, createNewGroup } = $(web3MQStore())

const { storeJson } = $(useNFTStorage())
const {
  createTokenCost,
  allowanceModal,
  currentAllowance,
  showAllowanceModal,
  queryAllowance,
} = $(appStore())
const { initContract, userData } = $(web3AuthStore())
const { addSuccess } = $(notificationStore())
const { typeList, updateListFromChain } = $(mvStore())
const router = useRouter()
const basicPrice = $ref('200')
const maxSupply = $ref('10000')
const inviteCommission = $ref(1)
const image = $ref('')
const name = $ref('')
const description = $ref('')
const projectDetail = $ref('')
const gallery = $ref([
])
const theType = $ref(typeList[0])

const tags = $ref([
  { label: 'tagName', value: 'tagValue' },
])

const addItem = () => {
  tags.push({ label: '', value: '' })
}

const removeItem = (index) => {
  if (tags.length <= 1) return
  tags.splice(index, 1)
}

let isLoading = $ref(false)
const doSubmit = async() => {
  if (currentAllowance.lt(createTokenCost)) {
    showAllowanceModal({
      amount: createTokenCost.toString(),
      doClose: async() => {
        await queryAllowance()
        allowanceModal.isShow = false
        if (!currentAllowance.lt(createTokenCost))
          await doSubmit()
      },
    })

    return
  }
  if (isLoading) return
  isLoading = true

  const _inviteCommission = inviteCommission * 100
  const _tags = {}
  tags.forEach(({ label, value }) => {
    if (!label || !value) return
    _tags[label] = value
  })

  _tags.type = theType.name
  const web3MQChannelId = await createNewGroup(name, image)
  const properties = {
    author: userData,
    tags: _tags,
    from: 'Buidlers.Space',
    basicPrice,
    gallery,
    maxSupply,
    inviteCommission: _inviteCommission,
    projectDetail,
    web3MQChannelId,
  }

  const metadata = {
    name,
    description,
    image,
    properties,
  }
  const metadataCID = await storeJson(metadata)
  // const metadataCID = 'ipfs://bafkreidktss36q3fhxwof6lwpedtpjwk5ao6xkq54claptj7g54kozasyy'
  const contractWriter = await initContract('BuidlerProtocol', true)
  let tokenId = $ref('')
  try {
    const tokenType = theType.name
    // console.log('====> tokenType, parseEther(basicPrice), _inviteCommission, maxSupply, metadataCID :', tokenType, basicPrice, _inviteCommission, maxSupply, metadataCID)
    const tx = await contractWriter.addToken(tokenType, parseEther(basicPrice), _inviteCommission, maxSupply, metadataCID)
    const rc = await tx.wait()
    const event = rc.events.find(event => event.event === 'AddToken')
    const rz = event.args
    tokenId = rz.tokenId.toString()
  }
  catch (err) {
    isLoading = false
    console.log('====> err :', err)
    return
  }

  isLoading = false
  await updateListFromChain()
  addSuccess('Submit success')
  router.push(`${theType.href}`)
  console.log('====> tokenId :', tokenId)
}
</script>

<template>
  <main>
    <div v-if="isInited">
      <div v-if="isLogin" class="space-y-6">
        <div>
          <h1 class="font-medium text-lg text-gray-900 leading-6">
            Create NFT
          </h1>
          <p class="mt-1 text-sm text-gray-500">
            Let’s get started by filling in the information below to create your new Fancy NFT.
          </p>
        </div>

        <div>
          <label for="name" class="font-medium text-sm text-gray-700 block">NFT Name</label>
          <div class="mt-1">
            <input id="name" v-model="name" type="text" name="name" class="rounded-md border-gray-300 shadow-sm w-full block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500">
          </div>
        </div>

        <div>
          <label for="description" class="font-medium text-sm text-gray-700 block">Description</label>
          <div class="mt-1">
            <textarea id="description" v-model="description" name="description" rows="3" class="rounded-md border-gray-300 shadow-sm w-full p-2 block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500" />
          </div>
        </div>

        <div>
          <label for="unit-price" class="font-medium text-sm text-gray-700 block">Unit Price</label>
          <div class="rounded-md flex shadow-sm mt-1">
            <input id="unit-price" v-model="basicPrice" type="text" name="unit-price" class="rounded-none rounded-l-md border-gray-300 flex-1 w-full block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="">
            <span class="border rounded-r-md bg-gray-50 border-l-0 border-gray-300 text-sm px-3 text-gray-500 inline-flex items-center">$BST</span>
          </div>
        </div>
        <div>
          <label for="maxSupply" class="font-medium text-sm text-gray-700 block">Max Supply</label>
          <div class="mt-1">
            <input id="maxSupply" v-model="maxSupply" type="text" name="maxSupply" class="rounded-md border-gray-300 shadow-sm w-full block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500">
          </div>
        </div>
        <div>
          <label for="invite-commission" class="font-medium text-sm text-gray-700 block">Invite commission</label>
          <div class="rounded-md flex shadow-sm mt-1">
            <input id="invite-commission" v-model="inviteCommission" type="text" name="invite-commission" class="rounded-none rounded-l-md border-gray-300 flex-1 w-full block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="">
            <span class="border rounded-r-md bg-gray-50 border-l-0 border-gray-300 text-sm px-3 text-gray-500 inline-flex items-center">%</span>
          </div>
        </div>

        <div>
          <label for="location" class="font-medium text-sm text-gray-700 block">Type</label>
          <select id="location" v-model="theType" name="location" class="rounded-md border-gray-300 mt-1 text-base w-full py-2 pr-10 pl-3 block sm:text-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500">
            <option v-for="item in typeList" :key="item.name" :value="item">
              {{ item.name }}
            </option>
          </select>
        </div>

        <div>
          <label for="image" class="font-medium text-sm text-gray-700 block">NFT Thumbnail</label>
          <div class="mt-1">
            <FileUploaderBanner id="image" v-model="image" class="h-full" />
          </div>
        </div>

        <section aria-labelledby="properties-heading" class="col-span-12">
          <label for="location" class="font-medium text-sm text-gray-700 block">Tags</label>
          <div v-for="(item, index) in tags" :key="index" class="flex pb-2">
            <input v-model="item.label" type="text" class="rounded-md max-w-sm max-w-xs border-gray-300 shadow-sm mr-2 sm:text-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="tag name">
            <div class="flex w-full">
              <input v-model="item.value" type="text" class="rounded-md border-gray-300 shadow-sm w-full block  sm:text-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="tag value">
              <div class="p-2" :class="tags.length > 1 ? 'cursor-pointer' : 'cursor-not-allowed text-gray-400'" @click="removeItem(index)">
                <MinusCircleIcon class="h-6  w-6" />
              </div>
            </div>
          </div>
          <div class="flex justify-end items-center ">
            <div class="cursor-pointer p-2" @click="addItem">
              <PlusCircleIcon class="h-6 w-6" />
            </div>
          </div>
        </section>

        <div>
          <label for="projectDetail" class="font-medium text-sm text-gray-700 block">Project Detail</label>
          <div class="mt-1">
            <EditorDefault v-model="projectDetail" height="324px" />
          </div>
        </div>

        <div class="pb-10">
          <label for="projectDetail" class="font-medium text-sm text-gray-700 block">Project Gallery</label>
          <div class="mt-1">
            <FileUploaderGallery v-model="gallery" title="" class="sm:col-span-6" />
          </div>
        </div>

        <div class="flex border-t-gray-300 border-t-1 py-10 justify-end">
          <btn-indigo :is-loading="isLoading" @click="doSubmit">
            Submit
          </btn-indigo>
        </div>
      </div>
      <MsgLoginForm v-else-if="isUserExist" />
      <MsgRegisterForm v-else />
    </div>
    <div v-else>
      <Loading class="mt-1/3" />
    </div>

    <ProfileForceUpdateModal v-if="!userData.avatar">
      You need update your profile before create new NFT
    </ProfileForceUpdateModal>
  </main>
</template>

<route lang="yaml">
meta:
  layout: bs
</route>
