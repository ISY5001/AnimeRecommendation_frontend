import axios from "axios";
import { defineStore } from "pinia";

const API_URL = "https://www.omdbapi.com/";
const BACK_END = "http://127.0.0.1:8282/";
const API_KEY = "f9bfc5b4";

export const useAnimesStore = defineStore("animes", {
  // state function defines the intial state of the Animes store
  state: () => {
    return {
      Animes: [],
      anime: {},
      isLoading: false,
      totalResults: 0,
      loadingMessage: "Please wait",
      page: 1,
    };
  },
  // actions object defines methods that can be used to interact with and modify
  // the store's state
  actions: {
    async getAllAnimes(keyword) {
      this.isLoading = true;
      this.loadingMessage = "Please wait";
      if (!keyword) {
        keyword = "One Piece"; // no need
      }

      try {
        // const { data } = await axios.get(`${API_URL}?apikey=${API_KEY}&s=${keyword}`);
        const { data } = await axios.get(`${BACK_END}fetchAnimes`);
        // alert(JSON.stringify(data, null, 2)); // success
        if (data.Response == "False") {
          throw new Error(data.Error);
        }
        [this.totalResults, this.Animes, this.isLoading, this.page] = [data.totalResults, data.Search, false, 1];
      } catch (err) {
        [this.isLoading, this.loadingMessage] = [true, err.message];
      }
    },
    async nextPage(page) {
      // alert("calling nextPage..");
      const keyword = localStorage.getItem("keyword") ? localStorage.getItem("keyword") : "One Piece";
      this.isLoading = true;
      this.loadingMessage = "Please wait";
      try {
        // const { data } = await axios.get(`${API_URL}?apikey=${API_KEY}&s=${keyword}&page=${page}`);
        const { data } = await axios.get(`${BACK_END}fetchAnimes?page=${page}`);
        if (data.Response == "False") {
          throw new Error(data.Error);
        }
        this.isLoading = false;
        data.Search.forEach(anime => this.Animes.push(anime));
      } catch (error) {}
    },
    // to do
    // async getanimeByID(id) {
    //   this.isLoading = true;
    //   try {
    //     const { data, status } = await axios.get(`${API_URL}?apikey=${API_KEY}&i=${id}`);
    //     if (status != 200) {
    //       throw new Error(data.Error);
    //     }
    //     [this.anime, this.isLoading] = [data, false];
    //   } catch (err) {
    //     console.log(err.message);
    //   }
    // },
  },
});
