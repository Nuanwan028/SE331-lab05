<script setup lang="ts">
import { toRefs } from 'vue'
import { type Event } from '@/types'
import { useRouter } from 'vue-router' // Import useRouter for navigation
import { useMessageStore } from '@/stores/message' // Import the message store

const props = defineProps<{
  event: Event
}>()
const { event } = toRefs(props)

const router = useRouter() // Initialize the router
const messageStore = useMessageStore() // Initialize the message store

const handleEditConfirm = () => {
  // Simulate an update action (e.g., an API call would go here)
  console.log(`Event '${event.value.title}' updated successfully!`);

  // Set the flash message using the message store
  messageStore.updateMessage('Data has been updated!');

  // Automatically clear the message after 3 seconds (optional, but good practice for flash messages)
  setTimeout(() => {
    messageStore.resetMessage();
  }, 3000);

  // Navigate back to the event detail page
  router.push({ name: 'event-detail-view', params: { id: event.value.id } });
}
</script>

<template>
  <!-- <p>Edit event here: {{ event.title }}</p> -->
  <p>Edit event here</p>
  <button @click="handleEditConfirm">Save Changes</button>
</template>

<style scoped>
button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #369b74;
}
</style>