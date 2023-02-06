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
const amountList = [
  { name: '1', inStock: true },
  { name: '3', inStock: true },
  { name: '5', inStock: true },
  { name: '8', inStock: true },
  { name: '13', inStock: true },
  { name: '21', inStock: true },
  { name: '34', inStock: true },
  { name: '55', inStock: true },
]
const selectedAmount = $ref(amountList[0])

const { userData, initContract, storeJson, addSuccess, walletAddress, contractRead } = $(web3AuthStore())

let additionalComment = $ref('Hello! This is my comment with the action')
let hasComment = $ref(false)
let isLoading = $ref(false)

let nftCount = $ref('0')

watchEffect(async() => {
  if (!walletAddress) return
  nftCount = await contractRead('BuidlerProtocol', 'balanceOf', walletAddress, tokenId)
})
const doSubmit = async() => {
  const amount = selectedAmount.name
  const payAmount = basicPrice.mul(amount)

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

  let content = ''
  if (hasComment)
    content = additionalComment

  const cid = await storeJson({
    userData,
    content,
    amount,
    basicPrice: get(product, 'properties.basicPrice'),
    metaType: 'mint',
  })

  const contract = await initContract('BuidlerProtocol', true)
  console.log('====>  tokenId, amount, cid :', 'mint', tokenId, amount, cid)
  const tx = await contract.addMeta('mint', tokenId, amount, cid)
  const rc = await tx.wait()
  console.log('====> rc :', rc)
  addSuccess('Mint Success!')

  additionalComment = ''
  hasComment = false
  isLoading = false
}
</script>
<template>
  <div>
    <div class="mt-15">
      <RadioGroup v-model="selectedAmount" class="mt-4">
        <RadioGroupLabel class="sr-only">
          Choose a amount
        </RadioGroupLabel>
        <div class="grid gap-4 grid-cols-4 sm:grid-cols-8 lg:grid-cols-4">
          <RadioGroupOption v-for="item in amountList" :key="item.name" v-slot="{ active, checked }" as="template" :value="item" :disabled="!item.inStock">
            <div :class="[item.inStock ? 'bg-white shadow-sm text-gray-900 cursor-pointer' : 'bg-gray-50 text-gray-200 cursor-not-allowed', active ? 'ring-2 ring-indigo-500' : '', 'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6']">
              <RadioGroupLabel as="span">
                {{ item.name }}
              </RadioGroupLabel>
              <span v-if="item.inStock" :class="[active ? 'border' : 'border-2', checked ? 'border-indigo-500' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-md']" aria-hidden="true" />
              <span v-else aria-hidden="true" class="rounded-md border-2 border-gray-200 -inset-px pointer-events-none absolute">
                <svg class="h-full w-full inset-0 stroke-2 text-gray-200 absolute" viewBox="0 0 100 100" preserveAspectRatio="none" stroke="currentColor">
                  <line x1="0" y1="100" x2="100" y2="0" vector-effect="non-scaling-stroke" />
                </svg>
              </span>
            </div>
          </RadioGroupOption>
        </div>
      </RadioGroup>
    </div>
    <div class="flex mt-10 relative items-start justify-end">
      <div class="text-sm text-right ml-3">
        <label for="comments" class="font-medium text-gray-700">Additional Comment</label>
        <p id="comments-description" class="text-gray-500">
          Additional comment content for your action
        </p>
      </div>
      <div class="flex h-5 pl-5 items-center">
        <input id="additional-comment" v-model="hasComment" aria-describedby="additional comment for your action" name="additional-comment" type="checkbox" class="rounded cursor-pointer border-gray-300 h-4 text-indigo-600 w-4 focus:ring-indigo-500">
      </div>
    </div>
    <div v-show="hasComment">
      <div class="mt-2">
        <textarea id="comment" v-model="additionalComment" rows="4" name="comment" class="rounded-md border-gray-300 shadow-sm w-full p-3 block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500" />
      </div>
    </div>
    <btn-indigo class="mt-8 w-full py-3" :is-loading="isLoading" @click="doSubmit">
      Mint Now (current have {{ nftCount }} NFT)
    </btn-indigo>
  </div>
</template>
