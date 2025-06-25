<script lang="ts" setup>
import type { Show } from '../../interfaces/show';
const props = withDefaults(defineProps<Show>(), {
    id: null,
    name: "",
    image: null,
    genres: () => [],
    rating: null,
    language: "",
    premiered: "",
    ended: "",
    officialSite: "",
  });

  const toRedirect = (url: number | null) => {
    if(!url) return
    navigateTo(`/event/${url}`)
  }
</script>
<template>
  <div @click="toRedirect(props.id)" class="max-w-md rounded-2xl overflow-hidden shadow-lg bg-white transition ease-in-out duration-300 hover:shadow-2xl cursor-pointer">
    <img
      v-if="props.image?.medium"
      :src="props.image.medium"
      :alt="props.name"
      loading="lazy"
      class="w-full h-64 object-cover"
    />

    <div class="p-6 space-y-2">
      <h2 class="text-2xl font-bold text-gray-800 ">{{ props.name }}</h2>

      <p class="text-sm text-gray-700 ">
        {{ props.language }} • {{ props.genres.join(', ') }}
      </p>

      <p class="text-sm text-gray-400 ">
        {{ props.premiered }} – {{ props.ended }}
      </p>

      <p
        v-if="props.rating?.average !== null"
        class="text-yellow-500 font-semibold"
      >
        ⭐ {{ props.rating?.average ?? '0' }}/10
      </p>
    </div>
  </div>
</template>