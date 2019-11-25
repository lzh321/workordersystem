<template>
  <div class="businessEnterprise">
    <data-screening :type="type"></data-screening>
    <div class="dataList">
      <div class="dataList_top">
        <h2>数据列表</h2>
        <p class="layui-btn-container">
          <router-link to="/addInstitution" class="layui-btn layui-btn-normal layui-btn-sm" tag="button" type="button"><i class="layui-icon">&#xe608;</i> 添加</router-link>
          <button class="layui-btn layui-btn-primary layui-btn-sm">
            <i class="layui-icon">&#xe620;</i>
            配置
          </button>
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
        page: true, //开启分页
        limit: 10,
        cols: [
          [
            //表头
            {field: "workOrderId", width:80, title: "<input type='checkbox' name='' lay-skin='primary'>", fixed: "left",align: "center",toolbar: '#barInput'},
            { field: "workOrderId", title: "公司编号", width:200, sort: true,align: "center"},
            { field: "workOrderStatus", title: "公司名称", width:260, sort: true,align: "center"},
            { field: "bankName", title: "部门",  sort: true,align: "center" },
            { field: "subBranchName", title: "职务", width:150, align: "center" },
            { field: "PriorityDescription", title: "启用", align: "center", toolbar: '#Enable_Disable'},
            { field: "operation", title: "操作", align: "center", toolbar: '#barDemo' }
          ]
        ]
      });
    });
  },
  created(){
    this.type = this.$route.query.type
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