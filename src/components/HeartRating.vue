<template>
  <div class="flex">
    <button
      v-for="heart in 5"
      :key="heart"
      :class="{ 'text-red-600': heart <= rating, 'text-gray-400': heart > rating }"
      @click="setRating(heart)"
    >
      <HeartIcon />
    </button>
  </div>



</template>

<script setup>
import { ref } from 'vue';
import HeartIcon from './icons/HeartIcon.vue';

const props = defineProps({
  modelValue: Number,
});

const emit = defineEmits();

const rating = ref(props.modelValue);

const setRating = (heart) => {
  rating.value = heart;
  emit('update:modelValue', heart);
};
</script>

