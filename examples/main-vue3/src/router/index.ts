import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Vue3View from '../views/childVue3.vue';
import ReactView from '../views/childReact.vue';
import Info from '../views/info.vue';
import Multi from '../views/multi.vue';

export const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/info',
  //   name: '主页面应用',
  //   component: Info,
  //   meta: {
  //     icon: 'yingyongguanli',
  //   },
  // },

  {
    path: '/vue3',
    name: 'vue3应用',
    component: Vue3View,
    meta: {
      icon: 'xiaoxi',
    },
  },

  {
    path: '/react',
    name: 'react应用',
    component: ReactView,
    meta: {
      icon: 'yingyongguanli',
    },
  },

  {
    path: '/',
    name: '混合应用',
    component: Multi,
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
