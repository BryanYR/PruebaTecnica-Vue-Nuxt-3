<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Loading from '@/components/Loading.vue'
import { getEventDetail } from '@/api/events'

const route = useRoute()
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

const { data, pending, error } = await useAsyncData('eventDetail', () =>
  getEventDetail(id)
)

const show = computed(() => data.value?.data || null)
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <Loading v-if="pending" text="Cargando detalles" />
    <div v-else-if="show" class="flex flex-col ">
      <NuxtLink to="/" class="text-black px-4 py-2 font-semibold hover:bg-gray-200 mr-auto mb-4 transition-colors ease-in-out duration-300 rounded-xl">
        < Ver eventos
      </NuxtLink>
      <!-- Imagen -->
      <div>
        <img
          v-if="show.image?.original"
          :src="show.image.original"
          :alt="show.name"
          loading="lazy"
          class="rounded-xl shadow-md w-full object-cover max-h-[400px]"
        />
      </div>

      <!-- Información -->
      <div class="space-y-4 p-8 border border-gray-300 rounded-lg my-6">
        <h1 class="text-4xl font-bold text-gray-900">
          {{ show.name }}
        </h1>

        <p class="text-sm text-gray-600">
          <span class="font-semibold">Tipo:</span> {{ show.type }}
          &nbsp;•&nbsp;
          <span class="font-semibold">Idioma:</span> {{ show.language }}
        </p>

        <p class="text-sm text-gray-600">
          <span class="font-semibold">Géneros:</span>
          {{ show.genres?.join(', ') || 'N/A' }}
        </p>

        <p class="text-sm text-gray-600">
          <span class="font-semibold">Duración:</span> {{ show.runtime }} min
        </p>

        <p class="text-sm text-gray-600">
          <span class="font-semibold">Emitido desde:</span> {{ show.premiered }}
          <span v-if="show.ended"> hasta {{ show.ended }}</span>
        </p>

        <p class="text-yellow-500 font-semibold" v-if="show.rating?.average">
          ⭐ {{ show.rating.average }}/10
        </p>

        <div
          class="text-sm text-gray-700 prose max-w-none"
          v-html="show.summary"
        />
      </div>
    </div>

    <div v-else class="text-center py-20 text-red-500 font-medium">
      No se encontraron detalles del show.
    </div>
  </div>
</template>
