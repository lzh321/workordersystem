<template>
<!-- 员工管理 -->
  <div class="staffManagement">
    <data-screening :type="type"></data-screening>
    <div class="dataList">
      <div class="dataList_top">
        <h2>数据列表</h2>
        <p>
          <router-link to="/addUser" tag="button">添加</router-link>
        </p>
      </div>
      <div class="dataList_table" >
        <table id="staffManagement" lay-filter="staffManagement" lay-data="{id:'serachData'}"></table>
        <script type="text/html" id="barDemo">
          <a class="layui-btn layui-btn-xs" lay-event="edit" >编辑</a>
          <!-- <a class="layui-btn layui-btn-xs" lay-event="privilege" >权限</a>
          <a class="layui-btn layui-btn-xs" lay-event="freeze">冻结</a> -->
          <a class="layui-btn layui-btn-xs" lay-event="deletion" >删除</a>
        </script>
      </div>
    </div>
  </div>
</template>

<script>
import dataScreening from '../dataScreening'
export default {
  name:'staffManagement',
  data() {
    return {
      type:'',
    }
  },
  components: {
    dataScreening
  },
  methods: {
    layui: function(){}
  },
  mounted() {
    var _this = this
    layui.use(["table","form"], function() {
      var table = layui.table;
      var form = layui.form
        form.render()
        form.on('submit(serach)', function(data){
          data.field.userId = _this.$store.state.userId
          data.field.seleUserName = data.field.val
          data.field.seleUserPhone = data.field.val
          data.field.seleUserId = data.field.val
          console.log(data.field)
          table.reload('serachData',{
            url: "/api/getUserList",
            where:data.field,
            page:{curr: 1, limit: 10}
          })
        })
      //第一个实例
      table.render({
        elem: "#staffManagement",
        url: "/api/getUserList", //数据接口
        method: 'post',
        id: 'serachData',
        parseData: function(res){ //res 即为原始返回的数据
          return {
            "code": res.retCode, //解析接口状态
            "msg": res.retMsg, //解析提示文本
            "count": res.body.totalCount, //解析数据长度
            "data":res.body.userList //解析数据列表
          };
        },
        page: true, //开启分页
        request: {
          pageName: 'currentPage', //页码的参数名称，默认：page
          limitName: 'everyCount' //每页数据量的参数名，默认：limit
        },
        cols: [
          [
            //表头
            { field: "userName", title: "员工姓名",  sort: true,align: "center"},
            { field: "userSex", title: "性别",  sort: true,align: "center", templet: function(d){return d.userSex == 0 ? '男' : '女'}},
            { field: "companyName", title: "所属公司",  sort: true,align: "center" },
            { field: "deptName", title: "所属部门",  align: "center" },
            { field: "jobName", title: "当前职务", align: "center" },
            { field: "userId", title: "登录账号",  sort: true,align: "center" },
            { field: "userPhone", title: "手机",  sort: true,align: "center" },
            { field: "operation", title: "操作", width:210, align: "center", toolbar: '#barDemo' }
          ]
        ]
      });
      //监听行工具事件
        table.on('tool(staffManagement)', function(obj){
          var data = obj.data;
          console.log(data)
          var alterId = data.userId
          console.log(alterId)
          if(obj.event === 'deletion'){
            layer.confirm('你确定要删除这条记录？', function(index){
              obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
              layer.close(index);
              //向服务端发送删除指令
              var delParam = {
                userId : _this.$store.state.userId,
                deleId: alterId
              }
              _this.$axios.post('/api/deleUserInfo',delParam).then(res=>{
                console.log(res)
                if(res.data.retCode == '000000'){
                  layer.msg(res.data.retMsg,{icon: 1})
                }else{
                  layer.msg(res.data.retMsg,{icon: 2})
                }
              })
            });
          } else if(obj.event === 'edit'){   //编辑
            sessionStorage.setItem('alterId',alterId)
            _this.$router.push('/addUser')
          }else if(obj.event === 'privilege'){  // 权限
            // sessionStorage.setItem('deviceId',deviceId)
            // _this.$router.push("/checkEquipmentInfo")
          }else if(obj.event === 'freeze'){   //冻结

          }
        });

    });
  },
  created(){
    this.type = this.$route.query.type
    var data = {}
    var userId = this.$store.state.userId
    data.userId = userId
    data.currentPage = 1
    data.everyCount = 10
    console.log(data)
    this.$axios.post('/api/getUserList',data).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  }
}
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
.dataList .dataList_table{
  padding: 0 15px;
}
.dataList .dataList_table td{
  font-size: 13px !important;
}
.dataList .dataList_table td .btn{
  font-size: 13px !important;
  color: blue !important;
}
</style>