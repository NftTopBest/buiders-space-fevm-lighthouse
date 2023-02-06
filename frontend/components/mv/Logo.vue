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
  <div class="flex justify-start lg:flex-1 lg:w-0">
    <a href="#" class="flex justify-between items-center">
      <span class="sr-only">MassVerse.Space</span>
      <img class="h-8 mr-2 w-auto hidden sm:h-10" src="https://tailwindui.com/img/logos/mark.svg?from-color=purple&from-shade=600&to-color=indigo&to-shade=600&toShade=600" alt="">
      <h1 class="glitch">MassVerse.Space</h1>
    </a>
  </div>
</template>

<style lang="sass" scoped>
h1.glitch
  color: white
  font-family: sans-serif
  font-weight: 800
  position: relative
  font-size: 40px
  // padding: 30px

h1.glitch::before, h1.glitch::after
  padding: 30px
  color: white
  content: "MassVerse.Space"
  position: absolute
  width: 100%
  height: 100%
  background: black
  overflow: hidden
  top: 0

h1.glitch::before
  left: 3px
  text-shadow: -2px 0 red
  animation-name: glitch-animation-1
  animation-duration: 10s
  animation-timing-function: linear
  animation-delay: 0s
  animation-iteration-count: infinite
  animation-direction: reverse-alternate

h1.glitch::after
  left: -3px
  text-shadow: -2px 0 blue
  animation-name: glitch-animation-2
  animation-duration: 10s
  animation-timing-function: linear
  animation-delay: 0s
  animation-iteration-count: infinite
  animation-direction: reverse-alternate

@keyframes glitch-animation-1
  $steps: 20
  @for $i from 0 through $steps
    #{percentage($i*(1/$steps))}
      clip: rect(random(150)+px, 350px, random(150)+px, 30px)

@keyframes glitch-animation-2
  $steps: 20
  @for $i from 0 through $steps
    #{percentage($i*(1/$steps))}
      clip: rect(random(150)+px, 350px, random(150)+px, 30px)
</style>
