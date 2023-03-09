<script setup lang="ts">
const tokenId = inject('tokenId')

const {
  allowanceModal,
  currentAllowance,
  queryAllowance,
  showAllowanceModal,
} = $(appStore())

const { product } = $(mvStore())

const basicPrice = $computed(() => parseEther(get(product, 'properties.basicPrice')))
const { initContract, storeJson, addSuccess, walletAddress, contractRead } = $(web3AuthStore())

let additionalComment = $ref('Hello! This is my comment with the action')
let hasComment = $ref(false)
let isLoading = $ref(false)

let nftCount = $ref('0')
const amount = $ref('')

watchEffect(async() => {
  if (!walletAddress) return
  nftCount = await contractRead('BuidlerProtocol', 'balanceOf', walletAddress, tokenId)
})
const doSubmit = async() => {
  const payAmount = basicPrice.mul(`${amount}`)

  if (currentAllowance.lt(payAmount)) {
    showAllowanceModal({
      amount,
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

  let content = ''
  if (hasComment)
    content = additionalComment

  const cid = await storeJson({
    createdBy: walletAddress,
    content,
    amount,
    basicPrice: get(product, 'properties.basicPrice'),
    metaType: 'mint',
  })

  const contract = await initContract('BuidlerProtocol', true)
  const tx = await contract.addMeta('mint', tokenId, amount, cid)
  const rc = await tx.wait()
  addSuccess('Mint Success!')

  additionalComment = ''
  hasComment = false
  isLoading = false
}

const totalPay = $computed(() => amount * get(product, 'properties.basicPrice'))
</script>
<template>
  <div class="flex flex-col h-full">
    <div class="flex-1">
      <div class="flex mt-2 relative justify-between">
        <div class="rounded-md flex flex-1 shadow-sm mt-1">
          <input id="amount" v-model="amount" type="text" name="amount" autocomplete="amount" class="rounded-md border-gray-300 flex-1 w-full min-w-0 block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="Mint Amount">
        </div>
        <div class="flex ml-4 items-center">
          <label for="comments" class="text-sm mr-2 text-gray-500">With Comment</label>
          <div class="rounded-md flex shadow-sm mt-1">
            <input id="additional-comment" v-model="hasComment" aria-describedby="additional comment for your action" name="additional-comment" type="checkbox" class="rounded cursor-pointer border-gray-300 h-4 text-indigo-600 w-4 focus:ring-indigo-500">
          </div>
        </div>
      </div>
      <div v-show="hasComment">
        <div class="mt-2">
          <textarea id="comment" v-model="additionalComment" rows="2" name="comment" class="rounded-md border-gray-300 shadow-sm w-full p-3 block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500" />
          <p id="comments-description" class="text-right text-sm pt-2 text-gray-500">
            Additional comment content for your action
          </p>
        </div>
      </div>
    </div>
    <div class="py-4 px-2 text-gray-600">
      <div class="flex font-bold border-b-2 border-gray-200 py-2 justify-between">
        <span>Total Pay</span>
        <span>{{ totalPay }} $BST</span>
      </div>
    </div>
    <BtnGreen class="mt-8 w-full py-3" :is-loading="isLoading" @click="doSubmit">
      Mint Now (current have {{ nftCount }} NFT)
    </BtnGreen>
  </div>
</template>
