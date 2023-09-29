import { createApp } from "vue";
import App from "./App.vue"; // root component for our applciation
import router from "./router";
import "./assets/css/index.css";
import { createPinia } from "pinia"; // state management of Vue.js applciation

const app = createApp(App); // creates a new Vue application instance
app.use(router);
app.use(createPinia());
app.mount("#app"); // link our Vue application to index.html, <div id="app">