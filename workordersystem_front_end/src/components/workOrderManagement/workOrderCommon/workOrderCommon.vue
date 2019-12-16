<template>
  <div class="workOrderCommon">
    <form action class="layui-form layui-form-pane">
      <div v-if="orderState == 7">
        <customerInfo></customerInfo>
      </div>
      <div v-else>
        <div class="customerInfo">
          <h2>客户信息</h2>
          <!-- <div class="customerInfo_content information"> -->
          <div class="layui-form-item">
            <label class="layui-form-label">客户名称</label>
            <div class="layui-input-block">
              <input
                type="text"
                name
                :value="workOrderInfo.customerName ? workOrderInfo.customerName : null"
                class="layui-input"
                disabled
              />
            </div>
          </div>

          <div class="layui-form-item">
            <label class="layui-form-label">合同ID</label>
            <div class="layui-input-block">
              <input
                type="text"
                name
                :value="workOrderInfo.agreenmentId"
                class="layui-input"
                disabled
              />
            </div>
          </div>

          <div class="layui-form-item">
            <label class="layui-form-label">设备投放点</label>
            <div class="layui-input-block">
              <input
                type="text"
                name
                :value="workOrderInfo.networName"
                class="layui-input"
                disabled
              />
            </div>
          </div>

          <div class="layui-form-item">
            <label class="layui-form-label">投放点地址</label>
            <div class="layui-input-block">
              <input
                type="text"
                name
                autocomplete="off"
                class="layui-input"
                :value="workOrderInfo.networAddress"
                disabled
              />
            </div>
          </div>

          <div class="layui-form-item">
            <label class="layui-form-label">联系人</label>
            <div class="layui-input-block">
              <input
                type="text"
                name
                :value="workOrderInfo.contactName"
                class="layui-input"
                disabled
              />
            </div>
          </div>

          <div class="layui-form-item">
            <label class="layui-form-label">联系电话</label>
            <div class="layui-input-block">
              <input
                type="text"
                name
                :value="workOrderInfo.contactPhone"
                class="layui-input"
                disabled
              />
            </div>
          </div>

          <!-- </div> -->
        </div>

        <div class="faultMessage">
          <h2>故障信息</h2>
          <!-- <div class="faultMessage_content information"> -->
          <div class="layui-form-item">
            <label class="layui-form-label">工单来源</label>
            <div class="layui-input-block">
              <input
                type="text"
                name
                :value="workOrderInfo.orderSource == 0 ? '电话' : '其他'"
                class="layui-input"
                disabled
              />
            </div>
          </div>

          <div class="layui-form-item">
            <label class="layui-form-label">工单类型</label>
            <div class="layui-input-block">
              <input
                type="text"
                name
                :value="workOrderInfo.orderStateName"
                class="layui-input"
                disabled
              />
            </div>
          </div>

          <div class="layui-form-item">
            <label class="layui-form-label">紧急程度</label>
            <div class="layui-input-block">
              <input
                type="text"
                name
                :value="workOrderInfo.orderUrgency == 0 ? '一般' : '紧急'"
                class="layui-input"
                disabled
              />
            </div>
          </div>

          <div class="layui-form-item">
            <label class="layui-form-label">报障时间</label>
            <div class="layui-input-block">
              <input
                type="text"
                name
                class="layui-input"
                id="reportedBarrierTime"
                :value="workOrderInfo.reportTime"
                disabled
              />
              <i></i>
            </div>
          </div>

          <div class="layui-form-item">
            <label class="layui-form-label">设备型号</label>
            <div class="layui-input-block">
              <input type="text" name :value="workOrderInfo.modelType" class="layui-input" disabled />
            </div>
          </div>

          <div class="layui-form-item">
            <label class="layui-form-label">存货编码</label>
            <div class="layui-input-block">
              <input
                type="text"
                name
                :value="workOrderInfo.deviceNumber"
                class="layui-input"
                disabled
              />
            </div>
          </div>
          <!-- </div> -->
          <div class="layui-form-item layui-form-text">
            <label class="layui-form-label">问题描述</label>
            <div class="layui-input-block">
              <textarea
                name
                :value="workOrderInfo.problemDescription"
                placeholder="请输入内容"
                class="layui-textarea"
                disabled
              ></textarea>
            </div>
          </div>

          <div class="layui-form-item">
            <label class="layui-form-label">附件</label>
            <div id="affix">
              <div class="uploadImg">

              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 故障处理记录 详情 -->
      <processingRecord :workOrderInfo="workOrderInfo" v-if="orderState == 7 ? true : false"></processingRecord>
      <!-- 待派单组件 -->
      <waitSendOrders v-if="orderState == 1 ? true : false"></waitSendOrders>
      <!-- 预约 -->
      <reservation
        :workOrderInfo="workOrderInfo"
        v-if="orderState == 4 || orderState == 5 || orderState == 9 || orderState == 10 ? true : false"
      ></reservation>
      <!-- 故障处理中 -->
      <inProcess :orderState="orderState" v-if="orderState == 3 || orderState == 10 ? true : false"></inProcess>
      <!-- 协同 -->
      <synergy v-if="orderState == 7 || orderState == 3 || orderState == 4 || orderState == 5 || orderState == 9 || orderState == 10? true : false"></synergy>
      <!-- 待回访 -->
      <waitReturnVisit :workOrderInfo="workOrderInfo" v-if="orderState == 7 ? true : false"></waitReturnVisit>
      <div class="layui-form-item layui-form-text">
        <label class="layui-form-label">备注</label>
        <div class="layui-input-block">
          <textarea name="remark" placeholder="请输入内容" class="layui-textarea"></textarea>
        </div>
      </div>
      <div class="layui-form-item">
        <div class="layui-input-block">
          <button
            type="button"
            class="layui-btn"
            lay-submit
            lay-filter="sendOrders"
            v-if="orderState == 1 ? true : false"
          >派单</button>
          <button
            type="button"
            class="layui-btn"
            lay-submit
            lay-filter="acceptance"
            v-if="orderState == 2 ? true : false"
          >受理</button>
          <button
            type="button"
            class="layui-btn layui-btn-primary"
            lay-submit
            lay-filter="reassignment"
            v-if="orderState == 2 ? true : false"
          >改派</button>
          <button
            type="button"
            class="layui-btn"
            lay-submit
            lay-filter="finish"
            v-if="orderState == 3 || orderState == 10 ? true : false"
          >完成</button>
          <button
            type="button"
            class="layui-btn"
            lay-submit
            lay-filter="start"
            v-if="orderState == 4 ? true : false"
          >出发</button>
          <button
            type="button"
            class="layui-btn"
            lay-submit
            lay-filter="arrive"
            v-if="orderState == 5 ? true : false"
          >到达</button>
          <button
            type="button"
            class="layui-btn"
            lay-submit
            lay-filter="begin"
            v-if="orderState == 9 ? true : false"
          >开始</button>
          <button
            type="button"
            class="layui-btn layui-btn-primary"
            lay-submit
            lay-filter="reservation"
            v-if="orderState == 3 ? true : false"
          >预约上门</button>
          <button
            type="button"
            class="layui-btn layui-btn-primary"
            lay-submit
            lay-filter="reservation"
            v-if="orderState == 4 ? true : false"
          >更改预约</button>
          <button
            type="button"
            class="layui-btn layui-btn-primary"
            lay-submit
            lay-filter="synergy"
            v-if="orderState == 3 || orderState == 4 || orderState == 5 || orderState == 9 || orderState == 10? true : false"
          >发起协同</button>
          <button
            type="button"
            class="layui-btn layui-btn-primary"
            lay-submit
            lay-filter="reject"
            v-if="orderState == 7 || orderState == 1 ? true : false"
          >驳回</button>
          <button
            type="button"
            class="layui-btn layui-btn-primary"
            lay-submit
            lay-filter="Kuantan"
          >关单</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import waitSendOrders from "../workOrderDetails/waitSendOrders";
import reservation from "../workOrderDetails/reservation";
import synergy from "../workOrderDetails/synergy";
import waitReturnVisit from "../workOrderDetails/waitReturnVisit";
import inProcess from "../workOrderDetails/inProcess";
import customerInfo from "../workOrderDetails/customerInfo";
import processingRecord from "../workOrderDetails/processingRecord";
export default {
  name: "workOrderCommon",
  data() {
    return {
      orderState: sessionStorage.getItem("orderState"),
      workOrderInfo: {},
      userList: [],
      userId: sessionStorage.getItem("userId")
        ? sessionStorage.getItem("userId")
        : "",
      orderInfoId: sessionStorage.getItem("orderInfoId")
        ? sessionStorage.getItem("orderInfoId")
        : ""
    };
  },
  components: {
    waitSendOrders,
    inProcess,
    reservation,
    synergy,
    waitReturnVisit,
    customerInfo,
    processingRecord
  },
  methods: {
    cancel() {
      this.$router.push("/workOrderManagement?type=workOrderManagement");
    },
    getcoordinateList(data){
      console.log(data)
    },
    send() {
      var data = {
        userId: this.userId,
        orderInfoId: this.orderInfoId
      };
      this.$axios.post("/api/getOrderInfo", data).then(res => {
        console.log(res);
        this.workOrderInfo = res.data.body;
        this.$(".uploadImg").html(res.data.body.orderPhoto ? '<img style="width:100px;height:100px" src=" http://192.168.1.245/'+ res.data.body.orderPhoto.split(',')[0] +'" alt />' : '')
      });
    }
  },
  mounted() {
    var _this = this;
    layui.use(["form", "upload", "laydate", "jquery"], function() {
      var form = layui.form;
      var $ = layui.jquery;
      var upload = layui.upload;
      var laydate = layui.laydate;
      form.render();

      // 完成
      form.on("submit(finish)", function(data) {
        data.field.userId = _this.userId;
        data.field.orderInfoId = _this.orderInfoId;
        console.log(data.field);
        _this.$axios.post("/api/finishOrderInfo", data.field).then(res => {
          console.log(res);
          if (res.data.retCode == "000000") {
            layer.msg(res.data.retMsg, { icon: 1 });
            setTimeout(() => {
              _this.$router.push(
                "/workOrderManagement?type=workOrderManagement"
              );
            }, 3000);
          } else {
            layer.msg(res.data.retMsg, { icon: 2 });
          }
        });
        return false;
      });

      // 派单
      form.on("submit(sendOrders)", function(data) {
        data.field.userId = _this.userId;
        data.field.orderInfoId = _this.orderInfoId;
        data.field.handleState = 1;
        console.log(data.field);
        _this.$axios.post("/api/handleOrderInfo", data.field).then(res => {
          console.log(res);
          if (res.data.retCode == "000000") {
            layer.msg(res.data.retMsg, { icon: 1 });
            setTimeout(() => {
              _this.$router.push(
                "/workOrderManagement?type=workOrderManagement"
              );
            }, 3000);
          } else {
            layer.msg(res.data.retMsg, { icon: 2 });
          }
        });
        return false;
      });
      // 受理
      form.on("submit(acceptance)", function(data) {
        data.field.userId = _this.userId;
        data.field.orderInfoId = _this.orderInfoId;
        data.field.handleState = 2;
        console.log(data.field);
        _this.$axios.post("/api/handleOrderInfo", data.field).then(res => {
          console.log(res);
          if (res.data.retCode == "000000") {
            layer.msg(res.data.retMsg, { icon: 1 });
            setTimeout(() => {
              _this.$router.push(
                "/workOrderManagement?type=workOrderManagement"
              );
            }, 3000);
          } else {
            layer.msg(res.data.retMsg, { icon: 2 });
          }
        });
        return false;
      });
      // 改派
      form.on("submit(reassignment)", function(data) {
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
            var content = $("#reassignment").val();
            var data = {
              userId: _this.userId,
              orderInfoId: _this.orderInfoId,
              handleState: 10,
              content: content
            };
            console.log(data);
            _this.$axios.post("/api/handleOrderInfo", data).then(res => {
              console.log(res);
              if (res.data.retCode == "000000") {
                layer.msg(res.data.retMsg, { icon: 1 });
                setTimeout(() => {
                  _this.$router.push(
                    "/workOrderManagement?type=workOrderManagement"
                  );
                }, 3000);
              } else {
                layer.msg(res.data.retMsg, { icon: 2 });
              }
            });
            layer.close(index);
          },
          btnAlign: "c"
        });
        return false;
      });
      // 出发
      form.on("submit(start)", function() {
        var data = {
          userId: _this.userId,
          orderInfoId: _this.orderInfoId,
          handleState: 4
        };
        _this.$axios.post("/api/handleOrderInfo", data).then(res => {
          console.log(res);
          if (res.data.retCode == "000000") {
            layer.msg(res.data.retMsg, { icon: 1 });
            setTimeout(() => {
              _this.$router.push(
                "/workOrderManagement?type=workOrderManagement"
              );
            }, 3000);
          } else {
            layer.msg(res.data.retMsg, { icon: 2 });
          }
        });
        return false;
      });

      // 到达
      form.on("submit(arrive)", function() {
        var data = {
          userId: _this.userId,
          orderInfoId: _this.orderInfoId,
          handleState: 5
        };
        _this.$axios.post("/api/handleOrderInfo", data).then(res => {
          console.log(res);
          if (res.data.retCode == "000000") {
            layer.msg(res.data.retMsg, { icon: 1 });
            setTimeout(() => {
              _this.$router.push(
                "/workOrderManagement?type=workOrderManagement"
              );
            }, 3000);
          } else {
            layer.msg(res.data.retMsg, { icon: 2 });
          }
        });
        return false;
      });
      // 开始
      form.on("submit(begin)", function() {
        var data = {
          userId: _this.userId,
          orderInfoId: _this.orderInfoId,
          handleState: 6
        };
        _this.$axios.post("/api/handleOrderInfo", data).then(res => {
          console.log(res);
          if (res.data.retCode == "000000") {
            layer.msg(res.data.retMsg, { icon: 1 });
            setTimeout(() => {
              _this.$router.push(
                "/workOrderManagement?type=workOrderManagement"
              );
            }, 3000);
          } else {
            layer.msg(res.data.retMsg, { icon: 2 });
          }
        });

        return false;
      });
      // 预约上门
      form.on("submit(reservation)", function(data) {
        console.log(data.field);
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
            var appoinmentTime = $("#reservation").val();
            if (_this.orderState == 4) {
              var handleState = 12;
            } else {
              var handleState = 3;
            }
            var data = {
              userId: _this.userId,
              orderInfoId: _this.orderInfoId,
              handleState: handleState,
              appoinmentTime: appoinmentTime
            };
            console.log(data);
            _this.$axios.post("/api/handleOrderInfo", data).then(res => {
              console.log(res);
              if (res.data.retCode == "000000") {
                layer.msg(res.data.retMsg, { icon: 1 });
                setTimeout(() => {
                  _this.$router.push(
                    "/workOrderManagement?type=workOrderManagement"
                  );
                },3000);
              } else {
                layer.msg(res.data.retMsg, { icon: 2 });
              }
            });
            layer.close(index);
          }
        });
        return false;
      });

      // 发起协同
      form.on("submit(synergy)", function(data) {
        // console.log(data.field);
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
            _this.$axios
              .post("/api/getUserList", _this.$store.state.userId)
              .then(res => {
                console.log(res);
                var userList = res.data.body.userList;
                for (var i = 0; i < userList.length; i++) {
                  console.log(userList[i].userName);
                  $("#acceptUserId").append(
                    '<option value="' +
                      userList[i].userId +
                      '">' +
                      userList[i].userName +
                      "</option>"
                  );
                }
                console.log($("#acceptUserId"));
                form.render();
              });
          },
          yes: function(index, layero) {
            console.log(data.field);
            var content = $("#synergyContent").val();
            var orderUrgency = $("#degree option:selected").val();
            var responsibleId = $("#acceptUserId option:selected").val();
            var datas = {
              userId: _this.userId,
              orderInfoId: _this.orderInfoId,
              content: content,
              orderUrgency: orderUrgency,
              responsibleId: responsibleId,
              createrId: _this.workOrderInfo.userId
            };
            console.log(datas);
            _this.$axios.post("/api/addCoordinateInfo", datas).then(res => {
              console.log(res);
              if (res.data.retCode == "000000") {
                layer.msg(res.data.retMsg, { icon: 1 });
                setTimeout(() => {
                  _this.$router.push(
                    "/workOrderManagement?type=workOrderManagement"
                  );
                },3000);
              } else {
                layer.msg(res.data.retMsg, { icon: 2 });
              }
            });
            layer.close(index);
            return false;
          },
          btnAlign: "c"
        });
        return false;
      });

      // 驳回
      form.on("submit(reject)", function(data) {
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
            if(_this.orderState == 7){
              var handleState = 13
              if(_this.workOrderInfo.appoinmentTime == "" || _this.workOrderInfo.appoinmentTime == null){
                var isAppoint = 0
              }else{
                var isAppoint = 1
              }
            }else{
              var handleState = 9
            }
            
            var data = {
              userId: _this.userId,
              orderInfoId: _this.orderInfoId,
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
                  _this.$router.push(
                    "/workOrderManagement?type=workOrderManagement"
                  );
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
        return false;
      });

      // 关单
      form.on("submit(Kuantan)", function(data) {
        console.log(data.field);

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
            console.log(data.field);
            if (_this.orderState == 7) {
              // 待回访关单
              data.field.userId = _this.userId;
              data.field.orderInfoId = _this.orderInfoId;
              console.log(data.field);
              _this.$axios.post("/api/closeOrderInfo", data.field).then(res => {
                console.log(res);
                if (res.data.retCode == "000000") {
                  layer.msg(res.data.retMsg, { icon: 1 });
                  setTimeout(() => {
                    _this.$router.push(
                      "/workOrderManagement?type=workOrderManagement"
                    );
                  });
                } else {
                  layer.msg(res.data.retMsg, { icon: 2 });
                }
              });
            } else {
              var content = $("#Kuantan").val();
              var datas = {
                userId: _this.userId,
                orderInfoId: _this.orderInfoId,
                handleState: 8,
                content: content
              };
              console.log(datas);
              _this.$axios.post("/api/handleOrderInfo", datas).then(res => {
                console.log(res);
                if (res.data.retCode == "000000") {
                  layer.msg(res.data.retMsg, { icon: 1 });
                  setTimeout(() => {
                    _this.$router.push(
                      "/workOrderManagement?type=workOrderManagement"
                    );
                  });
                } else {
                  layer.msg(res.data.retMsg, { icon: 2 });
                }
              });
            }
            layer.close(index);
          },
          btnAlign: "c"
        });

        return false;
      });
    });
  },
  created() {
    this.send();
  },
  updated() {
    setTimeout(function() {
      layui.use(["form"], function() {
        layui.form.render();
      });
    }, 10);
  },
  beforeDestroy() {
    // sessionStorage.removeItem("orderState")
    // sessionStorage.removeItem("orderInfoId")
  }
};
</script>

<style scoped>
.workOrderCreate {
  padding: 20px 15px 0;
}
h2 {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 20px;
}
.uploadImg {
  display: inline-block;
  width: 100px;
  height: 100px;
  /* border: 1px solid red; */
}
.uploadImg img {
  width: 100%;
  height: 100%;
}
</style>