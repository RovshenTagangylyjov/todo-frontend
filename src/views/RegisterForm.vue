<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useHead } from "@vueuse/head";
import axios from "axios";

useHead({
  title: "Todo | Register",
  meta: [
    {
      name: "description",
      content: "Register to start using this cool app!",
    },
  ],
});

const router = useRouter();

interface registerFormType {
  username: string;
  password: string;
  password2: string;
}
const registerForm = reactive<registerFormType>({
  username: "",
  password: "",
  password2: "",
});

function submitForm() {
  axios.post("/users/", registerForm).then(() => {
    router.push({ name: "Login" });
  });
}
</script>

<template>
  <form
    @submit.prevent="submitForm"
    class="container border border-light border-1 rounded px-5 pt-3"
  >
    <div class="row text-center border-bottom border-1 border-light">
      <h4>Register</h4>
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
    <div class="row mt-3">
      <label for="" class="form-label col-4">Confirm password:</label
      ><input
        type="password"
        class="form-control col"
        placeholder="Confirm password"
        v-model="registerForm.password2"
      />
    </div>
    <div class="row mt-3 justify-content-end">
      <button type="submit" class="btn btn-outline-light col-4">Submit</button>
    </div>
    <footer class="w-100 text-center mb-1 mt-3">
      <small
        >Already Have An Accaunt?
        <router-link :to="{ name: 'Login' }">Login</router-link></small
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
