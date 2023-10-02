<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import Movies from "../components/Movies.vue";
import Search from "../components/Search.vue";
import IsLoading from "../components/IsLoading.vue";
import { useMoviesStore } from "../store/movies";
import { userState } from '../store/userState.js'; // Adjust the path as needed
import axios from "axios";
const username = userState.username;
if (username == '') {
  alert("username not defined!")
} else {
  alert("username is " + username);
}

const store = useMoviesStore();

// define some reatcive variables using ref function, which used to 
// store data that can trigger updates in teh component when their value change.
const keyword = ref(
  localStorage.getItem("keyword")
    ? localStorage.getItem("keyword")
    : "One Piece"
);
const scrollComponent = ref(null);
const favMovies = ref(
  localStorage.getItem("favMovies")
    ? JSON.parse(localStorage.getItem("favMovies"))
    : []
);
// the total number of pages for movie results based on the total number
// of results
let totalPage = 0;
setTimeout(() => {
  totalPage = Math.ceil(store.totalResults / 10);
}, 1000);

// register a listener to the DOM, which can fetch more movies data
// when user scroll to the bottem of page.
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  store.getAllMovies(keyword.value);
});

const handleScroll = (e) => {
  const element = scrollComponent.value;
  if (element) {
    if (element.getBoundingClientRect().bottom < window.innerHeight) {
      store.page++;
      if (store.page <= totalPage) {
        store.nextPage(store.page);
      }
    }
  }
};

// Function to send a POST request to the server
const sendRecommendRequest = async () => {
  try {
    // Define the URL for the recommendation endpoint
    const url = 'http://localhost:8282/recommend';

    // Define the data to send in the request
    const requestData = {
      username: username,
      // Add any other data you need to send
    };

    // Send the POST request
    const response = await axios.post(url, requestData);

    // Handle the response as needed
    console.log('Recommendation request sent:', response.data);
  } catch (error) {
    // Handle errors
    console.error('Error sending recommendation request:', error);
  }
};

// Call sendRecommendRequest when needed, e.g., on component mount
onMounted(() => {
  sendRecommendRequest();
});

</script>

<template>
  <main>
    <Search />

    <article ref="scrollComponent">
      <Movies :movies="store.movies" />
    </article>
    <IsLoading v-if="store.isLoading" />
  </main>
</template>