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
                <router-link
                  :to="{path: '/addCompany',name: 'addCompany', query: { type : this.type}}"
                  tag="button"
                >添加</router-link>
              </p>
            </div>
            <div class="dataList_table">
              <table id="demo" lay-filter="test"></table>
              <div id="barDemo" style="display:none">
                <a href class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
                <a href class="layui-btn layui-btn-xs" lay-event="deletion">删除</a>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="layui-tab-item">内容2</div>
        <div class="layui-tab-item">内容3</div>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "deplay",
  data() {
    return {
      CompanyList: [
        //公司表头
        {
          field: "workOrderId",
          title: "公司编号",
          sort: true,
          align: "center"
        },
        {
          field: "workOrderStatus",
          title: "公司名称",
          sort: true,
          align: "center"
        },
        {
          field: "operation",
          title: "操作",
          align: "center",
          toolbar: "#barDemo"
        }
      ],
      DeptList: [
        //部门表头
        {
          field: "workOrderId",
          title: "部门编号",
          sort: true,
          align: "center"
        },
        {
          field: "workOrderStatus",
          title: "部门名称",
          sort: true,
          align: "center"
        },
        {
          field: "operation",
          title: "操作",
          align: "center",
          toolbar: "#barDemo"
        }
      ],
      JobList: [
        //职务表头
        {
          field: "workOrderId",
          title: "职务编号",
          sort: true,
          align: "center"
        },
        {
          field: "workOrderStatus",
          title: "职务名称",
          sort: true,
          align: "center"
        },
        {
          field: "operation",
          title: "操作",
          align: "center",
          toolbar: "#barDemo"
        }
      ],
      type: "CompanyList"
    };
  },
  mounted() {
    var _this = this;
    layui.use(["table", "element"], function() {
      var table = layui.table;
      var element = layui.element;
      element.on("tab(docDemoTabBrief)", function(data) {
        console.log(data.index);
        if (data.index == 0) {
          console.log(1);
          //公司列表
          table.render({
            elem: "#demo",
            height: 485,
            url: "../../../static/table.json", //数据接口
            page: true, //开启分页
            limit: 10,
            cols: [_this.CompanyList]
          });
          _this.type = "CompanyList";
        }
        if (data.index == 1) {
          //部门列表
          table.render({
            elem: "#demo",
            height: 485,
            url: "../../../static/table.json", //数据接口
            page: true, //开启分页
            limit: 10,
            cols: [_this.DeptList]
          });
          _this.type = "DeptList";
        }
        if (data.index == 2) {
          //职务列表
          table.render({
            elem: "#demo",
            height: 485,
            url: "../../../static/table.json", //数据接口
            page: true, //开启分页
            limit: 10,
            cols: [_this.JobList]
          });
          _this.type = "JobList";
        }
      });

      // 第一次实例 公司列表
      table.render({
        elem: "#demo",
        height: 485,
        url: "../../../static/table.json", //数据接口
        page: true, //开启分页
        limit: 10,
        cols: [_this.CompanyList]
      });
    });
  },
  created() {
    // layui.use("element", function() {
    //   var element = layui.element;
    // });
  },
  updated() {
    layui.use("element", function() {
      var element = layui.element;
      element.on();
    });
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