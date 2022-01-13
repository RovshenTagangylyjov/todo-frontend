import { ActionContext, Store, CommitOptions, DispatchOptions } from "vuex";
import { RouteQueryAndHash } from "vue-router";

import State from "@/store/state";

// General
export type obj = Record<string, string | number>;

// State
export interface Todo {
  id: number;
  task: string;
  status: boolean;
  date_created: string;
}

export interface PaginationLinks {
  next: number | null;
  previous: number | null;
  last: number;
}

export interface FetchDataType {
  next: string | null;
  previous: string | null;
  count: number;
  results: Todo[];
}

// Mutations
export enum Mutations {
  FETCH = "FETCH",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  SETTOKEN = "SETTOKEN",
  INITIALIZEAPP = "INITIALIZEAPP",
  LOGOUT = "LOGOUT",
}

export interface MutationTypes<S = State> {
  [Mutations.FETCH](state: S, data: FetchDataType): void;
  [Mutations.UPDATE](state: S, todo: Partial<Todo>): void;
  [Mutations.DELETE](state: S, id: number): void;
  [Mutations.SETTOKEN](state: S, token: string): void;
  [Mutations.INITIALIZEAPP](state: S): void;
  [Mutations.LOGOUT](state: S): void;
}

// Actions
export enum Actions {
  CREATE = "CREATE",
  FETCH = "FETCH",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

interface commit extends Omit<ActionContext<State, State>, "commit"> {
  commit<K extends keyof MutationTypes>(
    key: K,
    payload?: Parameters<MutationTypes[K]>[1],
    options?: CommitOptions
  ): ReturnType<MutationTypes[K]>;
}

export interface ActionTypes {
  [Actions.CREATE]({ commit }: commit, task: string): void;
  [Actions.FETCH]({ commit }: commit, query: RouteQueryAndHash): void;
  [Actions.UPDATE]({ commit }: commit, todo: Partial<Todo>): void;
  [Actions.DELETE]({ commit }: commit, id: number): void;
}

// Store
export type StoreType = Omit<Store<State>, "commit" | "dispatch"> &
  commit & {
    dispatch<K extends keyof ActionTypes>(
      key: K,
      payload: Parameters<ActionTypes[K]>[1],
      options?: DispatchOptions
    ): ReturnType<ActionTypes[K]>;
  };
