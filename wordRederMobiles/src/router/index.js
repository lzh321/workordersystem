import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import wordOrder from '@/components/wordOrderPage/wordOrder'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
        {
          path:'/wordOrder',
          name: 'wordOrder',
          component: wordOrder
        }
      ]
    }
  ]
})
