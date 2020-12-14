import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import ElememtPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';

VMdEditor.use(githubTheme,{
  codeHighlightExtensionMap: {
    vue: 'html',
  }
});
import { router } from './router'
axios.interceptors.request.use(function(config){
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  return config;
})
const app = createApp(App)
app.use(ElememtPlus)
app.use(router)
app.use(VMdEditor)
app.mount('#app')


