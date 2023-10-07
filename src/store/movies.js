import axios from "axios";
import { defineStore } from "pinia";

const API_URL = "https://www.omdbapi.com/";
const API_KEY = "f9bfc5b4";

export const useMoviesStore = defineStore("movies", {
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
    async getAllMovies(keyword) {
      this.isLoading = true;
      this.loadingMessage = "Please wait";
      if (!keyword) {
        keyword = "One Piece";
      }

      try {
        const { data } = await axios.get(`${API_URL}?apikey=${API_KEY}&s=${keyword}`);
        // the data looks like

        // {"Search": [
        //     {
        //       "Title":"Pie for Two",
        //       "Year":"1933",
        //       "imdbID":"tt0175035",
        //       "Type":"movie",
        //       "Poster":"N/A"
        //     },{
        //       "Title":"My Dad Only Likes Two Kinds of Pie",
        //       "Year":"2013",
        //       "imdbID":"tt3034864",
        //       "Type":"movie",
        //       "Poster":"N/A"
        //     }
        //   ],
        //   "totalResults":"2",
        //   "Response":"True"
        // }
        if (data.Response == "False") {
          throw new Error(data.Error);
        }
        [this.totalResults, this.movies, this.isLoading, this.page] = [data.totalResults, data.Search, false, 1];
      } catch (err) {
        [this.isLoading, this.loadingMessage] = [true, err.message];
      }
    },
    async nextPage(page) {
      const keyword = localStorage.getItem("keyword") ? localStorage.getItem("keyword") : "One Piece";
      this.isLoading = true;
      this.loadingMessage = "Please wait";
      try {
        const { data } = await axios.get(`${API_URL}?apikey=${API_KEY}&s=${keyword}&page=${page}`);

        if (data.Response == "False") {
          throw new Error(data.Error);
        }
        this.isLoading = false;
        data.Search.forEach(movie => this.movies.push(movie));
      } catch (error) {}
    },
    async getMovieByID(id) {
      this.isLoading = true;
      try {
        const { data, status } = await axios.get(`${API_URL}?apikey=${API_KEY}&i=${id}`);
        if (status != 200) {
          throw new Error(data.Error);
        }
        [this.movie, this.isLoading] = [data, false];
      } catch (err) {
        console.log(err.message);
      }
    },
  },
});
