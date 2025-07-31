<script setup lang="ts">
import { ref } from 'vue'
import type { Event } from '@/types'
defineProps<{
  event: Event;
}>();
</script>

<template>
  <div class="flex flex-col items-end mt-[5px] mb-[40px] pr-[5px]">
    <p class="text-base text-right m-0">{{ event.category }}</p>
    <p class="text-base text-right m-0">{{ event.organizer }}</p>
  </div>
</template>