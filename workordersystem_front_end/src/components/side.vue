<template>
  <div class="side">
    <ul class="side_nav layui-nav layui-nav-tree layui-nav-side">
      <li
        v-for="(nav_item, index) in nav"
        :key="index"
        ref="nav"
        tag="li"
        class="layui-nav-item"
      >
        <router-link :to="nav_item.path ? nav_item.path : ''" tag="a">{{nav_item.nav_title}}</router-link>
        <dl
          v-if="nav_item.children ? true : false"
          class="layui-nav-child"
        >
          <router-link
            tag="dd"
            v-for="(item,index)  in nav_item.children"
            :key="index"
            :to="item.path ? item.path : ''"
          >
            <a>{{item.title}}</a>
          </router-link>
        </dl>
      </li>
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
        { nav_title: "工作台", path: "/workTable?type=workTable" },
        {
          nav_title: "工单管理",
          path: "/workOrderManagement?type=workOrderManagement"
        },
        {
          nav_title: "协同管理",
          path: "/synergyManagement?type=synergyManagement"
        },
        {
          nav_title: "用户管理",
          children: [
            {
              title: "员工管理",
              path: "/staffManagement?type=staffManagement"
            },
            {
              title: "投放点管理",
              path: "/NetworkList?type=NetworkList"
            },
            {
              title: "客户列表",
              path: "/CustomerNameList?type=CustomerNameList"
            },
            
          ]
        },
        {
          nav_title: "系统管理",
          children: [
            {
              title: "企业机构管理",
              path: "/businessEnterprise?type=businessEnterprise"
            },
            {
              title: "菜单管理",
              path: "/menuManagement?type=menuManagement"
            },
            {
              title: "角色管理",
              path: "/roleManagement?type=roleManagement"
            },
            {
              title: "权限按钮",
              path: "/permissionsButton?type=permissionsButton"
            },
            {
              title: "消息模块管理",
              path: "/messageModule?type=messageModule"
            },
            {
              title: "消息推送列表",
              path: "/messagePushList?type=messagePushList"
            }
          ]
        },
        {
          nav_title: "设备管理",
          children: [
            { title: "设备列表", path: "/equipmentList?type=equipmentList" },
            { title: "设备类型管理", path: "/equipmentType?type=equipmentType" }
          ]
        }
      ],
      queryType: ""
    };
  },
  methods: {
    active: function(index, title) {
      this.num = index;
      this.$emit("titleFn", title);
      // console.log(title)
    },
    actives: function(title) {
      this.$emit("titleFn", title);
      console.log(title);
    }
  },
  mounted(){
    layui.use('element', function(){
      var element = layui.element;
      element.render()
      //…
    });
  },
  created() {
    if (this.$route.query.type !== "workTable") {
      this.$router.push("/workTable?type=workTable");
    }
    var data = {
      userId: this.$store.state.userId,

    }
    this.$axios.post('/api/getFatherMenuList',this.$store.state.userId).then(res=>{
      console.log(res)
    })
  }
};
</script>


<style scoped>
.side {
  width: 180px;
  background: #393D49;
  height: 100%;
  color: aliceblue;
  /* overflow: hidden;
  overflow-y: scroll; */
}
.side_nav{
  position: initial;
  width: 180px;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
}

/* .side_nav li {
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
.side_nav li span {
  display: inline-block;
  width: 100%;
  height: 100%;
}
.children_item {
  display: none;
}
.side_nav li .children_item p {
  height: 50px;
  background: #314093;
  line-height: 50px;
  font-size: 13px;
}
.side_nav li .children_item p:hover {
  background: #16266e;
} */
/* .active {
  display: block;
} */
.side_nav::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
</style>