<script setup lang="ts">
import { onMounted } from "vue";

import { CheckBox } from "@/components";
import { Actions } from "@/types";
import store from "@/store";

interface Todo {
  id: number;
  task: string;
  status: boolean;
  date_created: string;
}

const todo = defineProps<Todo>();
let taskInput: HTMLInputElement;

onMounted(() => {
  taskInput = document.getElementById("task") as HTMLInputElement;
});

function changeStatus(event: Event, id: number): void {
  const status = (event.target as HTMLElement).classList.contains("text-dark");
  const todo: Partial<Todo> = {
    id: id,
    status: status,
  };

  store.dispatch(Actions.UPDATE, todo);
}

function focusIn() {
  taskInput.removeAttribute("readonly");
  taskInput.classList.add("edit-active");
}

function focusOut() {
  if (taskInput.classList.contains("edit-active")) {
    taskInput.setAttribute("readonly", "true");
    taskInput.classList.remove("edit-active");
  }
}

function updateTodo(id: number) {
  const todo = { id: id, task: taskInput.value };
  store.dispatch(Actions.UPDATE, todo);
}
</script>

<template>
  <tr>
    <th scope="row">
      <CheckBox
        :class="{ 'text-dark': !status }"
        @click="changeStatus($event, todo.id)"
      ></CheckBox>
    </th>
    <td class="text-start">
      <input
        class="form-control task bg-transparent text-light"
        id="task"
        type="text"
        :value="todo.task"
        readonly
        @dblclick="focusIn"
        @keyup.enter="focusOut(), updateTodo(todo.id)"
        @focusout="focusOut"
        autocomplete="off"
      />
    </td>
    <td>{{ todo.date_created }}</td>
    <td>
      <button
        type="button"
        class="btn btn-outline-danger bi bi-trash"
        data-bs-toggle="modal"
        data-bs-target="#deleteModal"
        :data-bs-id="todo.id"
      ></button>
    </td>
  </tr>
</template>

<style lang="scss">
td {
  #task {
    border: 0;

    &:hover {
      cursor: pointer;
    }
  }
}

.edit-active {
  cursor: text !important;
  background-color: var(--bs-light) !important;
  color: var(--bs-dark) !important;
}
</style>
