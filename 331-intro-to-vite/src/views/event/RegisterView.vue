<script setup lang="ts">
import { toRefs } from 'vue'
import { type Event } from '@/types'
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message'

const props = defineProps<{
    event: Event
}>()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { event } = toRefs(props)
const router = useRouter()
const store = useMessageStore()

const register = () => {
    // If the registration API call successfull
    // Push back to the event details view
    store.updateMessage('You are successfully registered for ' + props.event.title)

    setTimeout(() => {
        store.resetMessage()
    }, 3000)

    router.push({ name: 'event-detail-view', params: { id: props.event.id } })
}

</script>

<template>
    <p>Register here</p>
    <button @click="register">Register</button>
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