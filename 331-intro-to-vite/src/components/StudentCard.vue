<script setup lang="ts">
import type { Student } from '@/types';

defineProps<{
  student: Student;
}>();
</script>

<template>
  <div class="student-card">
    <h2>{{ student.name }} {{ student.surname }}</h2>
    <span>GPA: {{ student.gpa }}</span>
  </div>
</template>

<style scoped>
.student-card {
  padding: 20px;
  width: 250px;
  cursor: pointer; 
  border: 1px solid #42b983;
  margin-bottom: 18px;
  /* border-radius: 8px; Rounded corners for better aesthetics */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
}

.student-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2); 
}

.student-card span {
  font-size: 1rem;
  color: #666;
}
</style>
