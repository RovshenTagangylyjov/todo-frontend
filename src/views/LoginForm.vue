<script setup lang="ts">
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useHead } from "@vueuse/head";
import axios from "axios";

import store from "@/store";
import { Mutations } from "@/types";

useHead({
  title: "Todo | Login",
  meta: [
    {
      name: "description",
      content: "Login to manage your Todos!",
    },
  ],
});

const router = useRouter();
const route = useRoute();

interface LoginFormType {
  username: string;
  password: string;
}
const registerForm = reactive<LoginFormType>({
  username: "",
  password: "",
});

function submitForm() {
  axios.post("/token/login/", registerForm).then((response) => {
    const token = response.data.auth_token;
    store.commit(Mutations.SETTOKEN, token);

    if (route.query.redirect)
      router.push({ path: route.query.redirect as string });
    else router.push({ name: "TodoList" });
  });
}
</script>

<template>
  <form
    @submit.prevent="submitForm"
    class="container border border-light border-1 rounded px-5 pt-3"
  >
    <div class="row text-center border-bottom border-1 border-light">
      <h4>Login</h4>
    </div>
    <div class="row mt-3">
      <label for="" class="form-label col-4">Username:</label
      ><input
        type="text"
        class="form-control col"
        placeholder="user"
        v-model="registerForm.username"
      />
    </div>
    <div class="row mt-3">
      <label for="" class="form-label col-4">Password:</label
      ><input
        type="password"
        class="form-control col"
        placeholder="Password"
        v-model="registerForm.password"
      />
    </div>
    <div class="row mt-3 justify-content-end">
      <button type="submit" class="btn btn-outline-light col-4">Submit</button>
    </div>
    <footer class="w-100 text-center mb-1 mt-3">
      <small
        >Don't Have An Accaunt Yet?
        <router-link :to="{ name: 'Register' }">Register</router-link></small
      >
    </footer>
  </form>
</template>

<style scoped lang="scss">
form {
  margin-top: 20vh;
  width: 40em;

  label {
    height: 100%;
    margin-bottom: 0 !important;
  }
}
</style>
