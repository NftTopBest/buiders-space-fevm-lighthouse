<script setup lang="ts">
const { isUserExist, isInited, isLogin } = $(web3MQStore())
</script>
<template>
  <template v-if="isInited">
    <MsgApp v-if="isLogin" />
    <div v-else class="flex justify-center">
      <MsgLoginForm v-if="isUserExist" />
      <MsgRegisterForm v-else />
    </div>
  </template>
  <template v-else>
    <div class="flex justify-center">
      <Loading />
    </div>
  </template>
</template>

<route lang="yaml">
meta:
  layout: bs
  isNoPadding: true
</route>
