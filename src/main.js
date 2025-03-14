import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// arco测试
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';
// 导入组件库
// import YcUi from './components';
// import '@/components/index.less';
import YcUi from '../es/src/components/index';
import '../es/style.css';

const app = createApp(App);
app.use(router);
app.use(ArcoVue);
app.use(ArcoVueIcon);
app.use(YcUi);
app.mount('#app');
