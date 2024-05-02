<script setup lang="ts">
import {useMouseInElement} from "@vueuse/core";

const target = ref<HTMLElement>()

const {elementX, elementY, isOutside, elementHeight, elementWidth} = useMouseInElement(target)
const cardTransform = computed(() => {
  const MAX_ROTATION = 6;
  // const rotateX = (MAX_ROTATION / 2 - (elementY.value / elementHeight.value) * MAX_ROTATION).toFixed(2) // handles x-axis rotation
  // const rotateY = ((elementX.value / elementWidth.value) * MAX_ROTATION - MAX_ROTATION / 2).toFixed(2) // handles y-axis rotation
  // return !isOutside.value && `perspective(${elementWidth.value}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  if (isOutside.value) return 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
  const rotateX = (elementY.value - elementHeight.value / 2) / elementHeight.value * MAX_ROTATION
  const rotateY = (elementX.value - elementWidth.value / 2) / elementWidth.value * MAX_ROTATION
  return `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`
})
</script>

<template>
  <div ref="target" :style="{
    transform: cardTransform,
    transition: 'transform 0.1s ease-out',
  }" class="card hover:shadow-2xl w-full p-8 rounded shadow-2xl bg-gray-800 text-white card">
    <h1 class="mb-2 text-2xl font-bold">Hello World!!</h1>
    <section class="flex items-center">
      <img src="https://fakeimg.pl/350x200/ff0000,128/000,255" alt="Fake Image" class="w-8 h-8 mr-4 rounded">
      <h2 class="font-2xl">@wuxingshi97</h2>
    </section>
    <p class="mt-4">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit
    </p>
  </div>
</template>

<style scoped lang="scss">
//.card{
//  transform:v-bind(cardTransform);
//  transition: transform 0.25s ease-in-out;
//}
</style>