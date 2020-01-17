<template>
  <!-- 公司、部门、职务 配置 -->
  <div class="deploy">
    <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
      <ul class="layui-tab-title">
        <li class="layui-this" lay-id="CompanyList">公司</li>
        <li lay-id="DeptList">部门</li>
        <li lay-id="JobList">职务</li>
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
              <table id="deploy" lay-filter="deploy"></table>
              <div id="barDemo" style="display:none">
                <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
                <a class="layui-btn layui-btn-xs" lay-event="deletion">删除</a>
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
      list: [],
      CompanyList: [
        //公司表头
        {
          field: "id",
          title: "公司编号",
          sort: false,
          align: "center"
        },
        {
          field: "companyName",
          title: "公司名称",
          sort: false,
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
          field: "deptId",
          title: "部门编号",
          sort: false,
          align: "center"
        },
        {
          field: "deptName",
          title: "部门名称",
          sort: false,
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
          field: "id",
          title: "职务编号",
          sort: false,
          align: "center"
        },
        {
          field: "jobName",
          title: "职务名称",
          sort: false,
          align: "center"
        },
        {
          field: "operation",
          title: "操作",
          align: "center",
          toolbar: "#barDemo"
        }
      ],
      type: this.$route.query.type,
      url: ""
      // layId: ,
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
            elem: "#deploy",
            // height: 485,
            method: "post",
            url: "/api/getCompanyList", //数据接口
            response: {
              statusCode: "000000"
            },
            parseData: function(res) {
              //res 即为原始返回的数据
              return {
                code: res.retCode, //解析接口状态
                msg: res.retMsg, //解析提示文本
                count: res.body.totalCount, //解析数据长度
                data: res.body.CompanyNameList //解析数据列表
              };
            },
            request: {
              pageName: "currentPage", //页码的参数名称，默认：page
              // curr: 'indexCount', //页码的参数名称，默认：page
              limitName: "everyCount" //每页数据量的参数名，默认：limit
            },
            page: true, //开启分页
            // limit: 10,
            cols: [_this.CompanyList]
          });
          _this.type = "CompanyList";
          _this.$router.push("/deploy?type=" + _this.type);
        }
        if (data.index == 1) {
          //部门列表
          table.render({
            elem: "#deploy",
            // height: 485,
            method: "post",
            url: "/api/getDeptList", //数据接口
            response: {
              statusCode: "000000"
            },
            parseData: function(res) {
              //res 即为原始返回的数据
              return {
                code: res.retCode, //解析接口状态
                msg: res.retMsg, //解析提示文本
                count: res.body.totalCount, //解析数据长度
                data: res.body.DeptNameList //解析数据列表
              };
            },
            request: {
              pageName: "currentPage", //页码的参数名称，默认：page
              // curr: 'indexCount', //页码的参数名称，默认：page
              limitName: "everyCount" //每页数据量的参数名，默认：limit
            },
            page: true, //开启分页
            // limit: 10,
            cols: [_this.DeptList]
          });
          _this.type = "DeptList";
          _this.$router.push("/deploy?type=" + _this.type);
        }
        if (data.index == 2) {
          //职务列表
          table.render({
            elem: "#deploy",
            // height: 485,
            method: "post",
            url: "/api/getJobList", //数据接口
            response: {
              statusCode: "000000"
            },
            parseData: function(res) {
              //res 即为原始返回的数据
              return {
                code: res.retCode, //解析接口状态
                msg: res.retMsg, //解析提示文本
                count: res.body.totalCount, //解析数据长度
                data: res.body.JobNameList //解析数据列表
              };
            },
            request: {
              pageName: "currentPage", //页码的参数名称，默认：page
              // curr: 'indexCount', //页码的参数名称，默认：page
              limitName: "everyCount" //每页数据量的参数名，默认：limit
            },
            page: true, //开启分页
            // limit: 10,
            cols: [_this.JobList]
          });
          _this.type = "JobList";
          _this.$router.push("/deploy?type=" + _this.type);
        }
      });

      // 第一次实例 公司列表
      table.render({
        elem: "#deploy",
        // height: 485,
        method: "post",
        url: _this.url, //数据接口
        response: {
          statusCode: "000000"
        },
        parseData: function(res) {
          //res 即为原始返回的数据
          return {
            code: res.retCode, //解析接口状态
            msg: res.retMsg, //解析提示文本
            count: res.body.totalCount, //解析数据长度
            data: res.body.CompanyNameList //解析数据列表
          };
        },
        request: {
          pageName: "currentPage", //页码的参数名称，默认：page
          // curr: 'indexCount', //页码的参数名称，默认：page
          limitName: "everyCount" //每页数据量的参数名，默认：limit
        },
        page: true, //开启分页
        // limit: 10,
        cols: [_this.list]
      });
      element.tabChange("docDemoTabBrief", _this.type);

      //监听行工具事件
      table.on("tool(deploy)", function(obj) {
        var data = obj.data;
        console.log(data);
        if (obj.event === "deletion") {
          layer.confirm(
            "你确定要删除这条记录？",
            { icon: 3, title: "提示" },
            function(index) {
              if (data.companyName) {
                var companyId = data.id;
                //向服务端发送删除指令
                var delParam = {
                  userId: _this.$store.state.userId,
                  companyId: companyId
                };
                _this.$axios
                  .post("/api/deleCompanyInfo", delParam)
                  .then(res => {
                    console.log(res);
                    if (res.data.retCode == "000000") {
                      layer.msg(res.data.retMsg, { icon: 1 });
                      obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                      layer.close(index);
                    } else {
                      layer.msg(res.data.retMsg, { icon: 2 });
                    }
                  });
              }
              if (data.deptName) {
                var deptId = data.deptId;
                //向服务端发送删除指令
                var delParam = {
                  userId: _this.$store.state.userId,
                  DeptId: deptId
                };
                _this.$axios.post("/api/deleDeptInfo", delParam).then(res => {
                  console.log(res);
                  if (res.data.retCode == "000000") {
                    layer.msg(res.data.retMsg, { icon: 1 });
                    obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                    layer.close(index);
                  } else {
                    layer.msg(res.data.retMsg, { icon: 2 });
                  }
                });
              }
              if (data.jobName) {
                var jobId = data.id;
                //向服务端发送删除指令
                var delParam = {
                  userId: _this.$store.state.userId,
                  jobId: jobId
                };
                _this.$axios.post("/api/deleJobInfo", delParam).then(res => {
                  console.log(res);
                  if (res.data.retCode == "000000") {
                    layer.msg(res.data.retMsg, { icon: 1 });
                    obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                    layer.close(index);
                  } else {
                    layer.msg(res.data.retMsg, { icon: 2 });
                  }
                });
              }
            }
          );
        } else if (obj.event === "edit") {
          if (data.companyName == "" || data.companyName) {
            var companyId = data.id;
            sessionStorage.setItem("companyId", companyId);
            console.log(companyId);
            _this.$router.push("/addCompany?type=" + _this.type);
          }
          if (data.deptName) {
            var deptId = data.deptId;
            sessionStorage.setItem("deptId", deptId);
            _this.$router.push("/addCompany?type=" + _this.type);
          }
          if (data.jobName) {
            var jobId = data.id;
            sessionStorage.setItem("jobId", jobId);
            _this.$router.push("/addCompany?type=" + _this.type);
          }
        }
      });
    });
  },
  created() {
    if (this.type == "CompanyList") {
      this.url = "/api/getCompanyList";
      this.list = this.CompanyList;
    }
    if (this.type == "DeptList") {
      this.url = "/api/getDeptList";
      this.list = this.DeptList;
    }
    if (this.type == "JobList") {
      this.url = "/api/getJobList";
      this.list = this.JobList;
    }
    sessionStorage.clear()
  },
  updated() {
    var _this = this;
    layui.use(["element", "table"], function() {
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