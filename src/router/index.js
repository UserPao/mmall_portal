import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import  Login from '@/components/Login'
import forgetQuestion from '@/components/ForgetQuestion'
import Home from '@/components/Home'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path:"/forgetQuestion",
      name:'forgetQuestion',
      component:forgetQuestion
    }
  ]
})
