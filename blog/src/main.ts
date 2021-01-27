import { createApp } from 'vue'
import App from './App.vue'
import ElememtPlus from 'element-plus'
import axios from 'axios'
import 'element-plus/lib/theme-chalk/index.css'
import { router } from './router'
import store from './store'

axios.interceptors.request.use(function (config) {
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  return config
})
const app = createApp(App)
app.use(ElememtPlus)
app.use(router)
app.use(store)
app.mount('#app')
