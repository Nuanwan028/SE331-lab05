<template>
  <h1>Events For Good</h1>

  <div class="page-size-selector">
    <label for="pageSize">Events per page:</label>
    <select id="pageSize" v-model="selectedPageSize" @change="updatePageSize">
      <option v-for="size in [1, 2, 3, 4]" :value="size">{{ size }}</option>
    </select>
  </div>

  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="page-info">
      Page {{ page }} of {{ Math.ceil(totalEvents / props.pageSize) }}
    </div>

    <div class="pagination">
      <RouterLink id="page-prev" :to="{ name: 'event-list-view', query: { page: page - 1 } }" v-if="page != 1">&#60;
        Prev Page</RouterLink>

      <RouterLink id="page-next" :to="{ name: 'event-list-view', query: { page: page + 1 } }" v-if="hasNextPage">Next
        Page &#62;</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import { ref, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService'
import { useRouter } from 'vue-router'

const router = useRouter()

const events = ref([])
const totalEvents = ref(0)

const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    required: false,
    default: 2
  }
})

const page = computed(() => props.page)
const selectedPageSize = ref(props.pageSize)

const updatePageSize = () => {
  router.push({
    name: 'event-list-view',
    query: {
      page: 1,
      pageSize: selectedPageSize.value
    }
  })
}

watchEffect(() => {
  events.value = []
  EventService.getEvents(props.pageSize, page.value)
    .then(response => {
      events.value = response.data
      totalEvents.value = response.headers['x-total-count']
    })
    .catch(error => {
      console.error('Error fetching events:', error)
    })
})

const hasNextPage = computed(() => {
  return page.value < Math.ceil(totalEvents.value / props.pageSize)
})
</script>

<style scoped>
.page-size-selector {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  font-size: 16px;
  justify-content: center;
}

.page-size-selector select {
  padding: 5px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  background-color: #f9f9f9;
  color: #2c3e50;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-size-selector select:hover {
  border-color: #42b983;
  background-color: #fff;
}

.page-size-selector select:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.3);
}


.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}

.page-info {
  margin: 1rem 0;
  font-weight: bold;
}
</style>
