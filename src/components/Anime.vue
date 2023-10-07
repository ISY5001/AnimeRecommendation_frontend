<script setup>
alert('Anime.vue component loaded.');
import { ref } from "@vue/reactivity";
import CalendarIcon from "./icons/CalendarIcon.vue";
import HeartIcon from "./icons/HeartIcon.vue";
// import { useFavoritStore } from "../store/favorit";
// const store = useFavoritStore();

const props = defineProps({
  anime: "",
});

const title = props.anime.Title.substr(0, 15) + "...";

// const toggleFav = (id, e) => {
//   const cek = store.favanimes.filter((anime) => anime.Anime_id == id);
//   if (cek.length > 0) {
//     store.removeFromFav(id);
//     e.target.classList.remove("text-red-600");
//   } else {
//     store.addToFavorit(id);
//     e.target.classList.add("text-red-600");
//   }
// };

// const isFav = (Anime_id) => {
//   if (store.favanimes) {
//     const result = store.favanimes.filter((anime) => anime.Anime_id == Anime_id);

//     return result.length ? true : false;
//   }
// };

</script>

<template>
  <div class="w-full h-48 rounded-md overflow-hidden bg-gray-50 lg:h-64">
    <router-link
      :to="{ name: 'Details', params: { id: anime.Anime_id } }"
      class="w-full h-full"
    >
      <div v-if="anime.poster != 'N/A'" class="w-full h-full">
        <img
          :src="anime.poster"
          class="w-full h-full aspect-auto md:object-cover lg:aspect-auto"
          :alt="anime.Title"
        />
      </div>
      <div v-else>
        <img
          src="../assets/no-image.png"
          class="w-full h-full object-cover"
          :alt="anime.Title"
        />
      </div>
    </router-link>
  </div>

  <div class="mt-4 w-full">
    <div class="text-red-200 flex items-center justify-between">
      <router-link :to="{ name: 'Details', params: { id: anime.Anime_id } }">
        <h3 class="font-medium text-md tracking-wide" :title="anime.Title">
          {{ title }}
        </h3>
      </router-link>

      <!-- <button class="cursor-pointer" @click="toggleFav(anime.Anime_id, $event)">
        <HeartIcon :class="{ 'text-red-600': isFav(anime.Anime_id) }" />
      </button> -->
    </div>
    <div class="text-gray-200 flex mt-3 items-center font-medium text-sm">
      <CalendarIcon />

      {{ anime.Aired }}
    </div>
  </div>
</template>
