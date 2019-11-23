<template>
  <div class="workOrderManagement">
    <div class="work_type">
      <ul>
        <li
          v-for="(item,index) in workType"
          @click="active(index)"
          :class="{active:index === num}"
          :key="index"
        >
          <i v-if="item.num ? true : false">{{item.num}}</i>
          <span>{{item.title}}</span>
        </li>
      </ul>
    </div>
    <data-screening></data-screening>
    <div class="dataList">
      <div class="dataList_top">
        <h2>数据列表</h2>
        <p>
          <button>导出</button>
          <router-link to="/workOrderCreate" tag="button">创建</router-link>
        </p>
      </div>
      <div class="dataList_table" >
        <table id="demo" lay-filter="test"></table>
      </div>
    </div>
  </div>
</template>

<script>
import dataScreening from "../dataScreening";
export default {
  name: "workOrderManagement",
  data() {
    return {
      num: 0,
      workType: [
        { title: "全部" },
        { title: "待发单", num: 2 },
        { title: "待派单", num: 2 },
        { title: "待受理", num: 2 },
        { title: "处理中", num: 2 },
        { title: "待回访", num: 2 },
        { title: "已关单", num: 2 }
      ]
    };
  },
  components: {
    dataScreening
  },
  methods: {
    active: function(index) {
      this.num = index;
    }
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
            { field: "workOrderId", title: "工单编号",  sort: true, fixed: "left",align: "center" },
            { field: "workOrderStatus", title: "工单状态",  sort: true,align: "center"},
            { field: "bankName", title: "银行名称",  sort: true,align: "center" },
            { field: "subBranchName", title: "支行名称", align: "center" },
            { field: "PriorityDescription", title: "紧急程度", align: "center" },
            { field: "currentTotalTime", title: "当前总耗时（min）",  sort: true,align: "center" },
            { field: "workOrderTime", title: "工单总耗时（min）", sort: true,align: "center" },
            { field: "creator", title: "创建人", align: "center" },
            { field: "creationTime", title: "创建时间", sort: true,align: "center" },
            { field: "operation", title: "操作", align: "center" }
          ]
        ]
      });
    });
  }
};
</script>

<style scoped>
.workOrderManagement {
  height: 100%;
}
.active {
  border-bottom: 2px solid #445eee;
  color: #445eee;
}
.work_type ul {
  display: flex;
  align-items: center;
  padding: 10px 15px 20px;
}
.work_type ul li {
  position: relative;
  text-align: center;
  padding: 12px 15px;
}
.work_type ul li i {
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  background: red;
  font-size: 10px;
  color: #fff;
  position: absolute;
  top: 8px;
  line-height: 15px;
  right: 0px;
}
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
.dataList .dataList_top p button:nth-child(1) {
  background: #fff;
  border: 1px solid #eee;
  color: #444;
}
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