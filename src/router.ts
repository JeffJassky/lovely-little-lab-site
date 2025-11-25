import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import GetInvolved from "./views/GetInvolved.vue";
import About from "./views/About.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/about", name: "about", component: About },
    { path: "/get-involved", name: "get-involved", component: GetInvolved },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    }
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
