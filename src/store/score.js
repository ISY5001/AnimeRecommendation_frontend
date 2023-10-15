// // score.js
// import { defineStore } from "pinia";
// import axios from "axios";

// const API_URL = "https://www.omdbapi.com/";
// const API_KEY = "f9bfc5b4";




// export const useScoreStore = defineStore("score", {
//   state: () => {
//     return {
//       scoredMovies: JSON.parse(localStorage.getItem("scoredMovies")) || [],
//     };
//   },
//   actions: {
//     addScore(id, score) {
//       if (score <= 0) {
//         console.log("Score is 0 or negative. Movie will not be added.");
//         return;
//       }
//         axios
//           .get(`${API_URL}?apikey=${API_KEY}&i=${id}`)
//           .then(res => {
//             const { data } = res;
//             const movie = {
//               Anime_id: data.Anime_id,
//               Title: data.Title,
//               Score: score, // use the score parameter here
//             };
//             this.scoredMovies.push(movie);
//             localStorage.setItem("scoredMovies", JSON.stringify(this.scoredMovies));
//           })
//           .catch(err => console.log(err));
//       },
//     removeScore(id) {
//         console.log('Removing score for movie with ID:', id);
//         this.scoredMovies = this.scoredMovies.filter(movie => movie.Anime_id != id);
//         localStorage.setItem("scoredMovies", JSON.stringify(this.scoredMovies));
//     },

//     updateScore(id, newScore) {
//       if (newScore <= 0) {
//         this.removeScore(id);
//         return;
//       }
//       const movieIndex = this.scoredMovies.findIndex(movie => movie.Anime_id === id);
//       if (movieIndex !== -1) {
//         this.scoredMovies[movieIndex] = { ...this.scoredMovies[movieIndex], Score: newScore };
//         localStorage.setItem("scoredMovies", JSON.stringify(this.scoredMovies));
//       }
//     }
    
//   },
// });
