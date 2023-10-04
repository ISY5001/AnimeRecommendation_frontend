// score.js
import { defineStore } from "pinia";
import axios from "axios";

const API_URL = "https://www.omdbapi.com/";
const API_KEY = "f9bfc5b4";




export const useScoreStore = defineStore("score", {
  state: () => {
    return {
      scoredMovies: JSON.parse(localStorage.getItem("scoredMovies")) ?? [],
    };
  },
  actions: {
    addScore(id, score) {
        axios
          .get(`${API_URL}?apikey=${API_KEY}&i=${id}`)
          .then(res => {
            const { data } = res;
            const movie = {
              imdbID: data.imdbID,
              Title: data.Title,
              Poster: data.Poster,
              Year: data.Year,
              Score: score, // use the score parameter here
            };
            this.scoredMovies.push(movie);
            localStorage.setItem("scoredMovies", JSON.stringify(this.scoredMovies));
          })
          .catch(err => console.log(err));
      },
    removeScore(id) {
        console.log('Removing score for movie with ID:', id);
        this.scoredMovies = this.scoredMovies.filter(movie => movie.imdbID != id);
        localStorage.setItem("scoredMovies", JSON.stringify(this.scoredMovies));
    },

    updateScore(id, newScore) {
      const movieIndex = this.scoredMovies.findIndex(movie => movie.imdbID === id);
      if (movieIndex !== -1) {
        this.scoredMovies[movieIndex] = { ...this.scoredMovies[movieIndex], Score: newScore };
        localStorage.setItem("scoredMovies", JSON.stringify(this.scoredMovies));
      }
    }
    
  },
});
