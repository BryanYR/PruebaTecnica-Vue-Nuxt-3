<script lang="ts" setup>
const showModal = ref(false)
</script>
<template>
  <header class="py-4 px-10 w-full h-[5rem] bg-primary flex justify-start items-center">
    <div class="text-white flex justify-between w-full">
      <NuxtLink class="text-lg xl:text-xl 2xl:text-3xl" to="/">
        Prueba Técnica
      </NuxtLink>
      <button @click="showModal = true" class="bg-white rounded-lg text-primary px-6 py-2 font-semibold hover:bg-primary-dark hover:text-white transition-colors ease-in-out duration-300">
        Registrarme
      </button>
    </div>
    <ModalsRegister v-model:show="showModal" />
  </header>
</template>
