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
        },
        {
          path: '/backpackInfo',
          component: resolve => require(['../components/pages/BackpackInfo.vue'], resolve),
        },
        {
          path: '/phantomInfo',
          component: resolve => require(['../components/pages/PhantomInfo.vue'], resolve),
        },
        {
          path: '/trusteeship',
          component: resolve => require(['../components/pages/Trusteeship.vue'], resolve),
        },
        {
          path: '/ordinarymail',
          component: resolve => require(['../components/pages/Ordinarymail.vue'], resolve),
        },
        {
          path: '/fullservicemail',
          component: resolve => require(['../components/pages/Fullservicemail.vue'], resolve),
        }
      ]
    },
  ]
})
