// scoredAnimeStore.js
import { reactive } from 'vue';

const state = reactive({
  scoredAnimes: [],
});

export function useScoredAnimeStore() {
  return {
    get scoredAnimes() {
      return state.scoredAnimes;
    },
    setScoredAnimes(animes) {
      state.scoredAnimes = animes;
    },
  };
}
