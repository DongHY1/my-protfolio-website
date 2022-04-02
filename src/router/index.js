import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/guitar",
      component: ()=>import("../views/Guitar.vue"),
    },
    {
      path: "/piano",
      component: ()=>import("../views/Piano.vue"),
    },
    {
      path: "/drum",
      component: ()=>import("../views/Drum.vue"),
    },
    {
      path: "/home",
      component: ()=>import("../views/Home.vue"),
    },
  ],
});

export default router;
