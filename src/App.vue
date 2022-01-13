<script setup lang="ts">
import store from "./store";
import { Mutations } from "./types";

store.commit(Mutations.INITIALIZEAPP);
</script>

<template>
  <router-view />
</template>

<style lang="scss">
* {
  background-color: var(--bs-dark);
  color: var(--bs-light);
}
</style>
