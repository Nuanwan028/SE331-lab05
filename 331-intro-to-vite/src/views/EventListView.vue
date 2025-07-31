<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import { ref, computed, watchEffect, onMounted } from 'vue'
import EventService from '@/services/EventService'
import { useRouter } from 'vue-router'

const router = useRouter()

const events = ref<Event | null>(null)
const totalEvents = ref(0)

const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    required: false,
    default: 2 // Default page size if not provided
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

onMounted(() => {
  watchEffect(() => {
    EventService.getEvents(props.pageSize, page.value)
      .then(response => {
        events.value = response.data
        totalEvents.value = response.headers['x-total-count']
      })
      .catch(error => {
        console.error('Error fetching events:', error)
      })
  })
})

const hasNextPage = computed(() => {
  return page.value < Math.ceil(totalEvents.value / props.pageSize)
})
</script>

<template>
  <h1>Events For Good</h1>

  <div class="page-size-selector">
    <label for="pageSize">Events per page:</label>
    <select id="pageSize" v-model="selectedPageSize" @change="updatePageSize">
      <option v-for="size in [1, 2, 3, 4]" :value="size" :key="size">{{ size }}</option>
    </select>
  </div>

  <div class="events">
    <!-- Loop through the events and render an EventCard for each -->
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="page-info">
      Page {{ page }} of {{ Math.ceil(totalEvents / props.pageSize) }}
    </div>

    <div class="pagination">
      <RouterLink id="page-prev" :to="{ name: 'event-list-view', query: { page: page - 1, pageSize: selectedPageSize } }" v-if="page != 1">
        &#60; Prev Page
      </RouterLink>

      <RouterLink id="page-next" :to="{ name: 'event-list-view', query: { page: page + 1, pageSize: selectedPageSize } }" v-if="hasNextPage">
        Next Page &#62;
      </RouterLink>
    </div>
  </div>
</template>

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

/* Styles for the main events container */
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Styles for the pagination links container */
.pagination {
  display: flex;
  width: 290px; /* Fixed width for pagination links */
}

.pagination a {
  flex: 1; /* Distribute space equally between links */
  text-decoration: none;
  color: #2c3e50;
}

/* Alignment for the previous page link */
#page-prev {
  text-align: left;
}

/* Alignment for the next page link */
#page-next {
  text-align: right;
}

.page-info {
  margin: 1rem 0;
  font-weight: bold;
}
</style>
