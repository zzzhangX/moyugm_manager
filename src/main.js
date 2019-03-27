// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import axios from 'axios';
import VueI18n from 'vue-i18n'
import LangEn from '../static/lang/en'
import LangZhCHS from '../static/lang/zhCHS'
import LangZhCHT from '../static/lang/zhCHT'
axios.defaults.crossDomain = true;
axios.defaults.headers["Content-Type"] = "application/json";
// axios.defaults.headers["Authentication"] =
//   "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtb3l1LmFwaSIsIm5hbWUiOiJhZG1pbiIsImV4cCI6MTU1NDE3NjI5OX0=.D329UKK83QuasDccgqzPs2zuhCAyqL1tOA+hSoQ42BA=";
Vue.use(ElementUI);
Vue.use(VueI18n);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.prototype.exchangeDate = function (value) {
  let date = new Date(value);
  let y = date.getFullYear();
  let MM = date.getMonth() + 1;
  MM = MM < 10 ? ('0' + MM) : MM;
  let d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  let h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  let m = date.getMinutes();
  m = m < 10 ? ('0' + m) : m;
  let s = date.getSeconds();
  s = s < 10 ? ('0' + s) : s;
  return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
}

let loading = null;
// request 拦截器
axios.interceptors.request.use(config => {
  //为post请求加上loading
  if (config.method === 'post') {
    loading = ElementUI.Loading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
  }
  config.headers['Content-Type'] = 'application/json; charset=UTF-8';
  //判断是否存在token，如果存在将每个请求header都添加token
  if (localStorage.getItem('token')) {
    config.headers.common['Authentication'] = localStorage.getItem('token');
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// response 拦截器
axios.interceptors.response.use(
  response => {
    loading && loading.close();
    return response;
  },
  error => {
    loading && loading.close();
    if (error.response) {
      switch (error.response.status) {
        case 403:
          localStorage.removeItem('username');
          localStorage.removeItem('token');
          router.replace({
            path: '/',
          });
          break;
        default:
          ElementUI.Message.error(error.response.status + ':' + error.response.statusText);
          break;
      }
    }
    return Promise.reject(error)
  });
router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token') || to.path === '/') {
    next();
  } else {
    next('/');
  }
});

const i18n = new VueI18n({
  locale: 'zhCHS',
  messages: {
    'en': LangEn,
    'zhCHS': LangZhCHS,
    'zhCHT': LangZhCHT
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
