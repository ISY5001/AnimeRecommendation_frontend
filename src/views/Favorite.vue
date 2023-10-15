<script setup>
import { onMounted } from "@vue/runtime-core";
import Movies from "../components/Movies.vue";
import IsLoading from "../components/IsLoading.vue";

import axios from "axios";
//import { useScoreStore } from "../store/score"; 
//const store = useScoreStore();

import { useAnimesStore } from "../store/animes";
const animeStore = useAnimesStore();

import { userInfoStore } from "../store/userInfo";
const user_info = userInfoStore();

import { useScoredAnimeStore } from '../store/scoredAnime';

const scoredAnimeStore = useScoredAnimeStore();



onMounted(async () => {
  try {
    const response = await axios.get(`${"http://127.0.0.1:8282"}/nonzero_rating/${user_info.account_id}`);
    console.log("score data:", response.data)
    if (response.data) {
      scoredAnimeStore.setScoredAnimes(response.data);
      console.log( "scoredAnimeStore:",scoredAnimeStore)
    }
    
  } catch (error) {
    console.error("Error fetching scored animes:", error);
  }
});

</script>


<template>
  <main>
    <h3 class="text-gray-500 text-xl tracking-widest">Your Scored Animes</h3>
    <!--Movies :movies="scoredAnimeStore.scoredAnimes" /-->
    <Movies :movies="scoredAnimeStore.scoredAnimes" :fetchRatings="fetchRatings" />
    <IsLoading v-if="animeStore.isLoading" />
  </main>
</template>
