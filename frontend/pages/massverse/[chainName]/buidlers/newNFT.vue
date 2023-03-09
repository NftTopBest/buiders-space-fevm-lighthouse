
<script setup lang="ts">
const { isUserExist, isInited, isLogin } = $(web3MQStore())
const { currentStepIndex, stepLen, doNextStep, doPreStep, isLoading, checkIsLackBST } = $(createNFTStore())

const { userData } = $(web3AuthStore())

const { queryAllowance } = $(appStore())

watchEffect(async() => {
  queryAllowance()
  checkIsLackBST()
})

</script>

<template>
  <main>
    <div v-if="isInited">
      <div v-if="isLogin" class="space-y-6">
        <MvBuidlerCreateNFTStep />
        <MvBuidlerCreateNFTSelectType v-if="currentStepIndex === 0" class="mt-5" />
        <MvBuidlerCreateNFTBaseInfo v-if="currentStepIndex === 1" class="mt-5" />
        <MvBuidlerCreateNFTImages v-if="currentStepIndex === 2" class="mt-5" />
        <MvBuidlerCreateNFTTags v-if="currentStepIndex === 3" class="mt-5" />
        <MvBuidlerCreateNFTCCProfile v-if="currentStepIndex === 4" class="mt-5" />

        <div v-if="!isLoading" class="flex my-5 justify-between">
          <button v-if="currentStepIndex != 0" class="border border-transparent rounded-md font-medium bg-indigo-600 shadow-sm text-base text-white py-2 px-4 inline-flex items-center justify-center hover:bg-indigo-700" @click="doPreStep">
            Pre
          </button>
          <span v-else />
          <button v-if="currentStepIndex != stepLen -1" class="border border-transparent rounded-md font-medium bg-indigo-600 shadow-sm text-base text-white py-2 px-4 inline-flex items-center justify-center hover:bg-indigo-700" @click="doNextStep">
            Next
          </button>

          <!-- <btn-indigo v-else :is-loading="isLoading" @click="doSubmit">
            Submit
          </btn-indigo> -->
        </div>
      </div>
      <MsgLoginForm v-else-if="isUserExist" />
      <MsgRegisterForm v-else />
    </div>
    <div v-else>
      <Loading class="mt-1/3" />
    </div>

    <LackBSTModal />
    <ProfileForceUpdateModal v-if="!userData.avatar">
      You need update your profile before create new NFT
    </ProfileForceUpdateModal>
  </main>
</template>

<route lang="yaml">
meta:
  layout: bs
</route>
