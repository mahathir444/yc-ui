import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@/assets/styles/base.less';
import '@/assets/styles/global.less';
import '@/assets/styles/translation.less';
import 'virtual:svg-icons-register';
// arco测试
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';

const app = createApp(App);
app.use(router);
app.use(ArcoVue);
app.use(ArcoVueIcon);
app.mount('#app');
