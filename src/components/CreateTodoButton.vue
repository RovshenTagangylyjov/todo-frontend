<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import store from "@/store";
import { Actions, obj } from "@/types";
import { mergeQuery } from "@/helpers/query_helpers";

const route = useRoute();
const router = useRouter();
const todo = ref<string>();

function createTodo(todo: string | undefined) {
  store.dispatch(Actions.CREATE, todo);
  resetForm();

  router.push({
    name: "TodoList",
    query: mergeQuery({ page: 1 }, route.query as obj),
  });
}

onMounted(() => {
  const modal = document.getElementById("createTodo") as HTMLElement;
  modal.addEventListener("shown.bs.modal", focusToInput);
});

function resetForm() {
  todo.value = "";
  const closeButton = document.getElementById("close") as HTMLButtonElement;
  closeButton.click();
}

function focusToInput() {
  const input = document.getElementById("todo") as HTMLInputElement;
  input.focus();
}
</script>

<template>
  <button
    class="btn btn-outline-light"
    data-bs-toggle="modal"
    data-bs-target="#createTodo"
    v-bind="$attrs"
  >
    Create Todo
  </button>

  <div
    class="modal fade"
    id="createTodo"
    data-bs-backdrop="static"
    tabindex="-1"
    aria-labelledby="createTodoLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="createTodoLabel">Create Todo</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createTodo(todo)">
            <div class="mb-3">
              <label for="todo" class="col-form-label">Todo:</label>
              <input
                type="text"
                class="form-control bg-dark text-light"
                id="todo"
                placeholder="Go to School"
                autocomplete="off"
                v-model="todo"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-success"
            @click="createTodo(todo)"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
