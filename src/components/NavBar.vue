<script setup lang="ts">
import { useRouter } from "vue-router";
import axios from "axios";

import { Mutations } from "@/types";
import state from "@/store";

const router = useRouter();

async function logout() {
  await axios.post("/token/logout/");
  state.commit(Mutations.LOGOUT);
  router.push({ name: "Login" });
}
</script>

<template>
  <nav class="navbar px-4 shadow bg-dark text-light">
    <a class="navbar-brand text-light">Todo</a>
    <a class="btn btn-outline-light" @click="logout">Logout</a>
  </nav>
</template>
