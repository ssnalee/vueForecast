import { createApp } from 'vue'
// import Vue from 'vue'
import Vue3Geolocation from 'vue3-geolocation';
import App from './App.vue'
// import LoadScript from 'vue-plugin-load-script'
const app = createApp(App)
app.use(Vue3Geolocation/*, { ...options } */)
app.mount('#app')



