<template>
  <div class="personSynergy">
    <div class="layui-tab layui-tab-brief" lay-filter="synergyManagement">
      <ul class="layui-tab-title">
        <li
          v-for="(item,index) in workType"
          @click="active(index)"
          :class="index == num ? 'layui-this ' : ''"
          :key="index"
        >
          <a>
            {{item.title}}
            <span v-if="item.num" class="layui-badge">{{item.num}}</span>
          </a>
        </li>
      </ul>
      <div class="layui-tab-content">
        <data-screening ref="getData" :type="type"></data-screening>
        <div class="dataList">
          <div class="dataList_top">
            <h2>数据列表</h2>
          </div>
          <div class="dataList_table">
            <table
              id="synergyManagement"
              lay-filter="synergyManagement"
              lay-data="{id:'serachData'}"
            ></table>
            <!-- <div id="barDemo" style="display:none">
              <a class="layui-btn layui-btn-xs" lay-event="Accepted">受理</a>
              <a class="layui-btn layui-btn-xs" lay-event="finish">完成</a>
            </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dataScreening from "../dataScreening";
export default {
  name: "personSynergy",
  inject: ["reload"],
  data() {
    return {
      num: 0,
      workType: [
        { title: "全部" },
        { title: "待受理", num: 0 },
        { title: "处理中", num: 0 },
        { title: "已完成", num: 0 },
        { title: "已驳回", num: 0 }
      ],
      type: ""
    };
  },
  components: {
    dataScreening
  },
  methods: {
    active: function(index) {
      this.num = index;
    },

    derived: function() {
      table.exportFile();
    },
    getOrderInfoNum() {
      var userId = this.$store.state.userId;
      this.$axios.post("/api/getCoordinateListNum", { userId:userId,isAll:1 }).then(res => {
        console.log(res);
        if (res.data.retCode == "000000") {
          // this.workType[0].num = res.data.body.allNum
          this.workType[1].num = res.data.body.acceptNum;
          this.workType[2].num = res.data.body.processingNum;
          this.workType[3].num = res.data.body.finishNum;
          this.workType[4].num = res.data.body.rejectNum;
        }
      });
    },
    layui: function() {
      var _this = this;
      layui.use(["table", "form", "element"], function() {
        var table = layui.table;
        var form = layui.form;
        var element = layui.element;
        var curr = ''
        setTimeout(()=>{
          curr = sessionStorage.getItem("curr") ? sessionStorage.getItem("curr") : 1
          _this.$refs.getData.serachData = sessionStorage.getItem("data") ? JSON.parse(sessionStorage.getItem("data")) : {}
        })
        form.render();
        element.on("tab(synergyManagement)", function(data) {
          console.log(this); //当前Tab标题所在的原始DOM元素
          console.log(data.index); //得到当前Tab的所在下标
          var seleCoordinateState = data.index - 1;
          if (data.index == 0) {
            seleCoordinateState = "";
          }
          var dataTab = {
            userId: _this.$store.state.userId,
            seleCoordinateState: seleCoordinateState
          };
          table.reload("serachData", {
            url: "/api/getCoordinateInfoList",
            where: dataTab,
            page: { curr: 1, limit: 10 }
          });
        });
        form.on("submit(serach)", function(data) {
          console.log(data.field);
          data.field.userId = _this.$store.state.userId;
          sessionStorage.setItem("data",JSON.stringify(data.field))
          table.reload("serachData", {
            url: "/api/getCoordinateInfoList",
            where: data.field,
            page: { curr: 1, limit: 10 }
          });
        });
        //第一个实例
        table.render({
          elem: "#synergyManagement",
          url: "/api/getCoordinateInfoList", //数据接口
          method: "post",
          where: {
            userId: _this.$store.state.userId
          },
          parseData: function(res) {
            //res 即为原始返回的数据
            return {
              code: res.retCode, //解析接口状态
              msg: res.retMsg, //解析提示文本
              count: res.body.totalCount, //解析数据长度
              data: res.body.coordinateList //解析数据列表
            };
          },
          id: "serachData",
          page: true, //开启分页
          request: {
            pageName: "currentPage", //页码的参数名称，默认：page
            limitName: "everyCount" //每页数据量的参数名，默认：limit
          },
          // limit: 10,
          cols: [
            [
              //表头
              {
                field: "id",
                title: "协同编号",
                sort: false,
                align: "center",
                templet: function(d) {
                  return (
                    '<a href="javascript:;" lay-event="edit">' + d.id + "</a>"
                  );
                }
              },
              {
                field: "coordinateState",
                title: "协同状态",
                sort: false,
                align: "center",
                templet: function(d) {
                  if (d.coordinateState == 0) {
                    return "待受理";
                  }
                  if (d.coordinateState == 1) {
                    return "处理中";
                  }
                  if (d.coordinateState == 2) {
                    return "已完成";
                  }
                  if (d.coordinateState == 3) {
                    return "已驳回";
                  }
                }
              },
              {
                field: "orderId",
                title: "工单编号",
                sort: false,
                align: "center"
              },
              {
                field: "expendTime",
                title: "当前响应/处理耗时（min）",
                sort: false,
                align: "center"
              },
              {
                field: "amountTime",
                title: "协同处理耗时（min）",
                sort: false,
                align: "center"
              },
              {
                field: "orderUrgency",
                title: "紧急程度",
                sort: false,
                align: "center",
                templet: function(d) {
                  if (d.orderUrgency == 0) {
                    return "一般";
                  } else {
                    return "紧急";
                  }
                }
              },
              {
                field: "createrUserName",
                title: "创建人",
                sort: false,
                align: "center"
              },
              {
                field: "createTime",
                title: "创建时间",
                sort: false,
                align: "center"
              },
              {
                title: "操作",
                align: "center",
                templet: function(d) {
                  if (d.coordinateState == 0) {
                    return '<a class="layui-btn layui-btn-xs" lay-event="Accepted">受理</a><a class="layui-btn layui-btn-xs" lay-event="reject">驳回</a>';
                  } else if (d.coordinateState == 1) {
                    return '<a class="layui-btn layui-btn-xs" lay-event="finish">完成</a>';
                  } else if (d.coordinateState == 2) {
                    return "";
                  } else if (d.coordinateState == 3) {
                    return "";
                  }
                }
              }
            ]
          ],
          done: function(res, curr, count){
            console.log(count)
            if(count == 0){
              sessionStorage.setItem("curr",1)
            }else{
              sessionStorage.setItem("curr",_this.$('.layui-laypage-skip').find(".layui-input").val())
            }
          }
        });

        setTimeout(()=>{
          table.reload("serachData", {
            url: "/api/getCoordinateInfoList",
            where: sessionStorage.getItem("data") ? JSON.parse(sessionStorage.getItem("data")) : {userId: _this.$store.state.userId},
            page: { curr: curr, limit: 10 },
          });
        })

        //监听行工具事件
        table.on("tool(synergyManagement)", function(obj) {
          var data = obj.data;
          console.log(data);
          var id = data.id;
          var coordinateState = data.coordinateState;
          if (obj.event === "Accepted") {
            // 受理
            var data = {
              userId: _this.$store.state.userId,
              id: id,
              handleState: 1
            };
            _this.$axios.post("/api/handleCoordinateInfo", data).then(res => {
              console.log(res);
              if (res.data.retCode == "000000") {
                layer.msg(res.data.retMsg, { icon: 1 });
                setTimeout(() => {
                  _this.reload();
                }, 3000);
              } else {
                layer.msg(res.data.retMsg, { icon: 2 });
              }
            });
          } else if (obj.event === "reject") {
            layer.open({
              type: 1,
              title: "是否驳回此工单？",
              area: ["600px", "400px"],
              fixed: false, //不固定
              maxmin: true,
              content: `
                          <div style="padding:10px" class="layui-form-item layui-form-text">
                            <textarea name="reject" placeholder="请输入驳回说明" id="reject" row="50" style="min-height:260px" class="layui-textarea"></textarea>
                          </div>
                        `,
              btn: ["确定", "取消"],
              // success: function() {
              //   form.render();
              // },
              yes: function(index, layero) {
                var content = _this.$("#reject").val();
                var data = {
                  userId: _this.$store.state.userId,
                  id: id,
                  handleState: 3,
                  rejectContent: content
                };
                _this.$axios
                  .post("/api/handleCoordinateInfo", data)
                  .then(res => {
                    console.log(res);
                    if (res.data.retCode == "000000") {
                      layer.msg(res.data.retMsg, { icon: 1 });
                      setTimeout(() => {
                        _this.reload();
                      }, 3000);
                    } else {
                      layer.msg(res.data.retMsg, { icon: 2 });
                    }
                  });
                layer.close(index);
                return false;
              },
              btnAlign: "c"
            });
          } else if (obj.event === "finish") {
            //完成
            localStorage.setItem("id", id);
            localStorage.setItem("coordinateState", coordinateState);
            _this.$router.push("/synergyInfo");
          } else if (obj.event === "edit") {
            // 编辑
            localStorage.setItem("id", id);
            localStorage.setItem("coordinateState", coordinateState);
            _this.$router.push("/synergyInfo");
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
    localStorage.clear()
    this.getOrderInfoNum();
  }
};
</script>

<style scoped>
.personSynergy {
  padding: 15px 15px 0;
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
.layui-table-tips-c{
  display: flex;
  padding: 0 !important;
}
</style>