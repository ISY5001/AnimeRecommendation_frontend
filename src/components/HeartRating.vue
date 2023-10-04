<template>
  <div class="flex">
    <!-- Loop through hearts and display them -->
    <div v-for="(rate, index) in ratings" :key="index" class="mr-1">
      <button @click="toggleHeart(index)">
        <emptyHeart v-if="rate === 0" />
        <halfHeart v-if="rate === 2.5" />
        <fullHeart v-if="rate === 5" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import emptyHeart from './icons/emptyHeart.vue';
import fullHeart from './icons/fullHeart.vue';
import halfHeart from './icons/halfHeart.vue';

const ratings = ref([0, 0, 0, 0, 0]); // Assuming you want 5 hearts initially all empty

const toggleHeart = (index) => {
  if (ratings.value[index] === 0) {
    // Make all previous hearts full
    for (let i = 0; i < index; i++) {
      ratings.value[i] = 5;
    }
    ratings.value[index] = 2.5; // Make the current heart half-filled
    return;
  }

  if (ratings.value[index] === 2.5) {
    // Make all previous hearts and the current one full
    for (let i = 0; i <= index; i++) {
      ratings.value[i] = 5;
    }
    return;
  }

  if (ratings.value[index] === 5) {
    // Make the current heart and all subsequent hearts empty
    for (let i = index; i < ratings.value.length; i++) {
      ratings.value[i] = 0;
    }
    return;
  }
};
</script>
