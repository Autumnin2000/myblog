import { createRouter, createWebHistory } from 'vue-router'
import  Login  from "../views/Login.vue";
import AdminIndex from '../views/AdminIndex.vue'
const history = createWebHistory()
export const router = createRouter({
  history,
  routes: [
      { path:'/',component: Login},
      { path: '/login', component: Login },
      { path: '/index', component: AdminIndex },
  ]
})
