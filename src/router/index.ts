import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MenuView from "../views/MenuView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Menu",
    component: MenuView,
  },
  {
    path: "/list",
    name: "shopping-list",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "shopping-list" */ "../views/ShoppingListView.vue"
      ),
  },
  {
    path: "/load",
    name: "load-list",
    component: () =>
      import(/* webpackChunkName: "load-list" */ "../views/LoadView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
