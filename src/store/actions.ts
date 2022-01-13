import { ActionTree } from "vuex";
import axios from "axios";

import { Actions, ActionTypes, Mutations, FetchDataType } from "@/types";
import store from "@/store";
import State from "./state";

export const actions: ActionTree<State, State> & ActionTypes = {
  async [Actions.CREATE](context, task) {
    const todo = {
      task: task,
      status: false,
    };

    await axios.post("todos/", todo);
  },

  async [Actions.FETCH]({ commit }, query) {
    if (!store.state.isAuthenticated) return;

    let query_params: string = Object.keys(query).length ? "?" : "";
    for (const [key, value] of Object.entries(query)) {
      query_params += `${key}=${value}&`;
    }

    const response = await axios.get(`todos/${query_params}`);
    const data = response.data as FetchDataType;

    commit(Mutations.FETCH, data);
  },

  async [Actions.UPDATE]({ commit }, todo) {
    await axios.patch(`todos/${todo.id}/`, todo);
    commit(Mutations.UPDATE, todo);
  },

  async [Actions.DELETE]({ commit }, id) {
    await axios.delete(`todos/${id}/`);

    commit(Mutations.DELETE, id);
  },
};
