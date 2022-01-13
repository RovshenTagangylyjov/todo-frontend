import { createApp } from "vue";
import { createHead } from "@vueuse/head";
import axios from "axios";

import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

axios.defaults.baseURL = "http://localhost:8000/";

createApp(App).use(store).use(router, axios).use(createHead()).mount("#app");

import "bootstrap/dist/js/bootstrap.bundle.min.js";
