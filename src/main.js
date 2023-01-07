import { createApp } from 'vue';
import { createPinia } from 'pinia';
import '@mdi/font/css/materialdesignicons.css';
import './assets/global.css';
import App from './App.vue';

const app = createApp(App);

// Pinia
const pinia = createPinia();

app.use(pinia);

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
 components,
 directives,
});

app.use(vuetify);

// Mount
app.mount('#app');
