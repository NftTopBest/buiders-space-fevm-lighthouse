<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])
interface Props {
  modelValue?: string[]
}
const {
  modelValue,
} = defineProps<Props>()

</script>
<template>
  <div class="sm:px-6 lg:grid lg:px-0 lg:gap-x-8 lg:grid-cols-3">
    <div class="rounded-lg hidden overflow-hidden aspect-w-3 aspect-h-4 lg:block">
      <IpfsImg :has-modal="true" :src="modelValue[0]" class="h-full object-cover object-center w-full" />
    </div>
    <div class="hidden lg:grid lg:gap-y-8 lg:grid-cols-1">
      <div class="rounded-lg overflow-hidden aspect-w-3 aspect-h-2">
        <IpfsImg :has-modal="true" :src="modelValue[1]" class="h-full object-cover object-center w-full" />
      </div>
      <div class="rounded-lg overflow-hidden aspect-w-3 aspect-h-2">
        <IpfsImg :has-modal="true" :src="modelValue[2]" class="h-full object-cover object-center w-full" />
      </div>
    </div>
    <div class="sm:rounded-lg aspect-w-4 aspect-h-5 sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
      <IpfsImg :has-modal="true" :src="modelValue[3]" class="h-full object-cover object-center w-full" />
    </div>
  </div>
</template>
