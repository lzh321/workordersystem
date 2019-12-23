import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import myCenter from '@/views/myCenter'
import synergy from '@/views/synergy'
import createOrder from '@/views/createOrder'
import wordOrder from '@/components/wordOrderPage/wordOrder'
import customerInfo from '@/components/createorderPage/orderComponents/customerInfo'
import bill from '@/components/createorderPage/orderComponents/bill'
import orderDetails from '@/components/createorderPage/orderDetails'
import synergyManagement from '@/components/synergyPage/synergyManagement'
import synergyDispose from '@/components/synergyPage/synergyDispose'

Vue.use(Router)

// 重写路由
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta:{
        showTab: true,
      },
      children:[
        {
          path:'/wordOrder',
          name: 'wordOrder',
          component: wordOrder,
          meta:{
            showTab: true,
          },
        },
        {
          path:'/orderDetails',
          name: 'orderDetails',
          component: orderDetails,
          meta:{
            showTab: false,
          },
        },
        {
          path:'/customerInfo',
          name: 'customerInfo',
          component: customerInfo,
          meta:{
            showTab: false,
          },
        },
        {
          path:'/bill',
          name: 'bill',
          component: bill,
          meta:{
            showTab: false,
          },
        },
        
      ]
    },
    {
      path:'/myCenter',
      name: 'myCenter',
      component: myCenter,
      meta:{
        showTab: true,
      },
    },
    {
      path:'/createOrder',
      name: 'createOrder',
      component: createOrder
    },
    {
      path:'/synergy',
      name: 'synergy',
      component: synergy,
      meta:{
        showTab: true,
      },
      children:[
        {
          path: '/synergyManagement',
          name: 'synergyManagement',
          component: synergyManagement,
          meta:{
            showTab: true,
          },
        },
        {
          path: '/synergyDispose',
          name: 'synergyDispose',
          component: synergyDispose,
          meta:{
            showTab: true,
          },
        }
      ]
    },
    {
      path: "*",
      redirect: '/Login'
    }
  ]
})
