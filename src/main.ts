import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import YcUi from './components';
import '@/components/index.less';
import 'virtual:svg-icons-register';

const app = createApp(App);
app.use(router);
app.use(YcUi);
app.mount('#app');
