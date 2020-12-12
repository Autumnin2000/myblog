import { createApp } from 'vue'
import App from './App.vue'
import ElememtPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import { router } from './router'

const app = createApp(App)
app.use(ElememtPlus)
app.use(router)
app.mount('#app')
