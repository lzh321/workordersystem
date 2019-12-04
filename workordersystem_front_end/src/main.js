// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ECharts from 'vue-echarts/components/ECharts'
import Axios from 'axios'
import store from './store'
import qs from 'qs'
import VueResource from 'vue-resource'

Vue.config.productionTip = false
Vue.component('chart', ECharts)
Vue.use(VueResource)
Vue.prototype.$axios = Axios

// 实例对象
Axios.create({
  timeout: 6000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// 添加请求拦截器，在请求头中加token
Axios.interceptors.request.use(
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
  
  if (to.path === '/login') {
    next();
  } else {
    let userId = sessionStorage.getItem('userId');
    if (userId === null || userId === '' || userId === undefined) {
      next('/login');
    } else {
      next();
    }
  }
})

layui.use("table",function() {
  var table = layui.table;
  //监听行工具事件
  table.on('tool(test)', function(obj){
    var data = obj.data;
    //console.log(obj)
    if(obj.event === 'deletion'){
      layer.confirm('真的删除行么', function(index){
        obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
        layer.close(index);
        //向服务端发送删除指令
      });
    } else if(obj.event === 'edit'){
      layer.prompt({
        formType: 2
        ,value: data.email
      }, function(value, index){
        //同步更新缓存对应的值
        obj.update({
          email: value
        });
        layer.close(index);
      });
    }else if(obj.event === 'detail'){
      self.$router.push({path: "/checkEquipmentInfo"})
    }
  });
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
