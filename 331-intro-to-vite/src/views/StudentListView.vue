<script setup lang="ts">
import { ref, onMounted } from 'vue';
import StudentService from '@/services/StudentService';
import StudentCard from '@/components/StudentCard.vue';
import type { Student } from '@/types';

const students = ref<Student[] | null>(null);

const errorMessage = ref<string | null>(null);

onMounted(() => {
  StudentService.getStudents()
    .then((response) => {
      console.log('Fetched students:', response.data);
      students.value = response.data;
    })
    .catch((error) => {
      console.error('Error fetching students:', error);
      errorMessage.value = 'Failed to load student data. Please try again later.';
    });
});
</script>

<template>
  <div class="student-list-view">
    <h1>Our Students</h1>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-else-if="students === null">Loading students...</p>
    <div v-else class="student-cards-container">
      <StudentCard v-for="student in students" :key="student.id" :student="student" />
    </div>
  </div>
</template>

<style scoped>
.student-list-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.student-cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  max-width: 1200px;
}

.error-message {
  color: red;
  font-weight: bold;
  margin-top: 20px;
}
</style>
