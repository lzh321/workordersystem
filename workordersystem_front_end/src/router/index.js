import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import workTable from '@/components/workTable/workTable'
import workOrderManagement from '@/components/workOrderManagement/workOrderManagement'
import synergyManagement from '@/components/synergyManagement/synergyManagement'
import staffManagement from '@/components/userManagement/staffManagement'
import EnterpriseNetwork from '@/components/userManagement/EnterpriseNetwork'
import businessEnterprise from '@/components/systemManagement/businessEnterprise'
import messageModule from '@/components/systemManagement/messageModule'
import messagePushList from '@/components/systemManagement/messagePushList'
import equipmentList from '@/components/equipmentManagement/equipmentList'
import equipmentType from '@/components/equipmentManagement/equipmentType'
import workOrderCreate from '@/components/workOrderManagement/workOrderCreate'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/workTable',
          name: workTable,
          component: workTable
        },
        {
          path: '/workOrderManagement',
          name: workOrderManagement,
          component: workOrderManagement
        },
        {
          path: '/synergyManagement',
          name: synergyManagement,
          component: synergyManagement
        },
        {
          path: '/staffManagement',
          name: staffManagement,
          component: staffManagement
        },
        {
          path: '/EnterpriseNetwork',
          name: EnterpriseNetwork,
          component: EnterpriseNetwork
        },
        {
          path: '/businessEnterprise',
          name: businessEnterprise,
          component: businessEnterprise
        },
        {
          path: '/messageModule',
          name: messageModule,
          component: messageModule
        },
        {
          path: '/messagePushList',
          name: messagePushList,
          component: messagePushList
        },
        {
          path: '/equipmentList',
          name: equipmentList,
          component: equipmentList
        },
        {
          path: '/equipmentType',
          name: equipmentType,
          component: equipmentType
        },
        {
          path: '/workOrderCreate',
          name: workOrderCreate,
          component: workOrderCreate
        },
      ]
    },
  ]
})
