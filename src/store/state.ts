import { Todo, PaginationLinks } from "@/types";

export const state = {
  paginationLinks: <PaginationLinks>{},
  todo: <Todo[]>[],
  token: "",
  isAuthenticated: false,
};

type State = typeof state;

export default State;
