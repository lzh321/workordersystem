<template>
  <div class="workOrderManagement">
    <div class="layui-tab layui-tab-brief" lay-filter="workOrderManagement">
      <ul class="layui-tab-title">
        <li
          v-for="(item,index) in workType"
          @click="active(index,item.num)"
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
        <data-screening :type="type"></data-screening>
        <div class="dataList">
          <div class="dataList_top">
            <h2>数据列表</h2>
            <p>
              <button @click="derived">导出</button>
              <router-link to="/workOrderCreate" tag="button">创建</router-link>
            </p>
          </div>
          <div class="dataList_table">
            <table
              id="workOrderManagement"
              lay-filter="workOrderManagement"
              lay-data="{id: 'serachData'}"
            ></table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dataScreening from "../dataScreening";
export default {
  name: "workOrderManagement",
  inject: ["reload"],
  data() {
    return {
      num: 0,
      workType: [
        { title: "全部" },
        { title: "待发单", num: 0 },
        { title: "待派单", num: 0 },
        { title: "待受理", num: 0 },
        { title: "处理中", num: 0 },
        { title: "待回访", num: 0 },
        { title: "已关单", num: 0 }
      ],
      type: "",
    };
  },
  components: {
    dataScreening
  },
  methods: {
    active: function(index) {
      this.num = index;
    },

    derived: function() { // 导出
      // table.exportFile();
      var data = {}
      data.seleOrderInfoId = this.$("input[name='seleOrderInfoId']").val()
      data.seleorderState = this.$("#seleorderState option:selected").val()
      data.seleBeginTime = this.$("input[name='seleBeginTime']").val()
      data.seleEngTime = this.$("input[name='seleEngTime']").val()
      console.log(data)
      window.open('/api/exportOrderInfo?userId='+ this.$store.state.userId + '&orderInfoId='+ data.seleOrderInfoId + '&orderState=' + data.seleorderState +'&seleBeginTime='+ data.seleBeginTime + '&seleEndTime='+ data.seleEngTime)
    },
    getOrderInfoNum() {
      var userId = this.$store.state.userId;
      this.$axios.post("/api/getOrderInfoNum", { userId }).then(res => {
        console.log(res);
        if (res.data.retCode == "000000") {
          // this.workType[0].num = res.data.body.allNum
          this.workType[1].num = res.data.body.sendNum;
          this.workType[2].num = res.data.body.sellNum;
          this.workType[3].num = res.data.body.acceptNum;
          this.workType[4].num = res.data.body.processingNum;
          this.workType[5].num = res.data.body.finishNum;
        }
      });
    },
    Reservation(userId, orderInfoId, handleState) {
      // 预约出发到达开始
      var data = {
        userId: userId,
        orderInfoId: orderInfoId,
        handleState: handleState
      };
      this.$axios.post("/api/handleOrderInfo", data).then(res => {
        console.log(res);
        if (res.data.retCode == "000000") {
          layer.msg(res.data.retMsg, { icon: 1 });
          setTimeout(() => {
            this.reload();
          }, 3000);
        } else {
          layer.msg(res.data.retMsg, { icon: 2 });
        }
      });
    }
  },
  mounted() {
    var _this = this;
    layui.use(["table", "form", "element", "laydate", "jquery"], function() {
      var table = layui.table;
      var element = layui.element;
      var laydate = layui.laydate;
      var $ = layui.jquery;
      var form = layui.form;
      element.on("tab(workOrderManagement)", function(data) {
        console.log(this); //当前Tab标题所在的原始DOM元素
        console.log(data.index); //得到当前Tab的所在下标
        var seleorderState = data.index - 1;
        if (data.index == 0) {
          seleorderState = "";
        }
        if (data.index == 4) {
          var seleorderState = 99;
        }
        if (data.index == 5) {
          var seleorderState = 7;
        }
        if (data.index == 6) {
          var seleorderState = 8;
        }
        var dataTab = {
          userId: _this.$store.state.userId,
          seleorderState: seleorderState
        };
        table.reload("serachData", {
          url: "/api/getOrderInfoList",
          where: dataTab,
          page: { curr: 1, limit: 10 }
        });
      });
      form.on("submit(serach)", function(data) {
        data.field.userId = _this.$store.state.userId;
        console.log(data.field);
        table.reload("serachData", {
          url: "/api/getOrderInfoList",
          where: data.field,
          page: { curr: 1, limit: 10 }
        });
      });
      //第一个实例
      table.render({
        elem: "#workOrderManagement",
        method: "post",
        url: "/api/getOrderInfoList", //数据接口
        id: "serachData",
        where: {
          userId: _this.$store.state.userId
        },
        parseData: function(res) {
          //res 即为原始返回的数据
          return {
            code: res.retCode, //解析接口状态
            msg: res.retMsg, //解析提示文本
            count: res.body.totalCount, //解析数据长度
            data: res.body.orderInfoList //解析数据列表
          };
        },
        request: {
          pageName: "currentPage", //页码的参数名称，默认：page
          limitName: "everyCount" //每页数据量的参数名，默认：limit
        },
        page: true, //开启分页
        cols: [
          [
            //表头
            {
              field: "orderInfoId",
              title: "工单编号",
              sort: false,
              width: 180,
              align: "center",
              templet: function(d) {
                return (
                  '<a href="javascript:;" lay-event="edit">' +
                  d.orderInfoId +
                  "</a>"
                );
              }
            },
            {
              field: "orderStateName",
              title: "工单状态",
              width: 100,
              sort: false,
              align: "center"
            },
            {
              field: "customerName",
              title: "客户名称",
              sort: false,
              align: "center"
            },
            { field: "networName", title: "投放点名称", align: "center" },
            {
              field: "orderUrgency",
              title: "紧急程度",
              width: 80,
              align: "center",
              templet: function(d) {
                return d.orderUrgency == 0 ? "一般" : "紧急";
              }
            },
            {
              field: "expendTime",
              title: "当前总耗时（min）",
              sort: false,
              align: "center"
            },
            {
              field: "amountTime",
              title: "工单总耗时（min）",
              sort: false,
              align: "center"
            },
            {
              field: "userName",
              title: "创建人",
              width: 100,
              align: "center"
            },
            {
              field: "createTime",
              title: "创建时间",
              sort: false,
              align: "center"
            },
            {
              field: "orderState",
              title: "操作",
              width: 315,
              align: "center",
              // toolbar: "#barDemo",
              templet: function(d) {
                // console.log(d.orderState)
                if (d.orderState == 0) {
                  //待发单
                  return '<a class="layui-btn layui-btn-xs" lay-event="edit" >编辑</a><a class="layui-btn layui-btn-xs" lay-event="Kuantan">关单</a><a class="layui-btn layui-btn-xs" lay-event="bill">发单</a>';
                }
                if (d.orderState == 1) {
                  //待派单
                  return '<a class="layui-btn layui-btn-xs" lay-event="edit" >编辑</a><a class="layui-btn layui-btn-xs" lay-event="Kuantan">关单</a><a class="layui-btn layui-btn-xs" lay-event="sendOrders">派单</a><a class="layui-btn layui-btn-xs" lay-event="reject">驳回</a>';
                }
                if (d.orderState == 2) {
                  // 待受理
                  return '<a class="layui-btn layui-btn-xs" lay-event="edit" >编辑</a><a class="layui-btn layui-btn-xs" lay-event="Kuantan">关单</a><a class="layui-btn layui-btn-xs" lay-event="acceptance">受理</a><a class="layui-btn layui-btn-xs" lay-event="reassignment">改派</a>';
                }
                if (d.orderState == 3) {
                  // 处理中
                  return '<a class="layui-btn layui-btn-xs" lay-event="edit" >编辑</a><a class="layui-btn layui-btn-xs" lay-event="Kuantan">关单</a><a class="layui-btn layui-btn-xs" lay-event="reservation" >预约</a><a class="layui-btn layui-btn-xs" lay-event="synergy" >协同</a><a class="layui-btn layui-btn-xs" lay-event="finish">完成</a>';
                }
                if (d.orderState == 4) {
                  // 已预约
                  return '<a class="layui-btn layui-btn-xs" lay-event="edit" >编辑</a><a class="layui-btn layui-btn-xs" lay-event="start">出发</a><a class="layui-btn layui-btn-xs" lay-event="Kuantan">关单</a><a class="layui-btn layui-btn-xs" lay-event="reservation" >更改预约</a><a class="layui-btn layui-btn-xs" lay-event="synergy" >协同</a>';
                }
                if (d.orderState == 5) {
                  // 已出发
                  return '<a class="layui-btn layui-btn-xs" lay-event="edit" >编辑</a><a class="layui-btn layui-btn-xs" lay-event="reach">到达</a><a class="layui-btn layui-btn-xs" lay-event="Kuantan">关单</a><a class="layui-btn layui-btn-xs" lay-event="synergy" >协同</a>';
                }
                if (d.orderState == 7) {
                  //待回访
                  return '<a class="layui-btn layui-btn-xs" lay-event="edit" >编辑</a><a class="layui-btn layui-btn-xs" lay-event="Kuantan">关单</a><a class="layui-btn layui-btn-xs" lay-event="reject">驳回</a>';
                }
                if (d.orderState == 8) {
                  //已关单
                  return "";
                }
                if (d.orderState == 9) {
                  // 已到达
                  return '<a class="layui-btn layui-btn-xs" lay-event="edit" >编辑</a><a class="layui-btn layui-btn-xs" lay-event="begin">开始</a><a class="layui-btn layui-btn-xs" lay-event="Kuantan">关单</a><a class="layui-btn layui-btn-xs" lay-event="synergy" >协同</a>';
                }
                if (d.orderState == 10) {
                  // 完成
                  return '<a class="layui-btn layui-btn-xs" lay-event="edit" >编辑</a><a class="layui-btn layui-btn-xs" lay-event="finish">完成</a><a class="layui-btn layui-btn-xs" lay-event="Kuantan">关单</a><a class="layui-btn layui-btn-xs" lay-event="synergy" >协同</a>';
                }
              }
            }
          ]
        ]
      });

      //监听行工具事件
      table.on("tool(workOrderManagement)", function(obj) {
        var data = obj.data;
        console.log(data);
        var orderState = data.orderState;
        var orderInfoId = data.orderInfoId;
        var appoinmentTime = data.appoinmentTime;
        console.log(orderState);
        if (obj.event === "edit") {
          //编辑
          sessionStorage.setItem("orderState", orderState);
          sessionStorage.setItem("orderInfoId", orderInfoId);
          if (orderState == 8) {
            _this.$router.push("/Kuantan");
          } else if (orderState == 0) {
            _this.$router.push("/workOrderCreate");
          } else {
            _this.$router.push("/workOrderDetails");
          }
        } else if (obj.event === "reservation") {
          //预约
          // sessionStorage.setItem('orderState',orderState)
          // _this.$router.push('/addCustomer')
          layer.open({
            type: 1,
            title: "预约上门时间",
            area: ["600px", "400px"],
            fixed: false,
            maxmin: true,
            content: `<form class="layui-form layui-form-pane">
                    <div style="padding:10px" class="layui-form-item">
                      <label class="layui-form-label">选择时间</label>
                      <div class="layui-input-block">
                        <input type="text" id="reservation" name="reservation" class="layui-input" />
                      </div>
                    </div>
                  </form>`,
            success: function() {
              form.render();
              laydate.render({
                // 维保开始时间
                elem: "#reservation",
                type: "datetime",
                closeStop: "#reservation",
                trigger: "click"
              });
            },
            btn: ["确定", "取消"],
            btnAlign: "c",
            yes: function(index, layero) {
              var appoinmentTime = _this.$("#reservation").val();
              if (orderState == 4) {
                var handleState = 12;
              } else {
                var handleState = 3;
              }
              var data = {
                userId: _this.$store.state.userId,
                orderInfoId: orderInfoId,
                handleState: handleState,
                appoinmentTime: appoinmentTime
              };
              console.log(data);
              _this.$axios.post("/api/handleOrderInfo", data).then(res => {
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
            }
          });
        } else if (obj.event === "start") {
          // 出发
          _this.Reservation(_this.$store.state.userId, orderInfoId, 4);
        } else if (obj.event === "reach") {
          // 到达
          _this.Reservation(_this.$store.state.userId, orderInfoId, 5);
        } else if (obj.event === "begin") {
          // 开始
          _this.Reservation(_this.$store.state.userId, orderInfoId, 6);
        } else if (obj.event === "Kuantan") {
          //关单
          if (orderState == 7) {
            sessionStorage.setItem("orderState", orderState);
            sessionStorage.setItem("orderInfoId", orderInfoId);
            _this.$router.push("/workOrderDetails");
          } else {
            layer.open({
              type: 1,
              title: "是否关闭此工单？",
              area: ["600px", "400px"],
              fixed: false, //不固定
              maxmin: true,
              content: `<div style="padding:10px" class="layui-form-item layui-form-text">
                        <textarea name="Kuantan" placeholder="请输入关单说明" id="Kuantan" row="50" style="min-height:260px" class="layui-textarea"></textarea>
                      </div>
                      `,
              btn: ["确定", "取消"],
              success: function() {
                form.render();
              },
              yes: function(index, layero) {
                var content = _this.$("#Kuantan").val();
                var datas = {
                  userId: _this.$store.state.userId,
                  orderInfoId: orderInfoId,
                  handleState: 8,
                  content: content
                };
                console.log(datas);
                _this.$axios.post("/api/handleOrderInfo", datas).then(res => {
                  console.log(res);
                  if (res.data.retCode == "000000") {
                    layer.msg(res.data.retMsg, { icon: 1 });
                    setTimeout(() => {
                      _this.reload();
                    });
                  } else {
                    layer.msg(res.data.retMsg, { icon: 2 });
                  }
                });
                layer.close(index);
              },
              btnAlign: "c"
            });
          }
        } else if (obj.event === "synergy") {
          //协同
          // sessionStorage.setItem('orderState',orderState)
          // _this.$router.push('/addCustomer')
          // _this.send(orderInfoId);
          layer.open({
            type: 1,
            title: "发起协同作业",
            area: ["600px", "400px"],
            fixed: false, //不固定
            maxmin: true,
            content: `<form class="layui-form layui-form-pane">
                      <ul style="padding: 10px">
                        <li class="layui-form-item layui-form-text">
                          <label class="layui-form-label">协同内容：</label>
                          <div class="layui-input-block">
                          <textarea name="content" placeholder="请输入驳回说明" id="synergyContent" row="50" class="layui-textarea"></textarea>
                          </div>
                        </li>
                        <li class="layui-form-item">
                          <label class="layui-form-label">紧急程度：</label>
                          <div class="layui-input-block">
                            <select name="degree" id="degree">
                              <option value>请选择紧急程度</option>
                              <option value="0">一般</option>
                              <option value="1">紧急</option>
                            </select>
                          </div>
                        </li>
                        <li class="layui-form-item">
                          <label class="layui-form-label">指派给</label>
                          <div class="layui-input-block">
                            <select name="acceptUserId" id="acceptUserId">
                              <option value>请选择指派人</option>
                            </select>
                          </div>
                        </li>
                      </ul>
                      </form>
                    `,
            btn: ["确定", "取消"],
            success: function() {
              form.render();
              _this.$axios
                .post("/api/getUserList", { userId: _this.$store.state.userId })
                .then(res => {
                  console.log(res);
                  var userList = res.data.body.userList;
                  for (var i = 0; i < userList.length; i++) {
                    console.log(userList[i].userName);
                    if(userList[i].userId !== 'admin'){
                      $("#acceptUserId").append(
                      '<option value="' +
                        userList[i].userId +
                        '">' +
                        userList[i].userName +
                        "</option>"
                    );
                    }
                    
                  }
                  console.log($("#acceptUserId"));
                  form.render();
                });
            },
            yes: function(index, layero) {
              var content = _this.$("#synergyContent").val();
              var orderUrgency = _this.$("#degree option:selected").val();
              var responsibleId = _this
                .$("#acceptUserId option:selected")
                .val();
              var datas = {
                userId: _this.$store.state.userId,
                orderInfoId: orderInfoId,
                content: content,
                orderUrgency: orderUrgency,
                responsibleId: responsibleId,
                createrId: data.createUserId
              };
              console.log(datas);
              _this.$axios.post("/api/addCoordinateInfo", datas).then(res => {
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
          sessionStorage.setItem("orderState", orderState);
          sessionStorage.setItem("orderInfoId", orderInfoId);
          _this.$router.push("/workOrderDetails");
        } else if (obj.event === "sendOrders") {
          //派单
          sessionStorage.setItem("orderState", orderState);
          sessionStorage.setItem("orderInfoId", orderInfoId);
          _this.$router.push("/workOrderDetails");
        } else if (obj.event === "reject") {
          //驳回
          // sessionStorage.setItem('orderState',orderState)
          // _this.$router.push('/addCustomer')
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
            success: function() {
              form.render();
            },
            yes: function(index, layero) {
              var content = $("#reject").val();
              if (orderState == 7) {
                var handleState = 13;
                if (appoinmentTime == "" || appoinmentTime == null) {
                  var isAppoint = 0;
                } else {
                  var isAppoint = 1;
                }
              } else {
                var handleState = 9;
              }

              var data = {
                userId: _this.$store.state.userId,
                orderInfoId: orderInfoId,
                handleState: handleState,
                content: content,
                isAppoint: isAppoint
              };
              console.log(data);
              _this.$axios.post("/api/handleOrderInfo", data).then(res => {
                console.log(res);
                if (res.data.retCode == "000000") {
                  layer.msg(res.data.retMsg, { icon: 1 });
                  setTimeout(() => {
                    _this.reload();
                  });
                } else {
                  layer.msg(res.data.retMsg, { icon: 2 });
                }
              });
              layer.close(index);
              return false;
            },
            btnAlign: "c"
          });
        } else if (obj.event === "bill") {
          //发单
          sessionStorage.setItem("orderState", orderState);
          sessionStorage.setItem("orderInfoId", orderInfoId);
          _this.$router.push("/workOrderCreate");
        } else if (obj.event === "acceptance") {
          //受理
          _this.Reservation(_this.$store.state.userId, orderInfoId, 2);
        } else if (obj.event === "reassignment") {
          //改派
          layer.open({
            type: 1,
            title: "填写改派说明",
            area: ["600px", "400px"],
            fixed: false, //不固定
            maxmin: true,
            content: `
                      <div style="padding:10px" class="layui-form-item layui-form-text">
                        <textarea name="reassignment" placeholder="请输入改派说明" id="reassignment" row="50" style="min-height:260px" class="layui-textarea"></textarea>
                      </div>
                    `,
            btn: ["确定", "取消"],
            success: function() {
              form.render();
            },
            yes: function(index, layero) {
              var content = _this.$("#reassignment").val();
              var data = {
                userId: _this.$store.state.userId,
                orderInfoId: orderInfoId,
                handleState: 10,
                content: content
              };
              console.log(data);
              _this.$axios.post("/api/handleOrderInfo", data).then(res => {
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
            },
            btnAlign: "c"
          });
        }
      });
    });
  },
  created() {
    this.type = this.$route.query.type;
    // var data = {
    //   userId: this.$store.state.userId,
    //   currentPage: 1,
    //   everyCount: 10
    // };
    // this.$axios.post("/api/getOrderInfoList", data).then(res => {
    //   console.log(res);
    // });
    sessionStorage.clear();
    this.getOrderInfoNum();
  }
};
</script>

<style scoped>
.workOrderManagement {
  /* height: 100%; */
  padding: 15px 15px 0;
}
/* .active {
  border-bottom: 2px solid #445eee;
  color: #445eee;
} */
/* .work_type ul {
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
} */
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