import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'element-plus/dist/index.css';
import ElementPlus from 'element-plus';

createApp(App)
    .use(router)
    .use(ElementPlus)
    .mount('#app');
