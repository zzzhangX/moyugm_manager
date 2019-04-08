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
          meta: { title: '账号信息' }
        },
        {
          path: '/playerRoleInfo',
          component: resolve => require(['../components/pages/PlayerRoleInfo.vue'], resolve),
          meta: { title: '基础信息' }
        },
        {
          path: '/currencySetting',
          component: resolve => require(['../components/pages/CurrencySetting.vue'], resolve),
          meta: { title: '货币设置' }
        },
        {
          path: '/rankingList',
          component: resolve => require(['../components/pages/RankingList.vue'], resolve),
          meta: { title: '排行榜信息' }
        },
        {
          path: '/recharge',
          component: resolve => require(['../components/pages/Recharge.vue'], resolve),
          meta: { title: '充值相关' }
        },
        {
          path: '/backpackInfo',
          component: resolve => require(['../components/pages/BackpackInfo.vue'], resolve),
          meta: { title: '背包信息' }
        },
        {
          path: '/changeexp',
          component: resolve => require(['../components/pages/Changeexp.vue'], resolve),
          meta: { title: '修改经验' }
        },
        {
          path: '/phantomInfo',
          component: resolve => require(['../components/pages/PhantomInfo.vue'], resolve),
          meta: { title: '幻兽信息' }
        },
        {
          path: '/trusteeship',
          component: resolve => require(['../components/pages/Trusteeship.vue'], resolve),
          meta: { title: '托管' }
        },
        {
          path: '/horseRaceLamp',
          component: resolve => require(['../components/pages/HorseRaceLamp.vue'], resolve),
          meta: { title: '跑马灯' }
        },
        {
          path: '/whiteList',
          component: resolve => require(['../components/pages/WhiteList.vue'], resolve),
          meta: { title: '操作白名单' }
        },
        {
          path: '/ordinarymail',
          component: resolve => require(['../components/pages/Ordinarymail.vue'], resolve),
          meta: { title: '普通邮件' }
        },
        {
          path: '/funclist',
          component: resolve => require(['../components/pages/Funclist.vue'], resolve),
          meta: { title: '游戏功能' }
        }
      ]
    },
  ]
})
