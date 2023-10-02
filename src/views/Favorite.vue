<script setup>
import { onMounted } from "@vue/runtime-core";
import Movies from "../components/Movies.vue";
import IsLoading from "../components/IsLoading.vue";
import { useScoreStore } from "../store/score"; // Import useScoreStore
import { useMoviesStore } from "../store/movies";
const store = useScoreStore();
const moviesStore = useMoviesStore();


onMounted(() => {
  if (store.scoredMovies.length < 1) { // Check the length of scoredMovies
    moviesStore.isLoading = true;
    moviesStore.loadingMessage = "Empty";
  }
});
</script>


<template>
  <main>
    <h3 class="text-gray-500 text-xl tracking-widest">Your Scored Movies</h3> <!-- Update the heading -->
    <Movies :movies="store.scoredMovies" /> <!-- Bind movies to store.scoredMovies -->
    <IsLoading v-if="moviesStore.isLoading" />
  </main>
</template>
