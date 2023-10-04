<template>
  <div class="flex">
    <!-- Loop through hearts and display them -->
    <div v-for="(rate, index) in ratings" :key="index" class="mr-1">
      <button @click="toggleHeart(index)">
        <emptyHeart v-if="rate === 0" />
        <halfHeart v-if="rate === 0.5" />
        <fullHeart v-if="rate === 1" />
      </button>
    </div>

    <!-- Display the total score -->
    <div class="ml-4 text-xl font-bold">{{ totalScore }}</div>

  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import emptyHeart from './icons/emptyHeart.vue';
import fullHeart from './icons/fullHeart.vue';
import halfHeart from './icons/halfHeart.vue';

const ratings = ref([0, 0, 0, 0, 0]); // Assuming you want 5 hearts initially all empty

const toggleHeart = (index) => {
  if (ratings.value[index] === 0) {
    // Make all previous hearts full
    for (let i = 0; i < index; i++) {
      ratings.value[i] = 1;
    }
    ratings.value[index] = 0.5; // Make the current heart half-filled
    return;
  }

  if (ratings.value[index] === 0.5) {
    // Make all previous hearts and the current one full
    for (let i = 0; i <= index; i++) {
      ratings.value[i] = 1;
    }
    return;
  }

  if (ratings.value[index] === 1) {
    // Make the current heart and all subsequent hearts empty
    for (let i = index; i < ratings.value.length; i++) {
      ratings.value[i] = 0;
    }
    return;
  }
};

// Calculate the total score based on the ratings array
const totalScore = computed(() => {
  return ratings.value.reduce((sum, rating) => sum + (rating)*2, 0);
});

</script>
