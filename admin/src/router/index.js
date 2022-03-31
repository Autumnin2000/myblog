import { createRouter, createWebHistory } from 'vue-router'
import  Login  from "../views/Login.vue";
import AdminIndex from '../views/AdminIndex.vue'
import AddArticle from '../views/AddArticle.vue'
import ArtilceList from '../components/articles/articleList'
import Hello from '../components/HelloWorld.vue'
const history = createWebHistory()
export const router = createRouter({
  history,
  routes: [
      { path:'/',component: Login},
      { path: '/login', component: Login },
      { path: '/index', redirect:'/articles/articleList',component: AdminIndex },
      {
        path:'/articles',component:AdminIndex,children:[
          {
            path:'articleList',
            name:'articleList',
            component:ArtilceList
          },
          {
            path:'AddArticle',
            name:'AddArticle',
            component:AddArticle
          },
        ]
      },
      {
        path:'/hello',component:Hello
      }
  ]
})
