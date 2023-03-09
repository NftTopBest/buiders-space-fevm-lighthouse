<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/20/solid'

const { doSubmit, isLoading: isCreateNFTLoading, ccProfileHandle } = $(createNFTStore())
const { doCheckHandleExist, doCreateProfile } = $(ccStore())
const handle = $ref('buidlerspace')
const isLoading = $ref(false)
const avatar = $ref('')
const displayName = $ref('My NFT CC Profile')
const bio = $ref('A cool CC profile bio here')
const banner = $ref('')
let createSuccess = $ref(false)
let txUrl = $ref('')
const doSubmitCreateProfile = async() => {
  isLoading = true
  txUrl = await doCreateProfile({
    handle, displayName, bio, avatar, banner,
  })
  isLoading = false
  createSuccess = true
  ccProfileHandle = handle
}

let notCheckedYet = $ref(true)
let isExist = $ref(false)
const checkHandle = async() => {
  notCheckedYet = false
  try {
    isExist = await doCheckHandleExist(handle)
  }
  catch (err) {
    console.log('====> err :', err)
  }
}

const canSubmit = $computed(() => !notCheckedYet && !isExist)
</script>
<template>
  <div class="rounded-lg shadow-lg ring-black p-10 ring-1  ring-opacity-5 overflow-hidden">
    <div v-if="!createSuccess" class="mb-10">
      <h1 class="font-medium text-lg text-gray-900 leading-6">
        Create an new Profile on CyberConnect Social Graph for your NFT project
      </h1>
      <p class="mt-1 text-sm text-gray-500">
        After create it successed, your fans can follow/subscribe your NFT project, and also can create Post/Comment off-chain without transaction gas.
      </p>
    </div>
    <div v-if="isLoading" class="flex flex-1 items-center justify-center">
      <Loading />
    </div>
    <div v-else-if="createSuccess" class="min-h-50 p-20">
      <Loading v-if="isCreateNFTLoading" class="h-20" text="Creating your NFT on Chain" />
      <div v-else>
        <div>
          <div class="rounded-full flex mx-auto bg-green-100 h-12 w-12 items-center justify-center">
            <CheckIcon class="h-6 text-green-600 w-6" aria-hidden="true" />
          </div>
          <div class="mt-3 text-center sm:mt-5">
            <DialogTitle as="h3" class="font-semibold text-base text-gray-900 leading-6">
              Payment successful
            </DialogTitle>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                Create the CyberConnect Profile Successed!
              </p>
              <a :href="txUrl" class="mt-5 block underline" target="_blank">Click to check the transaction detail</a>
            </div>
          </div>
        </div>
        <div class="mx-auto mt-20 w-100 ">
          <BtnIndigo class="w-full" @click="doSubmit">
            Submit NFT Project
          </BtnIndigo>
        </div>
      </div>
    </div>

    <div v-else class="space-y-6">
      <div class="pb-3 lg:(flex pb-0) ">
        <div class="mr-10 mb-6">
          <FileUploaderThumbnail v-model="avatar" title="Avatar" />
        </div>
        <div class="space-y-6 flex-1">
          <div>
            <label for="handle" class="font-medium text-sm text-gray-700 block"> Profile Handle </label>
            <div class="flex mt-1">
              <input id="handle" v-model="handle" type="text" name="handle" class="rounded-md border-gray-300 flex-1 shadow-sm mr-2 block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500">
              <BtnIndigo v-if="isExist || notCheckedYet" @click="checkHandle">
                Check avaliable
              </BtnIndigo>
              <BtnGreen v-else @click="checkHandle">
                <CheckIcon class="h-5 text-white mr-2 w-5" aria-hidden="true" />
                Avaliable
              </BtnGreen>
            </div>
            <div v-if="isExist" class="text-red-400">
              Handle Exist
            </div>
          </div>
          <div>
            <label for="displayName" class="font-medium text-sm text-gray-700 block"> Display Name </label>
            <div class="mt-1">
              <input id="displayName" v-model="displayName" type="text" name="displayName" class="rounded-md border-gray-300 shadow-sm w-full block sm:text-sm focus:border-green-500 focus:ring-green-500" placeholder="Your name">
            </div>
          </div>
          <div>
            <label for="bio" class="font-medium text-sm text-gray-700 block"> Bio </label>
            <div class="mt-1">
              <textarea id="bio" v-model="bio" name="description" rows="7" class="border rounded-md border-gray-300 shadow-sm w-full p-2 block sm:text-sm focus:border-green-500 focus:ring-green-500" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <label for="banner" class="font-medium text-sm mb-1 text-gray-700 block"> Banner </label>
        <FileUploaderBanner id="banner" v-model="banner" title="Banner" />
      </div>
      <div class="border-t flex border-gray-200 pt-6 justify-end">
        <BtnIndigo :is-loading="isLoading" :disabled="!canSubmit" @click="doSubmitCreateProfile">
          Create Cyber Connect Profile
        </BtnIndigo>
      </div>
    </div>
  </div>
</template>
