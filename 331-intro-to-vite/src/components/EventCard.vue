<script setup lang="ts">
// import { ref } from 'vue'
import type { Event } from '@/types'
defineProps<{
  event: Event
}>()
</script>

<template>
  <RouterLink class="no-underline text-gray-800" :to="{ name: 'event-detail-view', params: { id: event.id } }">
    <div
      class="cursor-pointer border border-gray-600 p-[20px] w-[250px] mb-[18px] transition-all duration-300 hover:scale-101 hover:shadow-sp"
      v-if="event">
      <h2 class="text-xl font-semibold">{{ event.title }}</h2>
      <span class="text-sm">@{{ event.time }} on {{ event.date }}</span>
    </div>
  </RouterLink>
</template>
