<script setup>
alert('Animes.vue component loaded.');
import Anime from "./Anime.vue";
const props = defineProps({
  animes: Array,
});
alert("props");
alert(JSON.stringify(props, null, 2)); 
// {
//   "animes": []
// }

</script>

<template>
  <div
    class="mt-7 w-full flex flex-wrap justify-between gap-5 md:gap-8 lg:gap-5"
  >
    <div
      class="w-2/5 my-2 md:w-1/4 lg:w-2/12"
      v-for="anime in animes"
      :key="anime.Anime_id"
    >
      <Anime :anime="anime" />
    </div>
  </div>
</template>