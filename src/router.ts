import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import GetInvolved from './views/GetInvolved.vue';
import GetInvolvedFull from './views/GetInvolvedFull.vue';
import GetInvolvedPlayful from './views/GetInvolvedPlayful.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/get-involved', name: 'get-involved', component: GetInvolved },
    {
      path: '/get-involved/guide',
      name: 'get-involved-guide',
      component: GetInvolvedFull
    },
    {
      path: '/get-involved/playful',
      name: 'get-involved-playful',
      component: GetInvolvedPlayful
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' };
    }
    return { top: 0, behavior: 'smooth' };
  }
});

export default router;
