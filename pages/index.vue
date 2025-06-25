<script lang="ts" setup>
import { getEvents } from '@/api/events'
import Loading from '@/components/Loading.vue'
const { data, pending, error } = await useAsyncData('events', getEvents)

const shows = computed(() => data.value?.data || [])
</script>
<template>
  <div class="container w-full h-full">
    <Loading v-if="pending" />
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
    >
      <CardEvent
        v-for="(show, index) in shows"
        :key="show.id || index"
        v-bind="show"
      />
    </div>
  </div>
</template>
