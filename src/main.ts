import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import './style.css'
import router from './router'
import 'ant-design-vue/dist/reset.css';
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

createApp(App)
  .use(Antd)
  .use(router)
  .mount('#app')
