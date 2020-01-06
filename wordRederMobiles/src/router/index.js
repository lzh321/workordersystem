import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import myCenter from '@/views/myCenter'
import synergy from '@/views/synergy'
import createOrder from '@/views/createOrder'
import wordOrder from '@/components/wordOrderPage/wordOrder'
import customerInfo from '@/components/createorderPage/orderComponents/customerInfo'
import selectBank from '@/components/createorderPage/subPage/selectBank'
import network from '@/components/createorderPage/subPage/network'
import orderSource from '@/components/createorderPage/subPage/orderSource'
import orderType from '@/components/createorderPage/subPage/orderType'
import modelType from '@/components/createorderPage/subPage/modelType'
import recordModel from '@/components/createorderPage/subPage/recordModel'
import userList from '@/components/createorderPage/subPage/userList'
import goSynergy from '@/components/createorderPage/subPage/goSynergy'
import recordType from '@/components/createorderPage/subPage/recordType'
import kuantanState from '@/components/createorderPage/subPage/kuantanState'
import DeviceNumber from '@/components/createorderPage/subPage/DeviceNumber'
import bill from '@/components/createorderPage/orderComponents/bill'
import orderDetails from '@/components/createorderPage/orderDetails'
import create from '@/components/createorderPage/create'
import synergyManagement from '@/components/synergyPage/synergyManagement'
import synergyDispose from '@/components/synergyPage/synergyDispose'

Vue.use(Router)

// 重写路由
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/create',
      name: 'create',
      component: create,
      meta: {
        isBack: false,  // 这个字段的意思稍后再说      
        keepAlive: true,
        // showTab: true,
      }
    },
    {
      path: '/bill',
      name: 'bill',
      component: bill,
      meta: {
        showTab: false,
      },
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {
        showTab: true,
        title: '首页'
      },
      children: [
        {
          path: '/wordOrder',
          name: 'wordOrder',
          component: wordOrder,
          meta: {
            showTab: true,
            title: '工单'
          },
        },
      ]
    },
    {
      path: '/orderDetails',
      name: 'orderDetails',
      component: orderDetails,
      meta: {
        showTab: false,
        title: '工单详情',
        // isBack: false,  // 这个字段的意思稍后再说      
        // keepAlive: true

      },
    },
    {
      path: '/customerInfo',
      name: 'customerInfo',
      component: customerInfo,
      meta: {
        showTab: false,
      },
    },
    {
      path: '/synergy',
      name: 'synergy',
      component: synergy,
      meta: {
        showTab: true,
        title: '协同'
      },
      children: [
        {
          path: '/synergyManagement',
          name: 'synergyManagement',
          component: synergyManagement,
          meta: {
            showTab: true,
          },
        },
        {
          path: '/synergyDispose',
          name: 'synergyDispose',
          component: synergyDispose,
          meta: {
            showTab: true,
          },
        }
      ]
    },
    {
      path: '/myCenter',
      name: 'myCenter',
      component: myCenter,
      meta: {
        showTab: true,
        title: '个人中心'
      },
    },
    {
      path: '/createOrder',
      name: 'createOrder',
      component: createOrder,
      meta: {
        showTab: true,
      },
    },
    {
      path: '/selectBank',
      name: 'selectBank',
      component: selectBank
    },
    {
      path: '/network',
      name: 'network',
      component: network
    },
    {
      path: '/orderSource',
      name: 'orderSource',
      component: orderSource
    },
    {
      path: '/orderType',
      name: 'orderType',
      component: orderType
    },

    {
      path: '/modelType',
      name: 'modelType',
      component: modelType
    },
    {
      path: '/userList',
      name: 'userList',
      component: userList
    },
    {
      path: '/kuantanState',
      name: 'kuantanState',
      component: kuantanState
    },
    {
      path: '/DeviceNumber',
      name: 'DeviceNumber',
      component: DeviceNumber
    },
    {
      path: '/goSynergy',
      name: 'goSynergy',
      component: goSynergy,
      meta: {
        isBack: false,  // 这个字段的意思稍后再说      
        keepAlive: true
      }
    },
    {
      path: '/recordType',
      name: 'recordType',
      component: recordType
    },
    {
      path: '/recordModel',
      name: 'recordModel',
      component: recordModel
    },

    {
      path: "*",
      redirect: '/Login'
    }
  ]
})
