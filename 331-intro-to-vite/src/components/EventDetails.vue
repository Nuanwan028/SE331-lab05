<script setup lang="ts">
import { ref } from 'vue'
import type Event from '@/types';
defineProps<{
  event: Event;
}>();
</script>

<template>
  <div class="event-details">
    <p class="detail-text">{{ event.category }}</p>
    <p class="detail-text">{{ event.organizer }}</p>
  </div>
</template>

<style scoped>
.event-details {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 5px;
  margin-bottom: 40px;
  padding-right: 5px;
}

.detail-text {
  font-size: 1rem;
  text-align: right;
  margin: 0;
}
</style>
