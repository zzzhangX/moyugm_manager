import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
          meta: { title: 'sidebar.home' }
        },
        {
          path: '/playerRoleInfo',
          component: resolve => require(['../components/pages/PlayerRoleInfo.vue'], resolve),
          meta: { title: 'sidebar.playerRoleInfo' }
        },
        {
          path: '/currencySetting',
          component: resolve => require(['../components/pages/CurrencySetting.vue'], resolve),
          meta: { title: 'sidebar.currencySetting' }
        },
        {
          path: '/rankingList',
          component: resolve => require(['../components/pages/RankingList.vue'], resolve),
          meta: { title: 'sidebar.rankingList' }
        },
        {
          path: '/recharge',
          component: resolve => require(['../components/pages/Recharge.vue'], resolve),
          meta: { title: 'sidebar.recharge' }
        },
        {
          path: '/backpackInfo',
          component: resolve => require(['../components/pages/BackpackInfo.vue'], resolve),
          meta: { title: 'sidebar.backpackInfo' }
        },
        {
          path: '/changeexp',
          component: resolve => require(['../components/pages/Changeexp.vue'], resolve),
          meta: { title: 'sidebar.changeExp' }
        },
        {
          path: '/phantomInfo',
          component: resolve => require(['../components/pages/PhantomInfo.vue'], resolve),
          meta: { title: 'sidebar.phantomInfo' }
        },
        {
          path: '/trusteeship',
          component: resolve => require(['../components/pages/Trusteeship.vue'], resolve),
          meta: { title: 'sidebar.trusteeship' }
        },
        {
          path: '/horseRaceLamp',
          component: resolve => require(['../components/pages/HorseRaceLamp.vue'], resolve),
          meta: { title: 'sidebar.horseRaceLamp' }
        },
        {
          path: '/whiteList',
          component: resolve => require(['../components/pages/WhiteList.vue'], resolve),
          meta: { title: 'sidebar.whiteList' }
        },
        {
          path: '/ordinarymail',
          component: resolve => require(['../components/pages/Ordinarymail.vue'], resolve),
          meta: { title: 'sidebar.ordinarymail' }
        },
        {
          path: '/funclist',
          component: resolve => require(['../components/pages/Funclist.vue'], resolve),
          meta: { title: 'sidebar.funclist' }
        }
      ]
    },
  ]
})
