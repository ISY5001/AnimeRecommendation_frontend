import axios from "axios";
import { defineStore } from "pinia";

const MY_API_URL = "http://127.0.0.1:8282/";
const OMDb_API_URL = "https://www.omdbapi.com/";
const OMDb_API_KEY = "f9bfc5b4";


export const useAnimesStore = defineStore("movies", {
  // state function defines the intial state of the movies store
  state: () => {
    return {
      movies: [],
      movie: {},
      isLoading: false,
      totalResults: 0,
      loadingMessage: "Please wait",
      page: 1,
    };
  },
  // actions object defines methods that can be used to interact with and modify
  // the store's state
  actions: {
    async getAllMovies() {
        this.isLoading = true;
        this.loadingMessage = "Please wait";
        try {
            const { data } = await axios.get(`http://127.0.0.1:8282/anime?page=${this.page}`);
            if (data.msg && data.msg === "No anime found!") {
                throw new Error("No anime found!");
            }
            this.movies = data.animes; // Adjust based on the response structure
            this.isLoading = false;
        } catch (err) {
            [this.isLoading, this.loadingMessage] = [true, err.message];
        }
    },
  },
});
