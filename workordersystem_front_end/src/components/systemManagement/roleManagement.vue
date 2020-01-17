<template>
  <!-- 角色管理 -->
  <div class="roleManagement">
    <data-screening :type="type"></data-screening>
    <div class="dataList">
      <div class="dataList_top">
        <h2>数据列表</h2>
        <p class="layui-btn-container">
          <router-link
            to="/addRole"
            class="layui-btn layui-btn-normal layui-btn-sm"
            tag="button"
            type="button"
          >
            <i class="layui-icon">&#xe608;</i> 添加
          </router-link>
        </p>
      </div>
      <div class="dataList_table">
        <table id="roleManagement" lay-filter="roleManagement" lay-data="{id: 'serachData'}"></table>
        <!-- <div id="barDemo" style="display:none">
          <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
          <a class="layui-btn layui-btn-xs" lay-event="menuAssignment">菜单分配</a>
          <a class="layui-btn layui-btn-xs" style="display:none" lay-event="buttonAssign">按钮分配</a>
          <a class="layui-btn layui-btn-xs" lay-event="deletion">删除</a>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import dataScreening from "../dataScreening";
export default {
  name: "roleManagement",
  data() {
    return {
      type: ""
    };
  },
  components: {
    dataScreening
  },
  mounted() {
    var _this = this;
    layui.use(["table", "form"], function() {
      var table = layui.table;
      var form = layui.form;
      form.render();
      form.on("submit(serach)", function(data) {
        data.field.userId = _this.$store.state.userId;
        console.log(data.field);
        table.reload("serachData", {
          url: "/api/getRoleInfoList",
          where: data.field,
          page: { curr: 1, limit: 10 }
        });
      });
      //第一个实例
      table.render({
        elem: "#roleManagement",
        url: "/api/getRoleInfoList", //数据接口
        method: "post",
        id: "serachData",
        parseData: function(res) {
          //res 即为原始返回的数据
          return {
            code: res.retCode, //解析接口状态
            msg: res.retMsg, //解析提示文本
            count: res.body.totalCount, //解析数据长度
            data: res.body.roleList //解析数据列表
          };
        },
        request: {
          pageName: "currentPage", //页码的参数名称，默认：page
          // curr: 'indexCount', //页码的参数名称，默认：page
          limitName: "everyCount" //每页数据量的参数名，默认：limit
        },
        page: true, //开启分页
        // limit: 10,
        cols: [
          [
            //表头

            {
              field: "xuhao",
              title: "序号",
              width: 200,
              fixed: "left",
              sort: false,
              align: "center",
              type: "numbers"
            },
            {
              field: "roleId",
              title: "角色编号",
              width: 200,
              sort: false,
              align: "center",
              hide: true
            },
            {
              field: "roleName",
              title: "角色名称",
              sort: false,
              align: "center"
            },
            {
              field: "roleName",
              title: "操作",
              align: "center",
              // toolbar: "#barDemo",
              templet: function(d) {
                console.log(d.roleName)
                
                  return '<div id="barDemo" ><a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a><a class="layui-btn layui-btn-xs" lay-event="menuAssignment">菜单分配</a><a class="layui-btn layui-btn-xs" style="display:none" lay-event="buttonAssign">按钮分配</a><a class="layui-btn layui-btn-xs" lay-event="deletion">删除</a></div>'
                
              }
            }
          ]
        ]
      });

      //监听行工具事件
      table.on("tool(roleManagement)", function(obj) {
        var data = obj.data;
        console.log(data);
        var roleId = data.roleId;
        if (obj.event === "deletion") {
          layer.confirm(
            "你确定要删除这条记录？",
            { icon: 3, title: "提示" },
            function(index) {
              //向服务端发送删除指令
              var delParam = {
                userId: _this.$store.state.userId,
                roleId: roleId
              };
              _this.$axios.post("/api/deleRoleInfo", delParam).then(res => {
                console.log(res);
                if (res.data.retCode == "000000") {
                  layer.msg(res.data.retMsg, { icon: 1 });
                  obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                  layer.close(index);
                } else {
                  layer.msg(res.data.retMsg, { icon: 2 });
                }
              });
            }
          );
        } else if (obj.event === "edit") {
          //编辑
          sessionStorage.setItem("roleId", roleId);
          sessionStorage.setItem("data", JSON.stringify(data));
          _this.$router.push("/addRole");
        } else if (obj.event === "menuAssignment") {
          // 菜单分配
          layer.open({
            type: 1,
            title: "菜单分配",
            area: ["800px", "500px"],
            fixed: false, //不固定
            maxmin: true,
            content: `<form style="padding: 15px 15px 0;" id="menuAssignment" class="layui-form layui-form-pane">
                        <div style="display: flex;justify-content: space-between"><span>父级菜单</span><div style="display: flex;justify-content: space-between;width:55%"><span>子级菜单</span><span style="margin-right: 5px;">操作</span></div></div>
                      </form>
                    `,
            btn: ["确定", "取消"],
            success: function() {
              form.on("checkbox(check)", function(data) {
                
                if (_this.$(data.elem).is(":checked")) {
                  _this.$(data.elem).parents("#menuList").find(".boxmenu .box")[0].checked = true;
                }
                var box = _this.$(data.elem).parents(".childrenMenu").find(".box")
                  box.each(function(i) {
                  // 判断input=checkbox被选中
                   if(_this.$(this).is(':checked')){
                       _this.$(data.elem).parents("#menuList").find(".boxmenu .box")[0].checked = true;
                      return false
                   }else{
                       _this.$(data.elem).parents("#menuList").find(".boxmenu .box")[0].checked = false;
                   }
                  });
                form.render();
              });
              form.on("checkbox(checks)",function(data){
                var box = _this.$(data.elem).parents("#menuList").find(".childrenMenu").find(".box")
                console.log(box)
                if (_this.$(data.elem).is(":checked")) {
                  for(var i = 0; i < box.length; i++){
                    box[i].checked = true
                  }
                }else{
                  for(var i = 0; i < box.length; i++){
                    box[i].checked = false
                  }
                }
                form.render();
              })
              var userMenuList = [];
              var menuList = [];

              _this.$axios
                .post("/api/getMenuListByRoleId", {
                  userId: _this.$store.state.userId,
                  seleRoleId: data.roleId
                })
                .then(res => {
                  console.log(res);
                  userMenuList = res.data.body.menuList;
                });

              _this.$axios
                .post("/api/getAllMenuList", {
                  userId: _this.$store.state.userId
                })
                .then(res => {
                  console.log(res);
                  menuList = res.data.body;
                  var str = "";
                  for (var i = 0; i < menuList.length; i++) {
                    str +=
                      '<div id="menuList" style="display: flex;justify-content: space-between;border: 1px solid #ccc;" ><span style="display: flex;justify-content: center;align-items: center;border-right:1px solid #ccc" class="boxmenu"><input type="checkbox" class="box" name="menu' +
                      menuList[i].menuId +
                      '" title="' +
                      menuList[i].menuName +
                      '" value="' +
                      menuList[i].menuId +
                      '" lay-skin="primary" lay-filter="checks"></span><div class="childrenMenu" style="display: flex;justify-content: space-between; flex-direction: column;width:57%">';

                    for (var j = 0; j < menuList[i].sonList.length; j++) {
                      str +=
                        '<div style="display: flex;justify-content: space-between"><span style="width:90px;text-align:center">' +
                        menuList[i].sonList[j].menuName +
                        '</span><input type="checkbox" class="box" name="menu' +
                        menuList[i].sonList[j].menuId +
                        '" title="" value="' +
                        menuList[i].sonList[j].menuId +
                        '" lay-skin="primary" lay-filter="check"></div>';
                    }

                    // if(menuList[i].menuPno !== 1){

                    //    str += '<span>'+ menuList[i].menuName +'</span><span><input type="checkbox" class="box" name="menu'+menuList[i].menuId +'" title="" value="'+ menuList[i].menuId +'" lay-skin="primary"></span>'

                    // }
                    str += "</div></div>";
                  }
                  _this.$("#menuAssignment").append(str);

                  for (var z = 0; z < userMenuList.length; z++) {
                    for (var j = 0; j < _this.$(".box").length; j++) {
                      if (userMenuList[z].menuId == _this.$(".box")[j].value) {
                        _this.$(".box")[j].checked = true;
                        
                      }
                      if (_this.$(".box")[j].checked == true) {
                        _this.$(_this.$(".box")[j]).parents("#menuList").find(".boxmenu .box")[0].checked = true;
                      }
                    }
                  }
                  console.log(_this.$(".box"));
                  setTimeout(() => {
                    form.render();
                  }, 200);
                });
            },
            yes: function(index, layero) {
              // 获取当前用户的角色
              var menuAssignment = _this.$("#menuAssignment").serializeObject();
              var arr = [];
              Object.keys(menuAssignment).forEach(function(key) {
                arr.push(menuAssignment[key]);
              });
              console.log(data);
              console.log(arr);

              _this.$axios
                .post("/api/allotMenuInfo", {
                  userId: _this.$store.state.userId,
                  roleId: data.roleId,
                  menuIds: arr.toString()
                })
                .then(res => {
                  console.log(res);
                  if (res.data.retCode == "000000") {
                    layer.msg(res.data.retMsg, { icon: 1 });
                    setTimeout(() => {
                      _this.$router.push("/roleManagement?type=roleManagement");
                    }, 3000);
                  } else {
                    layer.msg(res.data.retMsg, { icon: 2 });
                  }
                });
              layer.close(index);
              return false;
            },
            btnAlign: "c"
          });
          return false;
        } else if (obj.event === "buttonAssign") {
          //按钮分配
        }
      });
    });
  },
  created() {
    sessionStorage.clear();
    this.type = this.$route.query.type;
    var data = {
      userId: this.$store.state.userId,
      currentPage: 1,
      everyCount: 10
    };
    this.$axios
      .post("/api/getRoleInfoList", data)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.dataList .dataList_top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px 15px 20px;
}
.dataList .dataList_top h2 {
  font-size: 13px;
  font-weight: 600;
}
.dataList .dataList_top p {
  margin-right: 48px;
}
/* .dataList .dataList_top p button {
  border: none;
  border-radius: 2px;
  width: 70px;
  height: 30px;
  background: #0079fe;
  color: #fff;
  font-size: 13px;
  margin: 0 10px;
} */

.dataList .dataList_table {
  padding: 0 15px;
}
.dataList .dataList_table td {
  font-size: 13px !important;
}
.dataList .dataList_table td .btn {
  font-size: 13px !important;
  color: blue !important;
}
</style>