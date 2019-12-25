<template>
  <!-- 投放点管理 -->
  <div class="NetworkList">
    <data-screening :type="type"></data-screening>
    <div class="dataList">
      <div class="dataList_top">
        <h2>数据列表</h2>
        <p>
          <router-link to="/addNetwork" tag="button">添加</router-link>
        </p>
      </div>
      <div class="dataList_table">
        <table id="demo" lay-filter="NetworkList" lay-data="{id: serachData}"></table>
        <div id="barDemo" style="display:none">
          <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
          <a class="layui-btn layui-btn-xs" lay-event="deletion">删除</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dataScreening from "../dataScreening";
export default {
  name: "NetworkList",
  data() {
    return {
      type: ""
    };
  },
  components: {
    dataScreening
  },
  mounted() {
    var _this = this;
    layui.use("table", function() {
      var table = layui.table;
      var form = layui.form;
      form.render();
      form.on("submit(serach)", function(data) {
        data.field.userId = _this.$store.state.userId;
        console.log(data.field);
        table.reload("serachData", {
          url: "/api/getNetworkList",
          where: data.field
          // page:{curr: 1}
        });
      });
      //第一个实例
      table.render({
        elem: "#demo",
        url: "/api/getNetworkList", //数据接口
        method: "post",
        id: "serachData",
        where: { userId: _this.$store.state.userId },
        response: {
          statusCode: "000000"
        },
        parseData: function(res) {
          //res 即为原始返回的数据
          return {
            code: res.retCode, //解析接口状态
            msg: res.retMsg, //解析提示文本
            count: res.body.networkList.length, //解析数据长度
            data: res.body.networkList //解析数据列表
          };
        },
        // page: true, //开启分页
        // request: {
        //   pageName: 'currentPage', //页码的参数名称，默认：page
        //   limitName: 'everyCount' //每页数据量的参数名，默认：limit
        // },
        cols: [
          [
            //表头

            { field: "customerId", fixed: "left", hide: true },
            { field: "id", title: "投放点ID", sort: false, align: "center" },
            {
              field: "customerName",
              title: "客户名称",
              sort: false,
              align: "center"
            },
            {
              field: "networName",
              title: "投放点",
              sort: false,
              align: "center"
            },
            {
              field: "regionName",
              title: "所在城市",
              sort: false,
              align: "center"
            },
            {
              field: "networAddress",
              title: "投放地址",
              sort: false,
              align: "center"
            },
            {
              field: "operation",
              title: "操作",
              align: "center",
              toolbar: "#barDemo"
            }
          ]
        ]
      });

      table.reload("serachData", {
        where: { userId: _this.$store.state.userId }
      });

      //监听行工具事件
      table.on("tool(NetworkList)", function(obj) {
        var data = obj.data;
        console.log(data);
        var networkId = data.id;
        console.log(networkId);
        if (obj.event === "deletion") {
          layer.confirm("你确定要删除这条记录？",{ icon: 3, title: "提示" }, function(index) {
            //向服务端发送删除指令
            var delParam = {
              userId: _this.$store.state.userId,
              networkId: networkId
            };
            _this.$axios.post("/api/deleNetworkInfo", delParam).then(res => {
              console.log(res);
              if (res.data.retCode == "000000") {
                layer.msg(res.data.retMsg, { icon: 1 });
                obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                layer.close(index);
              } else {
                layer.msg(res.data.retMsg, { icon: 2 });
              }
            });
          });
        } else if (obj.event === "edit") {
          //编辑
          sessionStorage.setItem("networkId", networkId);
          _this.$router.push("/addNetwork");
        }
      });
    });
  },
  created() {
    this.type = this.$route.query.type;
    var data = {
      userId: this.$store.state.userId
    };
    this.$axios.post("/api/getNetworkList", data).then(res => {
      console.log(res);
    });
  }
};
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