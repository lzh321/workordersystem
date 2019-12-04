import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import workTable from '@/components/workTable/workTable'
import workOrderManagement from '@/components/workOrderManagement/workOrderManagement'
import synergyManagement from '@/components/synergyManagement/synergyManagement'
import staffManagement from '@/components/userManagement/staffManagement'
import EnterpriseNetwork from '@/components/userManagement/EnterpriseNetwork'
import roleManagement from '@/components/systemManagement/roleManagement'
import permissionsButton from '@/components/systemManagement/permissionsButton'
import businessEnterprise from '@/components/systemManagement/businessEnterprise'
import messageModule from '@/components/systemManagement/messageModule'
import messagePushList from '@/components/systemManagement/messagePushList'
import equipmentList from '@/components/equipmentManagement/equipmentList'
import equipmentType from '@/components/equipmentManagement/equipmentType'
import workOrderCreate from '@/components/workOrderManagement/workOrderCreate'
import addUser from '@/components/userManagement/addUser'
import addNetwork from '@/components/userManagement/addNetwork'
import addInstitution from '@/components/systemManagement/addInstitution'
import addMessage from '@/components/systemManagement/addMessage'
import deploy from '@/components/systemManagement/deploy'
import addEquipment from '@/components/equipmentManagement/addEquipment'
import checkEquipmentInfo from '@/components/equipmentManagement/checkEquipmentInfo'
import bulkImport from '@/components/equipmentManagement/bulkImport'
import addEquipmentType from '@/components/equipmentManagement/addEquipmentType'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
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
          name: 'workTable',
          component: workTable
        },
        {
          path: '/workOrderManagement',
          name: 'workOrderManagement',
          component: workOrderManagement
        },
        {
          path: '/synergyManagement',
          name: 'synergyManagement',
          component: synergyManagement
        },
        {
          path: '/staffManagement',
          name: 'staffManagement',
          component: staffManagement
        },
        {
          path: '/EnterpriseNetwork',
          name: 'EnterpriseNetwork',
          component: EnterpriseNetwork
        },
        {
          path: '/businessEnterprise',
          name: 'businessEnterprise',
          component: businessEnterprise
        },
        {
          path: '/messageModule',
          name: 'messageModule',
          component: messageModule
        },
        {
          path: '/messagePushList',
          name: 'messagePushList',
          component: messagePushList
        },
        {
          path: '/equipmentList',
          name: 'equipmentList',
          component: equipmentList
        },
        {
          path: '/equipmentType',
          name: 'equipmentType',
          component: equipmentType
        },
        {
          path: '/workOrderCreate',
          name: 'workOrderCreate',
          component: workOrderCreate
        },
        {
          path: '/addUser',
          name: 'addUser',
          component: addUser
        },
        {
          path: '/addNetwork',
          name: 'addNetwork',
          component: addNetwork
        },
        {
          path: '/roleManagement',
          name: 'roleManagement',
          component: roleManagement
        },
        {
          path: '/permissionsButton',
          name: 'permissionsButton',
          component: permissionsButton
        },
        {
          path: '/addInstitution',
          name: 'addInstitution',
          component: addInstitution
        },
        {
          path: '/addMessage',
          name: 'addMessage',
          component: addMessage
        },
        {
          path: '/deploy',
          name: 'deploy',
          component: deploy
        },
        {
          path: '/addEquipment',
          name: 'addEquipment',
          component: addEquipment
        },
        {
          path: '/checkEquipmentInfo',
          name: 'checkEquipmentInfo',
          component: checkEquipmentInfo
        },
        {
          path: '/bulkImport',
          name: 'bulkImport',
          component: bulkImport
        },
        {
          path: '/addEquipmentType',
          name: 'addEquipmentType',
          component: addEquipmentType
        },
      ]
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
