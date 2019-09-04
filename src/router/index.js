import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import Main from '@/views/home/main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'home',
      component: Home,
      children: [
        {
          name: 'main',
          path: '',
          component: Main
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
    }
  ]
})
