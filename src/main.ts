import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './store';
import '@/assets/styles/base.less';
import 'virtual:svg-icons-register';
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(ArcoVue);
app.mount('#app');
