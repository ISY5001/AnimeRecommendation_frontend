<template>
  <header>
    <nav class="flex justify-between items-center">
      <!-- Logo/Home link -->
      <router-link to="/">
        <h1 class="text-xl font-semibold tracking-wider text-gray-200 md:text-2xl">MyAnimes</h1>
      </router-link>

      <!-- Navigation links -->
      <ul class="flex space-x-4">
        <li>
          <router-link to="/fav" class="flex text-red-600 items-center cursor-pointer">
            <HeartIcon />
            <span class="text-lg tracking-wide md:text-xl">Scored Animes</span>
          </router-link>
        </li>
        <li class="relative">
          <!-- User icon -->
          <div class="flex text-blue-600 items-center cursor-pointer" @mouseenter="showUserDropdown = true" @mouseleave="hideUserDropdown">
            <StarIcon />
            <span class="text-lg tracking-wide md:text-xl">User</span>
          </div>
          <!-- Dropdown menu for User -->
          <transition name="fade">
            <div v-if="showUserDropdown" class="absolute top-10 right-0 bg-white p-2 space-y-2 shadow-md rounded-lg" @mouseenter="cancelHideTimer" @mouseleave="startHideTimer">
              <router-link to="/login" class="block">Login</router-link>
              <router-link to="/register" class="block">Register</router-link>
              <router-link to="/logout" class="block">Logout</router-link>
            </div>
          </transition>
        </li>
        
        <!-- Add more navigation links as needed -->
      </ul>
    </nav>

  <div id="app">
    <FloatingChatbot />
    <!-- 其他内容 -->
  </div>

    <p class="mt-6 mb-7 text-gray-200 text-xs font-light tracking-wide md:text-lg md:tracking-wider lg:text-sm">
      You can search any movies on this website
    </p>
  </header>
</template>

<script setup>
import Search from "./Search.vue";
import ChatBotIcon from "./icons/ChatBotIcon.vue";
import HeartIcon from "./icons/HeartIcon.vue";
import StarIcon from "./icons/StarIcon.vue";
import { ref, reactive } from 'vue';

const showUserDropdown = ref(false);
const hideTimer = ref(null);

const hideUserDropdown = () => {
  hideTimer.value = setTimeout(() => {
    showUserDropdown.value = false;
  }, 500); // Adjust the delay as needed (in milliseconds)
};

const startHideTimer = () => {
  clearTimeout(hideTimer.value);
};

const cancelHideTimer = () => {
  clearTimeout(hideTimer.value);
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

<style scoped>
/* Style for the dropdown menu */
ul li .absolute {
  display: none;
  flex-direction: column; /* Display the items vertically */
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
}

/* Style for the individual menu items */
ul li .absolute a {
  display: block;
  color: #333;
  padding: 8px 0;
  text-decoration: none;
}

/* Show the dropdown menu on hover */
ul li:hover .absolute {
  display: flex;
}
</style>
