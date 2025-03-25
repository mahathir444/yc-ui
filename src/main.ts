import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import YcUi from './components';
import ArcoIcon from '@arco-design/web-vue/es/icon';

const app = createApp(App);
app.use(router);
app.use(YcUi);
app.use(ArcoIcon);
app.mount('#app');
