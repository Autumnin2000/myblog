import { createRouter, createWebHistory } from 'vue-router'
import  Login  from "../views/Login.vue";
import AdminIndex from '../views/AdminIndex.vue'
import AddArticle from '../views/AddArticle.vue'
import ArtilceList from '../components/articles/articleList'
import PersonList from '../components/person/Person.vue'
import AddPerson from '../components/person/addPerson.vue'
import Hello from '../components/HelloWorld.vue'
import CommentList from '../components/Comments.vue'
import { message } from "ant-design-vue"
//import { route } from '../../../service/router/user';
const history = createWebHistory()
const router = createRouter({
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
        path:'/Person',component:AdminIndex,children:[
          {
            path:'list',
            name:'personList',
            component:PersonList
          },
          {
            path:'add',
            name:'addperson',
            component:AddPerson
          },
        ]
      },
      {
        path:'/Comment',component:AdminIndex,children:[
          {
            path:'list',
            name:'commentList',
            component:CommentList
          },
        ]
      },
      {
        path:'/Hello',
        name:'Hello',
        component:Hello
      },
  ]
})
router.beforeEach((to,from,next)=>{
  console.log(to,from);
  if(localStorage.getItem('user_token')){
    if(to.path=='/login'){
      next("/index");
    }else {
      next();
    }
    return
  }else {
    if(to.path == '/login'){
      next();
    }else {
      message.error("请重新登录")
      next('/login')
    }
  }
})
export default router;