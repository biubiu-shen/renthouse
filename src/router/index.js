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
  },
  {
    path: '/onehouse',
    component: () => import('@/views/oneHouse/index.vue')
  },
  {
    path: '/map',
    component: () => import('@/views/Map/index.vue')
  },
  {
    path: '/collect',
    component: () => import('@/views/Collect/index.vue')
  },
  {
    path: '/seehouse',
    component: () => import('@/views/SeeHouse/index.vue')
  },
  {
    path: '/text',
    component: () => import('@/views/text.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
