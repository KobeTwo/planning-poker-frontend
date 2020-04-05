import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/About',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "About" */ '../views/About.vue')
  },
  {
    path: '/StartGame/:gameId',
    name: 'StartGame',
    component: () => import(/* webpackChunkName: "StartGame" */ '../views/StartGame.vue'),
    props: true
  },
  {
    path: '/Game/:gameInstanceId',
    name: 'Game',
    component: () => import(/* webpackChunkName: "Game" */ '../views/Game.vue'),
    props: true
  },
  {
    path: '/GameAdmin/:gameInstanceId',
    name: 'GameAdmin',
    component: () => import(/* webpackChunkName: "Game" */ '../views/GameAdmin.vue'),
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
