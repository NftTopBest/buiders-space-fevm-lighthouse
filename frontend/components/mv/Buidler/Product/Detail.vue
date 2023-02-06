<script setup lang="ts">

const { product } = $(mvStore())

const gallery = $computed(() => {
  return get(product, 'properties.gallery', [])
})

</script>
<template>
  <div class="bg-white">
    <div class="pt-6">
      <div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:grid lg:px-8 lg:gap-x-8 lg:grid-cols-3">
        <div class="rounded-lg hidden overflow-hidden aspect-w-3 aspect-h-4 lg:block">
          <IpfsImg :has-modal="true" :src="gallery[0]" class="h-full object-cover object-center w-full" />
        </div>
        <div class="hidden lg:grid lg:gap-y-8 lg:grid-cols-1">
          <div class="rounded-lg overflow-hidden aspect-w-3 aspect-h-2">
            <IpfsImg :has-modal="true" :src="gallery[1]" class="h-full object-cover object-center w-full" />
          </div>
          <div class="rounded-lg overflow-hidden aspect-w-3 aspect-h-2">
            <IpfsImg :has-modal="true" :src="gallery[2]" class="h-full object-cover object-center w-full" />
          </div>
        </div>
        <div class="sm:rounded-lg aspect-w-4 aspect-h-5 sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
          <IpfsImg :has-modal="true" :src="gallery[3]" class="h-full object-cover object-center w-full" />
        </div>
      </div>

      <div class="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:max-w-7xl lg:grid lg:px-8 lg:pt-16 lg:gap-x-8 lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr]">
        <div class="lg:border-r lg:border-gray-200 lg:pr-8 lg:col-span-2">
          <h1 class="font-bold tracking-tight text-2xl text-gray-900 sm:text-3xl">
            {{ product.name }}
          </h1>
        </div>

        <MvBuidlerProductTradeWidget />

        <div class="py-10 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16 lg:col-span-2 lg:col-start-1">
          <!-- Description and details -->
          <div>
            <h3 class="sr-only">
              Description
            </h3>

            <div class="space-y-6">
              <p class="text-base text-gray-900">
                {{ product.description }}
              </p>
            </div>
          </div>

          <div class="mt-10">
            <h3 class="font-medium text-sm text-gray-900">
              Highlights
            </h3>

            <div class="mt-4">
              <ul role="list" class="list-disc space-y-2 text-sm pl-4">
                <li v-for="highlight in product.highlights" :key="highlight" class="text-gray-400">
                  <span class="text-gray-600">{{ highlight }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-10">
            <h2 class="font-medium text-sm text-gray-900">
              Details
            </h2>

            <div class="space-y-6 mt-4 text-sm text-gray-600">
              <MdPreview :text="get(product, 'properties.projectDetail')" />
            </div>
          </div>
          <div class="mt-10">
            <!-- <MvBuidlerProductTimeline /> -->
          </div>
        </div>
      </div>
      <MvBuidlerProductPosts />
    </div>
  </div>
</template>
