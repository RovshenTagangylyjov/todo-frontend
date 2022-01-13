<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import store from "@/store";
import { mergeQuery } from "@/helpers/query_helpers";
import { obj } from "@/types";

const route = useRoute();
const pages = computed(() => {
  return {
    first: parseInt(route.query.page as string) > 2 ? 1 : null,
    previous: store.state.paginationLinks.previous,
    next: store.state.paginationLinks.next,
    last:
      store.state.paginationLinks.next &&
      store.state.paginationLinks.next < store.state.paginationLinks.last
        ? store.state.paginationLinks.last
        : null,
    current: route.query.page ? parseInt(route.query.page as string) : 1,
  };
});
</script>

<template>
  <nav aria-label="pagination blocks" v-if="pages.previous || pages.next">
    <ul class="pagination">
      <li class="page-item" v-if="pages.first">
        <router-link
          class="page-link page-link-dark"
          :to="{ name: 'TodoList', query: mergeQuery({ page: 1 }, route.query as obj )}"
          >1</router-link
        >
      </li>
      <li class="page-item" v-if="pages.previous">
        <router-link
          class="page-link"
          :to="{
            name: 'TodoList',
            query: mergeQuery({ page: pages.previous }, route.query as obj),
          }"
          >{{ pages.previous }}</router-link
        >
      </li>
      <li class="page-item active">
        <router-link
          class="page-link"
          :to="{
            name: 'TodoList',
            query: mergeQuery({ page: pages.current }, route.query as obj),
          }"
          >{{ pages.current }}</router-link
        >
      </li>
      <li class="page-item" aria-current="page" v-if="pages.next">
        <router-link
          class="page-link"
          :to="{
            name: 'TodoList',
            query: mergeQuery({ page: pages.next }, route.query as obj),
          }"
          >{{ pages.next }}</router-link
        >
      </li>
      <li class="page-item" v-if="pages.last">
        <router-link
          class="page-link"
          :to="{
            name: 'TodoList',
            query: mergeQuery({ page: pages.last }, route.query as obj),
          }"
          >{{ pages.last }}</router-link
        >
      </li>
    </ul>
  </nav>
</template>
