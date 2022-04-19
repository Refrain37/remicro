import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Vue3View from '../views/childVue3.vue';
import ReactView from '../views/childReact.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect: '/react',
  },
  {
    path: '/react',
    name: 'react',
    component: ReactView,
  },
  {
    path: '/vue3',
    name: 'vue3',
    component: Vue3View,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
