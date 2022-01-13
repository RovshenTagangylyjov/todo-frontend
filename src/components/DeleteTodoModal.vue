<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import store from "@/store";
import { Actions, obj } from "@/types";
import { mergeQuery } from "@/helpers/query_helpers";

const route = useRoute();
const router = useRouter();
const id = ref<number>();

onMounted(() => {
  const modal = document.getElementById("deleteModal") as HTMLDivElement;
  modal.addEventListener("show.bs.modal", (event: Event) => {
    id.value = getTodoId(event);
  });
});

function getTodoId(event: any): number {
  const button = event.relatedTarget as HTMLButtonElement;
  const id = button.getAttribute("data-bs-id") as string;
  return parseInt(id);
}

function deleteTodo(id: number) {
  store.dispatch(Actions.DELETE, id);

  if (parseInt(route.query.page as string) === store.state.paginationLinks.last)
    router.push({
      name: "TodoList",
      query: mergeQuery(
        { page: store.state.paginationLinks.last - 1 },
        route.query as obj
      ),
    });
}
</script>

<template>
  <div
    class="modal fade"
    id="deleteModal"
    tabindex="-1"
    aria-labelledby="deleteModal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">Are you sure you want to delete this Todo?</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="btn btn-danger"
            @click="deleteTodo(id as number)"
            data-bs-dismiss="modal"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
