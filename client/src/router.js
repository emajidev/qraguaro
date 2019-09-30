import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from '@/components/Login'
import VueSession from 'vue-session'
import store from './store';

Vue.use(VueSession)

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/lista',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/',
      name: 'scan',
      meta: {
        autentificado: false
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/scan.vue')
    },
    {
      path: '/Listado',
      name: 'Listado',
      meta: {
        autentificado: true
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Listado.vue')
    },
    {
      path: '/Registrar',
      name: 'Registrar',
      meta: {
        autentificado: true
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Registrar.vue')
    }
  ]
})

  router.beforeEach((to, from, next) => {

    let reqSession = to.matched.some(route => route.meta.autentificado)
    
    if(reqSession && !router.app.$session.exists() ){
      next('login')
    }else {
      next();
    }   
  })

export default router;