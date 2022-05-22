import './public-path';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// const win: any = window;
// win.commCenter.addDataListener((e: any) =>
//   console.log('[child-vue3]基座应用传输的数据：', e)
// );
// import '../../../../packages/list/dist/index.esm.js';
import { useRemicro } from 'remicro.js';
useRemicro();
// import '../../../../packages/button/dist/index.esm.js';

createApp(App).use(store).use(router).mount('#app');

// win.commCenter.dispatch({ msg: 'test from child-vue3' });
