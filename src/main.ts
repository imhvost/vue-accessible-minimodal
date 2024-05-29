import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { AccessibleMinimodal } from './lib';

createApp(App)
  .use(AccessibleMinimodal, {
    focus: {
      use: false,
    },
    style: {
      use: false,
    },
    multiple: {
      use: true,
    },
    triggers: {
      use: true,
    },
  })
  .mount('#app');
