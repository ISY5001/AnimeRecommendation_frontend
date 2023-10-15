<script setup>
import { watch,ref,defineProps } from 'vue';
import { onMounted } from 'vue';
import CalendarIcon from "./icons/CalendarIcon.vue";
import HeartIcon from "./icons/HeartIcon.vue";
import { useFavoritStore } from "../store/favorit";

//import HeartIcon from "./icons/HeartIcon.vue";
import emptyHeart from './icons/emptyHeart.vue';
import fullHeart from './icons/fullHeart.vue';
import halfHeart from './icons/halfHeart.vue';
import axios from 'axios';

//import { useFavoritStore } from "../store/favorit";
import HeartRating from './HeartRating.vue';
//const store = useFavoritStore();
import { computed } from 'vue';
//import { useScoreStore } from "../store/score";
import { userInfoStore } from "../store/userInfo";
import { useScoredAnimeStore } from '../store/scoredAnime.js';


//const store = useScoreStore();
const user_info = userInfoStore();
const scoredAnimeStore = useScoredAnimeStore();

const store = useFavoritStore();

const props = defineProps({
  movie: Object,
  movies: Array,
  rateAnime: Function,
  fetchRatings: Function,
});

//Substry?
const title = props.movie.Title.substr(0, 15) + "...";

// Use a computed property to get the score for the current movie from the store.
const score = computed(() => {
  const foundMovie = scoredAnimeStore.scoredAnimes.find(movie => movie.Anime_id === props.movie.Anime_id);
  return foundMovie ? foundMovie.Score : 0;
});


const toggleScore = (id, newScore) => {
  const foundMovie = scoredAnimeStore.scoredAnimes.find((movie) => movie.Anime_id == id);

  if (foundMovie) {
    if (newScore === 0) {
      console.log('Newscore=0');
      // If the new score is 0, remove the score
      scoredAnimeStore.removeScoredAnime(id);
      scoredAnimeStore.removeZeroScoredAnimes();
    } else if (foundMovie.Score !== newScore) {
      // If the score is different, update the score
      scoredAnimeStore.updateScoredAnime(id, newScore);
    } // No need for other conditions as the HeartRating component manages the half and full toggle
  } else if (newScore > 0) {
    // If the movie is not scored and the new score is greater than 0, add the score
    scoredAnimeStore.updateScoredAnime(id, newScore);
  }

  // Now, call the rateAnime method passed from the parent component
  props.rateAnime(id, newScore);
};

const updateMovieScore = (newScore) => {
      useScoreStore().updateScore(movieId.value, newScore);
      movieScore.value = newScore;
    };

onMounted(async () => {
  console.log('Movie.vue component mounted.');
    // Assuming the Anime_id is a unique identifier for the movie
    const currentRating = await fetchRatings(props.movie.Anime_id);
    
    // Now use currentRating as you see fit.
});


const ratingsFetched = ref(false);
const unscoredFetched = ref(false);

const fetchRatings = async (account_id, anime_id) => {
    try {
      // Access the account_id
      //const account_id = ref(accountStore.getAccountId);
        //console.log(account_id);
        const account_id = user_info.account_id;
        console.log(account_id);
        const anime_id = props.movie.Anime_id;
        console.log(anime_id);

        // fetch rating scores
        const response = await axios.get(`${"http://127.0.0.1:8282"}/rating/fetch_ratings/${account_id}/${anime_id}`);
        if (response.status === 200) {
            console.log('response data:', response.data);
            const score = response.data[0].scores;
            user_info.setScore(score);
            console.log('saved score:', user_info.scores);

            user_info.setAnime(anime_id);
            console.log('saved anime_id:', user_info.anime_id);

            // Once fetching is done:
            ratingsFetched.value = true;

            if (!scoredAnimeStore.scoredAnimes.some(movie => movie.Anime_id === anime_id)) {
            scoredAnimeStore.updateScoredAnime(anime_id, score); // adding with default score
            }

            return score; // The ratings data
            
            
        }
        // Handle other response statuses if needed
    } catch (error) {
        console.error("Error fetching ratings:", error);
        unscoredFetched.value = true;
    }
};

const exposed = ref({ fetchRatings });



const rateAnimeFunction = async (anime_id, score) => {
    try {

        if (score === 0) {
      // If the new score is 0, remove the score
      scoredAnimeStore.removeScoredAnime(anime_id);
      scoredAnimeStore.removeZeroScoredAnimes();
        }
        
        const response = await axios.post(`${"http://127.0.0.1:8282"}/rating/upload_ratings`, {
            anime_id: anime_id,
            score: score
            // ... any other data needed
        });
        if (response.status === 200) {
            console.log(response.data.msg); // "Rating updated successfully!"
        }
        // Handle other response statuses if needed
    } catch (error) {
        console.error("Error updating rating:", error);
    }
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

      <button class="cursor-pointer" @click="toggleFav(movie.imdbID, $event)">
        <HeartIcon :class="{ 'text-red-600': isFav(movie.imdbID) }" />
      </button>
    </div>
    <div class="text-gray-200 flex mt-3 items-center font-medium text-sm">
      <CalendarIcon />
      <ChatBot />
      {{ movie.Year }}


    </div>
  </div>
  <!--HeartRating :score="score" @update:modelValue="toggleScore(movie.imdbID, $event)" /-->
  <!-- HeartRating component will only render if ratingsFetched is true -->
  <HeartRating 
    v-if="ratingsFetched || unscoredFetched" 
    :score="score" 
    :ratingsFetched="ratingsFetched" 
    :unscoredFetched="unscoredFetched" 
    :Anime_id="props.movie.Anime_id"
    :account_id="user_info.account_id"
    
  />

  
</template>
