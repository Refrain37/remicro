import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Vue3View from '../views/childVue3.vue';
import ReactView from '../views/childReact.vue';
import Chart from '../views/chart.vue';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/react',
    name: 'react应用',
    component: ReactView,
    meta: {
      icon: 'yingyongguanli',
    },
  },
  {
    path: '/vue3',
    name: 'vue3应用',
    component: Vue3View,
    meta: {
      icon: 'xiaoxi',
    },
  },

  {
    path: '/',
    name: '主应用页面',
    component: Chart,
    meta: {
      icon: 'tubiao-bingtu',
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
