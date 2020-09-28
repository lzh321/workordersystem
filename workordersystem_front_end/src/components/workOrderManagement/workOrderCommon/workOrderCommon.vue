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
            <label class="layui-form-label">工单状态</label>
            <div class="layui-input-block">
              <input
                type="text"
                name
                :value="workOrderInfo.orderStateName"
                class="layui-input"
                autocomplete="off"
                disabled
              />
            </div>
          </div>
          <div class="layui-form-item">
            <label class="layui-form-label">工单编号</label>
            <div class="layui-input-block">
              <input
                type="text"
                name
                :value="orderInfoId"
                class="layui-input"
                autocomplete="off"
                disabled
              />
            </div>
          </div>
          <div class="layui-form-item">
            <label class="layui-form-label">客户名称</label>
            <div class="layui-input-block">
              <input
                type="text"
                name
                :value="workOrderInfo.customerName ? workOrderInfo.customerName : null"
                class="layui-input"
                autocomplete="off"
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
                autocomplete="off"
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
                :value="workOrderInfo.orderSource"
                class="layui-input"
                disabled
              />
            </div>
          </div>

          <div class="layui-form-item">
            <label class="layui-form-label">工单类型</label>
            <div class="layui-input-block">
              <input type="text" name :value="workOrderInfo.orderType" class="layui-input" disabled />
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
              <input
                type="text"
                :value="workOrderInfo.modelType + '（'+workOrderInfo.modelName +'）'"
                class="layui-input"
                disabled
              />
            </div>
          </div>

          <div class="layui-form-item">
            <label class="layui-form-label">设备序列号</label>
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

          <!-- <div class="layui-form-item">
            <label class="layui-form-label">附件</label>
            <div id="affix">
              
            </div>
          </div>-->
          <div class="affix layui-form-item">
            <label class="layui-form-label">附件</label>
          </div>
          <div class="layui-upload">
            <blockquote class="layui-elem-quote layui-quote-nm" style="margin-top: 10px;">
              预览
              <viewer class="layui-upload-list" style="display:flex;flex-wrap:wrap" :images="imgDataArray">
                    <div v-for="(item,index) in imgDataArray" :key="index" style="flex: none;width:100px;height:100px;margin-right:10px;margin-bottom:10px;display:inline-block;">
                      <img
                      class="layui-upload-img"
                      style="width:100%;height:100%"
                      :src="DomainName+ item "
                      :layer-src="DomainName+ item"
                      alt
                      />
                    </div>
                </viewer>
            </blockquote>
          </div>

          <div v-if="orderState == 1 ? true : false" class="layui-form-item">
            <label class="layui-form-label">派单人</label>
            <div class="layui-input-block">
              <input
                type="text"
                name
                :value="workOrderInfo.singlePerson"
                class="layui-input"
                autocomplete="off"
                disabled
              />
            </div>
          </div>
          <div v-if="orderState == 2 ? true : false" class="layui-form-item">
            <label class="layui-form-label">受理人</label>
            <div class="layui-input-block">
              <input type="text" name :value="workOrderInfo.userName" class="layui-input" disabled />
            </div>
          </div>
        </div>
      </div>
      <!-- 故障处理记录 详情 -->
      <processingRecord :workOrderInfo="workOrderInfo" v-if="orderState == 7 ? true : false"></processingRecord>
      <!-- 待派单组件 -->
      <waitSendOrders v-if="orderState == 1 ? true : false"></waitSendOrders>
      <!-- 预约 -->
      <!-- <reservation
        :workOrderInfo="workOrderInfo"
        v-if="orderState == 4 || orderState == 5 || orderState == 7 || orderState == 9 || orderState == 10 ? true : false"
      ></reservation> -->
      <!-- 故障处理中 -->
      <inProcess
        :orderState="orderState"
        :workOrderInfo="workOrderInfo"
        v-if="orderState == 3 || orderState == 10 ? true : false"
      ></inProcess>
      <!-- 协同 -->
      <synergy
        v-if="orderState == 7 || orderState == 3 || orderState == 4 || orderState == 5 || orderState == 9 || orderState == 10? true : false"
      ></synergy>
      <!-- 待回访 -->
      <waitReturnVisit :workOrderInfo="workOrderInfo" v-if="orderState == 7 ? true : false"></waitReturnVisit>
      <div class="layui-form-item layui-form-text">
        <label class="layui-form-label">备注</label>
        <div class="layui-input-block">
          <textarea name="remark" placeholder="请输入内容" class="layui-textarea"></textarea>
        </div>
      </div>
      <div class="layui-form-item">
        <div class="layui-input-block pageBtn">
          <!-- <button
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
          >关单</button> -->
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
      orderState: localStorage.getItem("orderState"),
      workOrderInfo: {},
      userList: [],
      imgDataArray: [],
      DomainName: this.$store.state.url,
      userId: this.$store.state.userId
        ? this.$store.state.userId
        : "",
      orderInfoId: localStorage.getItem("orderInfoId")
        ? localStorage.getItem("orderInfoId")
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
    previewImg(){  // 图片预览
      layer.photos({
        photos: "#imgBox1"
        ,anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
      });
    },
    cancel() {
      this.$router.push("/workOrderManagement?type=workOrderManagement");
    },
    reverseBack(){  
      this.$router.push("/workOrderManagement?type=workOrderManagement");
    },
    getcoordinateList(data) {
      console.log(data);
    },
    send() {
      var data = {
        userId: this.userId,
        orderInfoId: this.orderInfoId
      };
      this.$axios.post("/api/getOrderInfo", data).then(res => {
        console.log(res);
        this.workOrderInfo = res.data.body;
        for (var i = 0; i < res.data.body.orderPhoto.split(",").length; i++) {
          if (res.data.body.orderPhoto.split(",")[i] !== "") {
            this.imgDataArray.push(res.data.body.orderPhoto.split(",")[i]);
          }
        }
        // this.$(".uploadImg").html(
        //   res.data.body.orderPhoto
        //     ? '<img style="width:100px;height:100px" src=" DomainName' +
        //         res.data.body.orderPhoto.split(",")[0] +
        //         '" alt />'
        //     : ""
        // );
      });
    },

    getBtns() {
      // console.log(this.$('.content_main a'))
      var userId = this.$store.state.userId;
      this.$axios({
        method: "post",
        url: "/api/getAllRoleInfoByUserId",
        data: {
          userId: userId,
          seleUserId: userId
        }
      })
        .then(res => {
          console.log(res);
          // debugger
          if (res.data.body.roleBtnList.length > 0) {
            var arr = [];
            for (var i = 0; i < res.data.body.roleBtnList.length; i++) {
              if (res.data.body.roleBtnList[i].btnLimit) {
                arr.push(JSON.parse(res.data.body.roleBtnList[i].btnLimit));
              }
            }
            console.log(arr);
            var url = location.pathname + location.search;
            console.log(url);
            var str = [];
            for (var j = 0; j < arr.length; j++) {
              for (var z = 0; z < arr[j].length; z++) {
                if (arr[j][z].btns && arr[j][z].menuUrl == '/workOrderManagement?type=workOrderManagement' || arr[j][z].btns && arr[j][z].menuUrl == '/personOrder?type=personOrder') {
                  console.log(arr[j][z].btns);
                  str = arr[j][z].btns;
                }
              }
            }
            if (str.length == 0) {
              return
            } else {
              var btn = str;
              for (var h = 0; h < btn.length; h++) {
                for (var k = h + 1; k < btn.length; k++) {
                  if (btn[h].btnCode == btn[k].btnCode) {
                    //第一个等同于第二个，splice方法删除第二个
                    btn.splice(k, 1);
                    k--;
                  }
                }
              }
              var userBtn = btn;
              this.getBtnList(userBtn);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getBtnList(userBtn) {
      var btnList = userBtn;
      console.log(btnList)
      var str = "";
      for (var z = 0; z < btnList.length; z++) {
        if (btnList[z].btnName == "添加") {
          this.add = true;
        } else if (btnList[z].btnName == "配置") {
          this.config = true;
        } else {
          str += `<button
            type="button"
            class="${btnList[z].btnCode} layui-btn"
            lay-submit
            lay-filter="${btnList[z].btnName}"
          >${ btnList[z].btnName}</button>`
        }
        // console.log(btnList[z].btnCode)
      }

      this.$(".pageBtn").html(str);
      
      var btn = this.$(".pageBtn").children();
      console.log(btn)
      for(var x = 0; x < btn.length; x++){
        console.log(this.$(btn[0]).text());
        if (this.orderState == 0) {
          //待发单
            // 编辑 关单 发单 派单 受理 驳回  改派 预约 协同 更改预约 出发  到达  开始 完成
            if(this.$(btn[x]).text() == "编辑" || this.$(btn[x]).text() == "派单" || this.$(btn[x]).text() == "受理" || this.$(btn[x]).text() == "驳回" ||this.$(btn[x]).text() == "改派" ||this.$(btn[x]).text() == "预约" ||this.$(btn[x]).text() == "协同" ||this.$(btn[x]).text() == "更改预约" ||this.$(btn[x]).text() == "出发" ||this.$(btn[x]).text() == "到达" ||this.$(btn[x]).text() == "开始" ||this.$(btn[x]).text() == "完成" ) {
              this.$(btn[x]).remove()
            }
        }
        if (this.orderState == 1) {
          //待派单

            if(this.$(btn[x]).text() == "编辑" || this.$(btn[x]).text() == "发单" || this.$(btn[x]).text() == "受理"  ||this.$(btn[x]).text() == "改派" ||this.$(btn[x]).text() == "预约" ||this.$(btn[x]).text() == "协同" ||this.$(btn[x]).text() == "更改预约" ||this.$(btn[x]).text() == "出发" ||this.$(btn[x]).text() == "到达" ||this.$(btn[x]).text() == "开始" ||this.$(btn[x]).text() == "完成" ) {
              this.$(btn[x]).remove()
            }
          
        }
        if (this.orderState == 2) {
          console.log("0000")
          // 待受理
          // 编辑 关单 发单 派单 受理 驳回  改派 预约 协同 更改预约 出发  到达  开始 完成
          if(this.$(btn[x]).text() == "编辑" || this.$(btn[x]).text() == "发单" || this.$(btn[x]).text() == "派单"  ||this.$(btn[x]).text() == "驳回" ||this.$(btn[x]).text() == "预约" ||this.$(btn[x]).text() == "协同" ||this.$(btn[x]).text() == "更改预约" ||this.$(btn[x]).text() == "出发" ||this.$(btn[x]).text() == "到达" ||this.$(btn[x]).text() == "开始" ||this.$(btn[x]).text() == "完成" ) {
            this.$(btn[x]).remove()
          }
        }
        if (this.orderState == 3) {
          // 处理中
          // 编辑 关单 发单 派单 受理 驳回  改派 预约 协同 更改预约 出发  到达  开始 完成
 
            if(this.$(btn[x]).text() == "编辑" || this.$(btn[x]).text() == "发单" || this.$(btn[x]).text() == "派单"  ||this.$(btn[x]).text() == "驳回" ||this.$(btn[x]).text() == "受理" ||this.$(btn[x]).text() == "更改预约" ||this.$(btn[x]).text() == "出发" ||this.$(btn[x]).text() == "到达" ||this.$(btn[x]).text() == "开始" || this.$(btn[x]).text() == "改派" ) {
              this.$(btn[x]).remove()
            }
          
        }
        if (this.orderState == 4) {
          // 已预约
          // 编辑 关单 发单 派单 受理 驳回  改派 预约 协同 更改预约 出发  到达  开始 完成
          
            if(this.$(btn[x]).text() == "编辑" || this.$(btn[x]).text() == "发单" || this.$(btn[x]).text() == "派单"  ||this.$(btn[x]).text() == "驳回" ||this.$(btn[x]).text() == "预约" ||this.$(btn[x]).text() == "受理"  ||this.$(btn[x]).text() == "到达" ||this.$(btn[x]).text() == "开始" || this.$(btn[x]).text() == "改派" || this.$(btn[x]).text() == "完成") {
              this.$(btn[x]).remove()
            }
          
        }
        if (this.orderState == 5) {
          // 已出发
          // 编辑 关单 发单 派单 受理 驳回  改派 预约 协同 更改预约 出发  到达  开始 完成
          
            if(this.$(btn[x]).text() == "编辑" || this.$(btn[x]).text() == "发单" || this.$(btn[x]).text() == "派单"  ||this.$(btn[x]).text() == "驳回" ||this.$(btn[x]).text() == "预约" ||this.$(btn[x]).text() == "受理" || this.$(btn[x]).text() == "预约" ||this.$(btn[x]).text() == "更改预约" ||this.$(btn[x]).text() == "出发" ||this.$(btn[x]).text() == "开始" || this.$(btn[x]).text() == "改派" || this.$(btn[x]).text() == "完成") {
              this.$(btn[x]).remove()
            }
          
        }
        if (this.orderState == 7) {
          //待回访
          // 编辑 关单 发单 派单 受理 驳回  改派 预约 协同 更改预约 出发  到达  开始 完成
         
            if(this.$(btn[x]).text() == "编辑" || this.$(btn[x]).text() == "发单" || this.$(btn[x]).text() == "派单"  ||this.$(btn[x]).text() == "协同" ||this.$(btn[x]).text() == "预约" ||this.$(btn[x]).text() == "受理" || this.$(btn[x]).text() == "出发" || this.$(btn[x]).text() == "到达" ||this.$(btn[x]).text() == "更改预约" ||this.$(btn[x]).text() == "开始" || this.$(btn[x]).text() == "改派" || this.$(btn[x]).text() == "完成") {
              this.$(btn[x]).remove()
            }
          
        }
        if (this.orderState == 8) {
          //已关单
            this.$(btn[x]).remove()
        }
        if (this.orderState == 9) {
          // 已到达
          // 编辑 关单 发单 派单 受理 驳回  改派 预约 协同 更改预约 出发  到达  开始 完成
          
            if(this.$(btn[x]).text() == "编辑" || this.$(btn[x]).text() == "发单" || this.$(btn[x]).text() == "派单"  ||this.$(btn[x]).text() == "驳回" ||this.$(btn[x]).text() == "预约" ||this.$(btn[x]).text() == "受理" ||this.$(btn[x]).text() == "出发" ||this.$(btn[x]).text() == "更改预约" ||this.$(btn[x]).text() == "到达" || this.$(btn[x]).text() == "改派" || this.$(btn[x]).text() == "完成") {
              this.$(btn[x]).remove()
            }
          
        }
        if (this.orderState == 10) {
          // 完成
          // 编辑 关单 发单 派单 受理 驳回  改派 预约 协同 更改预约 出发  到达  开始 完成
          
            if(this.$(btn[x]).text() == "编辑" || this.$(btn[x]).text() == "发单" || this.$(btn[x]).text() == "派单"  ||this.$(btn[x]).text() == "驳回" ||this.$(btn[x]).text() == "预约" ||this.$(btn[x]).text() == "受理" ||this.$(btn[x]).text() == "出发" ||this.$(btn[x]).text() == "更改预约" ||this.$(btn[x]).text() == "到达" || this.$(btn[x]).text() == "改派" || this.$(btn[x]).text() == "开始") {
              this.$(btn[x]).remove()
            }
          
        }
      }
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
      _this.getBtns()
      // 完成
      form.on("submit(完成)", function(data) {
        data.field.userId = _this.userId;
        data.field.orderInfoId = _this.orderInfoId;
        console.log(data.field);
        _this.$axios.post("/api/finishOrderInfo", data.field).then(res => {
          console.log(res);
          if (res.data.retCode == "000000") {
            layer.msg(res.data.retMsg, { icon: 1 });
            setTimeout(() => {
              _this.$router.go(-1);
            }, 3000);
          } else {
            layer.msg(res.data.retMsg, { icon: 2 });
          }
        });
        return false;
      });

      // 派单
      form.on("submit(派单)", function(data) {
        data.field.userId = _this.userId;
        data.field.orderInfoId = _this.orderInfoId;
        data.field.handleState = 1;
        console.log(data.field);
        _this.$axios.post("/api/handleOrderInfo", data.field).then(res => {
          console.log(res);
          if (res.data.retCode == "000000") {
            layer.msg(res.data.retMsg, { icon: 1 });
            setTimeout(() => {
              _this.$router.go(-1);
            }, 3000);
          } else {
            layer.msg(res.data.retMsg, { icon: 2 });
          }
        });
        return false;
      });
      // 受理
      form.on("submit(受理)", function(data) {
        data.field.userId = _this.userId;
        data.field.orderInfoId = _this.orderInfoId;
        data.field.handleState = 2;
        console.log(data.field);
        _this.$axios.post("/api/handleOrderInfo", data.field).then(res => {
          console.log(res);
          if (res.data.retCode == "000000") {
            layer.msg(res.data.retMsg, { icon: 1 });
            setTimeout(() => {
              _this.$router.go(-1);
            }, 3000);
          } else {
            layer.msg(res.data.retMsg, { icon: 2 });
          }
        });
        return false;
      });
      // 改派
      form.on("submit(改派)", function(data) {
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
                  _this.$router.go(-1)
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
      form.on("submit(出发)", function(data) {
        data.field.userId = _this.userId;
        data.field.orderInfoId = _this.orderInfoId;
        data.field.handleState = 4;
        _this.$axios.post("/api/handleOrderInfo", data.field).then(res => {
          console.log(res);
          if (res.data.retCode == "000000") {
            layer.msg(res.data.retMsg, { icon: 1 });
            setTimeout(() => {
              _this.$router.go(-1);
            }, 3000);
          } else {
            layer.msg(res.data.retMsg, { icon: 2 });
          }
        });
        return false;
      });

      // 到达
      form.on("submit(到达)", function(data) {
        data.field.userId = _this.userId;
        data.field.orderInfoId = _this.orderInfoId;
        data.field.handleState = 5;
        _this.$axios.post("/api/handleOrderInfo", data.field).then(res => {
          console.log(res);
          if (res.data.retCode == "000000") {
            layer.msg(res.data.retMsg, { icon: 1 });
            setTimeout(() => {
              _this.$router.go(-1);
            }, 3000);
          } else {
            layer.msg(res.data.retMsg, { icon: 2 });
          }
        });
        return false;
      });
      // 开始
      form.on("submit(开始)", function(data) {
        data.field.userId = _this.userId;
        data.field.orderInfoId = _this.orderInfoId;
        data.field.handleState = 6;
        _this.$axios.post("/api/handleOrderInfo", data.field).then(res => {
          console.log(res);
          if (res.data.retCode == "000000") {
            layer.msg(res.data.retMsg, { icon: 1 });
            setTimeout(() => {
              _this.$router.go(-1);
            }, 3000);
          } else {
            layer.msg(res.data.retMsg, { icon: 2 });
          }
        });

        return false;
      });
      // 预约上门
      form.on("submit(预约)", function(data) {
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
            data.field.handleState = 3;
            data.field.userId = _this.userId;
            data.field.orderInfoId = _this.orderInfoId;
            data.field.appoinmentTime = appoinmentTime;
            console.log(data.field);
            _this.$axios.post("/api/handleOrderInfo", data.field).then(res => {
              console.log(res);
              if (res.data.retCode == "000000") {
                layer.msg(res.data.retMsg, { icon: 1 });
                setTimeout(() => {
                  _this.$router.go(-1);
                }, 3000);
              } else {
                layer.msg(res.data.retMsg, { icon: 2 });
              }
            });
            layer.close(index);
          }
        });
        return false;
      });

      // 更改预约
      form.on("submit(更改预约)", function(data) {
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
            data.field.handleState = 12;
            data.field.userId = _this.userId;
            data.field.orderInfoId = _this.orderInfoId;
            data.field.appoinmentTime = appoinmentTime;
            console.log(data.field);
            _this.$axios.post("/api/handleOrderInfo", data.field).then(res => {
              console.log(res);
              if (res.data.retCode == "000000") {
                layer.msg(res.data.retMsg, { icon: 1 });
                setTimeout(() => {
                  _this.$router.go(-1);
                }, 3000);
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
      form.on("submit(协同)", function(data) {
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
                          <textarea name="content" placeholder="请输入协同内容" id="synergyContent" row="50" class="layui-textarea"></textarea>
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
              .post("/api/getUserList", {userId: _this.$store.state.userId})
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
            console.log(data.field);
            var content = $("#synergyContent").val();
            var orderUrgency = $("#degree option:selected").val();
            var responsibleId = $("#acceptUserId option:selected").val();

            data.field.userId = _this.userId;
            data.field.orderInfoId = _this.orderInfoId;
            data.field.content = content;
            data.field.orderUrgency = orderUrgency;
            data.field.responsibleId = responsibleId;
            data.field.createrId = _this.workOrderInfo.userId;
            console.log(data.field);
            _this.$axios
              .post("/api/addCoordinateInfo", data.field)
              .then(res => {
                console.log(res);
                if (res.data.retCode == "000000") {
                  layer.msg(res.data.retMsg, { icon: 1 });
                  setTimeout(() => {
                    _this.$router.go(-1);
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
        return false;
      });

      // 驳回
      form.on("submit(驳回)", function(data) {
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
            if (_this.orderState == 7) {
              var handleState = 13;
              if (
                _this.workOrderInfo.appoinmentTime == "" ||
                _this.workOrderInfo.appoinmentTime == null
              ) {
                var isAppoint = 0;
              } else {
                var isAppoint = 1;
              }
            } else {
              var handleState = 9;
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
                  _this.$router.go(-1);
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
      // 返回
      form.on("submit(返回)",function(data){
        _this.$router.go(-1);
      })      
      // 关单
      form.on("submit(关单)", function(data) {
        console.log(data.field);
        console.log(data.field);
        if (_this.orderState == 7) {
          // 待回访关单
          data.field.userId = _this.userId;
          data.field.orderInfoId = _this.orderInfoId;
          console.log(data.field);
          layer.confirm(
            "是否确认关闭当前工单？",
            { icon: 3, title: "提示" },
            function(index) {
              //向服务端发送关单指令
              _this.$axios.post("/api/closeOrderInfo", data.field).then(res => {
                console.log(res);
                if (res.data.retCode == "000000") {
                  layer.msg(res.data.retMsg, { icon: 1 });
                  setTimeout(() => {
                    _this.$router.go(-1);
                  });
                } else {
                  layer.msg(res.data.retMsg, { icon: 2 });
                }
              });
            }
          );
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
                    _this.$router.go(-1);
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
        return false;
      });
    });
  },
  created() {
    this.send();
  },
  updated() {
    layui.use(["form"], function() {
      layui.form.render();
    });
  },
  beforeDestroy() {
    // localStorage.removeItem("orderState")
    // localStorage.removeItem("orderInfoId")
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