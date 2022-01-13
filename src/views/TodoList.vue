<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, watch } from "vue";
import { useHead } from "@vueuse/head";

import {
  NavBar,
  Todo,
  CreateTodoButton,
  DeleteTodoModal,
  PaginationBlocks,
} from "@/components";
import store from "@/store";
import { Actions, obj } from "@/types";
import { mergeQuery } from "@/helpers/query_helpers";

useHead({
  title: "Todo | List",
  meta: [
    {
      name: "description",
      content: "Todo List of The User",
    },
  ],
});

const route = useRoute();
const todos = computed(() => store.state.todo);

watch(
  () => route.query,
  (query) => store.dispatch(Actions.FETCH, query),
  { immediate: true }
);
</script>

<template>
  <NavBar />
  <section class="container">
    <table class="mt-5 table table-dark table-hover text-center align-middle">
      <thead>
        <tr>
          <th scope="col">
            <router-link
              :to="{
                name: 'TodoList',
                query: mergeQuery({ sort: 'status' }, route.query as obj),
              }"
              >Status</router-link
            >
          </th>
          <th scope="col">
            <router-link
              :to="{
                name: 'TodoList',
                query: mergeQuery({ sort: 'task' }, route.query as obj),
              }"
              >Task</router-link
            >
          </th>
          <th scope="col">
            <router-link
              :to="{
                name: 'TodoList',
                query: mergeQuery({ sort: 'date_created' }, route.query as obj),
              }"
              >Date Created</router-link
            >
          </th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <Todo
          v-for="todo in todos"
          :key="todo.id"
          :id="todo.id"
          :task="todo.task"
          :status="todo.status"
          :date_created="todo.date_created"
        />
      </tbody>
    </table>

    <DeleteTodoModal />
    <div class="d-flex justify-content-between align-items-center mt-3">
      <CreateTodoButton />
      <PaginationBlocks />
    </div>
  </section>
</template>

<style scoped lang="scss">
th:hover {
  cursor: pointer;
  filter: brightness(115%);
}

a {
  color: var(--light);
  text-decoration: none;

  &:hover {
    color: var(--light);
  }
}
</style>
