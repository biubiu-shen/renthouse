import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
import Login from '@/views/Login'
import City from '@/views/City'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home')
      },
      {
        path: 'search',
        component: () => import('@/views/Search')
      },
      {
        path: 'ask',
        component: () => import('@/views/Question')
      },
      {
        path: 'my',
        component: () => import('@/views/MyInfo')
      }
    ]
  },
  {
    path: '/city',
    component: City
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/rent',
    component: () => import('@/views/RentHouse')
  },
  {
    path: '/rentsearch',
    component: () => import('@/views/RentHouse/houseSearch.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
