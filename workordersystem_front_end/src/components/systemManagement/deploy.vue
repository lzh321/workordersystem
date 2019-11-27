<template>
  <div class="deploy">
    <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
      <ul class="layui-tab-title">
        <li class="layui-this">公司</li>
        <li>部门</li>
        <li>职务</li>
      </ul>
      <div class="layui-tab-content">
        <div class="layui-tab-item layui-show">
          <div class="dataList">
            <div class="dataList_top">
              <h2>数据列表</h2>
              <p>
                <router-link to="/addNetwork" tag="button">添加</router-link>
              </p>
            </div>
            <div class="dataList_table" >
              <table id="demo" lay-filter="test"></table>
              <div id="barDemo" style="display:none">
                <a href='' class="layui-btn layui-btn-xs" lay-event="edit" >编辑</a>
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
        <!-- <div class="layui-tab-item">内容2</div>
        <div class="layui-tab-item">内容3</div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "deplay",
  data() {
    return {
      title: []
    };
  },
   mounted() {
     layui.use("element", function() {
        var element = layui.element;
        element.on('tab(docDemoTabBrief)', function(data){
          if(data == 0) {
            this.title =["公司编号","公司名称"]
          }
          if(data == 1) {
            this.title =["部门编号","部门名称"]
          }
          if(data == 2) {
            this.title =["职务编号","职务名称"]
          }
        });
    });
     
    
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
            {field: "workOrderId", width:100, title: "<input type='checkbox' name='' lay-skin='primary'>", fixed: "left",align: "center",toolbar: '#barInput'},
            { field: "workOrderId", title: "公司编号",  sort: true,align: "center"},
            { field: "workOrderStatus", title: "公司名称", sort: true,align: "center"},
            { field: "operation", title: "操作", align: "center", toolbar: '#barDemo' }
          ]
        ]
      });
    });
  },
  created() {
    // layui.use("element", function() {
    //   var element = layui.element;
    // });
  }
};
</script>

<style scoped>
.dataList .dataList_top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 15px 20px;
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