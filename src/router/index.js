import { createRouter,createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const router = createRouter({
  history: createWebHashHistory(),
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
      path: "/note",
      component: ()=>import("../views/Note.vue"),
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
