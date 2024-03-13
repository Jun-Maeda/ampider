import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from '@/plugins/vuetify.js'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import draggable from 'vuedraggable'
import gv from '../src/mixins/globalMethods'

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

// datetimepicker
app.component('VueDatePicker', VueDatePicker, draggable)

// pinia
const pinia = createPinia()
pinia.use(createPersistedState())

app.config.productionTip = false
app.use(router)
app.use(AmplifyVue)
app.use(VueAxios, axios)
app.use(vuetify)
app.use(pinia)
app.mixin(gv)
app.mount('#app')
