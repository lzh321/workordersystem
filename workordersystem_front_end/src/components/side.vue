<template>
  <div class="side">
    <ul class="side_nav">
      <router-link
        v-for="(nav_item, index) in nav"
        :key="index"
        ref="nav"
        :class="{active:index === num}"
        tag="li"
        :to="nav_item.path ? nav_item.path : ''"
      >
        <span @click="active(index,nav_item.nav_name)">{{nav_item.nav_name}}</span>
        <div v-if="nav_item.children ? true : false" class="children_item" :class="{active:index === num}">
          <router-link tag="p"  v-for="(item,index)  in nav_item.children" :key="index" :to="item.path ? item.path : ''">{{item.name}}</router-link>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Side",
  data() {
    return {
      num: 0,
      nav: [
        { nav_name: "工作台" , path: '/workTable'},
        { nav_name: "工单管理", path: '/workOrderManagement'},
        { nav_name: "协同管理", path: '/synergyManagement' },
        { nav_name: "用户管理", children:[{name: '员工管理', path: '/staffManagement'}, {name: '合作行网点管理', path: '/EnterpriseNetwork'}]},
        { nav_name: "系统管理", children:[{name: '企业机构管理', path: '/businessEnterprise'}, {name: '消息模块管理',path: '/messageModule'},{name: '消息推送列表',path: '/messagePushList'}] },
        { nav_name: "设备管理", children:[{name: '设备列表', path: '/equipmentList'}, {name: '设备类型管理', path: '/equipmentType'}] }
      ]
    };
  },
  methods: {
    active: function(index,name) {
      this.num = index;
      this.$emit("titleFn", name)
      // console.log(name)
    }
  },
  created() {
    this.$router.push('/workTable')
  },
};
</script>


<style scoped>
.side {
  width: 180px;
  background: #28324b;
  height: 100%;
  color: aliceblue;
  overflow: hidden;
  overflow-y: scroll;
}
.side_nav li {
  min-height: 70px;
  width: 100%;
  border-bottom: 1px solid #224977;
  text-align: center;
  line-height: 70px;
  display: flex;
  flex-direction: column;
}
.side_nav li:hover {
  background: #151f38;
  box-shadow: 0px -1px 8px 0px #224977 inset;
}
.side_nav li span{
  display: inline-block;
  width: 100%;
  height: 100%;
}
.children_item {
  display: none;
}
.side_nav li .children_item p{
  height: 50px;
  background: #314093;
  line-height: 50px;
  font-size: 13px;
}
.side_nav li .children_item p:hover{
  background: #16266e
}
.active {
  background: #151f38;
  display: block;
}
.side::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
</style>