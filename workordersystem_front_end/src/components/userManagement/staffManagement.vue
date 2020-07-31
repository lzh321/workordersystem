<template>
  <!-- 员工管理 -->
  <div class="staffManagement">
    <data-screening ref="getData" :type="type"></data-screening>
    <div class="dataList">
      <div class="dataList_top">
        <h2>数据列表</h2>
        <p>
          <router-link to="/addUser" v-if="add" tag="button" class="add layui-btn layui-btn-normal layui-btn-sm"><i class="layui-icon">&#xe608;</i>添加</router-link>
        </p>
      </div>
      <div class="dataList_table">
        <table id="staffManagement" lay-filter="staffManagement" lay-data="{id:'serachData'}"></table>
      </div>
    </div>
  </div>
</template>

<script>
import dataScreening from "../dataScreening";
import getData from '../../assets/js/getdata'
export default {
  name: "staffManagement",
  inject: ["reload"],
  data() {
    return {
      type: "",
      btnList: [] ,
      url: "", 
      add: false
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
      var curr = ''
      setTimeout(()=>{
        curr = sessionStorage.getItem("curr") ? sessionStorage.getItem("curr") : 1
        _this.$refs.getData.serachData = sessionStorage.getItem("data") ? JSON.parse(sessionStorage.getItem("data")) : {}
      })
      form.render();
      form.on("submit(serach)", function(data) {
        data.field.userId = _this.$store.state.userId;
        data.field.seleUserName = data.field.val;
        data.field.seleUserPhone = data.field.val;
        data.field.seleUserId = data.field.val;
        sessionStorage.setItem("data",JSON.stringify(data.field))
        console.log(data.field);
        table.reload("serachData", {
          url: "/api/getUserList",
          where: data.field,
          page: { curr: 1, limit: 10 }
        });
      });
      //第一个实例
      table.render({
        elem: "#staffManagement",
        url: "/api/getUserList", //数据接口
        method: "post",
        id: "serachData",
        where: { userId: _this.$store.state.userId },
        parseData: function(res) {
          //res 即为原始返回的数据
          return {
            code: res.retCode, //解析接口状态
            msg: res.retMsg, //解析提示文本
            count: res.body.totalCount, //解析数据长度
            data: res.body.userList //解析数据列表
          };
        },
        page: true, //开启分页
        request: {
          pageName: "currentPage", //页码的参数名称，默认：page
          limitName: "everyCount" //每页数据量的参数名，默认：limit
        },
        cols: [
          [
            //表头
            {
              field: "userName",
              title: "员工姓名",
              sort: false,
              align: "center"
            },
            {
              field: "userSex",
              title: "性别",
              sort: false,
              align: "center",
              templet: function(d) {
                return d.userSex == 0 ? "男" : "女";
              }
            },
            {
              field: "orgName",
              title: "机构名称",
              sort: false,
              align: "center"
            },
            { field: "deptName", title: "所属部门", align: "center" ,hide: true},
            { field: "jobName", title: "当前职务", align: "center" ,hide: true},
            {
              field: "userId",
              title: "登录账号",
              sort: false,
              align: "center"
            },
            { field: "userPhone", title: "手机", sort: false, align: "center" },
            { field: "userState", title: "状态", sort: false, align: "center",templet: function(d) {
              if(d.userState == 0){
                return '启用'
              }else {
                return '禁用'
              }

            }},
            {
              field: "operation",
              title: "操作",
              width: 300,
              align: "center",
              templet: function(d) {
                // if(d.userId == 'admin'){
                //   return '<a class="edit layui-btn layui-btn-xs" lay-event="edit" >编辑</a><a class="role-parts layui-btn layui-btn-xs layui-btn-disabled">角色分配</a><a class="layui-btn layui-btn-xs layui-btn-disabled invoke" >启用</a><a class="layui-btn layui-btn-xs check" lay-event="check">查看</a>';
                // }else if(d.userState == 0){
                //   return '<a class="edit layui-btn layui-btn-xs" lay-event="edit" >编辑</a><a class="layui-btn layui-btn-xs role-parts" lay-event="rolesAllocation">角色分配</a><a class="disabled layui-btn layui-btn-xs layui-btn-danger" lay-event="Disable">禁用</a><a class="layui-btn layui-btn-xs check" lay-event="check" >查看</a>'
                // }else if(d.userState == 1) {
                //   return '<a class="edit layui-btn layui-btn-xs layui-btn-disabled" >编辑</a><a class="layui-btn layui-btn-xs layui-btn-disabled role-parts">角色分配</a><a class="layui-btn layui-btn-xs invoke" lay-event="Enable">启用</a><a class="layui-btn layui-btn-xs check" lay-event="check">查看</a>'
                // }
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
          url: "/api/getUserList",
          where: sessionStorage.getItem("data") ? JSON.parse(sessionStorage.getItem("data")) : {userId: _this.$store.state.userId},
          page: { curr: curr, limit: 10 }
        });
      })
      
      //监听行工具事件
      table.on("tool(staffManagement)", function(obj) {
        console.log(obj)
        var data = obj.data;
        console.log(data);
        var alterId = data.userId;
        console.log(alterId);
        if (obj.event === "禁用") {
          layer.confirm(
            "你确定要禁用这条记录？",
            { icon: 3, title: "提示" },
            function(index) {
              //向服务端发送禁用指令
              var delParam = {
                userId: _this.$store.state.userId,
                alterId: alterId
              };
              _this.$axios.post("/api/forbiddenUser", delParam).then(res => {
                console.log(res);
                if (res.data.retCode == "000000") {
                  layer.msg(res.data.retMsg, { icon: 1 });
                  // obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                  layer.close(index);
                  setTimeout(function(){
                    _this.reload()
                  },3000)
                } else {
                  layer.msg(res.data.retMsg, { icon: 2 });
                }
              });
            }
          );
        }else if (obj.event === "启用") {
          layer.confirm(
            "你确定要启用这条记录？",
            { icon: 3, title: "提示" },
            function(index) {
              //向服务端发送启用指令
              var delParam = {
                userId: _this.$store.state.userId,
                alterId: alterId
              };
              _this.$axios.post("/api/activeUser", delParam).then(res => {
                console.log(res);
                if (res.data.retCode == "000000") {
                  layer.msg(res.data.retMsg, { icon: 1 });
                  // obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                  layer.close(index);
                  setTimeout(function(){
                    _this.reload()
                  },3000)
                } else {
                  layer.msg(res.data.retMsg, { icon: 2 });
                }
              });
            }
          );
        } else if (obj.event === "编辑") {
          //编辑
          localStorage.setItem("alterId", alterId);
          localStorage.setItem("data", JSON.stringify(data));
          _this.$router.push("/addUser");
        } else if (obj.event === "角色分配") {
          // 角色分配
          layer.open({
            type: 1,
            title: "角色分配",
            area: ["600px", "400px"],
            fixed: false, //不固定
            maxmin: true,
            content: `<form id="rolesAllocation" style="display:flex;flex-direction: column;padding: 10px;" class="layui-form layui-form-pane">
                        
                      </form>
                    `,
            btn: ["确定", "取消"],
            success: function() {
              form.on("radio",function(data){
                console.log(data)
              })
              var userRoleList = []
              var roleList = []
              _this.$axios
                .post("/api/getRoleByUserId", {userId: data.userId})
                .then(res => {
                  console.log(res);
                  userRoleList = res.data.body.list;
                });

                setTimeout(()=>{
                  _this.$axios
                    .post("/api/getRoleInfoList", {userId: _this.$store.state.userId,seleUserId: data.userId, currentPage: 1,everyCount:100})
                    .then(res => {
                      console.log(res);
                       roleList = res.data.body.roleList;
                      for (var i = 0; i < roleList.length; i++) {
                          _this.$("#rolesAllocation").append(
                            '<span id="rolesList" style="display:flex;justify-content: space-between"><span>'+ roleList[i].roleName +'</span><input type="radio" class="box" name="roles" title="" value="'+ roleList[i].roleId +'" lay-skin="primary"></span>'
                          );
                      }
                      console.log(_this.$(".box"),userRoleList)
                      for(var z = 0; z < userRoleList.length; z++){
                        for(var j = 0; j < _this.$(".box").length; j++){
                          console.log(userRoleList[z].roleId,_this.$(".box")[j].value)
                          if(userRoleList[z].roleId == _this.$(".box")[j].value){
                            _this.$(".box")[j].checked = true
                          }
                        }
                      }
                      console.log(_this.$(".box"))
                      setTimeout(()=>{
                        form.render();
                      })
                    });
                },100)
                
            },
            yes: function(index, layero) {
              var rolesAllocation = _this.$("#rolesAllocation").serializeObject()
              var arr = []
              Object.keys(rolesAllocation).forEach(function(key){
                  arr.push(rolesAllocation[key])
              });
              console.log(data);
              console.log(arr,rolesAllocation);
              
              _this.$axios
                .post("/api/allotRoleInfo",  {userId: data.userId,roleIds: arr.toString()})
                .then(res => {
                  console.log(res);
                  if (res.data.retCode == "000000") {
                    layer.msg(res.data.retMsg, { icon: 1 });
                    setTimeout(() => {
                      _this.$router.push(
                        "/staffManagement?type=staffManagement"
                      );
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
        }else if (obj.event === "查看"){
          //查看
          localStorage.setItem("alterId", alterId);
          localStorage.setItem("data", JSON.stringify(data));
          _this.$router.push("/checkUserInfo?check=1");
        }else if (obj.event === "重置密码"){
          //重置密码
          layer.confirm(
            "你确定要重置密码吗？",
            { icon: 3, title: "提示" },
            function(index) {
              //向服务端发送重置密码指令
              var delParam = {
                userId: _this.$store.state.userId,
                alterId: alterId
              };
              _this.$axios.post("/api/resetPassword", delParam).then(res => {
                console.log(res);
                if (res.data.retCode == "000000") {
                  layer.msg(res.data.retMsg, { icon: 1 });
                  // obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                  layer.close(index);
                  setTimeout(function(){
                    _this.reload()
                  },3000)
                } else {
                  layer.msg(res.data.retMsg, { icon: 2 });
                }
              });
            }
          );
        }
      });
    });

    
  },

  methods:{
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
        // console.log(btnList)
        // console.log(this.$('.tabBtn'))
        var str = ''
        for(var z = 0; z < btnList.length;z++){
          if(btnList[z].btnName == '禁用'){
            str += '<a class="'+btnList[z].btnCode+' layui-btn layui-btn-xs layui-btn-danger" lay-event="'+btnList[z].btnName+'">'+btnList[z].btnName+'</a>'
          }else if(btnList[z].btnName == '启用'){
            str += '<a class="'+btnList[z].btnCode+' layui-btn layui-btn-xs" lay-event="'+btnList[z].btnName+'" >'+btnList[z].btnName+'</a>'
          }else if(btnList[z].btnName == '添加'){
            this.add = true
          }else{
            str += '<a class="'+btnList[z].btnCode+' layui-btn layui-btn-xs" lay-event="'+btnList[z].btnName+'" >'+btnList[z].btnName+'</a>'
          }
          // console.log(btnList[z].btnCode)
        }
        // console.log(str)
        for(var j = 0; j < this.$('.tabBtn').length; j++){
          this.$(this.$('.tabBtn')[j]).html(str)
        }
        for(var h = 0; h < this.$('tbody tr td').length;h++){
            // console.log(this.$(this.$('tbody tr td')[h])[0].textContent)
              if(this.$(this.$('tbody tr td')[h])[0].textContent == this.$store.state.userId){
                //  
                // console.log(this.$(this.$(this.$('tbody tr td')[h])[0]).parent().find('.tabBtn').find('a'))
                var len = this.$(this.$(this.$('tbody tr td')[h])[0]).parent().find('.tabBtn').find('a')
                for(var j = 0; j < len.length; j++){
                  // console.log(this.$(len[j]))
                  if(this.$(len[j]).html() == '编辑'){
                    this.$(len[j]).removeClass('layui-btn-disabled')
                  }else if(this.$(len[j]).html() == '查看'){
                    this.$(len[j]).removeClass('layui-btn-disabled')
                  }else {
                    this.$(len[j]).addClass('layui-btn-disabled')
                    this.$(len[j]).removeAttr('lay-event')
                  }
                }
                
              }
              if(this.$(this.$('tbody tr td')[h])[0].textContent == '禁用'){
                //  
                // console.log(this.$(this.$(this.$('tbody tr td')[h])[0]).parent().find('.tabBtn').find('a'))
                this.$(this.$(this.$('tbody tr td')[h])[0]).parent().find('.tabBtn').find('.disabled').remove()
                this.$(this.$(this.$('tbody tr td')[h])[0]).parent().find('.tabBtn').find('a').addClass('layui-btn-disabled')
                this.$(this.$(this.$('tbody tr td')[h])[0]).parent().find('.tabBtn').find('a').removeAttr('lay-event')
                this.$(this.$(this.$('tbody tr td')[h])[0]).parent().find('.tabBtn').find('.check').removeClass('layui-btn-disabled')
                this.$(this.$(this.$('tbody tr td')[h])[0]).parent().find('.tabBtn').find('.check').attr('lay-event','查看')
                this.$(this.$(this.$('tbody tr td')[h])[0]).parent().find('.tabBtn').find('.enabled').removeClass('layui-btn-disabled')
                this.$(this.$(this.$('tbody tr td')[h])[0]).parent().find('.tabBtn').find('.enabled').attr('lay-event','启用')
                
              }
              if(this.$(this.$('tbody tr td')[h])[0].textContent == '启用'){
                console.log(this.$(this.$('tbody tr td')[h])[0])
                
                this.$(this.$(this.$('tbody tr td')[h])[0]).parent().find('.tabBtn').find('.enabled').remove()
                
              }
        }
    }
  },

  created() {
    this.type = this.$route.query.type;
    var data = {};
    var userId = this.$store.state.userId;
    data.userId = userId;
    data.currentPage = 1;
    data.everyCount = 10;
    console.log(data);
    this.$axios
      .post("/api/getUserList", data)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    localStorage.clear();
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
.dataList .dataList_top p button {
  border: none;
  border-radius: 2px;
  width: 70px;
  height: 30px;
  background: #0079fe;
  color: #fff;
  font-size: 13px;
  margin: 0 10px;
  
}
/* .dataList .dataList_top p button:nth-child(1) {
  background: #fff;
  border: 1px solid #eee;
  color: #444;
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
.rolesAllocation{
  display: flex;
  flex-direction: column;
}

</style>