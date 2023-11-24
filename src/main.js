import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from '@/plugins/vuetify.js'

// Amplify
import { Amplify } from 'aws-amplify'
import awsconfig from './aws-exports'
Amplify.configure(awsconfig)

// Amplify UI Vue
import AmplifyVue from '@aws-amplify/ui-vue'
import '@aws-amplify/ui-vue/styles.css'

// import '@/assets/admin.css';
// import './assets/admin.css';

const app = createApp(App)
app.config.productionTip = false
app.use(router)
app.use(AmplifyVue)
app.use(VueAxios, axios)
app.use(vuetify)
app.mount('#app')
