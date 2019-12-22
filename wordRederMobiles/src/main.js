// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Tabbar,TabbarItem,NavBar,Tab, Tabs,List,Button,Field} from 'vant'

import 'lib-flexible/flexible'
import '../static/reset.css'

Vue.use(Field);

Vue.use(Button);
Vue.use(List);
Vue.use(Tab).use(Tabs);
Vue.use(NavBar);
Vue.use(Tabbar).use(TabbarItem)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
