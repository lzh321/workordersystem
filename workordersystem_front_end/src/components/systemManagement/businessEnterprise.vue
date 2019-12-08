<template>
  <div class="businessEnterprise">
    <data-screening :type="type"></data-screening>
    <div class="dataList">
      <div class="dataList_top">
        <h2>数据列表</h2>
        <p class="layui-btn-container">
          <router-link to="/addInstitution" class="layui-btn layui-btn-normal layui-btn-sm" tag="button" type="button"><i class="layui-icon">&#xe608;</i> 添加</router-link>
          <router-link to="/deploy" class="layui-btn layui-btn-primary layui-btn-sm">
            <i class="layui-icon">&#xe620;</i>
            配置
          </router-link>
        </p>
      </div>
      <div class="dataList_table" >
        <table id="demo" lay-filter="test"></table>
        <div id="barDemo" style="display:none">
          <a class="layui-btn layui-btn-xs" lay-event="edit" >编辑</a>
          <a class="layui-btn layui-btn-xs" lay-event="deletion" >删除</a>
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
  name:'businessEnterprise',
  data() {
    return {
      type: ''
    }
  },
  components: {
    dataScreening
  },
  mounted() {
    
    layui.use("table", function() {
      var table = layui.table;
      //第一个实例
      table.render({
        elem: "#demo",
        height: 485,
        url: "../../../static/table.json", //数据接口
        // method: 'post',
        // parseData: function(res){ //res 即为原始返回的数据
        //   return {
        //     "code": res.retCode, //解析接口状态
        //     "msg": res.retMsg, //解析提示文本
        //     "count": res.body.list.length, //解析数据长度
        //     "data": res.body.list //解析数据列表
        //   };
        // },
        page: true, //开启分页
        limit: 10,
        cols: [
          [
            //表头
            {type: 'checkbox', fixed: 'left'},
            { field: "companyId", title: "公司编号", width:200, sort: true,align: "center"},
            { field: "companyName", title: "公司名称", width:260, sort: true,align: "center"},
            { field: "deptName", title: "部门",  sort: true,align: "center" },
            { field: "jobName", title: "职务", width:150, align: "center" },
            { field: "PriorityDescription", title: "启用", align: "center", toolbar: '#Enable_Disable'},
            { field: "operation", title: "操作", align: "center", toolbar: '#barDemo' }
          ]
        ]
      });
    });
  },
  created(){
    this.type = this.$route.query.type
    // this.$axios.post('/api/getOrganizationList').then(res=>{
    //   console.log(res)
    // }).catch(err=>{
    //   console.log(err)
    // })
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