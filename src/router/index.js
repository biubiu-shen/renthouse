import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
import Login from '@/views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout'

  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/layout',
    component: Layout,
    redirect: '/layout/home',
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
  }
]

const router = new VueRouter({
  routes
})

export default router
