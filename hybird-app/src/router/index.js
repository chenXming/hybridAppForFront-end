import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue';

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main
  },
  {
    path: '/goodsList',
    name: 'goodsList',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // 这个是Vue - router 提供的懒加载的方式 只有在使用到这个页面时候，才会去记载
    // webpackChunkName: 是指 webpack 打包的名称，设置这个名称，可以在使用打包时候 让有相同webpackChunkName
    // 的包打包在一起，比如 如果设置，注意：这里设置 webpackChunkName 就是/* webpackChunkName: "goodsList" */ 的方式
    component: () => import( /* webpackChunkName: "goodsList"*/ '../views/GoodsList.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
