import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/home/index.vue'
import Home from './views/home/'
import Login from './views/login/'
import Main from './views/home/main'

Vue.use(Router)

export default new Router({
  routes: [
    // 一级路由
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '',
          component: Main
        },
        {
          path: 'comment',
          component: () => import('./views/comment')
        },
        {
          path: 'material',
          component: () => import('./views/material')
        },
        {
          path: 'articles',
          component: () => import('./views/articles')
        },
        {
          // 修改文章
          path: 'publish/:articleId',
          component: () => import('./views/publish')
        },
        {
          path: 'publish',
          component: () => import('./views/publish')
        },
        {
          path: 'account',
          component: () => import('./views/account')
        }
      ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
