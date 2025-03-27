import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'virtual:svg-icons-register';
import ArcoIcon from '@arco-design/web-vue/es/icon';
import YcUi from './components';
import '@/components/index.less';
import '../_storage';

const app = createApp(App);
app.use(router);
app.use(YcUi);
app.use(ArcoIcon);
app.mount('#app');
