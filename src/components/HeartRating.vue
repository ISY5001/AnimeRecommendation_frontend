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
import { ref, reactive, computed, defineProps } from 'vue';
import emptyHeart from './icons/emptyHeart.vue';
import fullHeart from './icons/fullHeart.vue';
import halfHeart from './icons/halfHeart.vue';

import { userInfoStore } from "../store/userInfo";

const user_info = userInfoStore();

const props = defineProps(['score', 'ratingsFetched', 'unscoredFetched', 'Anime_id']);

function scoreToHeartArray(anime_id = 0, records = []) {
  // First, find if there's a record for this anime_id
  console.log('records_animeid:', anime_id);
  console.log('records:', records);
  const record = records.find(r => r.anime_id === anime_id);
  console.log('record:', record);

  let score = record ? record.scores : null;
  console.log('record_score:', score);

  if (score == null) {
    console.log("Not rated");
    score = 0;
    return [0, 0, 0, 0, 0];  // return an array of 0's directly
  } else {
    console.log("anime_id:", anime_id);
    console.log("score:", score);
    const heartArray = [];
    const maxHearts = 5;
    let remainingScore = score;

    for (let i = 0; i < maxHearts; i++) {
      if (remainingScore >= 2) {
        heartArray.push(1);
        remainingScore -= 2;
      } else if (remainingScore === 1) {
        heartArray.push(0.5);
        remainingScore = 0;
      } else {
        heartArray.push(0);
      }
    }

    return heartArray;
  }
}



//const ratings = ref([0, 0, 0, 0, 0]); // Assuming you want 5 hearts initially all empty
const ratings = ref(scoreToHeartArray(props.Anime_id, user_info.records));

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
