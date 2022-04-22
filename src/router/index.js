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
    {
      path: '/404',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue')
    },
    // 所有未定义路由，全部重定向到404页
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    }
  ],
});

export default router;
