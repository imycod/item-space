<script setup lang="ts">
import buttonWind from "@/presets/wind/button"
</script>

<template>
  <Button :pt="buttonWind" pt:root:class="border-1 border-primary-50">button</Button>
  <div class="text-gray-600">
    <div>
      <div>
        <nav>
          <h1 class="font-bold uppercase p-4 border-b border-gray-100 text-primary"><a href="/">Food Ninja</a></h1>
        </nav>
      </div>
      <ul>
        <li class="text-gray-700 font-bold"><a href="#"><span>Home</span></a></li>
        <li class="text-gray-700"><a href="#"><span>About</span></a></li>
      </ul>
    </div>

    <main class="px-10 py-2">
      <div>
        <a href="#">Login in</a>
        <a href="#">Sign up</a>
      </div>

      <header>
        <h2 class="text-gray-700 text-6xl font-semibold">Recipes</h2>
        <h3 class="text-2xl font-semibold">For wuxingshi</h3>
      </header>

      <div>
        <h4 class="font-bold mt-8 pb-2 border-b border-gray-200">Latest Recipes</h4>

        <div class="mt-8">
          <!-- cards-->
          <div>
            <img src="https://fakeimg.pl/350x200/ff0000,128/000,255" alt="Fake Image">
            <div>
              <span>5 Bean Chilli Stew</span>
              <span>Recipe by Mario</span>
            </div>
          </div>

          <h4 class="font-bold mt-8 pb-2 border-b border-gray-200">Most Recipes</h4>
          <div>
            <img src="" alt="">
            <div>
              <span>5 Bean Chilli Stew</span>
              <span>Recipe by Mario</span>
            </div>
          </div>

          <div>
            <div>load more</div>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">

</style>