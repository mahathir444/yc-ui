import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ArcoIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';
// ycui
import YcUi from './components';
import '@/components/index.less';
// teaching
import '@/teaching-front/_shared/styles/global.less';
const app = createApp(App);
app.use(router);
app.use(YcUi);
app.use(ArcoIcon);
app.mount('#app');
