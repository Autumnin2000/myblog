import { createRouter, createWebHistory } from 'vue-router'
import details from '../views/Details.vue'
import Archives from '../views/Archives.vue'
import Life from '../components/Life.vue'
const history = createWebHistory()
export const router = createRouter({
  history,
  routes: [
    { path: '/details/:id', component: details },
    { path: '/', component: Archives },
    { path: '/life', component: Life }
  ]
})
