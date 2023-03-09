
<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/vue/24/outline'

const faqs = [
  {
    question: 'How do I use this?',
    answer:
      'To request $BST, simply enter your wallet address, and hit “Send Me $BST. We support wallets as received addresses but not smart contracts.',
  },
  {
    question: 'What is a $BST token?',
    answer:
      '$BST tokens are a test currency that allows you to get by free and use in the testnet version of our `Buidler Protocol` Smart Contract. Some actions on our builder space require you to pay with $BST such as `create new token`, `mint NFT`, `invest NFT`, `bid/ask NFT`.',
  },
  {
    question: 'It worked! How can I say thank you?',
    answer:
      'Help other Buidlers by sharing your experience with a Twitter.',
  },
]
</script>

<template>
  <div class="py-12 px-6 lg:px-4">
    <div class="divide-y mx-auto divide-gray-900/10">
      <h2 class="font-bold tracking-tight text-2xl text-gray-900 leading-10">
        FAQs
      </h2>
      <dl class="divide-y divide-gray-900/10 mt-10">
        <Disclosure v-for="faq in faqs" :key="faq.question" v-slot="{ open }" as="div">
          <dt>
            <DisclosureButton class="flex text-left w-full py-3 text-gray-900 items-start justify-between">
              <span class="font-semibold text-base leading-7">{{ faq.question }}</span>
              <span class="flex h-7 ml-6 items-center">
                <MinusSmallIcon v-if="!open" class="h-6 w-6" aria-hidden="true" />
                <PlusSmallIcon v-else class="h-6 w-6" aria-hidden="true" />
              </span>
            </DisclosureButton>
          </dt>
          <DisclosurePanel as="dd" class="pr-12 pb-6">
            <p class="text-base text-gray-600 leading-7">
              {{ faq.answer }}
            </p>
          </DisclosurePanel>
        </Disclosure>
      </dl>
    </div>
  </div>
</template>
