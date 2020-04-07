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
