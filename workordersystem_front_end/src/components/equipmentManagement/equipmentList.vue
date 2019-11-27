<template>
  <div class="equipmentList">
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
          <a href='' class="layui-btn layui-btn-xs" lay-event="check" >查看</a>
          <a href='' class="layui-btn layui-btn-xs" lay-event="deletion" >删除</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dataScreening from '../dataScreening'
export default {
  name:'equipmentList',
  data() {
    return {
      type:''
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
            { field: "workOrderId", title: "存货编码", sort: true,align: "center"},
            { field: "workOrderStatus", title: "存货名称",  sort: true,align: "center"},
            { field: "bankName", title: "设备型号",  sort: true,align: "center" },
            { field: "subBranchName", title: "维保开始时间",  align: "center" },
            { field: "PriorityDescription", title: "维保结束时间",  align: "center" },
            { field: "currentTotalTime", title: "银行名称",sort: true,align: "center" },
            { field: "workOrderTime", title: "网点名称", sort: true,align: "center" },
            { field: "creator", title: "所在城市", width: 100, align: "center"},
            { field: "creator", title: "网点地址", align: "center"},
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