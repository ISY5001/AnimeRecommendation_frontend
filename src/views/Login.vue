<template>
    <div>
      <h1>Register</h1>
      <form @submit.prevent="registerUser">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from "@vue/runtime-core";
  import { useRouter } from "vue-router";
  
  const username = ref("");
  const password = ref("");
  const router = useRouter();
  
  const registerUser = () => {
    // Add your registration logic here, e.g., make an API request to register the user.
  
    // After a successful registration, you can redirect to another page.
    router.push("/login");
  };
  </script>
  