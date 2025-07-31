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
  <h1 class="text-4xl font-bold mb-8 text-center">Events For Good</h1>

  <!-- Selector -->
  <div class="mb-6 flex items-center gap-2 font-bold text-base justify-center">
    <label for="pageSize">Events per page:</label>
    <select id="pageSize" v-model="selectedPageSize" @change="updatePageSize"
      class="px-3 py-1 border border-gray-300 rounded-md text-base bg-gray-100 text-gray-800 cursor-pointer transition-all hover:border-green-500 hover:bg-white focus:outline-none focus:ring-2 focus:ring-green-300">
      <option v-for="size in [1, 2, 3, 4]" :value="size" :key="size">
        {{ size }}
      </option>
    </select>
  </div>

  <!-- List -->
  <div class="flex flex-col items-center ">
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <!-- Page Info -->
    <div class="my-4 font-bold">
      Page {{ page }} of {{ Math.ceil(totalEvents / props.pageSize) }}
    </div>

    <!-- Pagination -->
    <div class="flex w-[290px]">
      <RouterLink id="page-prev" class="flex-1 text-left text-gray-700 hover:text-green-500"
        :to="{ name: 'event-list-view', query: { page: page - 1, pageSize: selectedPageSize } }" v-if="page != 1">
        &#60; Prev Page
      </RouterLink>

      <RouterLink id="page-next" class="flex-1 text-right text-gray-700 hover:text-green-500"
        :to="{ name: 'event-list-view', query: { page: page + 1, pageSize: selectedPageSize } }" v-if="hasNextPage">
        Next Page &#62;
      </RouterLink>
    </div>
  </div>
</template>
