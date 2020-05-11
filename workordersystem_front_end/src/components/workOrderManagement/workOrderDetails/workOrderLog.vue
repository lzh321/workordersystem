<template>
  <!-- 工单处理日志 -->
  <div>
    <form action="" class="layui-form ">
      <div class="dataList">
      <div class="dataList_top">
        <h2>工单处理日志</h2>
      </div>
      <div class="dataList_table">
        <table
          id="workOrderLog"
          lay-filter="workOrderLog"
          lay-data="{id: 'serachData'}"
        ></table>
      </div>
    </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "workOrderLog",
  data() {
    return {
      
    }
  },
  mounted(){
    var _this = this
    layui.use("table",function(){
      var table = layui.table
      //第一个实例
      table.render({
        elem: "#workOrderLog",
        method: "post",
        url: "/api/getRemarListByOrderInfoId", //数据接口
        where:{
          userId: _this.$store.state.userId,
          seleOrderInfoId: localStorage.getItem("orderInfoId")
        },
        id: "serachData",
        parseData: function(res) {
          //res 即为原始返回的数据
          return {
            code: res.retCode, //解析接口状态
            msg: res.retMsg, //解析提示文本
            count: res.body.totalCount, //解析数据长度
            data: res.body.remarList //解析数据列表
          };
        },
        request: {
          pageName: "currentPage", //页码的参数名称，默认：page
          limitName: "everyCount" //每页数据量的参数名，默认：limit
        },
        page: false, //开启分页
        cols: [
          [
            //表头
            {field: "handleStateName",title: "操作",sort: true,align: "center"},
            {field: "operationTime",title: "操作时间",sort: true,align: "center"},
            {field: "handleUserName",title: "操作人",sort: true,align: "center"},
            {field: "remarkDetail",title: "操作说明",sort: true,align: "center"},
          ]
        ]
      });
    })
  },
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
  font-size: 17px;
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