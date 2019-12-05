<template>
  <div class="equipmentType">
    <data-screening :type="type"></data-screening>
    <div class="dataList">
      <div class="dataList_top">
        <h2>数据列表</h2>
        <p class="layui-btn-container">
          <router-link
            to="/addEquipmentType"
            class="layui-btn layui-btn-normal layui-btn-sm"
            tag="button"
            type="button"
          >
            <i class="layui-icon">&#xe608;</i> 添加
          </router-link>
        </p>
      </div>
      <div class="dataList_table">
        <table id="demo" lay-filter="equipmentTypeList" lay-data="{id:'serachData'}"></table>
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
  name: "equipmentType",
  data() {
    return {
      type: ""
    };
  },
  components: {
    dataScreening
  },
  methods: {
    layui: function() {
      var _this = this
      layui.use(["table", "form"], function() {
        var table = layui.table;
        var form = layui.form
        form.render()
        form.on('submit(serach)', function(data){
          console.log(data.field)
          data.field.userId = _this.$store.state.userId
          table.reload('serachData',{
            url: "/api/getDeviceModelList",
            where:data.field,
            // page:{curr: 1}
          })
        })
        //第一个实例
        table.render({
          elem: "#demo",
          url: "/api/getDeviceModelList", //数据接口
          method: "post",
          parseData: function(res) {
            //res 即为原始返回的数据
            return {
              code: res.retCode, //解析接口状态
              msg: res.retMsg, //解析提示文本
              count: res.body.modelList.length, //解析数据长度
              data: res.body.modelList //解析数据列表
            };
          },
          id: 'serachData',
          page: false, //开启分页
          // limit: 10,
          cols: [
            [
              //表头
              { field: "modelId", fixed: "left", hide: true },
              {
                field: "modelId",
                title: "设备类型编码",
                sort: true,
                align: "center"
              },
              {
                field: "modelType",
                title: "设备类型",
                sort: true,
                align: "center"
              },
              {
                field: "modelName",
                title: "存货名称",
                sort: true,
                align: "center"
              },
              { title: "操作", align: "center", toolbar: "#barDemo" }
            ]
          ]
        });

        //监听行工具事件
        table.on("tool(equipmentTypeList)", function(obj) {
          var data = obj.data;
          console.log(data);
          var modelId = data.modelId;
          if (obj.event === "deletion") {
            layer.confirm("真的删除行么", function(index) {
              obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
              layer.close(index);
              //向服务端发送删除指令
              var delParam = {
                userId: _this.$store.state.userId,
                modelId: modelId
              };
              _this.$axios.post("/api/deleDeviceModelInfo", delParam).then(res => {
                console.log(res);
                if (res.data.retCode == "000000") {
                  layer.msg(res.data.retMsg, { icon: 1 });
                }
              });
            });
          } else if (obj.event === "edit") {
            sessionStorage.setItem("modelId", modelId);
            _this.$router.push("/addEquipmentType");
          }
        });


      });
    }
  },
  mounted() {
    this.layui();
  },
  created() {
    this.type = this.$route.query.type;
  },
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
.layui-btn {
  margin-bottom: 0;
}
</style>