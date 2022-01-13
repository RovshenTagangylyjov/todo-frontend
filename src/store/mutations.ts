import { MutationTree } from "vuex";
import axios from "axios";

import { Mutations, MutationTypes, Todo, PaginationLinks } from "@/types";
import State from "./state";

function getPageNumFromLink(link: string): number | null {
  const re = RegExp("page=[0-9]");
  const result = re.exec(link) as string[];

  return result ? parseInt(result[0].slice(-1)) : null;
}

export const mutations: MutationTree<State> & MutationTypes = {
  [Mutations.FETCH](state, data) {
    state.todo = data.results;
    const paginationLinks: PaginationLinks = {
      previous: data.previous
        ? getPageNumFromLink(data.previous)
          ? getPageNumFromLink(data.previous)
          : 1
        : null,
      next: data.next ? getPageNumFromLink(data.next) : null,
      last: Math.ceil(data.count / 5),
    };
    state.paginationLinks = paginationLinks;
  },

  [Mutations.UPDATE](state, todo) {
    for (const i in state.todo) {
      if (state.todo[i].id === todo.id) {
        state.todo[i] = { ...state.todo[i], ...todo };
      }
    }
  },

  [Mutations.DELETE](state, id) {
    state.todo.forEach((todo: Todo, index: number) => {
      if (todo.id === id) {
        state.todo.splice(index, 1);
      }
    });
  },

  [Mutations.SETTOKEN](state, token) {
    state.token = token;
    state.isAuthenticated = true;
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    localStorage.setItem("token", token);
  },

  [Mutations.INITIALIZEAPP](state) {
    if (localStorage.getItem("token")) {
      state.token = localStorage.getItem("token") as string;
      axios.defaults.headers.common["Authorization"] = "Token " + state.token;
      state.isAuthenticated = true;
    } else {
      state.token = "";
      state.isAuthenticated = false;
    }
  },
  [Mutations.LOGOUT](state) {
    localStorage.removeItem("token");
    state.token = "";
    state.isAuthenticated = false;
    state.paginationLinks = <PaginationLinks>{};
    state.todo = <Todo[]>[];
    delete axios.defaults.headers.common["Authorization"];
  },
};
