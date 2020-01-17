<template>
  <div class="side">
    <ul id="nav" class="side_nav layui-nav layui-nav-tree layui-nav-side" lay-filter="side">
      <li
        v-for="(items,index) in menuList"
        :key="items.menuId"
        :class="index == curId ? 'layui-nav-item layui-this' : 'layui-nav-item'"
        @click="active(items.menuName,index)"
      >
        <router-link :to="items.menuUrl ? items.menuUrl : ''" tag="a">{{items.menuName}}</router-link>
      </li>
      <li
        v-for="nav_item in parentMenus"
        :key="nav_item.menuId"
        class="layui-nav-item"
        @click="active(nav_item.menuName)"
      >
        <router-link :to="nav_item.menuUrl ? nav_item.menuUrl : ''" tag="a">{{nav_item.menuName}}</router-link>
        <dl v-if="nav_item.menuPno == 1" class="layui-nav-child">
          <dd
            v-for="item in childrens"
            :key="item.menuId"
            @click="actives(item.menuName)"
            v-show="nav_item.menuNo == item.menuPno ? true : false"
          >
            <router-link :to="item.menuUrl ? item.menuUrl : ''" tag="a">{{item.menuName}}</router-link>
          </dd>
        </dl>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Side",
  inject: ["reload"],
  data() {
    return {
      childrens: [],
      parentMenus: [],
      curId: 0,
      menuList: [
        { menuName: "工作台", menuUrl: "/workTable?type=workTable" },
        {
          menuName: "工单管理",
          menuUrl: "/workOrderManagement?type=workOrderManagement"
        },
        {
          menuName: "协同管理",
          menuUrl: "/synergyManagement?type=synergyManagement"
        }
        // {
        //   menuName: "菜单管理",
        //   menuUrl: "/menuManagement?type=menuManagement"
        // },
      ],
      queryType: ""
    };
  },
  methods: {
    active: function(title, index) {
      this.curId = index;
      this.$emit("titleFn", title);
      layui.use("element", function() {
        layui.element.render();
      });
    },
    actives: function(title) {
      // console.log(title);
      this.$emit("titleFn", title);
    },
    getData: function() {
      var data = {
        userId: this.$store.state.userId,
        seleUserId: this.$store.state.userId,
      };
      // this.$axios.post("/api/getMenuList", data).then(res => {
      //   console.log(res);
      //   for (var i = 0; i < res.data.body.menuList.length; i++) {
      //     if (res.data.body.menuList[i].menuPno == 1) {
      //       this.parentMenus.push(res.data.body.menuList[i]);
      //     } else {
      //       this.childrens.push(res.data.body.menuList[i]);
      //     }
      //   }
      // });
      this.$axios.post("/api/getMenuListByUserId", data).then(res => {
        console.log(res);
        //去重
        // var arr = res.data.body.menuList;
        // var obj = {}
        // let menuList = arr.reduce((cur, next) => {
        //   obj[next.menuPno] ? "" : (obj[next.menuPno] = true && cur.push(next));
        //   return cur;
        // }, []);
        // console.log(menuList);

        for (var i = 0; i < res.data.body.menuList.length; i++) {
          for (var i = 0; i < res.data.body.menuList.length; i++) {
            if (res.data.body.menuList[i].menuPno == 1) {
              this.parentMenus.push(res.data.body.menuList[i]);
            } else {
              this.childrens.push(res.data.body.menuList[i]);
            }
          }
        }
      });
    }
  },
  mounted() {
    var _this = this;
    layui.use("element", function() {
      _this
        .$("#nav")
        .find("span.layui-nav-bar")
        .remove();
      var element = layui.element;
      element.render();
    });
  },
  created() {
    this.getData();
    if (this.$route.query.type !== "workTable") {
      this.$router.push("/workTable?type=workTable");
    }
  },
  computed: {
    // parentMenu() {
    //   return this.parentMenus.reverse();
    // },
    // children() {
    //   return this.childrens.reverse();
    // }
  },
  updated() {
    var _this = this;
    layui.use("element", function() {
      _this
        .$("#nav")
        .find("span.layui-nav-bar")
        .remove();
      layui.element.render();
    });
  }
};
</script>


<style scoped>
.side {
  width: 180px;
  background: #393d49;
  height: 100%;
  color: aliceblue;
  overflow: hidden;
  /* overflow: hidden;
  overflow-y: scroll; */
}
.side_nav {
  position: initial;
  width: 197px;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
}
.side_nav li {
  width: 180px;
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