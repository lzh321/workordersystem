<template>
  <!-- 角色管理 -->
  <div class="roleManagement">
    <data-screening ref="getData" :type="type"></data-screening>
    <div class="dataList">
      <div class="dataList_top">
        <h2>数据列表</h2>
        <p class="layui-btn-container">
          <router-link
            to="/addRole"
            class="layui-btn layui-btn-normal layui-btn-sm"
            tag="button"
            type="button"
            v-if="add"
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
      type: "",
      add: false
    };
  },
  components: {
    dataScreening
  },
  methods: {
    getBtns(){
      this.$('tbody a').hide()
      this.$('.dataList_top').find('a').hide()
      // console.log(this.$('.content_main a'))
      var userId = this.$store.state.userId
      this.$axios({
        method: 'post',
        url: '/api/getAllRoleInfoByUserId',
        data: {
          userId: userId,
          seleUserId: userId
        }
      }).then((res) => {
        console.log(res)
        // debugger
        if (res.data.body.roleBtnList.length > 0) {
          var arr = []
          for (var i = 0; i < res.data.body.roleBtnList.length; i++) {
            if (res.data.body.roleBtnList[i].btnLimit) {
              arr.push(JSON.parse(res.data.body.roleBtnList[i].btnLimit))
            }
          }
          console.log(arr)
          var url = location.pathname + location.search
          console.log(url)
          var str = []
          for (var j = 0; j < arr.length; j++) {
            for (var z = 0; z < arr[j].length; z++) {
              if (arr[j][z].btns && arr[j][z].menuUrl == url) {
                console.log(arr[j][z].btns)
                str = arr[j][z].btns
              }
            }
          }
          if(str.length == 0){
            this.$('tbody a').hide()
          }else{
            var btn = str
            for (var h = 0; h < btn.length; h++) {
              for (var k = h + 1; k < btn.length; k++) {
                if (btn[h].btnCode == btn[k].btnCode) {         //第一个等同于第二个，splice方法删除第二个
                  btn.splice(k, 1);
                  k--;
                }
              }
            }
            var userBtn  = btn
            this.getBtnList(userBtn)
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getBtnList(userBtn){
        var btnList = userBtn
        console.log(btnList)
        console.log(this.$('.tabBtn'))
        var str = ''
        for(var z = 0; z < btnList.length;z++){
          if(btnList[z].btnName == '添加'){
            this.add = true
          }else{
            str += '<a class="'+btnList[z].btnCode+' layui-btn layui-btn-xs" lay-event="'+btnList[z].btnName+'" >'+btnList[z].btnName+'</a>'
          }
          // console.log(btnList[z].btnCode)
        }
        console.log(str)
        for(var j = 0; j < this.$('.tabBtn').length; j++){
          console.log(this.$(this.$('.tabBtn')[j]).html(str))
          this.$(this.$('.tabBtn')[j]).html(str)
        }
       
      
    }
  },
  mounted() {
    var _this = this;
    layui.use(["table", "form"], function() {
      var table = layui.table;
      var form = layui.form;
      var curr = ''
      setTimeout(()=>{
        curr = sessionStorage.getItem("curr") ? sessionStorage.getItem("curr") : 1
        _this.$refs.getData.serachData = sessionStorage.getItem("data") ? JSON.parse(sessionStorage.getItem("data")) : {}
      })
      form.render();
      form.on("submit(serach)", function(data) {
        data.field.userId = _this.$store.state.userId;
        sessionStorage.setItem("data",JSON.stringify(data.field))
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
        where: { userId: _this.$store.state.userId },
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
              field: "operation",
              title: "操作",
              align: "center",
              // toolbar: "#barDemo",
              templet: function(d) {
                return '<div class="tabBtn"></div>'
              }
            }
          ]
        ],
        done: function(res, curr, count){
          _this.getBtns()
          if(count == 0){
            sessionStorage.setItem("curr",1)
          }else{
            sessionStorage.setItem("curr",_this.$('.layui-laypage-skip').find(".layui-input").val())
          }
        }
      });

      setTimeout(()=>{
        table.reload("serachData", {
          url: "/api/getRoleInfoList",
          where: sessionStorage.getItem("data") ? JSON.parse(sessionStorage.getItem("data")) : {userId: _this.$store.state.userId},
          page: { curr: curr, limit: 10 },
        });
      })

      //监听行工具事件
      table.on("tool(roleManagement)", function(obj) {
        var data = obj.data;
        console.log(data);
        var roleId = data.roleId;
        if (obj.event === "删除") {
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
        } else if (obj.event === "编辑") {
          //编辑
          localStorage.setItem("roleId", roleId);
          localStorage.setItem("data", JSON.stringify(data));
          _this.$router.push("/addRole");
        } else if (obj.event === "菜单分配") {
          // 菜单分配
          layer.open({
            type: 1,
            title: "菜单分配",
            area: ["800px", "500px"],
            fixed: false, //不固定
            maxmin: true,
            content: `<form style="padding: 15px 15px 0;" id="menuAssignment" class="layui-form layui-form-pane">
                        <div style="display: flex;justify-content: space-between;margin-bottom:10px"><span>父级菜单</span><div style="display: flex;justify-content: space-between;width:55%"><span>子级菜单</span><span style="margin-right: 5px;">操作</span></div></div>
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
              setTimeout(()=>{
                _this.$axios.post("/api/getAllMenuList", {
                    userId: _this.$store.state.userId
                  }).then(res => {
                    console.log(res);
                    menuList = res.data.body;
                    var str = '<div style="border-bottom:1px solid #ccc;">';
                    for (var i = 0; i < menuList.length; i++) {
                      str +=
                        '<div id="menuList" style="display: flex;justify-content: space-between;border: 1px solid #ccc;border-bottom:none" ><span style="display: flex;justify-content: center;align-items: center;border-right:1px solid #ccc" class="boxmenu"><input type="checkbox" class="box" name="menu' +
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
                      str += "</div></div>";
                    }
                    str +='</div>'
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
                    }); 
                  });
              },100)
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
        } else if (obj.event === "按钮分配") {
          //按钮分配
          
          layer.open({
            type: 1,
            title: "按钮分配",
            area: ["800px", "500px"],
            fixed: false, //不固定
            maxmin: true,
            content: `<form style="padding: 15px 15px 0;" id="menuAssignment" class="layui-form layui-form-pane">
                        <div style="display: flex;justify-content: space-between;margin-bottom:10px;"><span style="flex: 1;">菜单名称</span><span style="margin-right: 5px;flex: 1;">操作</span><span style="margin-right: 5px;">全选</span></div>
                      </form>
                    `,
            btn: ["确定", "取消"],
            success: function() {
              var menuList = [];
              var roleList = [];
              var btnList = [];
              var btnlimit = [];
              var btns = []
              _this.$axios
                .post("/api/getBtnListByUserId", {
                  userId: _this.$store.state.userId,
                })
                .then(res => {
                  console.log(res);
                  res.data.body.list.forEach(item=>{
                    roleList.push(...JSON.parse(item.btnLimit))
                  })
                  for(var i = 0; i < roleList.length; i++){
                    for(var j =i+1; j < roleList.length; j++){
                      if(roleList[i].menuId == roleList[j].menuId){         //第一个等同于第二个，splice方法删除第二个
                          roleList.splice(j,1);
                          j--;
                      }
                    }
                  }
                  console.log(roleList,5555555)
                });

                _this.$axios
                  .post("/api/getRoleInfoAll", {
                    userId: _this.$store.state.userId,
                    roleId: data.roleId
                  })
                  .then(res => {
                    console.log(res)
                    btnList = res.data.body.menuBtnList
                    btnlimit = btnList[0].btnLimit ? JSON.parse(btnList[0].btnLimit) : []
                    console.log(btnlimit)
                    if(btnList[0].btnLimit && btnlimit.length > 0 && btnlimit[0].btns) {
                      for(var i = 0; i < btnlimit.length; i++){
                        // console.log(btnlimit[i].btns)
                        btnlimit[i].btns.forEach((item,index)=>{
                          // console.log(item)
                          btns.push(item)
                        })
                      }
                    }
                  });
              setTimeout(()=>{
                _this.$axios
                  .post("/api/getMenuListByRoleId", {
                    userId: _this.$store.state.userId,
                    seleRoleId: data.roleId
                  })
                  .then(res => {
                    console.log(res);
                    menuList = res.data.body.menuList;
                   
                    var str = '<div style="border-bottom:1px solid #ccc;">';
                    for (var i = 0; i < menuList.length; i++) {
                      if(menuList[i].menuPno !== 1){
                        str +=
                          '<div class="btnsBox" style="display: flex;justify-content: space-between;border:1px solid #ccc;border-bottom:none;align-items: center;"><span style="display: flex;align-items: center;width:130px;padding-left:10px">' +
                          menuList[i].menuName +
                          '</span><div id="btnList" style="flex:1;border-left:1px solid #ccc;padding: 10px 0;">'
                          for(var z = 0; z < roleList.length; z++){
                            if(menuList[i].menuId == roleList[z].menuId){
                              roleList[z].btns.forEach(item=>{
                                str += '<input type="checkbox" class="box" data-id="'+roleList[z].menuId+'" data-code="'+item.btnCode + '" name="'+roleList[z].menuId + item.btnCode+'" title="'+item.btnName+'" value=' + "'" + '{"menuId":"' + roleList[z].menuId + '","menuUrl":"' + roleList[z].menuUrl + '"' + ',"btns":[{' + '"btnCode":"' + item.btnCode + '",' + '"btnName":"' + item.btnName + '"' + "}]}'" + ' lay-skin="primary" lay-filter="btnBox">'
                              })
                            }
                          }
                          str+='</div><input type="checkbox" class="box"  name="" title="" value="" lay-skin="primary" lay-filter="checkAll"></div>';
                      }
                    }
                    str += '</div>'
                    _this.$("#menuAssignment").append(str);
                     
                    // console.log(_this.$(".box"));
  
                    console.log(btnlimit,btns)
                    for (var z = 0; z < btnlimit.length; z++) {
                      for (var j = 0; j < _this.$(".box").length; j++) {
                        // console.log(_this.$(_this.$(".box")[j]))
                        // console.log(_this.$(".box")[j].dataset.code)
                        if (btnlimit[z].menuId == _this.$(".box")[j].dataset.id) {
                          for(var h = 0; h < btnlimit[z].btns.length; h++){
                            if(btnlimit[z].btns[h].btnCode == _this.$(".box")[j].dataset.code){
                              _this.$(".box")[j].checked = true;
                            }
                          }
                        }
                      }
                    }
                    setTimeout(()=>{
                      form.render();
                    })
                  });
              },100)

              form.on("checkbox(checkAll)",function(data){
                var box = _this.$(data.elem).parent().find(".box")
                // console.log(box)
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
            },
            yes: function(index, layero) {
              // 获取当前用户的角色
              var menuAssignment = _this.$("#menuAssignment").serializeObject();
              console.log(menuAssignment,1111)
              var arr = [];
              Object.keys(menuAssignment).forEach(function(key) {
                // console.log(key)
                arr.push(JSON.parse(menuAssignment[key]));
              });
              for(var i = 0; i < arr.length; i++){
                for(var j =i+1; j < arr.length; j++){
                  if(arr[i].menuId == arr[j].menuId){         //第一个等同于第二个，splice方法删除第二个
                      arr[i].btns.push(arr[j].btns[0])
                      arr.splice(j,1);
                      j--;
                  }
                }
              }
              // for(var z = 0; z < arr.length; z++){
              //   delete(arr[z].btnCode)
              // }

              // console.log(data);
              console.log(arr);
              

              _this.$axios
                .post("/api/allotBtnLimit", {
                  userId: _this.$store.state.userId,
                  roleId: data.roleId,
                  btnlimit: JSON.stringify(arr)
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
        }
      });
    });
  },
  created() {
    localStorage.clear();
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
  },
  updated() {
      layui.use("form", function() {
        layui.form.render();
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