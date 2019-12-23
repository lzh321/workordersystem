<template>
  <div class="messageModule">
    <data-screening :type="type"></data-screening>
    <div class="dataList">
      <div class="dataList_top">
        <h2>数据列表</h2>
        <!-- <p class="layui-btn-container">
          <router-link to="" class="layui-btn layui-btn-normal layui-btn-sm" tag="button" type="button"><i class="layui-icon">&#xe608;</i> 查询</router-link>
          <button class="layui-btn layui-btn-primary layui-btn-sm">
            <i class="layui-icon">&#xe669;</i>
            重置
          </button>
        </p> -->
      </div>
      <div class="dataList_table" >
        <table id="demo" lay-filter="test"></table>
        <div id="barDemo" style="display:none">
          <a class="layui-btn layui-btn-xs" lay-event="edit" >编辑</a>
          <a class="layui-btn layui-btn-xs" lay-event="freeze">冻结</a>
          <a class="layui-btn layui-btn-xs" lay-event="deletion" >删除</a>
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
  name:'messageModule',
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
            { field: "workOrderId", title: "序号", sort: false,align: "center"},
            { field: "workOrderStatus", title: "接收手机",  sort: false,align: "center"},
            { field: "bankName", title: "接收对象",  sort: false,align: "center" },
            { field: "subBranchName", title: "模板编号",  align: "center" },
            { field: "creator", title: "模板名称",  align: "center" },
            { field: "creator", title: "推送渠道",  align: "center" },
            { field: "creator", title: "推送内容",  align: "center" },
            { field: "PriorityDescription", title: "状态", align: "center"},
            { field: "operation", title: "推送时间", align: "center" }
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