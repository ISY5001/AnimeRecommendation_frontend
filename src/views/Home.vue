<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import Animes from "../components/Animes.vue";
import Search from "../components/Search.vue";
import IsLoading from "../components/IsLoading.vue";
import { useAnimesStore } from "../store/animes";
// alert("Home.vue loaded");
const store = useAnimesStore();

// define some reatcive variables using ref function, which used to 
// store data that can trigger updates in teh component when their value change.
const keyword = ref(
  localStorage.getItem("keyword")
    ? localStorage.getItem("keyword")
    : "One Piece"
);
const scrollComponent = ref(null);
const favAnimes = ref(
  localStorage.getItem("favAnimes")
    ? JSON.parse(localStorage.getItem("favAnimes"))
    : []
);
// the total number of pages for anime results based on the total number
// of results
let totalPage = 10;

setTimeout(() => {
  // totalPage = Math.ceil(store.totalResults * 10);

}, 1000);
// alert(totalPage);
// register a listener to the DOM, which can fetch more animes data
// when user scroll to the bottem of page.
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  store.getAllAnimes(keyword.value);
});

const handleScroll = (e) => {
  const element = scrollComponent.value;
  if (element) {
    if (element.getBoundingClientRect().bottom < window.innerHeight) {
      store.page++; // it works
      if (store.page <= totalPage) {
        store.nextPage(store.page);
      }
    }
  }
};
</script>

<template>
  <main>
    <Search />

    <article ref="scrollComponent">
      <Animes :animes="store.Animes" />
    </article>
    <IsLoading v-if="store.isLoading" />
  </main>
</template>