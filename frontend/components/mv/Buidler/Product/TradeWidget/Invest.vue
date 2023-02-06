<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])
interface Props {
  modelValue?: string
}
const {
  modelValue,
} = defineProps<Props>()

</script>
<template>
  <div>
    <div class="mt-15">
      <div class="sm:col-span-4">
        <label for="amount" class="font-medium text-sm text-gray-700 block">Amount</label>
        <div class="rounded-md flex shadow-sm mt-1">
          <input id="amount" type="text" name="amount" autocomplete="amount" class="rounded-none rounded-l-md border-gray-300 flex-1 w-full min-w-0 block sm:text-sm focus:border-indigo-500 focus:ring-indigo-500">
          <span class="border rounded-r-md bg-gray-50 border-l-0 border-gray-300 px-3 text-gray-500 inline-flex items-center sm:text-sm">$NST</span>
        </div>
      </div>
    </div>

    <button type="submit" class="border border-transparent rounded-md flex font-medium bg-indigo-600 mt-10 text-base text-white w-full py-3 px-8 items-center justify-center hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
      Invest Now(TBD)
    </button>
  </div>
</template>
