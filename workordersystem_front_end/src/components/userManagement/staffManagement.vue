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
        <table id="demo" lay-filter="test"></table>
        <div id="barDemo" style="display:none">
          <a href='' class="layui-btn layui-btn-xs" lay-event="edit" >编辑</a>
          <a href='' class="layui-btn layui-btn-xs" lay-event="privilege" >权限</a>
          <a href='' class="layui-btn layui-btn-xs" lay-event="freeze">冻结</a>
          <a href='' class="layui-btn layui-btn-xs" lay-event="deletion" >删除</a>
        </div>
        <div id="barInput" style="display:none">
          <input type='checkbox' name='' lay-skin='primary'>
        </div>
        <div id="Enable_Disable" style="display:none">
          <input type="checkbox" name="switch" lay-skin="switch">
        </div>
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
      type:''
    }
  },
  components: {
    dataScreening
  },
  methods: {
    layui: function(){}
  },
  mounted() {
    
    layui.use("table", function() {
      var table = layui.table;
      //第一个实例
      table.render({
        elem: "#demo",
        url: "/api/getUserList", //数据接口
        method: 'post',
        parseData: function(res){ //res 即为原始返回的数据
          return {
            "code": res.retCode, //解析接口状态
            "msg": res.retMsg, //解析提示文本
            // "count": res.body.deviceInfoList.length, //解析数据长度
            // "data": res.body.deviceInfoList //解析数据列表
          };
        },
        page: true, //开启分页
        limit: 10,
        cols: [
          [
            //表头
            {field: "workOrderId", width:80, title: "<input type='checkbox' name='' lay-skin='primary'>", fixed: "left",align: "center",toolbar: '#barInput'},
            { field: "workOrderId", title: "员工姓名", width:150, sort: true,align: "center"},
            { field: "workOrderStatus", title: "性别", width:100, sort: true,align: "center"},
            { field: "bankName", title: "所属公司",  sort: true,align: "center" },
            { field: "subBranchName", title: "所属部门", width:150, align: "center" },
            { field: "PriorityDescription", title: "当前职务", align: "center" },
            { field: "currentTotalTime", title: "登录账号", width:120, sort: true,align: "center" },
            { field: "workOrderTime", title: "手机", width:200, sort: true,align: "center" },
            { field: "creator", title: "启用", width: 100, align: "center",toolbar:'#Enable_Disable'},
            { field: "operation", title: "操作", align: "center", toolbar: '#barDemo' }
          ]
        ]
      });
    });
  },
  created(){
    this.type = this.$route.query.type
    this.$axios.post('/api/getUserList').then(res=>{
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