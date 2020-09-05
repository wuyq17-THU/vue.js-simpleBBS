import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import login from '@/components/login'
import List from '@/components/List'
import showDetail from '@/components/showDetail'

import postNew from '@/components/postNew'
import editmain from '@/components/editmain'
import editreply from '@/components/editreply'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/List',
    name: 'List',
    component: List
  },
  {
    path: '/showDetail',
    name: 'showDetail',
    component: showDetail
  },

  {
    path: '/postNew',
    name: 'postNew',
    component: postNew
  },
  {
    path: '/editmain',
    name: 'editmain',
    component: editmain
  },
  {
    path: '/editreply',
    name: 'editreply',
    component: editreply
  },
]

const router = new VueRouter({
  routes
})

export default router
