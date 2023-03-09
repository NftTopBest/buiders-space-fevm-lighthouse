<script setup lang="ts">
const tokenId = inject('tokenId')
const {
  allowanceModal,
  currentAllowance,
  queryAllowance,
  showAllowanceModal,
} = $(appStore())
const amount = $ref(1)
const unitPrice = $ref('200')

const { storeJson, initContract, addSuccess, walletAddress, getContractAddress } = $(web3AuthStore())
const { product } = $(mvStore())

const inviteCommission = $computed(() => get(product, 'properties.inviteCommission', 0))
let isLoading = $ref(false)
const doSubmit = async() => {
  if (amount < 1)
    return

  const payAmount = parseEther(unitPrice).mul(amount)
  if (currentAllowance.lt(payAmount)) {
    showAllowanceModal({
      amount: payAmount.toString(),
      doClose: async() => {
        await queryAllowance()
        allowanceModal.isShow = false
        if (!currentAllowance.lt(payAmount))
          await doSubmit()
      },
    })

    return
  }

  if (isLoading) return
  isLoading = true

  const cid = await storeJson({
    createdBy: walletAddress,
    createdAt: Date.now(), // not for timestamp, just for create new cid here
  })

  const contract = await initContract('BuidlerProtocol', true)
  const txApproval = await contract.setApprovalForAll(getContractAddress('BuidlerProtocol'), true)
  await txApproval.wait()

  const txAsk = await contract.ask(tokenId, amount, parseEther(unitPrice), cid)
  await txAsk.wait()
  addSuccess('Action Success!')
  isLoading = false
}

const subTotal = $computed(() => amount * unitPrice)
const inviteCost = $computed(() => subTotal * inviteCommission / 10000)
const platformCost = $computed(() => subTotal * 100 / 10000)
const totalEarn = $computed(() => subTotal - inviteCost - platformCost)
</script>
<template>
  <div :class="isLoading ? 'cursor-not-allowed' : ''" class="flex flex-col h-full">
    <div class="cursor-not-allowed flex flex-1 mt-2 justify-around">
      <div class="w-1/2">
        <label for="amount" class="font-medium text-sm text-gray-500 block">Ask Amount</label>
        <div class="rounded-md flex shadow-sm mt-1">
          <input id="amount" v-model="amount" type="text" name="amount" autocomplete="amount" :class="isLoading ? 'cursor-not-allowed' : ''" class="rounded-md border-gray-300 flex-1 w-full min-w-0 block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500">
        </div>
      </div>
      <div>
        <label for="unitPrice" class="font-medium text-sm text-gray-500 block">Unit Price</label>
        <div class="rounded-md flex shadow-sm mt-1">
          <input id="unitPrice" v-model="unitPrice" :class="isLoading ? 'cursor-not-allowed' : ''" type="text" name="unitPrice" autocomplete="unitPrice" class="rounded-none rounded-l-md border-gray-300 flex-1 w-full min-w-0 block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500">
          <span class="border rounded-r-md bg-gray-50 border-l-0 border-gray-300 px-3 text-gray-500 inline-flex items-center sm:text-sm">$BST</span>
        </div>
      </div>
    </div>
    <div class="text-sm py-4 px-2 text-gray-600">
      <div class="flex justify-between">
        <span>Subtotal</span>
        <span>{{ subTotal }} $BST</span>
      </div>
      <div class="flex py-2 justify-between">
        <span>Inviter Earn Cost</span>
        <span>-{{ inviteCost }} $BST</span>
      </div>
      <div class="flex border-b-2 border-gray-200 pb-3 justify-between">
        <span>Platform Fee Cost</span>
        <span>-{{ platformCost }} $BST</span>
      </div>
      <div class="flex font-bold py-3 justify-between">
        <span>Total Earn</span>
        <span>{{ totalEarn }} $BST</span>
      </div>
    </div>
    <BtnBlack :is-loading="isLoading" class="w-full py-3" @click="doSubmit">
      Ask Now
    </BtnBlack>
  </div>
</template>
