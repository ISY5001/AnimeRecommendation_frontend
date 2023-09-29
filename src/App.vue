<template>
  <div class="container mx-auto px-6 py-7 lg:px-40 lg:py-14">
    <!-- Header is usesd as the header section of Vue application -->
    <Header />
    <!-- main content of Vue app is rendered, 
    it's a special Vue Router component that displays the component corresponding to the current route -->
    <router-view v-slot="{ Component, route }">
      <transition
        :enter-active-class="route.meta.enterClass"
        :leave-active-class="route.meta.leaveClass"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
</script>

<style>
</style>