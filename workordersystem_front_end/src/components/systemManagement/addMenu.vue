<template>
  <!-- 新增菜单 -->
  <div class="addMenu">
    <form class="layui-form layui-form-pane" action>
      <div class="info">
        <span>基础信息</span>
        <span>为必填项</span>
      </div>

      <div class="layui-form-item" v-if=" menuPno  ? false : true ">
        <label class="layui-form-label">菜单类型</label>
        <div class="layui-input-block">
          <select name="menuType" lay-verify="required" lay-search lay-filter="menuType">
            <option value>请选择菜单类型</option>
            <option value="1">父级菜单</option>
            <option value="2">子级菜单</option>
          </select>
        </div>
      </div>

      <div class="layui-form-item" v-show="isMenuPno">
        <label class="layui-form-label">父级菜单</label>
        <div class="layui-input-block">
          <select name="menuPno" lay-search>
            <option value>请选择父级菜单</option>
            <option
              v-for="(item) in menuList"
              :key="item.menuId"
              :value="item.menuNo"
              :selected="item.menuNo == menuInfo.menuPno ? true : false"
            >{{item.menuName}}</option>
          </select>
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">菜单名称</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="menuName"
            lay-verify="required"
            placeholder="请输入菜单名称"
            autocomplete="off"
            class="layui-input"
            :value="menuInfo.menuName ? menuInfo.menuName : ''"
          />
        </div>
      </div>

      <div class="layui-form-item" v-if="isMenuPno">
        <label class="layui-form-label">菜单URL</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="menuUrl"
            lay-verify
            placeholder="请输入菜单URL"
            autocomplete="off"
            class="layui-input"
            :value="menuInfo.menuUrl ? menuInfo.menuUrl : null"
          />
        </div>
      </div>

      <div class="layui-form-item" style="text-align:center">
        <div class="layui-input-block">
          <button class="layui-btn" lay-submit lay-filter="addMenu">确认</button>
          <button type="reset" class="layui-btn layui-btn-primary">重置</button>
          <button @click="cancel" class="layui-btn layui-btn-primary">取消</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "addMenu",
  data() {
    return {
      menuPno: "",
      isShowMenuPno: false,
      isMenuPno: false,
      menuList: [],
      menuInfo: localStorage.getItem("data")
        ? JSON.parse(localStorage.getItem("data"))
        : ""
    };
  },
  methods: {
    send() {
      var userId = this.$store.state.userId;
      var data = {
        userId: userId
      };
      this.$axios.post("/api/getFatherMenuList", userId).then(res => {
        console.log(res);
        this.menuList = res.data.body.menuList;
      });
    },
    cancel() {
      this.$router.push("/menuManagement?type=menuManagement");
    }
  },
  mounted() {
    //Demo
    var _this = this;
    layui.use("form", function() {
      var form = layui.form;
      form.render();
      form.on("select(menuType)", function(data) {
        console.log(data);
        if (data.value == 1) {
          _this.isShowMenuPno = false;
          _this.isMenuPno = false;
        }
        if (data.value == 2) {
          _this.isShowMenuPno = true;
          _this.isMenuPno = true;
        }
      });
      //监听提交
      form.on("submit(addMenu)", function(data) {
        var menuId = localStorage.getItem("menuId")
          ? localStorage.getItem("menuId")
          : "";
        var menuPno = localStorage.getItem("menuPno")
          ? localStorage.getItem("menuPno")
          : "";
        data.field.userId = _this.$store.state.userId;
        if (menuId === null || menuId === "" || menuId === undefined) {
          _this.$axios.post("/api/addMenuInfo", data.field).then(res => {
            console.log(res);
            if (res.data.retCode == "000000") {
              layer.msg(res.data.retMsg, { icon: 1 });
              setTimeout(() => {
                _this.$router.push("/menuManagement?type=menuManagement");
              }, 3000);
            } else {
              layer.msg(res.data.retMsg, { icon: 2 });
            }
          });
        } else {
          data.field.menuId = menuId;
          if (menuPno == 1) {
            data.field.menuPno = menuPno;
          }
          console.log(data.field);
          _this.$axios.post("/api/alterMenuInfo", data.field).then(res => {
            console.log(res);
            if (res.data.retCode == "000000") {
              layer.msg(res.data.retMsg, { icon: 1 });
              setTimeout(() => {
                _this.$router.push("/menuManagement?type=menuManagement");
              }, 3000);
            } else {
              layer.msg(res.data.retMsg, { icon: 2 });
            }
          });
        }
        return false;
      });
    });
  },
  created() {
    this.menuPno = localStorage.getItem("menuPno");
    if (
      this.menuPno == "" ||
      this.menuPno == null ||
      this.menuPno == undefined
    ) {
      this.isShowMenuPno = false;
      this.isMenuPno = false;
    } else if (this.menuPno == 1) {
      this.isShowMenuPno = false;
      this.isMenuPno = false;
    } else {
      this.isShowMenuPno = true;
      this.isMenuPno = true;
    }
    this.send();
  },

  updated() {
    layui.use("form", function() {
      var form = layui.form;
      form.render();
    });
  }
};
</script>

<style scoped>
.addMenu {
  padding: 15px 15px 0;
}
.layui-btn {
  padding: 0 50px;
}
.layui-form-label {
  display: flex;
  align-items: center;
}
.layui-form-label::before {
  content: "*";
  font-size: 20px;
  display: inline-block;
  color: red;
  line-height: 30px;
  height: 20px;
}
.info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}
.info span {
  display: flex;
  align-items: center;
  font-weight: 600;
}
.info span:nth-child(2) {
  font-weight: 400;
  color: #c2c2c2;
}
.info span:nth-child(2)::before {
  content: "*";
  font-size: 20px;
  display: inline-block;
  color: red;
  line-height: 30px;
  height: 20px;
}
</style>