// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import store from './store'
import jquery from 'jquery'
import { Tabbar, TabbarItem, NavBar, Tab, Tabs, List, Button, Field, Icon, Uploader, Dialog, Toast, DatetimePicker, Popup,Search,Loading } from 'vant'
import 'babel-polyfill'

import 'lib-flexible/flexible'
import '../static/reset.css'

// 全局注册
Vue.use(Loading)
Vue.use(Search);
Vue.use(Popup);
Vue.use(DatetimePicker);
Vue.use(Toast);
Vue.use(Dialog);
Vue.use(Uploader);
Vue.use(Icon);
Vue.use(Field);
Vue.use(Button);
Vue.use(List);
Vue.use(Tab).use(Tabs);
Vue.use(NavBar);
Vue.use(Tabbar).use(TabbarItem)
Vue.prototype.axios = axios
Vue.prototype.$ = jquery
Vue.config.productionTip = false

// 自定义方法
jquery.prototype.serializeObject = function () {

  var obj = new Object();

  jquery.each(this.serializeArray(), function (index, param) {
    if (!(param.name in obj)) {
      obj[param.name] = param.value;
    }
  });

  return obj;
};

// 实例对象
axios.create({
  timeout: 6000,
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Type': 'multipart/form-data'
  }
})



// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    config.data = qs.stringify(config.data)
    if (localStorage.getItem('userId')) {
      config.headers.userId = localStorage.getItem('userId');
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


// 路由拦截
router.beforeEach((to, from, next) => {

  if (to.path === '/Login') {
    next();
  } else {
    let userId = localStorage.getItem('userId');
    if (userId === null || userId === '' || userId === undefined) {
      next('/Login');
    } else {
      next();
    }
  }

})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
