<script setup lang="ts">
const tokenId = inject('tokenId')
const {
  allowanceModal,
  currentAllowance,
  queryAllowance,
  showAllowanceModal,
} = $(appStore())
const amount = $ref('1')
const unitPrice = $ref('200')

const { storeJson, initContract, addSuccess, userData } = $(web3AuthStore())

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

  if (!userData.avatar) return
  if (isLoading) return
  isLoading = true

  const cid = await storeJson({
    userData,
    createdAt: Date.now(), // not for timestamp, just for create new cid here
  })

  console.log('====> cid :', cid)
  const contract = await initContract('BuidlerProtocol', true)
  const tx = await contract.bid(tokenId, amount, parseEther(unitPrice), cid)
  const rc = await tx.wait()
  addSuccess('Action Success!')
  isLoading = false
}

</script>
<template>
  <div>
    <div class="mt-15">
      <div class="sm:col-span-4">
        <label for="amount" class="font-medium text-sm text-gray-700 block">Amount</label>
        <div class="rounded-md flex shadow-sm mt-1">
          <input id="amount" v-model="amount" type="text" name="amount" autocomplete="amount" class="rounded-md border-gray-300 flex-1 w-full min-w-0 block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500">
        </div>
      </div>
      <div class="mt-4 sm:col-span-4">
        <label for="unitPrice" class="font-medium text-sm text-gray-700 block">Unit Price</label>
        <div class="rounded-md flex shadow-sm mt-1">
          <input id="unitPrice" v-model="unitPrice" type="text" name="unitPrice" autocomplete="unitPrice" class="rounded-none rounded-l-md border-gray-300 flex-1 w-full min-w-0 block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500">
          <span class="border rounded-r-md bg-gray-50 border-l-0 border-gray-300 px-3 text-gray-500 inline-flex items-center sm:text-sm">$NST</span>
        </div>
      </div>
    </div>

    <btn-indigo :is-loading="isLoading" class="mt-10 w-full py-3" @click="doSubmit">
      Bid Now
    </btn-indigo>
  </div>
</template>
