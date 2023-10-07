<script setup>
import Movie from "./Movie.vue";
const props = defineProps({
  movies: Array,
});
// props is a json:
// {
//   "movies":[
//     {
//       "Title": "One Piece",
//       "Year": "1999-",
//       "imdbID": "tt0388629",
//       "Type": "series",
//       "Poster":"https://m.media-amazon.com/images/M/MV5BODcwNWE3OTMtMDc3MS00NDFjLWE1OTAtNDU3NjgxODMxY2UyXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
//     }, 
//     {
//       "Title": "One Piece: Strong World",
//       "Year": "2009",
//       "imdbID": "tt1485763",
//       "Type": "movie",
//       "Poster": "https://m.media-amazon.com/images/M/MV5BMmIyNGQ3NmEtNGZkNi00MDFhLThhOTMtYjEyN2U1OTc1MjBlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
//     },
//     {
//       // third movie description ...
//     }, 
//     {
//       // more movies description...
//     }
//   ]
// }
// alert(JSON.stringify(props, null, 2));
</script>

<template>
  <div
    class="mt-7 w-full flex flex-wrap justify-between gap-5 md:gap-8 lg:gap-5"
  >
    <div
      class="w-2/5 my-2 md:w-1/4 lg:w-2/12"
      v-for="movie in movies"
      :key="movie.imdbID"
    >
      <Movie :movie="movie" />
    </div>
  </div>
</template>