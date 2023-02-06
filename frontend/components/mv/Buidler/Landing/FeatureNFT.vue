<template>
  <div class="bg-white">
    <div class="mx-auto max-w-2xl py-8 px-4 sm:px-6 sm:pt-16 lg:max-w-7xl lg:px-8">
      <h2 class="font-bold mb-6 tracking-tight text-2xl text-gray-900">
        Feature NFTs
      </h2>

      <div class=" grid gap-y-10 gap-x-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div v-for="product in products" :key="product.id" class="group relative">
          <div class="rounded-md bg-gray-200 min-h-80 w-full overflow-hidden aspect-w-1 aspect-h-1 lg:h-80 lg:aspect-none group-hover:opacity-75">
            <img :src="product.imageSrc" :alt="product.imageAlt" class="h-full object-cover object-center w-full lg:h-full lg:w-full">
          </div>
          <div class="flex mt-4 justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                <a :href="product.href">
                  <span aria-hidden="true" class="inset-0 absolute" />
                  {{ product.name }}
                </a>
              </h3>
              <p class="mt-1 text-sm text-gray-500">
                {{ product.color }}
              </p>
            </div>
            <p class="font-medium text-sm text-gray-900">
              {{ product.price }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: 'Front of men\'s Basic Tee in black.',
    price: '$35',
    color: 'Black',
  },
  // More products...
]
</script>
