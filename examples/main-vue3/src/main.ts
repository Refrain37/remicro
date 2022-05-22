import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// import './utils/remicro';
import '../../../packages/app/dist/index.esm.js';
import '../../../packages/button/dist/index.esm.js';

createApp(App).use(store).use(router).mount('#main-app');
