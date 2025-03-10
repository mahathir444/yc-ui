import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'virtual:svg-icons-register';
import '@/packages/index.less';
import SvgIcon from '@/packages/_components/SvgIcon/index.vue';
// arco测试
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';
import Trigger from './packages/Trigger';

const app = createApp(App);
app.use(router);
app.use(ArcoVue);
app.use(ArcoVueIcon);
app.component('SvgIcon', SvgIcon);
app.use(Trigger);
app.mount('#app');
