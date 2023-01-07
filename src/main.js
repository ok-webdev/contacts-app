import { createApp } from 'vue';
import './global.css';
import App from './App.vue';

import TheHeader from './components/TheHeader.vue';

const app = createApp(App);

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

app.component('the-header', TheHeader);

app.mount('#app');
