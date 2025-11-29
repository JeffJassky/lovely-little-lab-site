import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import GetInvolved from "./views/GetInvolved.vue";
import About from "./views/About.vue";
import Links from "./views/Links.vue";
const PrintFlyerV1 = () => import("./views/print/flyers/FlyerV1.vue");
const PrintPostcardV1 = () => import("./views/print/postcards/PostcardV1.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/about", name: "about", component: About },
    { path: "/get-involved", name: "get-involved", component: GetInvolved },
    { path: "/links", name: "links", component: Links },
    {
      path: "/print/8x10/flyer-v1",
      name: "print-flyer-v1",
      component: PrintFlyerV1,
    },
    {
      path: "/print/4x6/postcard-v1",
      name: "print-postcard-v1",
      component: PrintPostcardV1,
    },
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

// ok

export default router;
