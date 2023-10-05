<script setup>
import { ref } from "@vue/reactivity";
import { watch } from 'vue';
import CalendarIcon from "./icons/CalendarIcon.vue";
//import HeartIcon from "./icons/HeartIcon.vue";
import emptyHeart from './icons/emptyHeart.vue';
import fullHeart from './icons/fullHeart.vue';
import halfHeart from './icons/halfHeart.vue';

//import { useFavoritStore } from "../store/favorit";
import HeartRating from './HeartRating.vue';
//const store = useFavoritStore();
import { computed } from 'vue';
import { useScoreStore } from "../store/score";


const store = useScoreStore();

const props = defineProps({
  movie: Object,
});

const title = props.movie.Title.substr(0, 15) + "...";


// Use a computed property to get the score for the current movie from the store.
const score = computed(() => {
  const foundMovie = store.scoredMovies.find(movie => movie.Anime_id === props.movie.Anime_id);
  return foundMovie ? foundMovie.Score : 0;
});


const toggleScore = (id, newScore) => {
  const foundMovie = store.scoredMovies.find((movie) => movie.Anime_id == id);

  if (foundMovie) {
    if (newScore === 0) {
      // If the new score is 0, remove the score
      store.removeScore(id);
    } else if (foundMovie.Score !== newScore) {
      // If the score is different, update the score
      store.updateScore(id, newScore);
    } // No need for other conditions as the HeartRating component manages the half and full toggle
  } else if (newScore > 0) {
    // If the movie is not scored and the new score is greater than 0, add the score
    store.addScore(id, newScore);
  }
};



const updateMovieScore = (newScore) => {
      useScoreStore().updateScore(movieId.value, newScore);
      movieScore.value = newScore;
    };


</script>

<template>
  <div class="w-full h-48 rounded-md overflow-hidden bg-gray-50 lg:h-64">
    <router-link
      :to="{ name: 'Details', params: { id: movie.Anime_id } }"
      class="w-full h-full"
    >
      <div v-if="movie.Poster != 'N/A'" class="w-full h-full">
        <img
          :src="movie.Poster"
          class="w-full h-full aspect-auto md:object-cover lg:aspect-auto"
          :alt="movie.Title"
        />
      </div>
      <div v-else>
        <img
          src="../assets/no-image.png"
          class="w-full h-full object-cover"
          :alt="movie.Title"
        />
      </div>
    </router-link>
  </div>

  <div class="mt-4 w-full">
    <div class="text-red-200 flex items-center justify-between">
      <router-link :to="{ name: 'Details', params: { id: movie.Anime_id } }">
        <h3 class="font-medium text-md tracking-wide" :title="movie.Title">
          {{ title }}
        </h3>
      </router-link>

      
      
    </div>
    <div class="text-gray-200 flex mt-3 items-center font-medium text-sm">
      <CalendarIcon />

      {{ movie.Year }}


    </div>
  </div>
  <!--HeartRating :score="score" @update:modelValue="toggleScore(movie.imdbID, $event)" /-->
  <HeartRating :modelValue="score" @update:modelValue="toggleScore(movie.Anime_id, $event)" />
  
  
</template>
