import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import Antd from 'ant-design-vue';
//import ElememtPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import 'ant-design-vue/dist/antd.css';
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import router  from './router'

VMdEditor.use(githubTheme,{
  codeHighlightExtensionMap: {
    vue: 'html',
  }
});
axios.interceptors.request.use(function(config){
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  if(localStorage.getItem('user_token')){
    config.headers.common['Authorization']=localStorage.getItem('user_token')
  }
  return config;
})
const app = createApp(App)
// app.use(ElememtPlus)
app.use(Antd)
app.use(router)
app.use(VMdEditor)
app.mount('#app')


