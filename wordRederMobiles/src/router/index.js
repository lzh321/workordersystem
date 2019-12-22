import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import myCenter from '@/views/myCenter'
import synergy from '@/views/synergy'
import synergyManagement from '@/components/synergyPage/synergyManagement'
import synergyDispose from '@/components/synergyPage/synergyDispose'

Vue.use(Router)

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
    },
    {
      path:'/myCenter',
      name: 'myCenter',
      component: myCenter
    },
    {
      path:'/synergy',
      name: 'synergy',
      component: synergy,
      children:[
        {
          path: '/synergyManagement',
          name: 'synergyManagement',
          component: synergyManagement,
        },
        {
          path: '/synergyDispose',
          name: 'synergyDispose',
          component: synergyDispose,
        }
      ]
    },
    {
      path: "*",
      redirect: '/Home'
    }
  ]
})
