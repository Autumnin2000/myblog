import { createRouter, createWebHistory } from 'vue-router'
// import details from '../views/Details.vue'
import Archives from '../views/Archives.vue'
// import Life from '../components/Life.vue'
import SearchList from '../views/SearchResults.vue'
import SearchHeader from '../components/SearchHeader.vue'
const history = createWebHistory()
export const router = createRouter({
  history,
  routes: [
    { path: '/details/:id', component: () => import('../views/Details.vue'), name: 'Details' },
    { path: '/', component: Archives },
    { path: '/life', component: () => import('../components/Life.vue') },
    {
      path: '/SearchList/:keywords',
      components: {
        Header: SearchHeader,
        default: SearchList
      },
      name: 'SearchList'
    }
  ]
})
