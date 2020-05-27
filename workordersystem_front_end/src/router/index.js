import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import workTable from '@/components/workTable/workTable'
import workOrderManagement from '@/components/workOrderManagement/workOrderManagement'
import personOrder from '@/components/workOrderManagement/personOrder'
import workOrderDetails from '@/components/workOrderManagement/workOrderDetails'
import Kuantan from '@/components/workOrderManagement/workOrderDetails/Kuantan'
import synergyManagement from '@/components/synergyManagement/synergyManagement'
import personSynergy from '@/components/synergyManagement/personSynergy'
import synergyInfo from '@/components/synergyManagement/synergyInfo'
import staffManagement from '@/components/userManagement/staffManagement'
import NetworkList from '@/components/userManagement/NetworkList'
import roleManagement from '@/components/systemManagement/roleManagement'
import permissionsButton from '@/components/systemManagement/permissionsButton'
import menuManagement from '@/components/systemManagement/menuManagement'
import addMenu from '@/components/systemManagement/addMenu'
import addPermissionsButton from '@/components/systemManagement/addPermissionsButton'
import addRole from '@/components/systemManagement/addRole'
import businessEnterprise from '@/components/systemManagement/businessEnterprise'
import messageModule from '@/components/systemManagement/messageModule'
import messagePushList from '@/components/systemManagement/messagePushList'
import equipmentList from '@/components/equipmentManagement/equipmentList'
import equipmentType from '@/components/equipmentManagement/equipmentType'
import workOrderCreate from '@/components/workOrderManagement/workOrderCreate'
import addUser from '@/components/userManagement/addUser'
import addNetwork from '@/components/userManagement/addNetwork'
import addCustomer from '@/components/userManagement/addCustomer'
import CustomerNameList from '@/components/userManagement/CustomerNameList'
import userInfo from '@/components/userManagement/userInfo'
import alterPassword from '@/components/userManagement/alterPassword'
import checkUserInfo from '@/components/userManagement/checkUserInfo'
import addInstitution from '@/components/systemManagement/addInstitution'
import addMessage from '@/components/systemManagement/addMessage'
import deploy from '@/components/systemManagement/deploy'
import addCompany from '@/components/systemManagement/addCompany'
import addEquipment from '@/components/equipmentManagement/addEquipment'
import checkEquipmentInfo from '@/components/equipmentManagement/checkEquipmentInfo'
import bulkImport from '@/components/equipmentManagement/bulkImport'
import addEquipmentType from '@/components/equipmentManagement/addEquipmentType'
Vue.use(Router)


// 重写路由
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

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
          path: '/workOrderManagement',
          name: 'workOrderManagement',
          component: workOrderManagement
        },
        {
          path: '/personOrder',
          name: 'personOrder',
          component: personOrder
        },
        {
          path: '/workTable',
          name: 'workTable',
          component: workTable
        },
        {
          path: '/workOrderDetails',
          name: 'workOrderDetails',
          component: workOrderDetails,
        },
        {
          path: '/Kuantan',
          name: 'Kuantan',
          component: Kuantan,
        },
        {
          path: '/synergyManagement',
          name: 'synergyManagement',
          component: synergyManagement
        },
        {
          path: '/personSynergy',
          name: 'personSynergy',
          component: personSynergy
        },
        {
          path: '/synergyInfo',
          name: 'synergyInfo',
          component: synergyInfo
        },
        {
          path: '/staffManagement',
          name: 'staffManagement',
          component: staffManagement
        },
        {
          path: '/NetworkList',
          name: 'NetworkList',
          component: NetworkList
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
          path: '/addCustomer',
          name: 'addCustomer',
          component: addCustomer
        },
        {
          path: '/CustomerNameList',
          name: 'CustomerNameList',
          component: CustomerNameList
        },
        {
          path: '/userInfo',
          name: 'userInfo',
          component: userInfo
        },
        {
          path: '/alterPassword',
          name: 'alterPassword',
          component: alterPassword
        },
        {
          path: '/checkUserInfo',
          name: 'checkUserInfo',
          component: checkUserInfo
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
          path: '/menuManagement',
          name: 'menuManagement',
          component: menuManagement
        },
        {
          path: '/addMenu',
          name: 'addMenu',
          component: addMenu
        },
        {
          path: '/addPermissionsButton',
          name: 'addPermissionsButton',
          component: addPermissionsButton
        },
        {
          path: '/addRole',
          name: 'addRole',
          component: addRole
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
          path: '/addCompany',
          name: 'addCompany',
          component: addCompany
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
      redirect: '/Home'
    }
  ]
})
