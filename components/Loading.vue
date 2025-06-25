<script lang="ts" setup>
  interface Props {
    text?: string | null;
    classContainer?: string;
    classSvg?: string;
  }
  withDefaults(defineProps<Props>(), { text: "Cargando" });
</script>
<template>
  <div
    :class="classContainer"
    class="flex h-[23rem] w-full flex-col items-center justify-center gap-5 rounded-lg [&>svg]:text-primary-700"
  >
    <span>{{ text }}...</span>
    <svg
      class="h-10 w-10 animate-spin"
      :class="classSvg"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <circle
        fill="currentColor"
        class="opacity-0"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
      ></circle>
      <path class="" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
    </svg>
  </div>
</template>
