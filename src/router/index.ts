import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { RegisterForm, LoginForm } from "@/views";

import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "TodoList",
    component: () =>
      import(/* webpackChunkName: "TodoList" */ "@/views/TodoList.vue"),
    meta: {
      isAuthenticated: true,
    },
  },
  {
    path: "/register/",
    name: "Register",
    component: RegisterForm,
  },
  {
    path: "/login/",
    name: "Login",
    component: LoginForm,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.isAuthenticated) &&
    !store.state.isAuthenticated
  )
    next({ name: "Login", query: { redirect: to.fullPath } });
  else next();
});

export default router;
