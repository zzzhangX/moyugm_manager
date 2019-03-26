import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }, {
      path: '/home',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children: [
        {
          path: '',
          component: resolve => require(['../components/pages/PlayerAccountInfo.vue'], resolve),
        },
        {
          path: '/playerRoleInfo',
          component: resolve => require(['../components/pages/PlayerRoleInfo.vue'], resolve),
        }
      ]
    },
  ]
})
