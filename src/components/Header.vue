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
          <router-link to="/unv" class="flex text-green-600 items-center cursor-pointer">
            <AIcon />
            <span class="text-lg tracking-wide md:text-xl">AniVerse</span>
          </router-link>
        </li>
        <li>
          <router-link to="/fav" class="flex text-red-600 items-center cursor-pointer">
            <HeartIcon />
            <span class="text-lg tracking-wide md:text-xl">Scored Animes</span>
          </router-link>
        </li>
        <li>
          <router-link to="/recommend" class="flex text-yellow-600 items-center cursor-pointer">
            <HeartIcon />
            <span class="text-lg tracking-wide md:text-xl">Recommend Animes</span>
          </router-link>
        </li>
        <li class="relative">
          <!-- User icon -->
          <div class="flex text-blue-600 items-center cursor-pointer" @mouseenter="showUserDropdown = true" @mouseleave="hideUserDropdown">
            <StarIcon />
            <span class="text-lg tracking-wide md:text-xl">{{userNames}}</span>
          </div>
          <!-- Dropdown menu for User -->
          <transition name="fade">
            <div v-if="showUserDropdown" class="absolute top-10 right-0 bg-white p-2 space-y-2 shadow-md rounded-lg" @mouseleave="startHideTimer">
              <a href="#" class="block" @click="showLogoutConfirmation = true">Logout</a>
              <router-link to="/login" class="block">Login</router-link>
              <router-link to="/register" class="block">Register</router-link>
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

    <!-- Confirmation dialog for logout -->
    <div v-if="showLogoutConfirmation" class="absolute top-20 right-5 bg-white p-4 shadow-md rounded-lg" @mouseleave="startHideTimer">
      <p>Are you sure you want to logout?</p>
      <div class="flex justify-end space-x-2">
        <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Yes</button>
        <button @click="cancelLogout" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">No</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import Search from "./Search.vue";
import ChatBotIcon from "./icons/ChatBotIcon.vue";
import HeartIcon from "./icons/HeartIcon.vue";
import StarIcon from "./icons/StarIcon.vue";
import AIcon from "./icons/AIcon.vue";
import { ref, reactive, computed } from 'vue';

import { useRouter } from "vue-router";
const router = useRouter();

const showUserDropdown = ref(false);
const hideTimer = ref(null);

const hideUserDropdown = () => {
  hideTimer.value = setTimeout(() => {
    showUserDropdown.value = false;
  }, 2000); // Adjust the delay as needed (in milliseconds)
};

const startHideTimer = () => {
  clearTimeout(hideTimer.value);
};

const cancelHideTimer = () => {
  clearTimeout(hideTimer.value);
};

const logout = () => {
  // 在此处理注销逻辑
  // 将sessionStorage中的登录状态设为false
  sessionStorage.setItem("isLoggedIn", "false");
  showLogoutConfirmation.value = false; // 关闭对话框
  router.push('/login');
};

const cancelLogout = () => {
  showLogoutConfirmation.value = false; // 关闭对话框
};

const showLogoutConfirmation = ref(false);

const userNames = computed(() => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const user_names = sessionStorage.getItem("username");
  if (isLoggedIn === 'true') { // 使用字符串比较
    return user_names;
  }
  return 'User';
});



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
