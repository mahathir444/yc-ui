import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// arco测试
// 导入组件库
import YcUi from './components';
import '@/components/index.less';

const app = createApp(App);
app.use(router);
app.use(YcUi);
app.mount('#app');
