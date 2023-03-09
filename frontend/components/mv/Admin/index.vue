<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])
interface Props {
  modelValue?: string
}
const {
  modelValue,
} = defineProps<Props>()

const { addSuccess } = $(notificationStore())
const { initContract, walletAddress } = $(web3AuthStore())

const payTokenAddress = $ref('')
const createTokenCost = $ref('')

let isUpdatePayment = $ref(false)
const updatePayment = async() => {
  if (isUpdatePayment) return
  isUpdatePayment = true

  const contract = await initContract('BuidlerProtocol', true)
  const tx = await contract.updatePayment(payTokenAddress, createTokenCost)
  const rc = await tx.wait()
  addSuccess('updatePayment success')
  isUpdatePayment = false
}

// getTokenList

const getTokenList = async() => {
  const contract = await initContract('BuidlerProtocol')
  const rz = await contract.getTokenList(0, 10)
  console.log('====> rz :', rz)
}
watchEffect(async() => {
  if (!walletAddress) return
  await getTokenList()
})
</script>
<template>
  <div>
    <div class="md:grid md:gap-6 md:grid-cols-3">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="font-medium text-lg text-gray-900 leading-6">
            App
          </h3>
          <p class="mt-1 text-sm text-gray-600">
            The app relative config
          </p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <div class="shadow sm:rounded-md sm:overflow-hidden">
          <div class="bg-white space-y-6 py-5 px-4 sm:p-6">
            <div class="grid gap-6 grid-cols-3">
              <div class="col-span-3 sm:col-span-2">
                <label for="payTokenAddress" class="font-medium text-sm text-gray-700 block">payTokenAddress</label>
                <div class="rounded-md flex shadow-sm mt-1">
                  <input id="payTokenAddress" v-model="payTokenAddress" type="text" name="payTokenAddress" class="rounded-md border-gray-300 flex-1 w-full block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="">
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white space-y-6 py-5 px-4 sm:p-6">
            <div class="grid gap-6 grid-cols-3">
              <div class="col-span-3 sm:col-span-2">
                <label for="createTokenCost" class="font-medium text-sm text-gray-700 block">createTokenCost</label>
                <div class="rounded-md flex shadow-sm mt-1">
                  <input id="createTokenCost" v-model="createTokenCost" type="text" name="createTokenCost" class="rounded-none rounded-r-md border-gray-300 flex-1 w-full block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="">
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 text-right py-3 px-4 sm:px-6">
            <btn-indigo :is-loading="isUpdatePayment" @click="updatePayment">
              Save
            </btn-indigo>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="hidden sm:block" aria-hidden="true">
    <div class="py-5">
      <div class="border-t border-gray-200" />
    </div>
  </div>

  <div class="mt-10 sm:mt-0">
    <div class="md:grid md:gap-6 md:grid-cols-3">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="font-medium text-lg text-gray-900 leading-6">
            Personal Information
          </h3>
          <p class="mt-1 text-sm text-gray-600">
            Use a permanent address where you can receive mail.
          </p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form action="#" method="POST">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="bg-white py-5 px-4 sm:p-6">
              <div class="grid gap-6 grid-cols-6">
                <div class="col-span-6 sm:col-span-3">
                  <label for="first-name" class="font-medium text-sm text-gray-700 block">First name</label>
                  <input id="first-name" type="text" name="first-name" autocomplete="given-name" class="rounded-md border-gray-300 shadow-sm mt-1 w-full block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500">
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="last-name" class="font-medium text-sm text-gray-700 block">Last name</label>
                  <input id="last-name" type="text" name="last-name" autocomplete="family-name" class="rounded-md border-gray-300 shadow-sm mt-1 w-full block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500">
                </div>

                <div class="col-span-6 sm:col-span-4">
                  <label for="email-address" class="font-medium text-sm text-gray-700 block">Email address</label>
                  <input id="email-address" type="text" name="email-address" autocomplete="email" class="rounded-md border-gray-300 shadow-sm mt-1 w-full block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500">
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="country" class="font-medium text-sm text-gray-700 block">Country</label>
                  <select id="country" name="country" autocomplete="country-name" class="bg-white border rounded-md border-gray-300 shadow-sm mt-1 w-full py-2 px-3 block sm:text-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>

                <div class="col-span-6">
                  <label for="street-address" class="font-medium text-sm text-gray-700 block">Street address</label>
                  <input id="street-address" type="text" name="street-address" autocomplete="street-address" class="rounded-md border-gray-300 shadow-sm mt-1 w-full block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500">
                </div>

                <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label for="city" class="font-medium text-sm text-gray-700 block">City</label>
                  <input id="city" type="text" name="city" autocomplete="address-level2" class="rounded-md border-gray-300 shadow-sm mt-1 w-full block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500">
                </div>

                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label for="region" class="font-medium text-sm text-gray-700 block">State / Province</label>
                  <input id="region" type="text" name="region" autocomplete="address-level1" class="rounded-md border-gray-300 shadow-sm mt-1 w-full block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500">
                </div>

                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label for="postal-code" class="font-medium text-sm text-gray-700 block">ZIP / Postal code</label>
                  <input id="postal-code" type="text" name="postal-code" autocomplete="postal-code" class="rounded-md border-gray-300 shadow-sm mt-1 w-full block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500">
                </div>
              </div>
            </div>
            <div class="bg-gray-50 text-right py-3 px-4 sm:px-6">
              <button type="submit" class="border border-transparent rounded-md font-medium bg-indigo-600 shadow-sm text-sm text-white py-2 px-4 inline-flex justify-center hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="hidden sm:block" aria-hidden="true">
    <div class="py-5">
      <div class="border-t border-gray-200" />
    </div>
  </div>

  <div class="mt-10 sm:mt-0">
    <div class="md:grid md:gap-6 md:grid-cols-3">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="font-medium text-lg text-gray-900 leading-6">
            Notifications
          </h3>
          <p class="mt-1 text-sm text-gray-600">
            Decide which communications you'd like to receive and how.
          </p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form action="#" method="POST">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="bg-white space-y-6 py-5 px-4 sm:p-6">
              <fieldset>
                <legend class="sr-only">
                  By Email
                </legend>
                <div class="font-medium text-base text-gray-900" aria-hidden="true">
                  By Email
                </div>
                <div class="space-y-4 mt-4">
                  <div class="flex items-start">
                    <div class="flex h-5 items-center">
                      <input id="comments" name="comments" type="checkbox" class="rounded border-gray-300 h-4 text-indigo-600 w-4 focus:ring-indigo-500">
                    </div>
                    <div class="text-sm ml-3">
                      <label for="comments" class="font-medium text-gray-700">Comments</label>
                      <p class="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="flex h-5 items-center">
                      <input id="candidates" name="candidates" type="checkbox" class="rounded border-gray-300 h-4 text-indigo-600 w-4 focus:ring-indigo-500">
                    </div>
                    <div class="text-sm ml-3">
                      <label for="candidates" class="font-medium text-gray-700">Candidates</label>
                      <p class="text-gray-500">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div class="flex items-start">
                    <div class="flex h-5 items-center">
                      <input id="offers" name="offers" type="checkbox" class="rounded border-gray-300 h-4 text-indigo-600 w-4 focus:ring-indigo-500">
                    </div>
                    <div class="text-sm ml-3">
                      <label for="offers" class="font-medium text-gray-700">Offers</label>
                      <p class="text-gray-500">
                        Get notified when a candidate accepts or rejects an offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend class="font-medium text-base text-gray-900 contents">
                  Push Notifications
                </legend>
                <p class="text-sm text-gray-500">
                  These are delivered via SMS to your mobile phone.
                </p>
                <div class="space-y-4 mt-4">
                  <div class="flex items-center">
                    <input id="push-everything" name="push-notifications" type="radio" class="border-gray-300 h-4 text-indigo-600 w-4 focus:ring-indigo-500">
                    <label for="push-everything" class="font-medium text-sm ml-3 text-gray-700 block">Everything</label>
                  </div>
                  <div class="flex items-center">
                    <input id="push-email" name="push-notifications" type="radio" class="border-gray-300 h-4 text-indigo-600 w-4 focus:ring-indigo-500">
                    <label for="push-email" class="font-medium text-sm ml-3 text-gray-700 block">Same as email</label>
                  </div>
                  <div class="flex items-center">
                    <input id="push-nothing" name="push-notifications" type="radio" class="border-gray-300 h-4 text-indigo-600 w-4 focus:ring-indigo-500">
                    <label for="push-nothing" class="font-medium text-sm ml-3 text-gray-700 block">No push notifications</label>
                  </div>
                </div>
              </fieldset>
            </div>
            <div class="bg-gray-50 text-right py-3 px-4 sm:px-6">
              <button type="submit" class="border border-transparent rounded-md font-medium bg-indigo-600 shadow-sm text-sm text-white py-2 px-4 inline-flex justify-center hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
