<script lang="ts" setup>
import Header from '../components/Main/Header.vue';
</script>
<template>
  <div class="w-full h-full m-0">
    <Header />
    <main class="py-10">
        <slot></slot>
    </main>
  </div>
</template>